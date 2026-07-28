# ============================================================
# AVUKAT EREN OKTAY HUKUK BÜROSU — AI GELİŞTİRME KURALLARI
# Tüm AI kod editörleri (Antigravity, Cursor, Windsurf vb.)
# bu kuralları harfiyen uygular.
# ============================================================

## 1. MİMARİ PRENSİPLER

### Framework & Yapı
- Framework: Next.js 14 App Router — Pages Router YASAK
- TypeScript strict mode zorunlu — `any` tipi KESİNLİKLE YASAK
- `unknown` ve type guard'lar tercih edilir
- Dosya/klasör isimleri: kebab-case zorunlu
- Bileşen isimleri: PascalCase zorunlu
- Hook isimleri: camelCase, `use` prefix zorunlu
- Sabitler: UPPER_SNAKE_CASE zorunlu
- Maksimum dosya uzunluğu: 150 satır — aşılırsa böl
- Her klasörde barrel export (index.ts) kullanılır

### React Server Components (RSC) — KRİTİK
- TÜM bileşenler varsayılan olarak Server Component'tir
- `"use client"` direktifi SADECE zorunlu durumlarda kullanılır:
  - useState, useEffect, useRef gerektiren bileşenler
  - Tarayıcı API'larına erişen bileşenler
  - Event handler içeren leaf (yaprak) bileşenler
- Veri çekme işlemleri SADECE Server Component'lerde yapılır
- `"use client"` bileşenler bileşen ağacının EN UCUNDA olur
- Server Component içinde Client Component import edilebilir
- Client Component içinde Server Component import EDİLEMEZ

### Klasör Yapısı (Kesin)
```
src/
├── app/
│   ├── (marketing)/     # Anasayfa, Hakkımızda, SSS, İletişim, KVKK
│   ├── (admin)/         # Admin paneli — korumalı
│   └── (auth)/          # Giriş sayfası
├── components/
│   ├── ui/              # shadcn/ui bileşenleri — değiştirilmez
│   └── common/          # Header, Footer, WhatsApp butonu
├── features/            # Sayfa özelinde iş mantığı
├── lib/
│   ├── supabase/        # Browser ve server client
│   └── schemas/         # JSON-LD schema markup'ları (LegalService vb.)
├── services/            # DAL — TÜM veritabanı sorguları burada
├── hooks/               # Custom React hook'ları
├── constants/
│   ├── routes.ts        # Tüm URL'ler burada — magic string YASAK
│   └── site.ts          # Sistem sabitleri (SITE objesi)
├── types/               # TypeScript arayüzleri ve şemaları
├── styles/
│   └── fonts/           # .woff2 font dosyaları — Google CDN YASAK
└── emails/              # React Email şablonları
```

---

## 2. VERİTABANI & GÜVENLİK — KRİTİK

### Supabase Paketi
- ZORUNLU paket: `@supabase/ssr`
- `@supabase/auth-helpers-nextjs` KESİNLİKLE YASAK
- `@supabase/auth-helpers-react` KESİNLİKLE YASAK

### Çerez Yönetimi (Cookie Management)
```typescript
// DOĞRU — Her zaman bu pattern kullanılır
cookies: {
  getAll() { return cookieStore.getAll() },
  setAll(cookiesToSet) {
    cookiesToSet.forEach(({ name, value, options }) =>
      cookieStore.set(name, value, options)
    )
  }
}
// YANLIŞ — Bu metodlar KESİNLİKLE YASAK
// get(), set(), remove() — YASAK
```

### Kimlik Doğrulama
- Oturum kontrolünde SADECE `getUser()` kullanılır
- `getSession()` güvenlik riski nedeniyle YASAK
- Her Server Action içinde `getUser()` ile yeniden doğrulama zorunlu
- Service Role Key sadece sunucu tarafında — istemciye ASLA sızdırılmaz
- `NEXT_PUBLIC_` prefix'i sadece gerçekten public olan değerlerde kullanılır

### Row Level Security (RLS)
- Her yeni tablo için RLS ZORUNLU olarak aktif edilir
- "Deny by default" prensibi — politika yoksa erişim YOKTUR
- RLS kontrolü: `auth.uid()` UUID kullanılır — email kontrolü YASAK
- Sık sorgulanan sütunlar için indeks zorunlu:
  - user_id, created_at, is_published, slug, is_archived
