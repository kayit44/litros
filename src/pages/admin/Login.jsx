import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-posta veya şifre hatalı.");
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <Motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%", maxWidth: "400px",
          background: "var(--white)",
          padding: "48px 40px",
          boxShadow: "0 20px 60px rgba(42,26,31,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <img src="/images/logo.png" alt="Litros Cake House"
            style={{ height: "80px", width: "auto", margin: "0 auto" }} />
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "10px", letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--gold)",
            marginTop: "12px",
          }}>
            Admin Paneli
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>E-posta</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@litrascakehouse.com"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "var(--gold)"}
              onBlur={e  => e.target.style.borderColor = "var(--gold-light)"}
            />
          </div>
          <div>
            <label style={labelStyle}>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "var(--gold)"}
              onBlur={e  => e.target.style.borderColor = "var(--gold-light)"}
            />
          </div>

          {error && (
            <Motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{
                fontFamily: "'Jost', sans-serif", fontSize: "12px",
                color: "#E8354A", textAlign: "center",
              }}
            >
              {error}
            </Motion.p>
          )}

          <Motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "15px",
              background: loading ? "var(--brown)" : "#2A1A1F",
              color: "var(--cream)",
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px", letterSpacing: "2.5px",
              textTransform: "uppercase", fontWeight: 500,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.3s",
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Motion.button>
        </div>
      </Motion.div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontFamily: "'Jost', sans-serif",
  fontSize: "10px", letterSpacing: "2px",
  textTransform: "uppercase", color: "var(--brown)",
  marginBottom: "8px", fontWeight: 500,
};

const inputStyle = {
  width: "100%", padding: "12px 14px",
  fontFamily: "'Jost', sans-serif", fontSize: "13px",
  color: "var(--dark)", background: "var(--cream)",
  border: "1px solid var(--gold-light)",
  outline: "none", transition: "border-color 0.3s",
  borderRadius: "2px",
};