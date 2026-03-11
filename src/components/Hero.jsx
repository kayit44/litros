import { useEffect, useRef, useState } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "../lib/supabase";

const WA_NUMBER  = "905XXXXXXXXX";
const WA_MESSAGE = "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

// ── Stagger container variants ───────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden:  { opacity: 0, scale: 1.08, x: 60 },
  visible: {
    opacity: 1, scale: 1, x: 0,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const [heroImg, setHeroImg] = useState(null);

  useEffect(() => {
    supabase
      .from("cakes")
      .select("*")
      .eq("hero", true)
      .limit(1)
      .then(({ data }) => { if (data && data.length > 0) setHeroImg(data[0]); });
  }, []);

  // Parallax scroll efekti
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY       = useTransform(scrollYProgress, [0, 1], ["0%",   "18%"]);
  const textY      = useTransform(scrollYProgress, [0, 1], ["0%",   "12%"]);
  const opacity    = useTransform(scrollYProgress, [0, 0.7], [1,     0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
        background: "var(--cream)",
      }}
    >
      {/* ── Dekoratif arka plan yazı ───────────────────────── */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        style={{
          position: "absolute",
          bottom: "-40px", left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(80px, 14vw, 200px)",
          fontWeight: 400,
          color: "rgba(201,169,110,0.055)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "2px",
        }}
      >
        CAKE HOUSE
      </Motion.div>

      {/* ── Sol: Metin ─────────────────────────────────────── */}
      <Motion.div
        style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(100px, 12vw, 160px) clamp(32px, 5vw, 80px) 80px",
          position: "relative", zIndex: 2,
          y: textY, opacity,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <Motion.p variants={itemVariants} style={{
          display: "flex", alignItems: "center", gap: "14px",
          fontSize: "13px", letterSpacing: "2px",
          textTransform: "uppercase", color: "var(--gold-dark)",
          fontWeight: 500, marginBottom: "24px",
          fontFamily: "'Jost', sans-serif",
        }}>
          <span style={{
            display: "block", width: "32px", height: "1px",
            background: "var(--gold)", flexShrink: 0,
          }} />
          El Yapımı · Özel Tasarım · Benzersiz
        </Motion.p>

        {/* Başlık */}
        <Motion.h1 variants={itemVariants} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 6vw, 86px)",
          fontWeight: 400, lineHeight: 1.08,
          color: "var(--dark)", marginBottom: "28px",
          letterSpacing: "-0.5px",
        }}>
          Her Pasta<br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            Bir Sanat Eseri
          </em>
        </Motion.h1>

        {/* Alt başlık */}
        <Motion.p variants={itemVariants} style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "16px", lineHeight: 1.9,
          color: "var(--brown)", fontWeight: 400,
          maxWidth: "380px", marginBottom: "48px",
          letterSpacing: "0.3px",
        }}>
          Özel günleriniz için tamamen size özel tasarlanan,
          en kaliteli malzemelerle hazırlanan butik pastalar.
          Her sipariş, bir hikâyeyi anlatır.
        </Motion.p>

        {/* CTA Butonları */}
        <Motion.div variants={itemVariants}
          style={{ display: "flex", alignItems: "center",
            gap: "clamp(16px, 3vw, 32px)", flexWrap: "wrap" }}
        >
          <Motion.a
            href="#galeri"
            onClick={e => {
              e.preventDefault();
              document.getElementById("galeri")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.04, backgroundColor: "var(--brown)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              padding: "15px 40px",
              background: "var(--dark)", color: "var(--cream)",
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px", letterSpacing: "1px",
              textTransform: "uppercase", fontWeight: 400,
              textDecoration: "none",
              transition: "background 0.3s",
            }}
          >
            Tasarımları Keşfet
          </Motion.a>

          <Motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontFamily: "'Jost', sans-serif",
              fontSize: "12px", color: "var(--brown)",
              textDecoration: "none", letterSpacing: "1px",
              fontWeight: 400,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp ile İletişim
            <Motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ fontSize: "16px" }}
            >
              →
            </Motion.span>
          </Motion.a>
        </Motion.div>

        {/* İstatistikler */}
        <Motion.div
          variants={itemVariants}
          style={{
            display: "flex", gap: "clamp(24px, 4vw, 48px)",
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--gold-light)",
          }}
        >
          {[
            { num: "200+", label: "Mutlu Müşteri" },
            { num: "5 ★",  label: "Ortalama Puan" },
            { num: "100%", label: "El Yapımı" },
          ].map((stat, i) => (
            <Motion.div key={i}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 400, color: "var(--gold)",
                lineHeight: 1,
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px", letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--brown)",
                marginTop: "6px", fontWeight: 400,
              }}>
                {stat.label}
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </Motion.div>

      {/* ── Sağ: Görsel ────────────────────────────────────── */}
      <Motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative", overflow: "hidden",
          y: imgY,
        }}
      >
        {/* Ana görsel */}
        <Motion.div
          style={{
            width: "100%", height: "100%",
            overflow: "hidden",
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6 }}
        >
          <Motion.img
            src={heroImg?.image || "/images/rustic-romance.jpg"}
            alt="Litros Cake House Featured Cake"
            style={{
              width: "100%", height: "100%",
              minHeight: "100vh",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
            onError={(e) => { e.target.src = "/images/rustic-romance.jpg"; }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </Motion.div>

        {/* Overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(249,243,234,0.15) 0%, transparent 50%, rgba(28,20,16,0.2) 100%)",
          pointerEvents: "none",
        }} />

        {/* Badge: El Yapımı */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: "backOut" }}
          animate2={{ y: [0, -8, 0] }}
          style={{
            position: "absolute", top: "clamp(80px, 12vw, 120px)", right: "16px",
            background: "var(--dark)",
            padding: "20px 24px",
            textAlign: "center", zIndex: 3,
            boxShadow: "0 20px 60px rgba(28,20,16,0.3)",
          }}
        >
          <Motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "32px", fontWeight: 400,
              color: "var(--gold)", lineHeight: 1,
            }}>
              100%
            </div>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px", letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              marginTop: "6px",
            }}>
              El Yapımı
            </div>
          </Motion.div>
        </Motion.div>

        {/* Badge: Müşteri Memnuniyeti */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "backOut" }}
          style={{
            position: "absolute", bottom: "clamp(60px, 8vw, 80px)", left: "-16px",
            background: "var(--white)",
            padding: "18px 24px",
            borderLeft: "3px solid var(--gold)",
            zIndex: 3,
            boxShadow: "0 20px 60px rgba(28,20,16,0.15)",
            display: "flex", alignItems: "center", gap: "14px",
          }}
        >
          <Motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
            style={{ fontSize: "28px" }}
          >
            🎂
          </Motion.div>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px", fontWeight: 400,
              color: "var(--gold)", lineHeight: 1,
            }}>
              ★★★★★
            </div>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px", letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--brown)",
              marginTop: "4px",
            }}>
              Müşteri Memnuniyeti
            </div>
          </div>
        </Motion.div>

        {/* Scroll indicator */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: "absolute", bottom: "32px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "8px",
            fontFamily: "'Jost', sans-serif",
            fontSize: "9px", letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--gold)",
            zIndex: 3,
          }}
        >
          <Motion.div
            style={{
              width: "1px", height: "48px",
              background: "linear-gradient(to bottom, var(--gold), transparent)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          Keşfet
        </Motion.div>
      </Motion.div>

      {/* ── Marquee Şeridi ─────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "#2A1A1F",
          padding: "13px 0",
          overflow: "hidden", zIndex: 5,
        }}
      >
        <div className="marquee-track" style={{
          display: "flex", gap: "56px",
          width: "max-content",
        }}>
          {Array(6).fill([
            "El Yapımı Pastalar",
            "Özel Tasarım",
            "Doğum Günü",
            "Düğün Pastaları",
            "Nişan & Söz",
            "Butik Mini Pastalar",
            "Sipariş Üzerine",
          ]).flat().map((text, i) => (
            <span key={i} style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px", letterSpacing: "1px",
              textTransform: "uppercase",
              color: i % 7 === 0 ? "var(--gold)" : "rgba(232,213,176,0.5)",
              whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "16px",
            }}>
              {i % 3 === 0 && (
                <span style={{ color: "var(--gold)", fontSize: "6px" }}>✦</span>
              )}
              {text}
            </span>
          ))}
        </div>
      </Motion.div>

      {/* ── Responsive Styles ──────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          #hero {
            grid-template-columns: 1fr !important;
            grid-template-rows: 1fr auto;
          }
          #hero > div:first-child {
            padding-top: 120px !important;
            padding-bottom: 40px !important;
          }
          #hero > div:last-child {
            min-height: 55vw !important;
          }
        }
      `}</style>
    </section>
  );
}