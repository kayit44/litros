// ─────────────────────────────────────────────────────────────
//  Litros Cake House — Pasta Verileri
//  Kendi fotoğraflarını eklemek istediğinde:
//  1. Fotoğrafı /public/images/ klasörüne koy
//  2. image alanını "/images/pasta-adi.jpg" olarak değiştir
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: "hepsi",      label: "Hepsi" },
  { id: "dogum-gunu", label: "Doğum Günü" },
  { id: "dugun",      label: "Düğün" },
  { id: "nisan",      label: "Nişan & Söz" },
  { id: "ozel",       label: "Özel Tasarım" },
  { id: "butik",      label: "Butik & Mini" },
];

export const cakes = [
  // ── Doğum Günü ──────────────────────────────────────────────
  {
    id: 1,
    title: "Velvet Rose",
    subtitle: "Doğum Günü Pastası",
    category: "dogum-gunu",
    
    description: "Kırmızı kadife iç, krem şanti kaplama ve el yapımı gül dekorasyonu.",
    tags: ["Çikolata", "Gül Dekoru", "2–4 Kişilik"],
    featured: false,
  },
  {
    id: 2,
    title: "Golden Celebration",
    subtitle: "Doğum Günü Pastası",
    category: "dogum-gunu",
   
    description: "Altın varak detaylı, çikolata ganaj kaplı özel doğum günü pastası.",
    tags: ["Ganaj", "Altın Varak", "4–6 Kişilik"],
    featured: false,
  },
  {
    id: 3,
    title: "Pastel Dream",
    subtitle: "Doğum Günü Pastası",
    category: "dogum-gunu",
   
    description: "Soft pastel tonlar, el yapımı çiçek detayları ve vanilyalı krem.",
    tags: ["Vanilyalı", "Çiçek Dekoru", "6–8 Kişilik"],
    featured: false,
  },
  {
    id: 13,
    title: "Birthday Event",
    subtitle: "Doğum Günü Pastası",
    category: "dogum-gunu",
   
    description: "Soft pastel tonlar, el yapımı çiçek detayları ve vanilyalı krem.",
    tags: ["Şeker", "Ganaj", "6–8 Kişilik"],
    featured: true,
  },

 

  // ── Düğün ────────────────────────────────────────────────────
  {
    id: 4,
    title: "Ivory Elegance",
    subtitle: "Düğün Pastası",
    category: "dugun",
  
    description: "Üç katlı, fildişi fondant kaplama, el yapımı şeker çiçekleri.",
    tags: ["Fondant", "Şeker Çiçek", "30–50 Kişilik"],
    featured: true,
  },
  {
    id: 5,
    title: "White Garden",
    subtitle: "Düğün Pastası",
    category: "dugun",
  
    description: "Beyaz orkide ve yeşilliklerle süslenmiş, modern minimalist düğün pastası.",
    tags: ["Orkide", "Minimalist", "20–40 Kişilik"],
    featured: false,
  },
  {
    id: 6,
    title: "Rustic Romance",
    subtitle: "Düğün Pastası",
    category: "dugun",
   
    description: "Naked cake esintisi, taze mevsim çiçekleri ve ahududulu krem.",
    tags: ["Naked Cake", "Taze Çiçek", "20–30 Kişilik"],
    featured: true,
  },

  // ── Nişan & Söz ─────────────────────────────────────────────
  {
    id: 7,
    title: "Blush Proposal",
    subtitle: "Nişan Pastası",
    category: "nisan",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85",
    description: "Pudra pembesi, altın detaylı, macaronlu özel nişan pastası.",
    tags: ["Pudra Pembe", "Macaron", "10–15 Kişilik"],
    featured: true,
  },
  {
    id: 8,
    title: "Rose Gold",
    subtitle: "Söz Pastası",
    category: "nisan",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=85",
    description: "Rose gold ayna glaze kaplama, çilek ve frambuaz garnisi.",
    tags: ["Mirror Glaze", "Çilek", "8–12 Kişilik"],
    featured: false,
  },

  // ── Özel Tasarım ─────────────────────────────────────────────
  {
    id: 9,
    title: "Sculpted Art",
    subtitle: "Özel Tasarım",
    category: "ozel",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=85",
    description: "Tamamen özelleştirilmiş, heykel tekniğiyle şekillendirilmiş sanat pastası.",
    tags: ["Sculptured", "Tam Özel", "Sipariş Üzerine"],
    featured: true,
  },
  {
    id: 10,
    title: "Fantasy Forest",
    subtitle: "Özel Tasarım",
    category: "ozel",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=85",
    description: "Orman temalı, moss cake tekniği, mantar ve yaprak detayları.",
    tags: ["Moss Cake", "Doğa Teması", "Sipariş Üzerine"],
    featured: false,
  },

  // ── Butik & Mini ─────────────────────────────────────────────
  {
    id: 11,
    title: "Petit Luxe",
    subtitle: "Mini Butik Pasta",
    category: "butik",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=85",
    description: "Kişiye özel mini pasta koleksiyonu, 4'lü set. Hediye kutusuyla.",
    tags: ["Mini Set", "Hediye Kutusu", "4'lü"],
    featured: false,
  },
  {
    id: 12,
    title: "Smash Cake",
    subtitle: "1. Yaş Pastası",
    category: "butik",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=85",
    description: "Bebek için tamamen doğal malzeme, şekersiz smash cake.",
    tags: ["Şekersiz", "1. Yaş", "Doğal"],
    featured: false,
  },
];

// Öne çıkan pastalar (Hero ve Featured bölümü için)
export const featuredCakes = cakes.filter(cake => cake.featured);

// Kategoriye göre filtrele
export const getCakesByCategory = (categoryId) => {
  if (categoryId === "hepsi") return cakes;
  return cakes.filter(cake => cake.category === categoryId);
};