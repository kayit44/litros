import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import Gallery          from "./components/Gallery";
import About            from "./components/About";
import HowItWorks       from "./components/HowItWorks";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer           from "./components/Footer";
import AdminPanel       from "./pages/admin/AdminPanel";
import CakeDetail       from "./pages/CakeDetail";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<HomePage />} />
        <Route path="/admin"        element={<AdminPanel />} />
        <Route path="/pasta/:id"   element={<CakeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}