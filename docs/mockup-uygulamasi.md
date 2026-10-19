# Ortak tasarım ve canlı ürün sahneleri

Türkçe sayfalar iki dil için de tek görsel düzenin kaynağıdır. Dil seçimi aynı bileşen ağacında yalnızca metinleri, bağlantıların dil yolunu ve CV dilini değiştirir. Ayrı İngilizce sayfa kompozisyonu bulunmaz.

Ürün illüstrasyonları ekran görüntüsü içermez. `ProjectVisual`, `ReferenceArt` ve `EAArtwork` gerçek HTML, CSS ve SVG üretir. Teknoloji marka logoları yerel SVG dosyalarıdır. Eski mockup dosyaları referans olarak korunur, sayfalarda kullanılmaz.

- Karnova: YKS/LGS çubukları ve yüzdeleri sıfırdan hedefe ilerler; performans grafiği başlangıç çizgisinden yükselir. Ana sayfadaki %72 halkası ve çalışma grafiği de canlıdır. Sınav değişince ders çubuklarının animasyonu yeniden başlar.
- SmartScheduler: ders kartları ve kısıt kontrolleri görünür olur; senaryo örneğinde ders başka saate taşınır.
- Sismik Analiz: dalga çizilir, genliği büyür; saçılım noktaları ve model akışı görünür olur. Gerçek düşük R² değerleri korunur.
- FinTrack: bakiye, gelir/gider ve tasarruf sayaçları yükselir; halka grafik sıfırdan çizilir.
- Web Kütüphane: kitaplar, ödünç kartı ve veri modeli akışı aşamalı açılır.
- Şifre Kasam: telefonlar, parola noktaları, kasa kayıtları ve şifreleme adımları animasyonludur. Dört bilinen güvenlik kısıtı görünür kalır.
- EA sahnesi: katmanları ayrı SVG nesneleridir; cam parçalar hafifçe hareket eder.

`MotionScope` her sahneyi görünür olduğunda bir kez oynatır. Süre 1600 ms'dir; `requestAnimationFrame` ile sıfırdan hedefe ilerler. `prefers-reduced-motion` seçiliyse son durum doğrudan gösterilir ve sürekli hareket durur. Ek animasyon bağımlılığı yoktur.

Kontroller:

```sh
npm run build
npm run typecheck
npm run verify:design
```

Son kontrol 14 rotanın TR/EN ana içerik bileşen ağacının aynı olduğunu, sahnelerde kopyalanmış ekran görüntüsü bulunmadığını ve animasyon bileşenlerinin her sayfada yer aldığını denetler. Tarayıcı kontrolü ayrıca ilk/son animasyon değerlerini, YKS/LGS geçişini ve mobil taşmaları doğrular.
