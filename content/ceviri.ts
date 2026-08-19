import type { Metin } from '@/lib/i18n'

/** Arayüz metinleri. Proje içeriği content/projeler.ts içinde. */
export const UI = {
  // Gezinme
  calismalar: { tr: 'Çalışmalar', en: 'Work' },
  yaklasim: { tr: 'Yaklaşım', en: 'Approach' },
  yigin: { tr: 'Teknik yığın', en: 'Stack' },
  arsiv: { tr: 'Arşiv', en: 'Archive' },
  iletisim: { tr: 'İletişim', en: 'Contact' },
  icerigeGec: { tr: 'İçeriğe geç', en: 'Skip to content' },

  // Bölüm başlıkları
  secilmisCalismalar: { tr: 'Seçilmiş çalışmalar', en: 'Selected work' },
  nasilCalisirim: { tr: 'Nasıl çalışırım', en: 'How I work' },
  digerProjeler: { tr: 'Diğer projeler', en: 'Other projects' },
  eskiCalismalar: { tr: 'Daha eski çalışmalar', en: 'Earlier work' },

  // Proje detayı
  problem: { tr: 'Problem', en: 'The problem' },
  yaklasimBaslik: { tr: 'Yaklaşım', en: 'Approach' },
  benimIsim: { tr: 'Bu projedeki işim', en: 'My part in this' },
  sonuc: { tr: 'Sonuç', en: 'Outcome' },
  ogrenilen: { tr: 'Öğrendiğim', en: 'What I learned' },
  bilinenKisit: { tr: 'Bilinen kısıt', en: 'Known limitation' },
  ekip: { tr: 'Ekip', en: 'Team' },
  kullanilan: { tr: 'Kullanılan', en: 'Built with' },
  rol: { tr: 'Rol', en: 'Role' },
  yil: { tr: 'Yıl', en: 'Year' },

  // Eylemler
  detay: { tr: 'Detaya bak', en: 'Read more' },
  kaynakKod: { tr: 'Kaynak kod', en: 'Source' },
  canliDemo: { tr: 'Canlı', en: 'Live' },
  cvIndir: { tr: 'CV indir (PDF)', en: 'Download CV (PDF)' },
  tumProjeler: { tr: 'Tüm projeler', en: 'All projects' },
  geriDon: { tr: 'Bütün çalışmalar', en: 'All work' },
  epostaGonder: { tr: 'E-posta gönder', en: 'Send an email' },

  // İletişim
  iletisimBaslik: { tr: 'Konuşalım', en: 'Let’s talk' },
  iletisimMetin: {
    tr: 'Staj ve yeni mezun pozisyonları için yazabilirsiniz. Pozisyonu ve ekibi kısaca anlatırsanız daha yararlı bir cevap verebilirim.',
    en: 'Write to me about internships and new-graduate roles. A short note on the role and the team helps me reply more usefully.',
  },
  iletisimKonum: { tr: 'Konum', en: 'Location' },
  iletisimYanit: { tr: 'Yanıt süresi', en: 'Response time' },
  iletisimYanitDeger: { tr: 'Genellikle aynı gün', en: 'Usually the same day' },
  iletisimBaglantilar: { tr: 'Bağlantılar', en: 'Links' },

  // İletişim formu
  formAd: { tr: 'Ad soyad', en: 'Name' },
  formAdIpucu: { tr: 'Adınız', en: 'Your name' },
  formEposta: { tr: 'E-posta', en: 'Email' },
  formEpostaIpucu: { tr: 'ornek@mail.com', en: 'you@example.com' },
  formMesaj: { tr: 'Mesaj', en: 'Message' },
  formMesajIpucu: {
    tr: 'Hangi pozisyon, hangi ekip, ne zaman başlıyor?',
    en: 'Which role, which team, when does it start?',
  },
  formGonder: { tr: 'Mesaj gönder', en: 'Send message' },
  formGonderiliyor: { tr: 'Gönderiliyor…', en: 'Sending…' },
  formBasarili: {
    tr: 'Mesajınız ulaştı. Genellikle aynı gün dönerim.',
    en: 'Your message arrived. I usually reply the same day.',
  },
  formHata: {
    tr: 'Gönderilemedi. Doğrudan eposta yazabilirsiniz:',
    en: 'Could not send. You can email me directly:',
  },
  formPostaAcildi: {
    tr: 'E-posta uygulamanız mesajla birlikte açıldı — göndermek için oradan onaylamanız yeterli.',
    en: 'Your email app opened with the message — just send it from there.',
  },
  formZorunlu: { tr: 'zorunlu', en: 'required' },

  // Künye
  kunye: { tr: 'Künye', en: 'Colophon' },
  kunyeYapim: { tr: 'Yapım', en: 'Built with' },
  kunyeYaziTipleri: { tr: 'Yazı tipleri', en: 'Typefaces' },
  kunyeGuncelleme: { tr: 'Son güncelleme', en: 'Last updated' },
  kunyeKaynak: { tr: 'Bu sitenin kaynak kodu', en: 'Source of this site' },
  // Dil
  dilDegistir: { tr: 'English', en: 'Türkçe' },
  dilEtiketi: { tr: 'Switch to English', en: 'Türkçeye geç' },
} as const satisfies Record<string, Metin>
