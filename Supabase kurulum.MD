# Supabase Kurulum Adımları

## 1. Proje Oluştur
- supabase.com → New Project → isim ver → şifre belirle

## 2. Veritabanı Tablosu Oluştur
Supabase → SQL Editor → New Query → şunu yapıştır ve çalıştır:

```sql
create table cakes (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamp with time zone default now(),
  title       text not null,
  subtitle    text,
  category    text not null,
  description text,
  tags        text[],
  image       text not null,
  featured    boolean default false
);

-- Herkese okuma izni ver (site görselleri görebilsin)
alter table cakes enable row level security;

create policy "Herkes okuyabilir"
  on cakes for select using (true);

create policy "Sadece giriş yapan yazabilir"
  on cakes for all using (auth.role() = 'authenticated');
```

## 3. Storage Bucket Oluştur
Supabase → Storage → New Bucket
- Name: cake-images
- Public bucket: ✅ (açık)

## 4. Storage Policy Ekle
Storage → cake-images → Policies → New Policy:
- Authenticated users can upload: INSERT için auth.role() = 'authenticated'
- Everyone can view: SELECT için true

## 5. Admin Kullanıcısı Oluştur
Supabase → Authentication → Users → Invite User
- E-posta ve şifre gir

## 6. API Key'leri Al
Supabase → Settings → API
- Project URL → src/lib/supabase.js içine yapıştır
- anon public key → src/lib/supabase.js içine yapıştır

## 7. Gallery.jsx'i Güncelle
Gallery.jsx içindeki cakes.js'den gelen static veriyi
Supabase'den çeken dinamik veriye geçirmek için
Gallery.jsx içine şunu ekle (dosyanın üstüne):

```js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
```

Ve component içinde:
```js
const [cakes, setCakes] = useState([]);
useEffect(() => {
  supabase.from("cakes").select("*").then(({ data }) => setCakes(data || []));
}, []);
```