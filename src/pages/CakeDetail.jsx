import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

const WA_NUMBER = "905XXXXXXXXX";

const CATEGORY_LABELS = {
  "dogum-gunu": "Doğum Günü",
  "dugun":      "Düğün",
  "nisan":      "Nişan & Söz",
  "ozel":       "Özel Tasarım",
  "butik":      "Butik & Mini",
};

export default function CakeDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [cake, setCake]       = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setImgLoaded(false);
      const { data } = await supabase.from("cakes").select("*").eq("id", id).single();
      setCake(data);

      if (data) {
        const { data: rel } = await supabase
          .from("cakes").select("*")
          .eq("category", data.category)
          .neq("id", id)
          .limit(3);
        setRelated(rel || []);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const waMessage = cake
    ? `Merhaba, "${cake.title}" pastası hakkında bilgi almak istiyorum.`
    : "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  if (loading) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--cream)", fontFamily: "'Jost', sans-serif",
      fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)",
    }}>
      Yükleniyor...
    </div>
  );

  if (!cake) return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", background: "var(--cream)", gap: "24px",
    }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "var(--dark)" }}>
        Pasta bulunamadı.
      </p>
      <button onClick={() => navigate("/")} style={backBtnStyle}>← Ana Sayfaya Dön</button>
    </div>
  );

  return (
    <Motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      style={{ background: "var(--cream)", minHeight: "100vh" }}
    >
      <style>{`
        @media (max-width: 640px) {
          .detail-sticky { position: relative !important; top: 0 !important; }
          .detail-navbar-wa { display: none !important; }
        }
      `}</style>
      {/* ── Navbar benzeri üst bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 800,
        background: "rgba(249,243,234,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
        padding: "8px clamp(12px, 4vw, 60px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        minHeight: "60px",
      }}>
        <Motion.button
          onClick={() => navigate('/')}
          whileHover={{ x: -4 }} whileTap={{ scale: 0.96 }}
          style={backBtnStyle}
        >
          ← Geri
        </Motion.button>

        <img src="/images/logo.png" alt="Litros Cake House"
          style={{ height: "52px", width: "auto", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <Motion.a
          href={waUrl} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="detail-navbar-wa"
          style={{
            padding: "10px clamp(12px, 3vw, 20px)", background: "#25D366", color: "white",
            fontFamily: "'Jost', sans-serif", fontSize: "10px",
            letterSpacing: "2px", textTransform: "uppercase",
            textDecoration: "none", display: "flex", alignItems: "center", gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Sipariş Ver
        </Motion.a>
      </div>

      {/* ── Ana içerik ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(80px, 12vw, 120px) clamp(16px, 5vw, 60px) 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(24px, 5vw, 80px)",
          alignItems: "start",
        }}>

          {/* ── Sol: Görsel ── */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="detail-sticky"
            style={{ position: "sticky", top: "80px" }}
          >
            <div style={{
              aspectRatio: "3/4", overflow: "hidden",
              background: "var(--cream-dark)",
              position: "relative",
            }}>
              {!imgLoaded && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, var(--cream-dark) 0%, var(--gold-light) 100%)",
                  opacity: 0.4,
                }} />
              )}
              <img
                src={cake.image} alt={cake.title}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
              {cake.featured && (
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: "var(--gold)", color: "white",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase",
                  padding: "5px 12px",
                }}>
                  Öne Çıkan
                </div>
              )}
            </div>
          </Motion.div>

          {/* ── Sağ: Bilgi ── */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ paddingTop: "8px" }}
          >
            {/* Kategori */}
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px", letterSpacing: "3px",
              textTransform: "uppercase", color: "var(--gold)",
              marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)" }} />
              {CATEGORY_LABELS[cake.category] || cake.category}
            </div>

            {/* Başlık */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300, lineHeight: 1.1,
              color: "var(--dark)", margin: "0 0 12px",
            }}>
              {cake.title}
            </h1>

            {/* Alt başlık */}
            {cake.subtitle && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "20px", fontWeight: 300,
                fontStyle: "italic", color: "var(--gold)",
                marginBottom: "28px",
              }}>
                {cake.subtitle}
              </p>
            )}

            {/* Ayraç */}
            <div style={{ width: "48px", height: "1px", background: "var(--gold)", marginBottom: "28px" }} />

            {/* Açıklama */}
            {cake.description && (
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "15px", lineHeight: 1.8,
                color: "var(--text)", marginBottom: "32px",
              }}>
                {cake.description}
              </p>
            )}

            {/* Taglar */}
            {cake.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
                {cake.tags.map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "10px", letterSpacing: "1.5px",
                    textTransform: "uppercase", color: "var(--brown)",
                    border: "1px solid var(--gold-light)",
                    padding: "6px 14px",
                    background: "rgba(201,169,110,0.06)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Butonları */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Motion.a
                href={waUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "18px 36px", background: "#2A1A1F", color: "var(--cream)",
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  letterSpacing: "2.5px", textTransform: "uppercase",
                  textDecoration: "none", fontWeight: 500,
                  transition: "background 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#3D2B1F"}
                onMouseLeave={e => e.currentTarget.style.background = "#2A1A1F"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp ile Sipariş Ver
              </Motion.a>

              <Motion.button
                onClick={() => navigate("/#galeri")}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  padding: "16px 36px", background: "transparent",
                  border: "1px solid var(--gold-light)", color: "var(--brown)",
                  fontFamily: "'Jost', sans-serif", fontSize: "11px",
                  letterSpacing: "2.5px", textTransform: "uppercase",
                  cursor: "pointer", fontWeight: 400,
                  transition: "border-color 0.3s, color 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gold-light)"; e.currentTarget.style.color = "var(--brown)"; }}
              >
                ← Tüm Tasarımlara Dön
              </Motion.button>
            </div>
          </Motion.div>
        </div>

        {/* ── Benzer Pastalar ── */}
        {related.length > 0 && (
          <Motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: "80px" }}
          >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: "10px",
                letterSpacing: "3px", textTransform: "uppercase",
                color: "var(--gold)", marginBottom: "12px",
              }}>
                Aynı Kategoriden
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300,
                color: "var(--dark)",
              }}>
                Benzer Tasarımlar
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}>
              {related.map((r, i) => (
                <Motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/pasta/${r.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: "16px" }}>
                    <img src={r.image} alt={r.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Jost', sans-serif", fontSize: "10px",
                    letterSpacing: "2px", textTransform: "uppercase",
                    color: "var(--gold)", marginBottom: "6px",
                  }}>
                    {CATEGORY_LABELS[r.category]}
                  </p>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px", fontWeight: 300, color: "var(--dark)",
                  }}>
                    {r.title}
                  </h3>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        )}
      </div>

      {/* ── Footer benzeri alt bar ── */}
      <div style={{
        background: "#2A1A1F", padding: "24px clamp(16px, 5vw, 60px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: "10px",
          letterSpacing: "2px", textTransform: "uppercase",
          color: "rgba(232,213,176,0.4)",
        }}>
          © 2025 Litros Cake House · El Yapımı · Özel Tasarım
        </p>
      </div>
    </Motion.div>
  );
}

const backBtnStyle = {
  fontFamily: "'Jost', sans-serif",
  fontSize: "10px", letterSpacing: "2px",
  textTransform: "uppercase", color: "var(--brown)",
  background: "none", border: "none",
  cursor: "pointer", padding: "4px 0",
  textDecoration: "none", display: "inline-block",
};