import { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

const CATEGORIES = [
  { id: "dogum-gunu", label: "Doğum Günü" },
  { id: "dugun",      label: "Düğün" },
  { id: "nisan",      label: "Nişan & Söz" },
  { id: "ozel",       label: "Özel Tasarım" },
  { id: "butik",      label: "Butik & Mini" },
];

const EMPTY_FORM = {
  title: "", subtitle: "", category: "dogum-gunu",
  description: "", tags: "", featured: false, image: "",
};

export default function Dashboard({ onLogout }) {
  const [cakes,       setCakes]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [editId,      setEditId]      = useState(null);
  const [uploading,   setUploading]   = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [toast,       setToast]       = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);
  const [preview,     setPreview]     = useState(null);
  const fileRef = useRef();

  // ── Pastaları yükle ──────────────────────────────────────
  const fetchCakes = async () => {
    setLoading(true);
    const { data } = await supabase.from("cakes").select("*").order("created_at", { ascending: false });
    setCakes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCakes(); }, []);

  // ── Toast göster ─────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Görsel yükle ─────────────────────────────────────────
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const ext      = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("cake-images").upload(fileName, file);

    if (error) {
      showToast("Görsel yüklenemedi!", "error");
    } else {
      const { data } = supabase.storage.from("cake-images").getPublicUrl(fileName);
      setForm(f => ({ ...f, image: data.publicUrl }));
      showToast("Görsel yüklendi ✓");
    }
    setUploading(false);
  };

  // ── Kaydet / Güncelle ─────────────────────────────────────
  const handleSave = async () => {
    if (!form.title || !form.image) {
      showToast("İsim ve görsel zorunlu!", "error"); return;
    }
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("cakes").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("cakes").insert([payload]));
    }

    if (error) {
      showToast("Kaydedilemedi!", "error");
    } else {
      showToast(editId ? "Güncellendi ✓" : "Pasta eklendi ✓");
      setForm(EMPTY_FORM); setEditId(null); setPreview(null);
      fetchCakes();
    }
    setSaving(false);
  };

  // ── Düzenle ───────────────────────────────────────────────
  const handleEdit = (cake) => {
    setEditId(cake.id);
    setForm({ ...cake, tags: Array.isArray(cake.tags) ? cake.tags.join(", ") : cake.tags });
    setPreview(cake.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Sil ───────────────────────────────────────────────────
  const handleDelete = async (id) => {
    await supabase.from("cakes").delete().eq("id", id);
    setDeleteId(null);
    showToast("Pasta silindi.");
    fetchCakes();
  };

  // ── Öne çıkan toggle ─────────────────────────────────────
  const toggleFeatured = async (cake) => {
    await supabase.from("cakes").update({ featured: !cake.featured }).eq("id", cake.id);
    fetchCakes();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7EDE6", fontFamily: "'Jost', sans-serif" }}>

      {/* ── Toast ──────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
              background: toast.type === "error" ? "#E8354A" : "#2A1A1F",
              color: "white", padding: "12px 28px",
              fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "1px",
              zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {toast.msg}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        background: "#2A1A1F", padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/images/logo.png" alt="logo" style={{ height: "48px" }} />
          <div>
            <div style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300 }}>
              Admin Paneli
            </div>
            <div style={{ color: "rgba(232,213,176,0.4)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Litros Cake House
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Motion.a
            href="/"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: "8px 20px", background: "transparent",
              border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold-light)",
              fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Jost', sans-serif",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            ← Siteye Dön
          </Motion.a>
          <Motion.button
            onClick={onLogout} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: "8px 20px", background: "transparent",
              border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold-light)",
              fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Jost', sans-serif",
            }}
          >
            Çıkış Yap
          </Motion.button>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* ── Form ───────────────────────────────────────────── */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: "white", padding: "36px",
            boxShadow: "0 4px 24px rgba(42,26,31,0.06)",
            marginBottom: "40px",
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "26px",
            fontWeight: 300, color: "#2A1A1F", marginBottom: "28px",
          }}>
            {editId ? "✏️ Pastayı Düzenle" : "🎂 Yeni Pasta Ekle"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* İsim */}
            <div>
              <label style={labelStyle}>Pasta İsmi *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="örn. Velvet Rose" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "#E8D5B0"} />
            </div>

            {/* Alt başlık */}
            <div>
              <label style={labelStyle}>Alt Başlık</label>
              <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="örn. Doğum Günü Pastası" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "#E8D5B0"} />
            </div>

            {/* Kategori */}
            <div>
              <label style={labelStyle}>Kategori</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ ...inputStyle, cursor: "pointer" }}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>

            {/* Taglar */}
            <div>
              <label style={labelStyle}>Taglar (virgülle ayır)</label>
              <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="Çikolata, El Yapımı, 4-6 Kişilik" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "#E8D5B0"} />
            </div>

            {/* Açıklama */}
            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Açıklama</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Pasta hakkında kısa bir açıklama..." rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "#E8D5B0"} />
            </div>

            {/* Görsel yükle */}
            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Pasta Görseli *</label>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    width: "140px", height: "140px", flexShrink: 0,
                    border: "2px dashed #E8D5B0", borderRadius: "4px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    cursor: "pointer", overflow: "hidden",
                    background: preview ? "transparent" : "#FDF6F0",
                    transition: "border-color 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#E8D5B0"}
                >
                  {preview ? (
                    <img src={preview} alt="önizleme"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <span style={{ fontSize: "32px", marginBottom: "8px" }}>📷</span>
                      <span style={{ fontSize: "10px", letterSpacing: "1px", color: "#B5506A", textTransform: "uppercase" }}>
                        {uploading ? "Yükleniyor..." : "Görsel Seç"}
                      </span>
                    </>
                  )}
                  {uploading && (
                    <div style={{
                      position: "absolute", inset: 0, background: "rgba(255,255,255,0.8)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", color: "#B5506A", letterSpacing: "1px",
                    }}>
                      Yükleniyor...
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*"
                  onChange={handleUpload} style={{ display: "none" }} />

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "12px", color: "#7A5260", lineHeight: 1.7, marginBottom: "12px" }}>
                    Görsele tıklayarak fotoğraf seç. Yüklenen görsel otomatik olarak Supabase Storage'a kaydedilir.
                  </p>
                  <p style={{ fontSize: "11px", color: "#B5506A" }}>
                    Önerilen: Kare format, min. 800x800px, JPG/PNG
                  </p>

                  {/* Öne çıkan */}
                  <label style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginTop: "16px", cursor: "pointer",
                    fontSize: "12px", color: "#4A2D35",
                  }}>
                    <input type="checkbox" checked={form.featured}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                      style={{ width: "16px", height: "16px", accentColor: "#D4748A" }} />
                    Öne çıkan pasta olarak işaretle
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Butonlar */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <Motion.button
              onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={saving || uploading}
              style={{
                padding: "14px 36px", background: "#2A1A1F", color: "white",
                border: "none", cursor: saving ? "not-allowed" : "pointer",
                fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Jost', sans-serif", fontWeight: 500,
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Kaydediliyor..." : editId ? "Güncelle" : "Pasta Ekle"}
            </Motion.button>

            {editId && (
              <Motion.button
                onClick={() => { setForm(EMPTY_FORM); setEditId(null); setPreview(null); }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  padding: "14px 28px", background: "transparent",
                  border: "1px solid #E8D5B0", color: "#7A5260",
                  cursor: "pointer", fontSize: "11px", letterSpacing: "2px",
                  textTransform: "uppercase", fontFamily: "'Jost', sans-serif",
                }}
              >
                İptal
              </Motion.button>
            )}
          </div>
        </Motion.div>

        {/* ── Pasta Listesi ──────────────────────────────────── */}
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "26px",
            fontWeight: 300, color: "#2A1A1F", marginBottom: "20px",
          }}>
            Pastalar ({cakes.length})
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#B5506A", fontSize: "13px", letterSpacing: "2px" }}>
              Yükleniyor...
            </div>
          ) : cakes.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px",
              background: "white", color: "#7A5260", fontSize: "14px",
            }}>
              Henüz pasta eklenmemiş.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              <AnimatePresence>
                {cakes.map((cake, i) => (
                  <Motion.div
                    key={cake.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: "white",
                      boxShadow: "0 2px 16px rgba(42,26,31,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Görsel */}
                    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                      <img src={cake.image} alt={cake.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {cake.featured && (
                        <div style={{
                          position: "absolute", top: "10px", left: "10px",
                          background: "#D4748A", color: "white",
                          fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase",
                          padding: "4px 10px",
                        }}>
                          Öne Çıkan
                        </div>
                      )}
                    </div>

                    {/* Bilgi */}
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#D4748A", marginBottom: "4px" }}>
                        {CATEGORIES.find(c => c.id === cake.category)?.label}
                      </div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#2A1A1F", marginBottom: "6px" }}>
                        {cake.title}
                      </div>
                      <div style={{ fontSize: "11px", color: "#7A5260", marginBottom: "14px", lineHeight: 1.6 }}>
                        {cake.description?.slice(0, 80)}{cake.description?.length > 80 ? "..." : ""}
                      </div>

                      {/* Aksiyonlar */}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => handleEdit(cake)} style={{ ...actionBtn, background: "#2A1A1F", color: "white" }}>
                          ✏️ Düzenle
                        </button>
                        <button onClick={() => toggleFeatured(cake)}
                          style={{ ...actionBtn, background: cake.featured ? "#D4748A" : "#F7EDE6", color: cake.featured ? "white" : "#7A5260" }}>
                          {cake.featured ? "★ Öne Çıkan" : "☆ Öne Çıkar"}
                        </button>
                        <button onClick={() => setDeleteId(cake.id)} style={{ ...actionBtn, background: "#FEE2E2", color: "#E8354A" }}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ── Silme onay modalı ──────────────────────────────────── */}
      <AnimatePresence>
        {deleteId && (
          <Motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(42,26,31,0.5)", backdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 9000, padding: "24px",
            }}
            onClick={() => setDeleteId(null)}
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "white", padding: "40px 36px",
                maxWidth: "360px", width: "100%", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>🗑️</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: "#2A1A1F", marginBottom: "10px" }}>
                Pastayı Sil
              </h3>
              <p style={{ fontSize: "13px", color: "#7A5260", marginBottom: "28px", lineHeight: 1.6 }}>
                Bu pasta kalıcı olarak silinecek. Bu işlem geri alınamaz.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={() => setDeleteId(null)}
                  style={{ ...actionBtn, padding: "12px 24px", background: "#F7EDE6", color: "#7A5260", fontSize: "11px", letterSpacing: "1px" }}>
                  İptal
                </button>
                <button onClick={() => handleDelete(deleteId)}
                  style={{ ...actionBtn, padding: "12px 24px", background: "#E8354A", color: "white", fontSize: "11px", letterSpacing: "1px" }}>
                  Evet, Sil
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const labelStyle = {
  display: "block", fontFamily: "'Jost', sans-serif",
  fontSize: "10px", letterSpacing: "2px",
  textTransform: "uppercase", color: "#7A5260",
  marginBottom: "8px", fontWeight: 500,
};

const inputStyle = {
  width: "100%", padding: "11px 14px",
  fontFamily: "'Jost', sans-serif", fontSize: "13px",
  color: "#2A1A1F", background: "#FDF6F0",
  border: "1px solid #E8D5B0", outline: "none",
  transition: "border-color 0.3s", borderRadius: "2px",
  boxSizing: "border-box",
};

const actionBtn = {
  padding: "8px 12px", border: "none", borderRadius: "2px",
  fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase",
  cursor: "pointer", fontFamily: "'Jost', sans-serif", fontWeight: 500,
  transition: "opacity 0.2s",
};