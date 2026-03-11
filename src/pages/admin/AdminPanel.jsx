import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Login     from "./Login";
import Dashboard from "./Dashboard";

export default function AdminPanel() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (checking) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--cream)", fontFamily: "'Jost', sans-serif",
      fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)",
    }}>
      Yükleniyor...
    </div>
  );

  return session
    ? <Dashboard onLogout={handleLogout} />
    : <Login onLogin={() => {}} />;
}