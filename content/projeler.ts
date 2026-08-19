import type { Metin, MetinListesi } from '@/lib/i18n'

export type EkipUyesi = {
  ad: string
  rol: Metin
  site?: string
}

export type Proje = {
  slug: string
  ad: string
  yil: string
  /** Kenar notu — monospace, iki satırı geçmemeli. Dürüstlük çıpası taşır. */
  kenarNotu: Metin
  tur: Metin
  rol: Metin
  /** Kart özeti: bir ya da iki cümle. */
  ozet: Metin
  problem: Metin
  yaklasim: MetinListesi
  /** Rol ayrımı. Ekip projelerinde en kritik alan. */
  benimIsim: Metin
  sonuc: Metin
  ogrenilen: Metin
  /** Bilinen kısıt / dürüst uyarı. Varsa detay sayfasında çerçeveli kutu olur. */
  kisit?: Metin
  stack: readonly string[]
  repo?: string
  repoNot?: Metin
  canli?: string
  ekip?: readonly EkipUyesi[]
  oneCikan: boolean
}

export const PROJELER: readonly Proje[] = [
  {
    slug: 'karnova',
    ad: 'Karnova',
    yil: '2026',
    oneCikan: true,
    kenarNotu: {
      tr: '3 kişilik ekip\nbackend + yapay zekâ',
      en: '3-person team\nbackend + AI',
    },
    tur: { tr: 'Ekip projesi · 3 kişi', en: 'Team project · 3 people' },
    rol: {
      tr: 'Backend & Yapay Zekâ Geliştirici',
      en: 'Backend & AI Developer',
    },
    ozet: {
      tr: 'Öğrencinin tam olarak hangi kazanımda takıldığını tespit eden, içeriği ona göre uyarlayan eğitim platformu.',
      en: 'A learning platform that pinpoints exactly which objective a student is stuck on, and adapts its content accordingly.',
    },
    problem: {
      tr: 'Bir öğrenci matematik denemesinden 40 aldığında bu sayı, onun hangi konuda takıldığını söylemez. Öğretmen otuz kişilik bir sınıfta her öğrencinin eksiğini tek tek çıkaramaz; çıkarsa bile ertesi gün yeni bir deneme gelir. Not bir sonuçtur, teşhis değildir.',
      en: 'When a student scores 40 on a maths test, that number says nothing about where they got stuck. A teacher with thirty students cannot diagnose each one individually — and even if they could, another test arrives the next day. A grade is an outcome, not a diagnosis.',
    },
    yaklasim: {
      tr: [
        'Veri modelini not üzerine değil kazanım üzerine kurdum: her soru bir veya birden çok müfredat kazanımına bağlı, öğrenci cevapları kazanım seviyesinde toplanıyor.',
        'Yapay zekâ asistanına serbest metin ürettirmek yerine function calling verdim — model, öğrencinin gerçek kazanım verisine kendi çağırdığı fonksiyonlar üzerinden erişiyor. Bu, "iyi giden bir öğrenciye kötü gidiyorsun" demesini yapısal olarak engelliyor.',
        'Her okulun verisi birbirinden yalıtık: multi-tenant kurulum ve rol tabanlı yetkilendirme (RBAC) ile öğretmen, öğrenci ve yönetici farklı kapılardan giriyor.',
      ],
      en: [
        'I built the data model around learning objectives rather than grades: every question maps to one or more curriculum objectives, and answers aggregate at the objective level.',
        'Instead of letting the AI assistant free-write, I gave it function calling — the model reaches the student’s real objective data through functions it invokes itself. That structurally prevents it from telling a thriving student they are failing.',
        'Each school’s data is isolated: a multi-tenant setup with role-based access control gives teachers, students and administrators separate doors.',
      ],
    },
    benimIsim: {
      tr: 'Üç kişilik ekipte backend ve yapay zekâ tarafından sorumluyum: veri modeli, REST API, Gemini entegrasyonu ve yetkilendirme katmanı. Arayüzü Emre Özkaya yazdı; operasyon, içerik ve test tarafını Emin Çapan yürüttü.',
      en: 'In a three-person team I own the backend and AI side: data model, REST API, Gemini integration and the authorisation layer. Emre Özkaya built the interface; Emin Çapan handled operations, content and QA.',
    },
    sonuc: {
      tr: 'Platform kazanım bazlı raporlama ve adaptif içerik önerisi verecek noktaya geldi. Kaynak kod şu an özel; mimari kararların dokümantasyonu herkese açık.',
      en: 'The platform now delivers objective-level reporting and adaptive content suggestions. The source is currently private; the architecture documentation is public.',
    },
    ogrenilen: {
      tr: 'Bir dil modelini üretimde güvenilir kılan şey daha iyi bir prompt değil, modelin uyduramayacağı bir veri yolu açmaktır. Serbest metin üretimiyle bir öğrencinin durumu hakkında yanlış cümle kurmasını engelleyemezsiniz; function calling ile modelin cevabı veritabanındaki gerçek kayda bağlanır. Artık tahmin etmiyor, sorguluyor.',
      en: 'What makes a language model trustworthy in production is not a better prompt but a data path it cannot fabricate. Free-form generation gives you no way to stop it from saying something false about a student; with function calling its answer is tied to the actual record in the database. It stopped guessing and started querying.',
    },
    stack: ['Django 6', 'Python', 'PostgreSQL', 'Google Gemini API', 'REST API', 'RBAC'],
    repo: 'https://github.com/AkifErzurumlu/karnova-docs',
    repoNot: {
      tr: 'Kaynak kod özel. Mimari dokümantasyonu açık.',
      en: 'Source is private. Architecture docs are public.',
    },
    ekip: [
      { ad: 'Emre Özkaya', rol: { tr: 'Frontend', en: 'Frontend' } },
      { ad: 'Emin Çapan', rol: { tr: 'Operasyon, içerik, test', en: 'Ops, content, QA' } },
    ],
  },

  {
    slug: 'smartscheduler',
    ad: 'SmartScheduler',
    yil: '2025 — 2026',
    oneCikan: true,
    kenarNotu: {
      tr: '5 kişilik Scrum ekibi\nFrontend Lead',
      en: '5-person Scrum team\nFrontend Lead',
    },
    tur: { tr: 'Ekip projesi · 5 kişi · Scrum', en: 'Team project · 5 people · Scrum' },
    rol: { tr: 'Frontend Lead', en: 'Frontend Lead' },
    ozet: {
      tr: 'Genetik algoritmanın ürettiği ders programını, öğretim üyesinin bakıp güvenebileceği bir arayüze çeviren iş.',
      en: 'Turning a genetically-generated timetable into an interface a faculty member can look at and actually trust.',
    },
    problem: {
      tr: 'Bir üniversitenin ders programı; derslik kapasitesi, öğretim üyesi müsaitliği, öğrenci grupları ve saat kısıtlarının hepsini aynı anda tutturmayı gerektirir. Elle yapıldığında çakışma kaçınılmazdır. Ekibimiz bu problemi genetik algoritmayla çözen bir motor yazdı — ama bir optimizasyon motorunun çıktısı ham haliyle kimsenin işine yaramaz.',
      en: 'A university timetable must satisfy room capacity, faculty availability, student cohorts and time constraints all at once. Done by hand, clashes are inevitable. Our team built a genetic-algorithm engine to solve it — but the raw output of an optimisation engine is useless to anyone on its own.',
    },
    yaklasim: {
      tr: [
        'Çözümü haftalık ızgara üzerinde görselleştirdim: hangi ders nerede, hangi kısıt yüzünden oraya kondu, hangi alternatifler elendi.',
        'What-if senaryoları ekledim — kullanıcı bir dersi taşımayı denediğinde hangi kısıtın kırıldığını anında görüyor.',
        'Arayüzü Next.js 14, TypeScript ve Tailwind ile kurdum; backend ile sözleşmeyi tiplenmiş API katmanı üzerinden sabitledik.',
      ],
      en: [
        'I visualised the solution on a weekly grid: which class sits where, which constraint put it there, which alternatives were eliminated.',
        'I added what-if scenarios — when a user tries to move a class, they immediately see which constraint breaks.',
        'I built the interface with Next.js 14, TypeScript and Tailwind, pinning the contract with the backend through a typed API layer.',
      ],
    },
    benimIsim: {
      tr: 'Beş kişilik Scrum ekibinde Frontend Lead’im. Genetik algoritma motoru ve .NET tarafındaki servisler benim işim değil — o taraf takım arkadaşım Yunus Emre Edizer’in. Benim sorumluluğum, motorun ürettiği çözümü insanın okuyabileceği ve sorgulayabileceği hale getirmekti.',
      en: 'I am Frontend Lead in a five-person Scrum team. The genetic-algorithm engine and the .NET services are not my work — that side belongs to my teammate Yunus Emre Edizer. My responsibility was making the engine’s solution something a human can read and interrogate.',
    },
    sonuc: {
      tr: 'Çakışmasız program üretimi, senaryo karşılaştırma ve dışa aktarma çalışır durumda. Proje Docker ve GitHub Actions üzerinde sürekli entegrasyonla ilerledi.',
      en: 'Clash-free generation, scenario comparison and export all work. The project ran on Docker with GitHub Actions continuous integration.',
    },
    ogrenilen: {
      tr: 'Bir optimizasyon sisteminin en zor kısmı optimizasyon değil, ikna. Kullanıcı "bu ders neden buraya kondu" sorusunun cevabını göremiyorsa, algoritma ne kadar iyi olursa olsun sonucu elle değiştirmeye kalkıyor. Arayüzün işi sonucu göstermek değil, gerekçeyi göstermekmiş.',
      en: 'The hardest part of an optimisation system is not the optimisation — it is persuasion. If a user cannot see why a class was placed where it was, they will override it by hand no matter how good the algorithm is. The interface’s job is not to show the answer but to show the reasoning.',
    },
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'ASP.NET Core 9', 'PostgreSQL 16', 'Docker', 'GitHub Actions'],
    ekip: [
      {
        ad: 'Yunus Emre Edizer',
        rol: { tr: 'Backend & genetik algoritma motoru', en: 'Backend & genetic algorithm engine' },
        site: 'https://yunusedizer.software',
      },
    ],
  },

  {
    slug: 'sismik-analiz',
    ad: 'Sismik Analiz',
    yil: '2025',
    oneCikan: true,
    kenarNotu: {
      tr: 'R² = 0.10\nnegatif bulgu',
      en: 'R² = 0.10\nnegative result',
    },
    tur: { tr: 'Ekip projesi · 4 kişi', en: 'Team project · 4 people' },
    rol: { tr: 'Derin öğrenme modeli', en: 'Deep learning model' },
    ozet: {
      tr: 'Deprem büyüklüğü geçmiş zaman serisinden tahmin edilebilir mi? Cevabım hayır oldu — ve bunu saklamıyorum.',
      en: 'Can earthquake magnitude be predicted from its own past time series? My answer was no — and I am not hiding it.',
    },
    problem: {
      tr: 'Deprem kayıtları bir zaman serisidir. Zaman serisi tahmininde iyi bilinen mimariler var. Soru şuydu: bu mimariler, geçmiş büyüklük değerlerine bakarak bir sonrakini tahmin edebilir mi?',
      en: 'Earthquake records form a time series, and time-series forecasting has well-known architectures. The question was whether those architectures could predict the next magnitude from past magnitudes alone.',
    },
    yaklasim: {
      tr: [
        '31.915 kayıtlık veri setini 20 adımlık pencerelere böldüm.',
        'PyTorch ile iki model kurdum: çift yönlü LSTM ve dikkat mekanizmalı LSTM.',
        'Başarıyı doğruluk (accuracy) ile değil R² ile ölçtüm — sürekli bir değeri tahmin ederken doğruluk anlamsız bir metriktir.',
      ],
      en: [
        'I split a 31,915-record dataset into 20-step windows.',
        'I built two models in PyTorch: a bidirectional LSTM and an attention-based LSTM.',
        'I measured success with R² rather than accuracy — accuracy is a meaningless metric when predicting a continuous value.',
      ],
    },
    benimIsim: {
      tr: 'Dört kişilik ekipteki kendi notebook’um PyTorch tabanlıdır. Ekip deposundaki TensorFlow ve Bi-GRU çalışmaları başka üyelere ait; onları kendi işim gibi göstermiyorum.',
      en: 'My own notebook in this four-person team is PyTorch-based. The TensorFlow and Bi-GRU work in the team repository belongs to other members; I do not present it as mine.',
    },
    sonuc: {
      tr: 'Bi-LSTM R² = 0.10, dikkat mekanizmalı LSTM R² = 0.02. Yani her iki model de varyansın neredeyse tamamını açıklamakta başarısız. Sonuç: tek değişkenli bir kurulum deprem büyüklüğünü tahmin edemiyor.',
      en: 'Bi-LSTM R² = 0.10, attention LSTM R² = 0.02. Both models fail to explain nearly any of the variance. Conclusion: a univariate setup cannot predict earthquake magnitude.',
    },
    ogrenilen: {
      tr: 'Bu sayıları yukarı çekmek zor değildi — pencereleri örtüştürüp eğitim ve test setleri arasında sızıntı bırakmak, ya da metriği doğrulukla değiştirmek yeterdi. İkisi de rapora güzel bir grafik koyardı ve ikisi de yalan olurdu. Bir modelin çalışmadığını göstermek de bir bulgudur; asıl mühendislik, işe yaramayan sonucu işe yarıyor gibi göstermemektir.',
      en: 'Inflating these numbers would have been easy — overlap the windows and let train and test leak into each other, or swap the metric for accuracy. Either would have produced a handsome chart, and either would have been a lie. Showing that a model does not work is itself a finding; the real engineering is refusing to dress up a null result as a success.',
    },
    stack: ['Python', 'PyTorch', 'Jupyter', 'Bi-LSTM', 'Attention'],
    repo: 'https://github.com/AkifErzurumlu/seismic-analysis',
    ekip: [
      { ad: 'Team510', rol: { tr: '4 kişilik proje ekibi', en: '4-person project team' } },
    ],
  },

  {
    slug: 'fintrack',
    ad: 'FinTrack',
    yil: '2026',
    oneCikan: true,
    kenarNotu: {
      tr: '0 bağımlılık\ngrafikler elle çizildi',
      en: '0 dependencies\ncharts drawn by hand',
    },
    tur: { tr: 'Bireysel', en: 'Solo' },
    rol: { tr: 'Tasarım ve geliştirme', en: 'Design and development' },
    ozet: {
      tr: 'Tek dosyalık bütçe planlayıcı. Hiçbir kütüphane kullanmadım; grafik katmanını Canvas 2D ile kendim yazdım.',
      en: 'A single-file budget planner. No libraries at all — I wrote the chart layer myself with the Canvas 2D API.',
    },
    problem: {
      tr: 'Kişisel bütçe uygulamalarının çoğu ya hesap açmanı ya da harcama verini buluta göndermeni istiyor. Halbuki bütçe, insanın en mahrem verilerinden biri. Sorun şuydu: hiçbir yere veri göndermeyen, kurulum gerektirmeyen bir bütçe aracı ne kadar küçük olabilir?',
      en: 'Most personal budgeting apps ask you either to create an account or to send your spending data to the cloud — yet a budget is among the most private data a person has. The question was: how small can a budgeting tool be if it sends data nowhere and needs no installation?',
    },
    yaklasim: {
      tr: [
        'Tüm uygulamayı tek bir HTML dosyasına yazdım: 639 satır, yaklaşık 33 KB, build adımı yok. Çift tıklayınca açılıyor.',
        'Veri tarayıcının localStorage’ında kalıyor; hiçbir sunucuya gitmiyor. Tek dış istek canlı döviz kuru için.',
        'Halka grafiği Chart.js ile değil Canvas 2D ile çizdim: dilimleri ctx.arc() ile açı hesaplayarak çıkardım, ortasını ikinci bir daireyle oyarak halkaya çevirdim.',
        'Harcama uyarıları için kural tabanlı bir motor yazdım — kira/gelir oranı, tasarruf yüzdesi, esnek giderlerdeki yoğunlaşma.',
      ],
      en: [
        'I wrote the whole app in a single HTML file: 639 lines, about 33 KB, no build step. You double-click it and it runs.',
        'Data stays in the browser’s localStorage and never reaches a server. The one outbound request is for live exchange rates.',
        'I drew the donut chart with Canvas 2D rather than Chart.js: slices computed as angles through ctx.arc(), then hollowed into a ring with a second circle.',
        'For spending warnings I wrote a rule-based engine — rent-to-income ratio, savings percentage, concentration in discretionary categories.',
      ],
    },
    benimIsim: {
      tr: 'Tasarımından koduna kadar tamamı bana ait. Finansal Teknolojiler dersi kapsamında yazıldı.',
      en: 'Entirely mine, from design to code. Written for a Financial Technologies course.',
    },
    sonuc: {
      tr: 'Gelir–gider takibi, kategori analizi, sabit abonelikler, dört para biriminde (TL, dolar, euro, gram altın) tasarruf hedefi, CSV dışa aktarım ve koyu tema — hepsi sıfır bağımlılıkla çalışıyor.',
      en: 'Income and expense tracking, category analysis, recurring subscriptions, savings goals in four units (lira, dollar, euro, gram gold), CSV export and a dark theme — all with zero dependencies.',
    },
    ogrenilen: {
      tr: 'Chart.js kurmak üç dakikalık iştir; halkayı trigonometriyle kendin çizmek bir öğleden sonra alır. Ama ikincisini yaptıktan sonra bir grafik kütüphanesinin ne yaptığını, nerede yavaşladığını ve neyi gizlediğini biliyorsun. Bağımlılık eklemek bazen düşünmeyi dışarıya vermek oluyor.',
      en: 'Installing Chart.js takes three minutes; drawing the ring yourself with trigonometry takes an afternoon. But afterwards you know what a charting library actually does, where it slows down and what it hides. Adding a dependency is sometimes outsourcing your own thinking.',
    },
    kisit: {
      tr: 'Uygulamadaki "Finansal Zeka Asistanı" bir yapay zekâ modeli değil, elle yazılmış kurallardan oluşan bir motordur. İsmi iddialı; yaptığı iş eşik kontrolüdür.',
      en: 'The app’s "Financial Intelligence Assistant" is not an AI model but an engine of hand-written rules. The name is ambitious; what it does is threshold checking.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas 2D API', 'localStorage'],
  },

  {
    slug: 'web-kutuphane',
    ad: 'Web Kütüphane',
    yil: '2025',
    oneCikan: false,
    kenarNotu: {
      tr: 'kimlik doğrulama\nelle yazıldı',
      en: 'authentication\nwritten by hand',
    },
    tur: { tr: 'Bireysel', en: 'Solo' },
    rol: { tr: 'Full-stack', en: 'Full-stack' },
    ozet: {
      tr: 'Kitap ödünç alma ve üyelik yönetimi. Kimlik doğrulamayı hazır bir paket yerine kendim yazdım.',
      en: 'Book lending and membership management, with authentication written by hand rather than pulled from a package.',
    },
    problem: {
      tr: 'Bir kütüphanenin ihtiyacı basit görünür: kitaplar, üyeler, ödünç kayıtları. Zorluk, aynı kitabın iki kişiye aynı anda verilememesi ve her kullanıcının yalnızca kendi kayıtlarını görebilmesinde.',
      en: 'A library’s needs look simple: books, members, loan records. The difficulty is preventing the same book from being lent twice and ensuring each user sees only their own records.',
    },
    yaklasim: {
      tr: [
        'Node.js ve Express üzerinde REST uçları, sunucu tarafı şablonlar için EJS.',
        'Veri MongoDB’de, şema ve ilişkiler Mongoose ile tanımlı.',
        'Kimlik doğrulamayı hazır bir kimlik paketi yerine bcrypt ve express-session ile kendim kurdum: parola hash’lemesi, oturum saklama ve çerez ayarları elimde.',
      ],
      en: [
        'REST endpoints on Node.js and Express, with EJS for server-side templates.',
        'Data in MongoDB, schemas and relations defined through Mongoose.',
        'I built authentication myself with bcrypt and express-session rather than an off-the-shelf identity package: password hashing, session storage and cookie settings all under my control.',
      ],
    },
    benimIsim: {
      tr: 'Bireysel proje; veri modelinden arayüze kadar tamamı bana ait.',
      en: 'A solo project; everything from data model to interface is mine.',
    },
    sonuc: {
      tr: 'Üyelik, kitap kataloğu, ödünç alma ve iade akışı ile oturum tabanlı yetkilendirme çalışır durumda.',
      en: 'Membership, catalogue, lending and return flows plus session-based authorisation all work.',
    },
    ogrenilen: {
      tr: 'Kimlik doğrulamayı elle yazmak, hazır çözümlerin sessizce hallettiği kararların farkına varmayı sağlıyor: parola hash maliyeti kaç olmalı, oturum nerede saklanıyor, çerezin HttpOnly ve SameSite ayarları ne yapıyor. Üretimde hazır bir paket kullanırdım — ama artık o paketin ne yaptığını bilerek kullanırım.',
      en: 'Writing authentication by hand surfaces the decisions a ready-made solution quietly makes for you: what the password hashing cost should be, where sessions live, what HttpOnly and SameSite actually do. In production I would use a library — but now I would use it knowing what it does.',
    },
    stack: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Mongoose', 'bcrypt'],
    repo: 'https://github.com/AkifErzurumlu/library-app',
  },

  {
    slug: 'sifre-kasam',
    ad: 'Şifre Kasam',
    yil: '2026',
    oneCikan: false,
    kenarNotu: {
      tr: 'bilinen kısıt\naçıkça yazılı',
      en: 'known limitation\nstated openly',
    },
    tur: { tr: 'Bireysel', en: 'Solo' },
    rol: { tr: 'Mobil geliştirme', en: 'Mobile development' },
    ozet: {
      tr: 'Flutter ile çok kullanıcılı yerel şifre yöneticisi. Bilinen bir güvenlik kısıtı var ve bunu saklamıyorum.',
      en: 'A multi-user local password manager in Flutter. It has a known security limitation, and I am not hiding it.',
    },
    problem: {
      tr: 'Şifre yöneticilerinin çoğu bulut tabanlı. Tek cihazda kalan, internet bağlantısı gerektirmeyen ve aynı telefonu paylaşan birden fazla kişiyi destekleyen bir kasa yazmak istedim.',
      en: 'Most password managers are cloud-based. I wanted a vault that stays on one device, needs no internet connection and supports several people sharing the same phone.',
    },
    yaklasim: {
      tr: [
        'Flutter ve Dart ile tek kod tabanından mobil uygulama.',
        'Kayıtlar cihazda SQLite (sqflite) veritabanında; hiçbir veri dışarı çıkmıyor.',
        'Çok kullanıcılı yapı: her kullanıcının kayıtları kendi hesabına bağlı.',
      ],
      en: [
        'A mobile app from a single Flutter and Dart codebase.',
        'Records live in an on-device SQLite (sqflite) database; nothing leaves the phone.',
        'A multi-user structure where each user’s records belong to their own account.',
      ],
    },
    benimIsim: {
      tr: 'Bireysel proje, tamamı bana ait.',
      en: 'A solo project, entirely mine.',
    },
    sonuc: {
      tr: 'Kayıt ekleme, arama, düzenleme ve çok kullanıcılı erişim çalışıyor. Uygulama tamamen çevrimdışı.',
      en: 'Adding, searching, editing records and multi-user access all work. The app is fully offline.',
    },
    ogrenilen: {
      tr: 'Bir şifre yöneticisinin tek işi şifreleri korumaktır; benim sürümüm bu işi yapmıyor. Bunu fark etmek, kendi kodumu bir saldırganın gözünden okumayı öğretti: "veritabanı cihazda kalıyor" ifadesi, cihaza erişen birinin veriyi okuyamayacağı anlamına gelmiyor. Tehdit modelini yazmadan güvenlik kararı verilemiyormuş.',
      en: 'A password manager has exactly one job — protecting passwords — and my version does not do it. Realising that taught me to read my own code as an attacker would: "the database stays on the device" does not mean someone with the device cannot read it. You cannot make a security decision without first writing down the threat model.',
    },
    kisit: {
      tr: 'Bu sürüm şifreleri SQLite veritabanında düz metin olarak saklıyor. Cihaza fiziksel veya root erişimi olan biri tüm kayıtları okuyabilir; yani uygulama bugün gerçek kullanım için uygun değildir. Planlanan çözüm: kullanıcının ana parolasından Argon2id ile anahtar türetip kayıtları AES-GCM ile şifrelemek.',
      en: 'This version stores passwords in plain text in the SQLite database. Anyone with physical or root access to the device can read every record, so the app is not fit for real use today. The planned fix: derive a key from the user’s master password with Argon2id and encrypt records with AES-GCM.',
    },
    stack: ['Flutter', 'Dart', 'SQLite', 'sqflite'],
    repo: 'https://github.com/AkifErzurumlu/sifre-kasam',
  },
]

export const ARSIV: readonly { ad: Metin; stack: string }[] = [
  {
    ad: { tr: 'Sonsuz koşu oyunu', en: 'Endless runner game' },
    stack: 'C# · Unity',
  },
  {
    ad: { tr: 'Nesne yönelimli konsol oyunu', en: 'Object-oriented console game' },
    stack: 'C++',
  },
  {
    ad: { tr: 'Nesne yönelimli masaüstü uygulaması', en: 'Object-oriented desktop app' },
    stack: 'Java',
  },
]

export function projeBul(slug: string): Proje | undefined {
  return PROJELER.find((p) => p.slug === slug)
}
