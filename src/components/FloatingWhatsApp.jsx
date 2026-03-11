import { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const WA_NUMBER  = "905324224244";
const WA_MESSAGE = "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function FloatingWhatsApp() {
  const [visible,   setVisible]   = useState(false);
  const [tooltip,   setTooltip]   = useState(false);
  const [bubble,    setBubble]    = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dismissTimer = useRef(null);

  // 300px scroll sonra butonu göster
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Footer'a gelince balonu aç
  useEffect(() => {
    const onScroll = () => {
      const footer = document.getElementById("iletisim");
      if (!footer || bubble || dismissed) return;
      const rect = footer.getBoundingClientRect();
      if (rect.top <= window.innerHeight) setBubble(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [bubble, dismissed]);

  // 7 saniye sonra balonu kapat
  useEffect(() => {
    if (!bubble) return;
    const timer = setTimeout(() => setBubble(false), 7000);
    return () => clearTimeout(timer);
  }, [bubble]);

  const handleDismiss = () => {
    setBubble(false);
    setDismissed(true);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => {
      setDismissed(false);
      setBubble(true);
    }, 3 * 60 * 1000); // 3 dakika
  };

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{   opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            position: "fixed",
            bottom: "32px", right: "32px",
            zIndex: 9000,
            display: "flex", flexDirection: "column",
            alignItems: "flex-end", gap: "12px",
          }}
        >
          {/* ── Konuşma balonu ─────────────────────────────── */}
          <AnimatePresence>
            {bubble && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1,   x: 0  }}
                exit={{   opacity: 0, scale: 0.8, x: 20  }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{
                  background: "var(--white)",
                  padding: "16px 20px",
                  boxShadow: "0 8px 40px rgba(28,20,16,0.15)",
                  maxWidth: "240px",
                  position: "relative",
                  borderRadius: "2px",
                }}
              >
                {/* Kapatma */}
                <button
                  onClick={handleDismiss}
                  style={{
                    position: "absolute", top: "8px", right: "10px",
                    background: "none", border: "none",
                    color: "var(--brown-light)", cursor: "pointer",
                    fontSize: "16px", lineHeight: 1, padding: "2px",
                  }}
                >×</button>

                {/* Profil */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", flexShrink: 0,
                  }}>🎂</div>
                  <div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 500, color: "var(--dark)" }}>
                      Litros Cake House
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#25D366" }}>
                      <Motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#25D366", display: "inline-block" }}
                      />
                      Çevrimiçi
                    </div>
                  </div>
                </div>

                {/* Mesaj */}
                <div style={{ background: "var(--cream)", padding: "10px 14px", borderRadius: "0 8px 8px 8px", marginBottom: "10px" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", lineHeight: 1.6, color: "var(--text)", fontWeight: 400 }}>
                    Merhaba! 👋 Hayalinizdeki pastayı birlikte tasarlayalım. Size nasıl yardımcı olabilirim?
                  </p>
                </div>

                <Motion.a
                  href={WA_URL} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    padding: "10px 16px", background: "#25D366", color: "white",
                    fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "1.5px",
                    textTransform: "uppercase", fontWeight: 500, textDecoration: "none", width: "100%",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Sohbet Başlat
                </Motion.a>

                <div style={{
                  position: "absolute", bottom: "-8px", right: "28px",
                  width: 0, height: 0,
                  borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                  borderTop: "8px solid var(--white)",
                }} />
              </Motion.div>
            )}
          </AnimatePresence>

          {/* ── Ana WhatsApp Butonu ─────────────────────────── */}
          <div style={{ position: "relative" }}>
            {[1, 2].map((i) => (
              <Motion.div
                key={i}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.6, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", zIndex: -1 }}
              />
            ))}

            <Motion.a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              onHoverStart={() => setTooltip(true)}
              onHoverEnd={() => setTooltip(false)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 300 },
              }}
              style={{
                width: "60px", height: "60px", borderRadius: "50%",
                background: "#25D366",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
                position: "relative", zIndex: 1,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </Motion.a>

            <AnimatePresence>
              {tooltip && (
                <Motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0,  scale: 1   }}
                  exit={{   opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute", right: "72px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "var(--dark)", color: "var(--cream)",
                    padding: "8px 14px",
                    fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "1px",
                    whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(28,20,16,0.2)",
                  }}
                >
                  Sipariş ver
                  <div style={{
                    position: "absolute", right: "-6px", top: "50%",
                    transform: "translateY(-50%)",
                    width: 0, height: 0,
                    borderTop: "6px solid transparent", borderBottom: "6px solid transparent",
                    borderLeft: "6px solid var(--dark)",
                  }} />
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}