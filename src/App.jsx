import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import Gallery          from "./components/Gallery";
import About            from "./components/About";
import HowItWorks       from "./components/HowItWorks";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer           from "./components/Footer";
import Dashboard        from "./pages/admin/Dashboard";
import Login            from "./pages/admin/Login";
import CakeDetail       from "./pages/CakeDetail";
import { supabase }     from "./lib/supabase";

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--cream)", fontFamily: "'Jost', sans-serif",
      fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)",
    }}>
      Yükleniyor...
    </div>
  );
}

function Loader({ onComplete }) {
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={{
        position: "fixed", inset: 0,
        background: "#2A1A1F",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginBottom: "32px" }}
      >
        <img src="/images/logo.png" alt="Litros Cake House"
          style={{ height: "100px", width: "auto" }} />
      </Motion.div>

      <div style={{
        width: "160px", height: "1px",
        background: "rgba(201,169,110,0.15)",
        position: "relative", overflow: "hidden",
      }}>
        <Motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          onAnimationComplete={onComplete}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent, var(--gold), var(--gold-light))",
          }}
        />
      </div>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "9px", letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.5)",
          marginTop: "16px",
        }}
      >
        El yapımı · özel tasarım
      </Motion.p>
    </Motion.div>
  );
}

function HomePage() {
  const isReturn = !!sessionStorage.getItem('galleryScrollPending');
  const [loading, setLoading] = useState(!isReturn);

  useEffect(() => {
    document.title = "Litros Cake House · El Yapımı Butik Pastalar";
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Gallery />
            <About />
            <HowItWorks />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </Motion.div>
      )}
    </>
  );
}

// ── Admin rotası: session yoksa /admin/giris'e yönlendir ─────
function AdminRoute() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); };

  if (session === undefined) return <LoadingScreen />;
  if (!session) return <Navigate to="/admin/giris" replace />;
  return <Dashboard onLogout={handleLogout} />;
}

// ── Giriş rotası: zaten giriş yapıldıysa /admin'e yönlendir ─
function AdminLoginRoute() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) return <LoadingScreen />;
  if (session) return <Navigate to="/admin" replace />;
  return <Login onLogin={() => {}} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/admin"       element={<AdminRoute />} />
        <Route path="/admin/giris" element={<AdminLoginRoute />} />
        <Route path="/pasta/:id"   element={<CakeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
