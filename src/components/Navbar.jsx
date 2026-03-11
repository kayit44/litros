import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Galeri",        href: "#galeri" },
  { label: "Hakkımda",      href: "#hakkimda" },
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "İletişim",      href: "#iletisim" },
];

// ─── Whatsapp numarasını buradan değiştir ───────────────────
const WA_NUMBER = "905XXXXXXXXX";
const WA_MESSAGE = "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll → navbar blur efekti
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktif section takibi
  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Menü açıkken scroll kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* ── Desktop Navbar ─────────────────────────────────── */}
      <Motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 800,
          padding: scrolled ? "4px clamp(16px, 4vw, 60px)" : "8px clamp(16px, 4vw, 60px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(249,243,234,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
          transition: "padding 0.4s ease, background 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <Motion.a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px", fontWeight: 500,
            letterSpacing: "1px",
            color: "var(--dark)", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "10px",
          }}
        >
          <img src="/images/logo.png" alt="Litros Cake House" style={{ height: "clamp(56px, 8vw, 110px)", width: "auto", objectFit: "contain", opacity: menuOpen ? 0 : 1, pointerEvents: menuOpen ? "none" : "auto", transition: "opacity 0.2s" }} />
        </Motion.a>

        {/* Desktop Links */}
        <ul style={{
          display: "flex", gap: "32px", listStyle: "none",
          margin: "0 0 0 -8px", padding: 0,
        }}
          className="hidden-mobile"
        >
          {navLinks.map((link, i) => (
            <Motion.li key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
            >
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px", letterSpacing: "2.5px",
                  textTransform: "uppercase", fontWeight: 400,
                  color: activeSection === link.href.replace("#", "")
                    ? "var(--gold)" : "var(--brown)",
                  textDecoration: "none",
                  position: "relative", paddingBottom: "4px",
                  transition: "color 0.3s",
                }}
                className="nav-link-item"
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <Motion.span
                    layoutId="navUnderline"
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: "1px", background: "var(--gold)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </Motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden-mobile"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px", letterSpacing: "2.5px",
            textTransform: "uppercase", fontWeight: 400,
            padding: "11px 28px",
            border: "1px solid var(--gold)",
            color: "var(--brown)", textDecoration: "none",
            transition: "background 0.3s, color 0.3s",
            display: "flex", alignItems: "center", gap: "8px",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "var(--white)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--brown)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Sipariş Ver
        </Motion.a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          aria-label="Menüyü aç/kapat"
          style={{
            background: "none", border: "none",
            cursor: "pointer", padding: "4px",
            flexDirection: "column",
            gap: "5px", zIndex: 900,
            visibility: menuOpen ? "hidden" : "visible",
          }}
        >
          {[0, 1, 2].map(i => (
            <Motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45,  y: 7,  opacity: 1 }
                  : i === 1 ? { opacity: 0, x: -8 }
                  :           { rotate: -45, y: -7, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1, x: 0 }
              }
              transition={{ duration: 0.3 }}
              style={{
                display: "block", width: "24px", height: "1.5px",
                background: "#2A1A1F", borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </Motion.nav>

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{   clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0,
              background: "#2A1A1F",
              zIndex: 900,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "8px",
            }}
          >
            {/* Kapatma butonu — sağ üst */}
            <Motion.button
              onClick={() => setMenuOpen(false)}
              aria-label="Menüyü kapat"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute", top: "28px", right: "28px",
                background: "none", border: "1px solid rgba(201,169,110,0.25)",
                cursor: "pointer",
                width: "44px", height: "44px",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000,
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)"}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="2" x2="14" y2="14" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14" y1="2" x2="2" y2="14" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Motion.button>

            {/* Logo — tıklayınca anasayfa */}
            <Motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ marginBottom: "8px" }}
            >
              <img
                src="/images/logo.png"
                alt="Litros Cake House"
                style={{ height: "100px", width: "auto", objectFit: "contain" }}
              />
            </Motion.a>

            {navLinks.map((link, i) => (
              <Motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{   opacity: 0, y: 24 }}
                transition={{ delay: i * 0.07 + 0.2, duration: 0.4 }}
                whileHover={{ x: 8, color: "var(--gold)" }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 7vw, 52px)",
                  fontWeight: 300, letterSpacing: "2px",
                  color: "var(--cream)", textDecoration: "none",
                  padding: "10px 0",
                  transition: "color 0.3s",
                }}
              >
                {link.label}
              </Motion.a>
            ))}

            <Motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                width: "60px", height: "1px",
                background: "var(--gold)",
                margin: "16px 0",
              }}
            />

            <Motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: 16 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 36px",
                background: "#25D366",
                color: "white",
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px", letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                marginTop: "8px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Sipariş Ver
            </Motion.a>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Inline styles for responsive ───────────────────── */}
      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile   { display: none; }
        .nav-link-item:hover { color: var(--gold) !important; }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}