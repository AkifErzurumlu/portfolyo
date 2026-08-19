import type { Metin } from '@/lib/i18n'

export const PROFIL = {
  ad: 'Emin Akif Erzurumlu',
  kisaAd: 'Emin Akif',
  unvan: {
    tr: 'Full-Stack Yazılım Geliştirici',
    en: 'Full-Stack Software Developer',
  } satisfies Metin,
  konum: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Türkiye' } satisfies Metin,
  durum: {
    tr: 'Uzun dönem staj ve yeni mezun pozisyonlarına açığım',
    en: 'Open to long-term internships and new-graduate roles',
  } satisfies Metin,
  egitim: {
    tr: 'Topkapı Üniversitesi · Yazılım Mühendisliği · 2023 – 2027',
    en: 'Topkapı University · Software Engineering · 2023 – 2027',
  } satisfies Metin,
} as const

/**
 * Hero başlığı. `vurgu` bölümü italik ve vurgu renginde çıkar.
 */
export const HERO = {
  baslikOnce: { tr: 'Öğrenen sistemler ve', en: 'I build learning systems and' } satisfies Metin,
  baslikVurgu: { tr: 'ölçülebilir', en: 'measurable' } satisfies Metin,
  baslikSonra: { tr: 'arayüzler kuruyorum.', en: 'interfaces.' } satisfies Metin,
  alt: {
    tr: 'Topkapı Üniversitesi’nde yazılım mühendisliği okuyorum. Üç kişilik bir ekipte bir eğitim platformunun backend ve yapay zekâ tarafını yazdım; beş kişilik bir Scrum ekibinde frontend’i yönettim. İlgim, bir sistemin doğru çalıştığını nasıl kanıtlayacağın sorusunda yoğunlaşıyor.',
    en: 'I study software engineering at Topkapı University. In a three-person team I built the backend and AI side of a learning platform; in a five-person Scrum team I led the frontend. My interest centres on one question: how do you prove a system actually works?',
  } satisfies Metin,
} as const

/**
 * "Nasıl çalışırım" bölümü. Her madde sayfadaki bir projeyle doğrulanabilir —
 * süsleme değil, kanıtı olan iddia.
 */
export const YAKLASIM: readonly { baslik: Metin; metin: Metin; kanit: string }[] = [
  {
    baslik: { tr: 'Ölçemediğim şeyi iyileştirmem', en: 'I do not improve what I cannot measure' },
    metin: {
      tr: 'Bir öğrencinin notu onun nerede takıldığını söylemez, bir modelin doğruluk oranı sürekli bir değeri tahmin ederken hiçbir şey ifade etmez. Önce doğru metriği bulurum, sonra kod yazarım.',
      en: 'A student’s grade does not say where they are stuck, and an accuracy score means nothing when the target is continuous. I find the right metric first, then write code.',
    },
    kanit: 'karnova',
  },
  {
    baslik: { tr: 'Çalışmayan sonucu çalışıyor gibi göstermem', en: 'I do not dress up a null result' },
    metin: {
      tr: 'Deprem modelim R² = 0.10 verdi; bu sayıyı yukarı çekmenin kolay ve dürüst olmayan yolları vardı. Negatif bulgu da bulgudur. Aynı sebeple yayımladığım bir uygulamanın güvenlik kısıtını sayfasında açıkça yazarım.',
      en: 'My earthquake model scored R² = 0.10, and there were easy, dishonest ways to inflate it. A null result is still a result. For the same reason I state a published app’s security limitation on its own page.',
    },
    kanit: 'sismik-analiz',
  },
  {
    baslik: { tr: 'Bağımlılığın altına bakarım', en: 'I look underneath the dependency' },
    metin: {
      tr: 'Grafik kütüphanesi kurmak yerine halkayı Canvas ile kendim çizdim, hazır kimlik paketi yerine oturumu bcrypt ile kendim kurdum. Üretimde hazır çözüm kullanırım — ama ne yaptığını bilerek.',
      en: 'Instead of installing a charting library I drew the ring myself on canvas; instead of an identity package I built sessions with bcrypt. In production I use libraries — but knowing what they do.',
    },
    kanit: 'fintrack',
  },
]

export const YIGIN: readonly { baslik: Metin; ogeler: readonly string[] }[] = [
  {
    baslik: { tr: 'Diller', en: 'Languages' },
    ogeler: ['TypeScript', 'JavaScript', 'Python', 'C#', 'Java', 'C', 'C++', 'Dart', 'SQL'],
  },
  {
    baslik: { tr: 'Backend', en: 'Backend' },
    ogeler: ['Django', 'ASP.NET Core', 'Node.js', 'Express', 'REST API'],
  },
  {
    baslik: { tr: 'Frontend & Mobil', en: 'Frontend & Mobile' },
    ogeler: ['Next.js', 'React', 'Tailwind CSS', 'Flutter'],
  },
  {
    baslik: { tr: 'Veri', en: 'Data' },
    ogeler: ['PostgreSQL', 'MongoDB', 'SQLite', 'PyTorch'],
  },
  {
    baslik: { tr: 'Araçlar', en: 'Tooling' },
    ogeler: ['Git', 'Docker', 'GitHub Actions', 'Scrum'],
  },
]

/** Telefon numarası bilinçli olarak yok — bkz docs/tasarim-karari.md, Gizlilik. */
export const ILETISIM = {
  eposta: 'eminakif2004@gmail.com',
  github: 'https://github.com/AkifErzurumlu',
  linkedin: 'https://www.linkedin.com/in/emin-akif-erzurumlu/',
} as const

/**
 * Web3Forms erişim anahtarı — https://web3forms.com adresinden e-postanla
 * ücretsiz alınır, hesap açmak veya sunucu kurmak gerekmez. Site saf statik
 * olduğu için (`output: 'export'`) form gönderisini alacak bir uç nokta şart.
 *
 * BOŞ BIRAKILIRSA form devre dışı kalmaz: gönderiyi kullanıcının e-posta
 * istemcisinde önceden doldurulmuş bir mektup olarak açar. Yani anahtar
 * tanımlanana kadar da hiçbir mesaj kaybolmaz.
 */
export const FORM_ANAHTARI = ''

export const FORM_UC_NOKTASI = 'https://api.web3forms.com/submit'

export const CV = {
  tr: '/cv/EminAkifErzurumlu_CV_FullStack_TR.pdf',
  en: '/cv/EminAkifErzurumlu_CV_FullStack_EN.pdf',
} as const satisfies Record<'tr' | 'en', string>
