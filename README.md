# portfolyo

[Emin Akif Erzurumlu](https://www.linkedin.com/in/emin-akif-erzurumlu/) — kişisel
portfolyo sitesi. Türkçe ve İngilizce, saf statik.

## Yığın

Next.js 15 (App Router) · TypeScript · CSS Modules · `output: 'export'`

Tailwind yok: site editoryal bir tipografi üzerine kurulu ve bu tür bir tasarımı
utility sınıflarıyla yazmak okunmaz hale getiriyor. Çalışma zamanı bağımlılığı
yok, çıktı tamamen statik dosya.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statik çıktı → out/
npm run typecheck
```

## Yapı

```
app/
  (tr)/            Türkçe kök layout ve rotalar        →  /  ·  /projeler/[slug]
  (en)/            İngilizce kök layout ve rotalar     →  /en · /en/projects/[slug]
  globals.css      Tasarım token'ları, açık + koyu tema
  fonts.ts         next/font ile self-hosted yazı tipleri
  sitemap.ts       İki dili hreflang ile eşleyen site haritası
components/        Sunum bileşenleri, her biri kendi .module.css dosyasıyla
content/           İçeriğin tek kaynağı — projeler, profil, arayüz metinleri
lib/i18n.ts        Dil tipleri ve çeviri yardımcıları
scripts/og/        Link önizleme görsellerini üreten betik
```

İki ayrı kök layout var çünkü `<html lang>` rotaya göre değişmeli; App
Router'da `<html>` yalnızca kök layout'ta yaşadığı için her dil kendi route
grubunu taşıyor.

## İçerik

Bütün metin `content/` altında ve iki dilli:

```ts
type Metin = Record<'tr' | 'en', string>
```

i18n kütüphanesi yok. Eksik bir çeviri derleme anında TypeScript hatası olur,
siteye yarım metin çıkamaz.

## İletişim formu

Site statik olduğu için form gönderisini alan bir sunucu yok.
`content/profil.ts` içindeki `FORM_ANAHTARI` doldurulursa gönderi
[Web3Forms](https://web3forms.com)'a gider; boşsa mesaj kullanıcının e-posta
istemcisinde önceden doldurulmuş olarak açılır. İki yolda da mesaj kaybolmaz.

## Link önizleme görselleri

`public/og.png` ve `public/og-en.png` depoya işlenmiş durumda. İçerik
değişirse yeniden üret:

```bash
python scripts/og/uret.py
```

## Yayın

Vercel. Alan adı değişirse tek yer güncellenir: `lib/site.ts` içindeki
`SITE_URL` — `metadataBase`, JSON-LD, `robots.txt` ve `sitemap.xml` oradan okur.

## Lisans

Kod MIT. `scripts/og/fonts/` altındaki yazı tipleri SIL Open Font License ile
dağıtılıyor (Newsreader, IBM Plex Mono, IBM Plex Sans). Metin ve görseller
kişisel içeriktir.
