export default function Logo({ size = 48, light = false }) {
  const textColor = light ? "#FFFDF9" : "#1C1410";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Litros Cake House Logo"
    >
      {/* ── Dış dekoratif çember ── */}
      <circle cx="60" cy="60" r="57" stroke="#C9A96E" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="60" r="52" stroke="#C9A96E" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 5" />

      {/* ── PASTA ALT KATMAN (en geniş) ── */}
      <rect x="22" y="74" width="76" height="18" rx="4" fill="#C97B4B" />
      <rect x="22" y="74" width="76" height="6"  rx="4" fill="#E8956A" />
      {/* Şerit detay */}
      <rect x="22" y="83" width="76" height="2" fill="#A85D30" opacity="0.4" />

      {/* ── PASTA ORTA KATMAN ── */}
      <rect x="30" y="57" width="60" height="19" rx="4" fill="#D4886A" />
      <rect x="30" y="57" width="60" height="6"  rx="4" fill="#EDA688" />
      <rect x="30" y="67" width="60" height="2"  fill="#B8694A" opacity="0.35" />

      {/* ── PASTA ÜST KATMAN ── */}
      <rect x="38" y="43" width="44" height="16" rx="4" fill="#C97B4B" />
      <rect x="38" y="43" width="44" height="5"  rx="4" fill="#E8956A" />

      {/* ── BEYAZ KREMA DALGASI — üst katman üstü ── */}
      <path
        d="M38 43 Q42.5 36 47 43 Q51.5 36 56 43 Q60.5 36 65 43 Q69.5 36 74 43 Q78.5 36 82 43"
        stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"
      />
      <path
        d="M38 43 Q42.5 36 47 43 Q51.5 36 56 43 Q60.5 36 65 43 Q69.5 36 74 43 Q78.5 36 82 43"
        stroke="#FFF5EE" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"
      />

      {/* ── BEYAZ KREMA DALGASI — orta katman üstü ── */}
      <path
        d="M30 57 Q34.5 50 39 57 Q43.5 50 48 57 Q52.5 50 57 57 Q61.5 50 66 57 Q70.5 50 75 57 Q79.5 50 84 57 Q87 50 90 57"
        stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />

      {/* ── BEYAZ KREMA DALGASI — alt katman üstü ── */}
      <path
        d="M22 74 Q27 67 32 74 Q37 67 42 74 Q47 67 52 74 Q57 67 62 74 Q67 67 72 74 Q77 67 82 74 Q87 67 92 74 Q96 67 98 74"
        stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />

      {/* ── Pasta üzeri dekor (çilek & top) ── */}
      <circle cx="52" cy="40" r="3.5" fill="#E8354A" />
      <circle cx="52" cy="40" r="1.5" fill="#FF6B7A" opacity="0.7" />
      <circle cx="68" cy="40" r="3.5" fill="#E8354A" />
      <circle cx="68" cy="40" r="1.5" fill="#FF6B7A" opacity="0.7" />
      <circle cx="60" cy="38" r="2.5" fill="#C9A96E" />

      {/* ── Mum gövdesi ── */}
      <rect x="57.5" y="25" width="5" height="14" rx="1.5" fill="#F0E0C8" />
      <rect x="59"   y="25" width="2" height="14" rx="1"   fill="white" opacity="0.4" />

      {/* ── Alev ── */}
      <ellipse cx="60" cy="22" rx="3.2" ry="4.5" fill="#FFAA00" />
      <ellipse cx="60" cy="23" rx="1.8" ry="3"   fill="#FFD700" opacity="0.9" />
      <ellipse cx="60" cy="21" rx="1"   ry="1.8" fill="white"   opacity="0.8" />
      {/* Alev parıltısı */}
      <ellipse cx="60" cy="22" rx="6" ry="7" fill="#FFAA00" opacity="0.08" />

      {/* ── Köşe yıldızları ── */}
      <text x="15" y="38" fontSize="7" fill="#C9A96E" opacity="0.7" fontFamily="serif">✦</text>
      <text x="98" y="38" fontSize="7" fill="#C9A96E" opacity="0.7" fontFamily="serif">✦</text>
    </svg>
  );
}