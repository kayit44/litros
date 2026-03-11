import { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";

const WA_NUMBER = "905324224244";
const WA_MESSAGE = "Merhaba, pasta siparişi hakkında bilgi almak istiyorum.";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const steps = [
  {
    number: "01",
    icon: "💬",
    title: "Bize Ulaşın",
    description:
      "WhatsApp üzerinden bizimle iletişime geçin. Hayalinizdeki pastayı anlatın; tema, renk, kişi sayısı ve tarih bilgilerini paylaşın.",
  },
  {
    number: "02",
    icon: "✏️",
    title: "Tasarım Belirlenir",
    description:
      "Sizinle birebir görüşerek pastanızın tasarımını oluştururuz. İsteklerinize göre özel konsept ve sunum seçenekleri sunulur.",
  },
  {
    number: "03",
    icon: "🎂",
    title: "Özenle Hazırlanır",
    description:
      "Pastanız en taze malzemelerle, el yapımı tekniklerle özenle hazırlanır. Her detay titizlikle işlenir.",
  },
  {
    number: "04",
    icon: "🎁",
    title: "Teslim Edilir",
    description:
      "Belirlenen tarih ve saatte pastanız soğuk zincir korunarak güvenle teslim edilir. Özel günününüz kutlu olsun!",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="nasil-calisir"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)",
        background: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* ── Başlık ─────────────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          marginBottom: "80px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          className="section-eyebrow"
          style={{ justifyContent: "center", color: "var(--gold)" }}
        >
          Sipariş Süreci
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--cream)",
            marginBottom: "16px",
          }}
        >
          Nasıl{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            Çalışır?
          </em>
        </h2>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            color: "rgba(232,213,176,0.85)",
            fontWeight: 300,
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Sipariş vermek çok kolay. Sadece 4 adımda hayalinizdeki pasta hazır!
        </p>

        <Motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            width: "60px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
            margin: "24px auto 0",
          }}
        />
      </Motion.div>

      {/* ── Adımlar ────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(24px, 4vw, 40px)",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Bağlantı çizgisi (sadece desktop) */}
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "48px",
            left: "12%",
            right: "12%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, var(--gold-dark), var(--gold), var(--gold-dark), transparent)",
            transformOrigin: "left",
            zIndex: 0,
          }}
          className="steps-line"
        />

        {steps.map((step, i) => (
          <Motion.div
            key={step.number}
            initial={{ opacity: 0, y: 48 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -8 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "40px 28px",
              background: "rgba(255,253,249,0.03)",
              border: "1px solid rgba(201,169,110,0.12)",
              position: "relative",
              zIndex: 1,
              transition: "border-color 0.3s, background 0.3s",
              cursor: "default",
            }}
            onHoverStart={(e) => {
              e.target.style &&
                (e.target.style.borderColor = "rgba(201,169,110,0.35)");
            }}
            onHoverEnd={(e) => {
              e.target.style &&
                (e.target.style.borderColor = "rgba(201,169,110,0.12)");
            }}
          >
            {/* Numara */}
            <Motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.15,
                ease: "backOut",
              }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "1px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                background: "rgba(201,169,110,0.08)",
                position: "relative",
              }}
            >
              {/* Dönen halka animasyonu */}
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "50%",
                  border: "1px dashed rgba(201,169,110,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 300,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>
            </Motion.div>

            {/* İkon */}
            <Motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3 + i * 0.5,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              style={{ fontSize: "32px", marginBottom: "16px" }}
            >
              {step.icon}
            </Motion.div>

            {/* Başlık */}
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 400,
                color: "var(--cream)",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>

            {/* Açıklama */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                color: "rgba(232,213,176,0.85)",

                fontWeight: 300,
              }}
            >
              {step.description}
            </p>
          </Motion.div>
        ))}
      </div>

      {/* ── Alt CTA ────────────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          textAlign: "center",
          marginTop: "72px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(232,213,176,0.4)",
            marginBottom: "24px",
          }}
        >
          Hemen başlayalım
        </p>

        <Motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 12px 40px rgba(37,211,102,0.3)",
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 48px",
            background: "#25D366",
            color: "white",
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            fontWeight: 500,
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(37,211,102,0.2)",
          }}
        >
          <Motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Motion.span>
          WhatsApp ile Sipariş Ver
        </Motion.a>

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            color: "rgba(232,213,176,0.3)",
            marginTop: "16px",
            fontWeight: 300,
            letterSpacing: "0.5px",
          }}
        >
          Genellikle birkaç dakika içinde yanıt veriyoruz.
        </p>
      </Motion.div>

      <style>{`
        @media (max-width: 768px) {
          .steps-line { display: none; }
        }
      `}</style>
    </section>
  );
}
