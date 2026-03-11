import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { categories } from "../data/cakes";

const WA_NUMBER  = "905XXXXXXXXX";
const WA_MESSAGE = (title) => `Merhaba, "${title}" pastası hakkında sipariş vermek istiyorum.`;
const WA_URL     = (title) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE(title))}`;

const cardVariants = {
  hidden:  { opacity: 0, y: 48, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: {
    opacity: 0, scale: 0.94, y: 20,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

function CakeCard({ cake, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => { sessionStorage.setItem('galleryScrollPending', String(window.scrollY)); navigate(`/pasta/${cake.id}`); }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--cream-dark)",
        cursor: "pointer",
        borderRadius: "2px",
      }}
    >
      <div style={{ overflow: "hidden", aspectRatio: "4/5" }}>
        <Motion.img
          src={cake.image}
          alt={cake.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <Motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(28,20,16,0.88) 0%, rgba(28,20,16,0.2) 50%, transparent 100%)",
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "28px",
        }}
      >
        <Motion.p
          animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{
            fontFamily: "'Jost', sans-serif", fontSize: "9px",
            letterSpacing: "3px", textTransform: "uppercase",
            color: "var(--gold)", marginBottom: "8px",
          }}
        >
          {cake.subtitle}
        </Motion.p>

        <Motion.h3
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "24px",
            fontWeight: 300, color: "var(--white)", marginBottom: "10px", lineHeight: 1.2,
          }}
        >
          {cake.title}
        </Motion.h3>

        <Motion.p
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.11 }}
          style={{
            fontFamily: "'Jost', sans-serif", fontSize: "12px",
            lineHeight: 1.7, color: "rgba(249,243,234,0.75)",
            fontWeight: 300, marginBottom: "18px",
          }}
        >
          {cake.description}
        </Motion.p>

        <Motion.div
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}
        >
          {cake.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'Jost', sans-serif", fontSize: "9px",
              letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "4px 10px",
              border: "1px solid rgba(201,169,110,0.4)",
              color: "var(--gold-light)",
            }}>
              {tag}
            </span>
          ))}
        </Motion.div>

        <Motion.a
          href={WA_URL(cake.title)}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.17 }}
          whileHover={{ scale: 1.03, backgroundColor: "#1ebe5a" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "8px",
            padding: "12px 20px", background: "#25D366", color: "white",
            fontFamily: "'Jost', sans-serif", fontSize: "10px",
            letterSpacing: "2px", textTransform: "uppercase",
            fontWeight: 500, textDecoration: "none",
            transition: "background 0.3s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Bu Pastayı Sipariş Et
        </Motion.a>
      </Motion.div>

      {cake.featured && (
        <Motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.07 }}
          style={{
            position: "absolute", top: "16px", left: "16px",
            background: "var(--gold)", padding: "5px 12px",
            fontFamily: "'Jost', sans-serif", fontSize: "8px",
            letterSpacing: "2.5px", textTransform: "uppercase",
            color: "var(--dark)", fontWeight: 500, zIndex: 2,
          }}
        >
          Öne Çıkan
        </Motion.div>
      )}
    </Motion.div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("hepsi");
  const [cakes,          setCakes]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  // Supabase'den pastaları çek
  useEffect(() => {
    const fetchCakes = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("cakes")
        .select("*")
        .order("created_at", { ascending: false });
      setCakes(data || []);
      setLoading(false);
    };
    fetchCakes();
  }, []);

  // Veriler yüklenince scroll pozisyonunu restore et
  useEffect(() => {
    if (loading) return;
    const pos = sessionStorage.getItem('galleryScrollPending');
    if (pos) {
      sessionStorage.removeItem('galleryScrollPending');
      sessionStorage.removeItem('galleryScroll');
      setTimeout(() => window.scrollTo({ top: parseInt(pos), behavior: "instant" }), 100);
    }
  }, [loading]);

  const filtered = activeCategory === "hepsi"
    ? cakes
    : cakes.filter((c) => c.category === activeCategory);

  return (
    <section
      id="galeri"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)",
        background: "var(--white)",
      }}
    >
      {/* Başlık */}
      <Motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <p className="section-eyebrow" style={{ justifyContent: "center" }}>
          Koleksiyonumuz
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5vw, 58px)",
          fontWeight: 400, lineHeight: 1.15,
          color: "var(--dark)", marginBottom: "16px",
        }}>
          El Yapımı <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Tasarımlar</em>
        </h2>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: "13px",
          color: "var(--brown)", fontWeight: 400,
          maxWidth: "480px", margin: "0 auto", lineHeight: 1.8,
        }}>
          Beğendiğiniz tasarım için WhatsApp üzerinden bizimle iletişime geçin,
          size özel fiyat ve detay bilgisi verelim.
        </p>
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            width: "60px", height: "1px",
            background: "linear-gradient(to right, transparent, var(--gold), transparent)",
            margin: "24px auto 0",
          }}
        />
      </Motion.div>

      {/* Filtre Butonları */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: "flex", justifyContent: "center",
          flexWrap: "wrap", gap: "6px", marginBottom: "52px",
        }}
      >
        {categories.map((cat) => (
          <Motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "10px 26px",
              fontFamily: "'Jost', sans-serif", fontSize: "10px",
              letterSpacing: "2px", textTransform: "uppercase",
              fontWeight: 400, border: "1px solid",
              borderColor: activeCategory === cat.id ? "var(--dark)" : "var(--gold-light)",
              background: activeCategory === cat.id ? "var(--dark)" : "transparent",
              color: activeCategory === cat.id ? "var(--gold-dark)" : "var(--brown)",
              cursor: "pointer", transition: "all 0.3s ease",
              position: "relative", overflow: "hidden",
            }}
          >
            {activeCategory === cat.id && (
              <Motion.span
                layoutId="filterBg"
                style={{
                  position: "absolute", inset: 0,
                  background: "var(--dark)", zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {cat.label}
          </Motion.button>
        ))}
      </Motion.div>

      {/* Grid */}
      {loading ? (
        <div style={{
          textAlign: "center", padding: "80px 0",
          fontFamily: "'Jost', sans-serif",
          fontSize: "11px", letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--gold)",
        }}>
          Yükleniyor...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px 0",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "22px", fontWeight: 400,
          color: "var(--brown)",
        }}>
          Bu kategoride henüz pasta eklenmemiş.
        </div>
      ) : (
        <Motion.div layout style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px, 28vw, 340px), 1fr))",
          gap: "clamp(12px, 2vw, 20px)",
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} index={i} />
            ))}
          </AnimatePresence>
        </Motion.div>
      )}

      {/* Alt CTA Bandı */}
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          marginTop: "72px", padding: "40px clamp(24px, 5vw, 64px)",
          background: "#2A1A1F",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "24px",
        }}
      >
        <div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 300, color: "var(--cream)", marginBottom: "6px",
          }}>
            Hayalinizdeki pastayı birlikte tasarlayalım.
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "12px",
            color: "rgba(232,213,176,0.6)", fontWeight: 300, letterSpacing: "0.5px",
          }}>
            Her pasta tamamen özel sipariş üzerine hazırlanır.
          </p>
        </div>
        <Motion.a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Merhaba, özel pasta siparişi hakkında bilgi almak istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, backgroundColor: "#1ebe5a" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "15px 36px", background: "#25D366", color: "white",
            fontFamily: "'Jost', sans-serif", fontSize: "11px",
            letterSpacing: "2px", textTransform: "uppercase",
            fontWeight: 500, textDecoration: "none", flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Sipariş İçin WhatsApp
        </Motion.a>
      </Motion.div>
    </section>
  );
}