- Önbellekleme için: `(SELECT auth.uid())` syntax'ı kullanılır

### Data Access Layer (DAL) — KESİN KURAL
- Tüm veritabanı sorguları `src/services/` klasöründe
- Bileşen içinde DOĞRUDAN Supabase sorgusu KESİNLİKLE YASAK
- React `cache()` fonksiyonu tüm DAL fonksiyonlarında zorunlu:
```typescript
// src/services/articles.ts
import { cache } from 'react'
export const getArticles = cache(async () => {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, created_at')
    .eq('is_published', true)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
})
```
- DTO prensibi: sadece gerekli sütunlar `select()` ile çekilir — `select('*')` YASAK

### Veritabanı Tabloları (Zorunlu Sütunlar)
Her tabloda şu sütunlar ZORUNLUDUR:
- `id` (uuid, primary key, default: gen_random_uuid())
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())
- `is_archived` (boolean, default: false) — TBB kural değişikliklerinde silme yerine arşivleme

Tablo listesi (güncel — mesaj/randevu sistemi kaldırıldı, bkz. madde 9):
- `slides` — hero slider görselleri
- `posts` — haberler/duyurular
- `articles` — pratik bilgiler/blog
- `faq` — sıkça sorulan sorular

Ayrıca `media` storage bucket'ı (kapak görselleri için) kullanılır.

Veritabanında bir de `profiles` tablosu var (RLS'i açık, `auth.uid()` ile
kendi satırına erişim politikaları tanımlı) ama uygulama kodunun hiçbir
yerinde sorgulanmıyor — admin girişi doğrudan Supabase Auth (`auth.users`)
üzerinden yürüyor. 2026-07-28 itibarıyla kullanılmayan/yetim bir tablo;
silinmedi çünkü bu kasıtlı bir karar gerektiriyor (bkz. proje notları).

### Middleware
```typescript
// middleware.ts — Edge Runtime'da çalışır
// SADECE /admin/* rotaları korunur
// getUser() ile doğrulama yapılır
// Yetkisiz erişimde /login'e yönlendirilir
export const config = {
  matcher: ['/admin/:path*']
}
```

---

## 3. KOD KALİTESİ & TYPESCRİPT

