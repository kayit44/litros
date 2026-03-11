import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";

export default function About() {
  const sectionRef  = useRef(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-100px" });
  const leftRef     = useRef(null);
  const leftInView  = useInView(leftRef,  { once: true, margin: "-80px" });
  const rightRef    = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  return (
    <section
      id="hakkimda"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif arka plan yazı */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          position: "absolute",
          top: "50%", right: "-60px",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(80px, 12vw, 160px)",
          fontWeight: 400,
          color: "rgba(180,80,100,0.06)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "10px",
        }}
      >
        LITROS
      </Motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(48px, 8vw, 100px)",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>

        {/* Sol: Görsel */}
        <Motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -60 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "relative" }}
        >
          <div style={{ overflow: "hidden", aspectRatio: "3/4", maxWidth: "420px" }}>
            <Motion.img
               src="/images/img1.png"
              alt="Pasta yapım süreci"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={leftInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
            style={{
              position: "absolute", bottom: "-32px", right: "-32px",
              width: "55%", aspectRatio: "1", overflow: "hidden",
              border: "6px solid var(--cream)",
              boxShadow: "0 20px 60px rgba(28,20,16,0.15)",
            }}
          >
            <Motion.img
              src="/images/smash-cake.jpg"
              alt="Butik pasta detay"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6 }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={leftInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "backOut" }}
            style={{
              position: "absolute", top: "32px", left: "-20px",
              background: "var(--dark)", padding: "20px 24px",
              textAlign: "center",
              boxShadow: "0 16px 48px rgba(28,20,16,0.25)",
            }}
          >
            <Motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "40px", fontWeight: 500, color: "var(--gold)", lineHeight: 1,
              }}>5+</div>
              <div style={{
                fontFamily: "'Jost', sans-serif", fontSize: "13px",
                letterSpacing: "1px", textTransform: "uppercase",
                color: "var(--gold-light)", marginTop: "6px",
              }}>Yıllık Tecrübe</div>
            </Motion.div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              position: "absolute", bottom: "32px", left: "16px",
              background: "var(--white)", padding: "14px 20px",
              borderLeft: "3px solid var(--gold)",
              boxShadow: "0 12px 40px rgba(28,20,16,0.1)",
              display: "flex", alignItems: "center", gap: "12px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🌿</span>
            <div>
              <div style={{
                fontFamily: "'Jost', sans-serif", fontSize: "14px",
                fontWeight: 500, color: "var(--dark)", letterSpacing: "0.3px",
              }}>Doğal Malzeme</div>
              <div style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                letterSpacing: "1px", textTransform: "uppercase",
                color: "var(--brown)", marginTop: "2px",
              }}>Katkısız · Taze · Özenli</div>
            </div>
          </Motion.div>
        </Motion.div>

        {/* Sağ: İçerik */}
        <Motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ paddingLeft: "clamp(0px, 2vw, 24px)" }}
        >
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-eyebrow"
          >
            Hakkımda
          </Motion.p>

          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 500, lineHeight: 1.2,
              color: "var(--dark)", marginBottom: "24px",
            }}
          >
            Pastacılık Bir{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Tutku,</em>
            <br />Her Pasta Bir Hikâye
          </Motion.h2>

          {[
            "Merhaba! Ben Litros Cake House'un kurucusuyum. Yıllardır mutfağımda hayaller kuruyorum ve bu hayalleri sizin için gerçeğe dönüştürüyorum.",
            "Her pasta; kullandığım malzemenin kalitesiyle, ellerimin emeğiyle ve sizin için hissettiğim sorumlulukla şekilleniyor. Doğum günleri, düğünler, nişanlar… Hayatınızın en güzel anlarına ortak olmak benim için büyük bir onur.",
            "Sipariş sürecinde sizinle birebir iletişim kuruyorum. Renginizden tasarımınıza, katından lezzetine kadar her detayı birlikte belirliyoruz.",
          ].map((text, i) => (
            <Motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              style={{
                fontFamily: "'Jost', sans-serif", fontSize: "15px",
                lineHeight: 1.85, color: "var(--dark)",
                fontWeight: 400, marginBottom: "16px", letterSpacing: "0.2px",
              }}
            >
              {text}
            </Motion.p>
          ))}

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "16px", margin: "32px 0",
              paddingTop: "28px", borderTop: "1px solid var(--gold-light)",
            }}
          >
            {["Özel Tasarım", "Taze Malzeme", "Zamanında Teslimat", "Kişiye Özel"].map((label, i) => (
              <Motion.div
                key={i}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontFamily: "'Jost', sans-serif", fontSize: "14px",
                  letterSpacing: "0.5px", color: "var(--dark)", fontWeight: 500,
                }}
              >
                <span style={{ color: "var(--gold)", fontSize: "10px", flexShrink: 0 }}>✦</span>
                {label}
              </Motion.div>
            ))}
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "32px", fontStyle: "italic",
              fontWeight: 500, color: "var(--dark)", lineHeight: 1,
            }}>
              Litros Cake House
            </div>
            <div style={{
              fontFamily: "'Jost', sans-serif", fontSize: "12px",
              letterSpacing: "2px", textTransform: "uppercase",
              color: "var(--gold)", marginTop: "6px", fontWeight: 500,
            }}>
              El Yapımı Butik Pastalar
            </div>
          </Motion.div>
        </Motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hakkimda > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}