# Onaylı mockup uygulaması — 19 Ekim 2026

Bu uygulama kullanıcı tarafından onaylanan 14 masaüstü mockup’ını temel alır;
önceki `tasarim-karari.md` içindeki eski kâğıt/mürekkep estetiğinin yerini alır.

- Palet: #F4F6FA zemin, #244BFF kobalt, #15223B lacivert, #E4E9FF yardımcı zemin.
- Yazı tipi: Manrope, Türkçe karakterleri içeren latin-ext alt kümesi.
- Ana sayfa: iki büyük proje, dört küçük proje, yaklaşım, hakkımda, araçlar ve iletişim.
- Projeler: özel ürün sahneleri, problem, katkı, süreç, sonuç, kısıtlar ve teknoloji yığını.
- Onaylanan EA illüstrasyonu CSS görüntü penceresiyle kullanılır; sayfa metinleri
  ve bütün ürün panelleri gerçek HTML/CSS’tir. Sayfalar ekran görüntüsüne dönüştürülmemiştir.
- Karnova ders alanı YKS/LGS seçimiyle değişir. Sayılar ve ürün arayüzleri açıkça
  temsili olarak işaretlenmiştir; gerçek kullanıcı verisi kullanılmaz.
- Türkçe ve İngilizce 14 rota, proje konumunu koruyan dil seçimi, kaynak/demo
  bağlantıları, CV indirmeleri ve mevcut iletişim formu korunur.
- Site daima onaylanan açık paleti kullanır; sistemin koyu tema tercihi tasarımı değiştirmez.

Bağımlılıklar Next.js 15 ailesi içinde yamalanmıştır. PostCSS 8 için aynı ana
sürümde güvenlik yaması uygulanır. Yeni tasarım çalışma zamanı bağımlılığı eklemez.