### TypeScript Kuralları
- `strict: true` — zorunlu, kapatılamaz
- `any` tipi — KESİNLİKLE YASAK
- `unknown` ve type guard'lar kullanılır
- Her fonksiyon parametresi ve dönüş tipi tanımlanır
- Interface isimleri: PascalCase (I prefix'i kullanılmaz)
- Supabase CLI'dan üretilen tipler `types/supabase.ts`'de saklanır
- Veritabanı tipleri doğrudan kullanılmaz, projeye özel interface'lere map edilir

### Fonksiyon Yazımı
- Ok fonksiyonları (arrow functions) tercih edilir
- RORO deseni (Receive Object, Return Object) kullanılır
- Erken return (early return) ile iç içe if'lerden kaçınılır
- Fonksiyon uzunluğu max 30 satır — aşılırsa böl

### Form Validasyonu
- Tüm formlar Zod şeması ile validate edilir
- Validasyon hem istemci hem sunucu tarafında yapılır
- Server Action'larda input sanitasyonu zorunlu

### Hata Yönetimi
- Her route segmentinde `error.tsx` zorunlu
- Her route segmentinde `loading.tsx` zorunlu
- Kullanıcıya teknik hata mesajı gösterilmez — kurumsal dil kullanılır
- Console'a sadece geliştirme ortamında log atılır
- Kritik işlemler (mesaj gönderme, randevu oluşturma) try/catch ile sarılır

---

## 4. UI & TASARIM SİSTEMİ

### shadcn/ui Kuralları
- shadcn/ui bileşenleri önceliklidir
- Özel bileşenler için Radix UI primitifleri kullanılır
- shadcn/ui bileşen kodu `src/components/ui/` altında — dışarıdan değiştirilmez
- Yeni bileşen eklemek için: `npx shadcn@latest add [bileşen]`
- shadcn/ui v2 kullanılır — "latest" belirtilir
- **ZORUNLU**: shadcn `style: "default"` kullanılır.
- **YASAK**: `base-nova` ve `new-york` stilleri KESİNLİKLE YASAK.
- Her yeni UI kurulumunda `components.json` içindeki stilin "default" olduğu teyit edilir.

### Tailwind CSS Kuralları
- Mobile-first zorunlu — desktop-first YASAK
- Utility class sıralaması (zorunlu hiyerarşi):
  1. Layout: `flex`, `grid`, `absolute`, `relative`
  2. Box Model: `p-4`, `m-2`, `w-full`, `h-32`, `gap-4`
  3. Typography: `text-lg`, `font-bold`, `text-center`
  4. Visual: `bg-slate-50`, `border`, `rounded-md`, `shadow`
  5. Interaction: `hover:`, `focus:`, `active:`, `disabled:`
  6. Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- `prettier-plugin-tailwindcss` ile otomatik sıralama zorunlu
- Magic color değerleri YASAK — sadece tasarım sistemi token'ları
- Inline style YASAK — Tailwind sınıfları kullanılır
- **ZORUNLU**: `tailwind.config.ts` içindeki `content` dizisi şu klasörleri KESİNLİKLE içermelidir:
  - `./src/pages/**/*.{...}`
  - `./src/components/**/*.{...}`
  - `./src/app/**/*.{...}`
  - `./src/features/**/*.{...}`
  - `./src/lib/**/*.{...}`
  - `./src/hooks/**/*.{...}`

### Container Yapılandırması (Kesin)
```javascript
// tailwind.config.js — bu config değiştirilemez
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',
    sm: '2rem',
    lg: '4rem',
    xl: '5rem',
    '2xl': '6rem',
  },
  screens: { '2xl': '1400px' }
}
```

### Fluid Typography (Zorunlu)
```javascript
// tailwind.config.js
fontSize: {
  'fluid-h1': ['clamp(2rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1' }],
  'fluid-h2': ['clamp(1.5rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.2' }],
  'fluid-h3': ['clamp(1.25rem, 2vw + 0.5rem, 2rem)', { lineHeight: '1.3' }],
  'fluid-body': ['clamp(1rem, 0.5vw + 0.8rem, 1.25rem)', { lineHeight: '1.6' }],
}
```
- Statik font boyutları başlıklarda YASAK
- `max-w-prose` uzun metin bloklarında zorunlu (45-75 karakter satır uzunluğu)

### Renk Paleti (Kesin — Değiştirilemez)
- Primary: Lacivert (#1e3a5f veya muadili)
- Secondary: Beyaz (#ffffff)
- Accent: Altın (#c9a84c veya muadili)
- Metin: Koyu gri (#1a1a2e)
- Arka plan: Açık gri (#f8f9fa)
- CSS değişkenleri globals.css'de tanımlanır

### Fontlar
- Başlık: Playfair Display (serif)
- Gövde: Inter (sans-serif)
- ZORUNLU: `next/font/local` ile local .woff2 dosyaları
- Google Fonts CDN KESİNLİKLE YASAK (LCP etkisi)
- Font dosyaları: `src/styles/fonts/` klasöründe

---

## 5. RESPONSIVE TASARIM

### Breakpoint Sistemi
```
base  (0px):    Tek sütun, hamburger menü, max touch hedefi
sm    (640px):  2 sütunlu grid başlangıcı
md    (768px):  Kısmi navigasyon, sidebar gizli
lg    (1024px): Tam navigasyon, 3+ sütun düzeni
xl    (1280px): Tam genişlik, içerik yayılmaz
2xl   (1536px): Max 1400px — içerik yayılmaz
```

### Dokunma Hedefleri (Touch Targets)
- Tüm interaktif elementler minimum 44x44px — ZORUNLU
- Butonlarda `active:scale-95` zorunlu (mobil geri bildirim)
- Form input'larında `inputMode` ve `type` doğru tanımlanır:
  - Telefon: `inputMode="tel"`
  - Email: `type="email"`
  - Sayı: `inputMode="numeric"`

### Header & Navigasyon
- Header `layout.tsx` içinde tanımlanır — sayfa geçişlerinde re-render olmaz
- `sticky top-0 z-50` — her zaman görünür
- Mobilde (< lg): shadcn/ui `Sheet` bileşeni ile hamburger menü
- `aria-label` hamburger ikonu için zorunlu

### WhatsApp Butonu
- Konum: `fixed bottom-6 right-6 z-40`
- Şekil: Yuvarlak (rounded-full)
- Boyut: minimum 56x56px (mobil erişim)
- Tüm sayfalarda görünür
- Header z-50 ile çakışmaz (z-40)

### Admin Panel Sidebar
- Masaüstü (>= lg): Sabit, açık (256px)
- Tablet (md): Mini mod — sadece ikonlar
- Mobil (< md): shadcn/ui Sheet ile overlay panel

### Tablolar
- `overflow-x-auto` tablo içeren tüm wrapper'larda zorunlu
- Mobilde kart görünümüne dönüşen yapılar tercih edilir

---

## 6. PERFORMANS

### Görseller
- Tüm görseller `.webp` formatında — jpg/png YASAK
- `next/image` bileşeni zorunlu — `<img>` HTML etiketi YASAK
- `priority` prop SADECE şu durumlarda:
  - Hero slider'ın ilk görseli
  - Logo görseli
  - Above-the-fold'daki ilk büyük görsel
- `sizes` prop her `next/image`'da ZORUNLU:
```tsx
// Örnek — tam sayfa genişliği:
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```
- `alt` etiketi her görselde zorunlu (boş bırakılamaz)
- `object-cover` veya `object-contain` açıkça belirtilir

### Hero Slider (Embla Carousel)
- Slider yüksekliği: `vh` değil `aspect-ratio` ile tanımlanır
- İlk slide `priority` alır, diğerleri almaz
- Slider kütüphanesinin kendi lazy loading'i DEVRİ DIŞI bırakılır
- `dragFree` özelliği mobil için aktif edilir
- Geçiş hızı: yavaş ve kurumsal (400-600ms)

### JavaScript Optimizasyonu
- `dynamic import` büyük Client Component'ler için kullanılır
- Gereksiz `"use client"` KESİNLİKLE YASAK
- Üçüncü taraf scriptler `next/script` ile `lazyOnload` stratejisi
- Bundle size her fazın sonunda kontrol edilir

### Önbellekleme
- Her veri çekme fonksiyonu için uygun `revalidate` süresi
- Sık değişen veriler (mesajlar): `no-store`
- Az değişen veriler (SSS, hakkımızda): `revalidate: 3600`
- Hiç değişmeyenler (statik sayfalar): `revalidate: 86400`

---

## 7. SEO

### Metadata (Her Sayfa İçin Zorunlu)
```typescript
export const metadata: Metadata = {
  title: { template: '%s | Avukat Eren Oktay', default: 'Avukat Eren Oktay' },
  description: '...',
  metadataBase: new URL('https://erenokay.av.tr'),
  openGraph: { ... },
  robots: { index: true, follow: true }
}
```

### Schema Markup (JSON-LD)
- Tüm JSON-LD objeleri `src/lib/schemas/` klasöründe
- Zorunlu schema'lar:
  - `LegalService` — anasayfa
  - `Attorney` (Person) — hakkımızda
  - `FAQPage` — SSS sayfası
  - `BreadcrumbList` — tüm iç sayfalar
  - `Organization` — genel
- XSS koruması: `JSON.stringify(data).replace(/</g, '\\u003c')`

### Teknik SEO
- `sitemap.ts` — dinamik, otomatik oluşturulur
- `robots.ts` — /admin/* crawl'dan hariç tutulur
- Canonical URL her sayfada
- OpenGraph görseli her sayfa için (1200x630px, .webp)
- H1 her sayfada sadece bir tane
- H1 > H2 > H3 hiyerarşisi bozulmaz

---

## 8. TBB MEVZUAT UYUMU — KRİTİK

### Kesinlikle YASAK İfadeler
- "en iyi avukat", "en başarılı", "Türkiye'nin en iyi..."
- "garantili sonuç", "kesin kazanırız", "başarı garantisi"
- Müvekkil referansları ve başarı hikayeleri
- Kazanılan dava istatistikleri ve başarı oranları
- Google Ads veya ücretli reklam yönlendirmeleri
- Diğer avukatlarla karşılaştırma

### Blog / Pratik Bilgiler İçerikleri
- İçerik SADECE bilgilendirme amaçlı olur
- Makale sonunda "Bize ulaşın, çözelim" tarzı CTA YASAK
- Kabul edilebilir CTA: "Daha fazla bilgi için iletişim sayfamızı ziyaret edebilirsiniz"
- İçerik dili: akademik, nesnel, bilgilendirici

### İzin Verilen İçerikler
- Avukatlık unvanı ve akademik unvanlar
- Baro sicil numarası
- Mezuniyet bilgileri
- İletişim bilgileri
- Hukuki makaleler ve mevzuat açıklamaları
- Uzmanlık alanları (bilgilendirme amaçlı)

---

## 9. KVKK UYUMU

### Güncel Durum
İletişim, mesaj ve randevu formları (KVKK onay kutuları dahil) bilinçli olarak
kaldırıldı — İletişim sayfası şu an sadece statik bilgi (adres/telefon/e-posta)
ve WhatsApp yönlendirmesi kullanıyor, form yok. Aşağıdaki form kuralları
ileride bir form eklenirse geçerli olacak referans kurallardır, şu an
uygulanan bir mekanizma tarif etmiyor.

### İletişim ve Randevu Formları (ileride eklenirse)
- Aydınlatma Metni linki form altında ZORUNLU
- Açık rıza onay kutusu ZORUNLU
- Onay kutuları önceden işaretli OLAMAZ (pre-checked YASAK)
- Aydınlatma metni ve açık rıza AYRI checkbox'larda
- Zorunlu alanlar minimum tutulur (veri minimizasyonu)
- Özel nitelikli kişisel veri (sağlık, suç kaydı) formda TOPLANAMAZ

### Veri Güvenliği
- Hassas veriler (TC Kimlik No varsa) maskelenir
- Tüm veri trafiği HTTPS üzerinden (Vercel + Supabase varsayılan)
- Çerez banner'ı zorunlu (gerekli/isteğe bağlı ayrımı)

---

## 10. ANİMASYON

### Framer Motion Kuralları
- Animasyon değerleri kullanıldığı bileşende inline tanımlanır (ayrı bir
  merkezi dosya yok — `src/constants/animations.ts` hiç kullanılmadığı
  için kaldırıldı, bkz. proje notları)
- Sayfa geçişleri `app/template.tsx` üzerinden
- `useReducedMotion` hook'u her animasyonda kontrol edilir
- Animasyon süresi: max 400ms (kurumsal, sade)
- Aşırı veya dikkat dağıtıcı animasyonlar YASAK
- Yanıp sönen veya dönen elementler YASAK (TBB mevzuatı)

---

## 11. EMAIL (RESEND)

**Güncel durum:** Email/mesaj sistemi kaldırıldı, `resend` paketi kurulu değil
ve `RESEND_API_KEY` şu an kullanılmıyor. Aşağıdaki kurallar ileride email
gönderimi eklenirse geçerli olacak referans kurallardır.

- Sadece Resend SDK kullanılır (`resend` paketi)
- Email şablonları `src/emails/` klasöründe React Email ile
- API Key SADECE `.env.local`'da — istemciye ASLA sızdırılmaz
- Domain verification (SPF, DKIM, DMARC) zorunlu
- Her email'de `replyTo` field'ı set edilir
- `from` adresi doğrulanmış domain'den gelir

---

## 12. GELİŞTİRME SÜRECİ

### Ortam Değişkenleri (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # Sadece sunucu — NEXT_PUBLIC_ OLMAZ
RESEND_API_KEY=                  # Sadece sunucu — NEXT_PUBLIC_ OLMAZ
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

### Her Faz Tamamlandığında Kontrol Listesi
- [ ] TypeScript hata yok (`tsc --noEmit`)
- [ ] ESLint hata yok
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] Mobil görünüm test edildi
- [ ] RLS politikaları test edildi
- [ ] Console'da hata yok

### Veritabanı Değişiklikleri
- Tüm değişiklikler Supabase CLI migration ile yapılır
- Doğrudan dashboard'dan manuel değişiklik YASAK
- Migration dosyaları versiyonlanır

### Yasaklı Pratikler (Genel)
- `localStorage` YASAK — güvenlik riski
- `sessionStorage` YASAK
- Magic string URL'ler YASAK — `constants/routes.ts` kullanılır
- `console.log` production'da YASAK
- Hardcoded API URL'leri YASAK
- `!important` CSS YASAK
- `z-index` rastgele değer YASAK — sistem: header z-50, whatsapp z-40, modal z-60

### Kod Yorumları
- Karmaşık iş mantığı açıklanır
- TBB mevzuat kısıtlamaları yorum olarak belirtilir
- TODO'lar `// TODO:` prefix ile işaretlenir

---

## 13. ERİŞİLEBİLİRLİK (A11Y)

- WCAG 2.2 standartları zorunlu
- Her görselde anlamlı `alt` metni
- Renk kontrastı minimum 4.5:1 (normal metin)
- Klavye navigasyonu tüm interaktif elementlerde
- `aria-label` form elementlerinde zorunlu
- Focus indicator kaldırılamaz (outline: none YASAK)
- shadcn/ui Radix UI altyapısı erişilebilirliği varsayılan sağlar

---

## 14. PROJE NOTLARI

- Bu proje Türkiye'nin en performanslı ve güvenli hukuk bürolarından biri olmayı hedefler
- Her karar TBB Reklam Yasağı Yönetmeliği (9 Ağustos 2024) ile uyumludur
- Domain: .av.tr zorunlu (TRABİS üzerinden başvuru gerekli)
- Hedef kitle: Türkiye'deki hukuki yardım arayan bireyler (çoğunlukla mobil)
- Lider mobil tarayıcılar: Chrome for Android (%52.94), Safari iPhone (%12.72)
- Admin: Sadece Avukat Eren Oktay erişebilir (tek kullanıcı sistemi)

---
## 15. ADMIN PANEL KURALLARI (Faz 7 için)

- Her Server Action'ın ilk satırında `getUser()` kontrolü zorunlu:
  ```typescript
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  ```
- Her başarılı CRUD işleminden sonra `revalidatePath()` zorunlu:
  - `slides` → `revalidatePath('/')`
  - `posts` → `revalidatePath('/duyurular')`
  - `articles` → `revalidatePath('/pratik-bilgiler')`
  - `faq` → `revalidatePath('/sss')`
- Admin formlarında çifte validasyon:
  - Client: Zod resolver
  - Server: `schema.safeParse(formData)`

---

## 16. İÇ SAYFA KURALLARI (Faz 5 için)

- Pagination URL bazlı olacak (`useState` ile client-side YASAK)
  - `?page=2` şeklinde searchParams kullanılacak
- Pratik Bilgiler ve Duyurular sayfalarında yasal uyarı (disclaimer) zorunlu:
  - *"Bu sitedeki bilgiler hukuki tavsiye niteliğinde değildir."*
- SSS accordion'da kapalı cevaplar DOM'da kalmalı (SEO için)
  - shadcn accordion varsayılan bunu sağlar

---

## 17. PERFORMANS KURALLARI (Ekleme)

- Framer Motion: `LazyMotion` + `domAnimation` ile kullanılacak (Faz 9'da refactor)
- WhatsApp butonu: mount'tan 2s sonra veya ilk scroll'da görünür olacak (Faz 9'da implement edilecek)
- Blur placeholder: Supabase görselleri için `blurDataURL` eklenecek (Faz 9)

---

## 18. GÜVENLİK KURALLARI (Ekleme)

- `next.config.js`'e security headers eklenecek (Faz 10 öncesi):
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy`
- İletişim ve randevu formlarında honeypot alanı zorunlu (Faz 6'da)
- Canonical URL her sayfada zorunlu (Faz 8'de implement edilecek)

---
# Bu kurallar projenin tüm yaşam döngüsü boyunca geçerlidir.
# Hiçbir kural "pratiklik" gerekçesiyle çiğnenemez.
# Kural çatışması durumunda: Güvenlik > Performans > DX
# ============================================================

