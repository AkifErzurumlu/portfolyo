# Portfolyo sitesi — tasarım kararı

**Tarih:** 2026-08-19 · **Sahip:** Emin Akif Erzurumlu

## Amaç

Staj ve yeni mezun başvurularında CV'ye ve LinkedIn'e konacak tek link. Ziyaretçi
30 saniyede "bu adamla konuşalım" diyebilmeli. Hedef kitle: Türkiye'deki yazılım
firmaları ve teknoparklar, hem İK hem mühendis okuyucu.

## Birincil kısıt

Site yapay zekâ çıktısı gibi durmayacak. Somut olarak yasaklı olanlar: gradient
zemin, glassmorphism, kart gölgesi, parlayan bloblar, Inter fontu, hap şeklinde
renkli etiketler, emoji ikonlar, scroll ile tetiklenen sayaç animasyonları.

## Tasarım yönü — "Kâğıt & Mürekkep"

Editoryal / İsviçre tipografisi. Efekt yok; ayrışma tipografi, boşluk ve tek
vurgu renginden geliyor.

| Token | Açık | Koyu |
|---|---|---|
| `--kagit` | `#F4F1EA` | `#16150F` |
| `--kagit-2` | `#EAE6DC` | `#1F1E17` |
| `--murekkep` | `#16150F` | `#F4F1EA` |
| `--murekkep-2` | `#4A473E` | `#B8B2A4` |
| `--murekkep-3` | `#8A857A` | `#8A857A` |
| `--cizgi` | `#D6D0C1` | `#332F26` |
| `--vurgu` | `#9A3324` | `#C4553A` |

Yazı tipleri **self-hosted** (`next/font`, Google CDN'e istek gitmez):
Newsreader 300 başlık · IBM Plex Sans gövde · IBM Plex Mono etiket ve kenar notu.

Hareket asgari: bölüm girişlerinde 8px kayma + fade (200ms), link hover'da alt
çizgi. `prefers-reduced-motion` saygılı. **Sayısal değerler HTML'de gerçek
değeriyle durur** — animasyon yalnızca süslemedir, veri taşımaz.

## İmza motifleri

1. **Kenar notları (marginalia).** Ana metnin solunda monospace küçük notlar.
   Dürüstlük çıpalarını (`3 kişilik ekip`, `R² = 0.10 · negatif bulgu`) sayfanın
   mimarisine gömer. Mobilde başlığın altına iner.
2. **Künye bloğu.** Sayfa altında dergi künyesi gibi: sürüm, yazı tipleri, sayfa
   ağırlığı, son güncelleme, kaynak kod linki.

> Numaralı bölüm başlıkları (`01 —`, `02 —`) **kullanılmayacak**: takım arkadaşı
> Yunus Emre Edizer'in sitesinde (yunusedizer.software) bu yapı zaten var.

## Teknik

- Next.js 15 + TypeScript + **CSS Modules** (Tailwind değil — editoryal tasarım
  utility sınıflarıyla kurulunca okunmaz hale gelir).
- `output: 'export'` → saf statik. Vercel'e de GitHub Pages'e de taşınır.
- i18n kütüphanesi yok. `type Metin = Record<'tr'|'en', string>`;
  `content/projeler.ts` tek gerçek kaynak. Eksik çeviriyi TypeScript derleme
  anında yakalar.
- Rotalar: `/` · `/en` · `/projeler/[slug]` · `/en/projects/[slug]`

## İçerik kuralı

Her proje: **Problem → Yaklaşım → Rolüm → Sonuç → Öğrendiğim.**

Dürüstlük çıpaları, hepsi bilinçli:

| Proje | Çerçeve |
|---|---|
| Karnova | 3 kişilik ekipte backend + AI. "Tek başıma" değil. |
| SmartScheduler | 5 kişilik Scrum ekibinde Frontend Lead. Genetik algoritma motoru **başkasının işi** — takım arkadaşı Yunus Emre Edizer'e link verilir. |
| Sismik Analiz | Negatif bulgu öne çıkar: R²=0.10, tek değişkenli kurulum tahmin edemiyor. |
| FinTrack | Sıfır bağımlılık. "Finansal Zeka Asistanı" kural tabanlı — AI diye anlatılmaz. |
| Şifre Kasam | Bilinen kısıt kutusu: düz metin saklama + planlanan çözüm (Argon2id + AES-GCM). |
| Web Kütüphane | bcrypt + session ile kimlik doğrulama elle yazılmış. |

## Gizlilik

Telefon numarası siteye konmaz (bot toplama). Yalnızca e-posta, LinkedIn, GitHub.

## Açık işler

- FinTrack'in GitHub'a public repo olarak atılması.
- Alan adı alınması (`.vercel.app` yerine kendi domaini).
- Şifre Kasam'a gerçek şifreleme eklenmesi (site yayına girdikten sonra).
