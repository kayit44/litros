import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";

const WA_NUMBER  = "905324224244";
const WA_MESSAGE = "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const navLinks = [
  { label: "Galeri",        href: "#galeri" },
  { label: "Hakkımda",      href: "#hakkimda" },
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "İletişim",      href: "#iletisim" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/litroscakehouse?igsh=MXFwZmI3eDU5em5kZg==",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: WA_URL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="iletisim"
      ref={ref}
      style={{
        background: "#2A1A1F",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Üst alan ───────────────────────────────────────── */}
      <div style={{
        padding: "clamp(64px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 72px)",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gap: "clamp(32px, 5vw, 64px)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>

        {/* ── Marka Sütunu ───────────────────────────────── */}
        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px", fontWeight: 400,
              letterSpacing: "3px", textTransform: "uppercase",
              color: "var(--cream)", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px",
            }}
          >
            <img src="/images/logo.png" alt="Litros Cake House" style={{ height: "72px", width: "auto", objectFit: "contain" }} />
          </a>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px", lineHeight: 1.85,
            color: "rgba(232,213,176,0.45)",
            fontWeight: 400, maxWidth: "280px",
            marginBottom: "28px",
          }}>
            El yapımı butik pastalar. Her sipariş özel, her pasta eşsiz.
            Özel günlerinize anlam katmak için buradayız.
          </p>

          {/* Sosyal medya ikonları */}
          <div style={{ display: "flex", gap: "12px" }}>
            {socialLinks.map((s, i) => (
              <Motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.15, y: -3, color: "var(--gold)" }}
                whileTap={{ scale: 0.92 }}
                aria-label={s.label}
                style={{
                  width: "40px", height: "40px",
                  border: "1px solid rgba(201,169,110,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(232,213,176,0.5)",
                  textDecoration: "none",
                  transition: "color 0.3s, border-color 0.3s",
                }}
                onHoverStart={e => {
                  e.target.closest("a").style.borderColor = "rgba(201,169,110,0.6)";
                }}
                onHoverEnd={e => {
                  e.target.closest("a").style.borderColor = "rgba(201,169,110,0.2)";
                }}
              >
                {s.icon}
              </Motion.a>
            ))}
          </div>
        </Motion.div>

        {/* ── Navigasyon Sütunu ──────────────────────────── */}
        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h4 style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "9px", letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--gold)",
            fontWeight: 500, marginBottom: "24px",
          }}>
            Menü
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            {navLinks.map((link, i) => (
              <Motion.li key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <Motion.a
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  whileHover={{ x: 6, color: "var(--gold)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "13px", fontWeight: 400,
                    color: "rgba(232,213,176,0.5)",
                    textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "8px",
                    transition: "color 0.3s",
                  }}
                >
                  <span style={{ color: "var(--gold)", fontSize: "6px" }}>✦</span>
                  {link.label}
                </Motion.a>
              </Motion.li>
            ))}
          </ul>
        </Motion.div>

        {/* ── İletişim Sütunu ────────────────────────────── */}
        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h4 style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "9px", letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--gold)",
            fontWeight: 500, marginBottom: "24px",
          }}>
            İletişim
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* WhatsApp */}
            <Motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4, color: "var(--gold)" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                textDecoration: "none",
                color: "rgba(232,213,176,0.5)",
                transition: "color 0.3s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px", fontWeight: 400,
                  color: "var(--cream)", marginBottom: "2px",
                }}>
                  WhatsApp Sipariş
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px", fontWeight: 400,
                }}>
                  +90 532 422 42 44
                </div>
              </div>
            </Motion.a>

            {/* Instagram */}
            <Motion.a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4, color: "var(--gold)" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                textDecoration: "none",
                color: "rgba(232,213,176,0.5)",
                transition: "color 0.3s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px", fontWeight: 400,
                  color: "var(--cream)", marginBottom: "2px",
                }}>
                  Instagram
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px", fontWeight: 400,
                }}>
                  @litrascakehouse
                </div>
              </div>
            </Motion.a>

            {/* Konum */}
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "12px",
              color: "rgba(232,213,176,0.5)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px", fontWeight: 400,
                  color: "var(--cream)", marginBottom: "2px",
                }}>
                  Konum
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "12px", fontWeight: 400,
                  lineHeight: 1.6,
                }}>
                  İstanbul, Türkiye
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* ── Ayırıcı ────────────────────────────────────────── */}
      <Motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
          transformOrigin: "left",
          margin: "0 clamp(24px, 6vw, 80px)",
        }}
      />

      {/* ── Alt bar ────────────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.7 }}
        style={{
          padding: "24px clamp(24px, 6vw, 80px)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "12px", maxWidth: "1200px", margin: "0 auto",
        }}
      >
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "11px", color: "rgba(232,213,176,0.25)",
          fontWeight: 400, letterSpacing: "0.5px",
        }}>
          © {new Date().getFullYear()} Litros Cake House. Tüm hakları saklıdır.
        </p>

        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "11px", color: "rgba(232,213,176,0.25)",
          fontWeight: 400, letterSpacing: "0.5px",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          El yapımı
          <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
          Özel tasarım
          <span style={{ color: "var(--gold)", fontSize: "10px" }}>✦</span>
          Benzersiz
        </p>
      </Motion.div>

      {/* ── Responsive ─────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          #iletisim > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}