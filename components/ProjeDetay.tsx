import Link from 'next/link'
import { PROJELER, type Proje } from '@/content/projeler'
import { anaSayfaYolu, projeYolu, t, tListe, type Dil } from '@/lib/i18n'
import ProjectVisual from './ProjectVisual'
import Icon from './Icon'
import TechLogo from './TechLogo'
import ReferenceArt from './ReferenceArt'
import stil from './ProjeDetay.module.css'
import MotionScope, { AnimatedNumber } from './MotionScope'

type Design = {
  headline: string
  problem: string
  contribution: string
  lesson: string
  flow: string[]
}
const copy: Record<string, Record<Dil, Design>> = {
  karnova: {
    tr: {
      headline: 'Notun ötesinde, öğrencinin ihtiyacı.',
      problem: 'Bir not, teşhis değildir.',
      contribution:
        'Veri modeli, REST API, Gemini entegrasyonu ve rol tabanlı yetkilendirme.',
      lesson: 'Artık tahmin etmiyor, sorguluyor.',
      flow: ['Öğrenci cevapları', 'Kazanım analizi', 'İçerik önerisi'],
    },
    en: {
      headline: 'Beyond a grade, toward a student’s needs.',
      problem: 'A grade is not a diagnosis.',
      contribution:
        'Data model, REST API, Gemini integration and role-based access.',
      lesson: 'It stopped guessing and started querying.',
      flow: ['Student answers', 'Objective analysis', 'Content suggestions'],
    },
  },
  smartscheduler: {
    tr: {
      headline: 'Karmaşık planlar. Anlaşılır kararlar.',
      problem: 'Sadece programı değil, gerekçeyi göster.',
      contribution: 'Karmaşık mantığı anlaşılır bir arayüze dönüştürmek.',
      lesson: 'Arayüzün işi, kararın gerekçesini göstermek.',
      flow: ['Dersi taşı', 'Kısıtı kontrol et', 'Sonucu gör'],
    },
    en: {
      headline: 'Complex plans. Clear decisions.',
      problem: 'Show the reasoning behind the timetable.',
      contribution: 'Turning complex logic into an understandable interface.',
      lesson: 'The interface must show the reasoning behind the decision.',
      flow: ['Move a class', 'Check constraints', 'See the result'],
    },
  },
  'sismik-analiz': {
    tr: {
      headline: 'Negatif sonuç da bir bulgudur.',
      problem: 'Doğru soru, doğru metrik.',
      contribution: 'PyTorch ile Bi-LSTM ve dikkat mekanizmalı LSTM.',
      lesson: 'İşe yaramayan sonucu, işe yarıyor gibi göstermemek.',
      flow: [
        'Zaman serisi',
        '20 adımlık pencereler',
        'İki LSTM modeli',
        'Test setinde R²',
      ],
    },
    en: {
      headline: 'A negative result is still a finding.',
      problem: 'The right question. The right metric.',
      contribution: 'Bi-LSTM and attention LSTM in PyTorch.',
      lesson: 'Refusing to dress up a null result as a success.',
      flow: [
        'Time series',
        '20-step windows',
        'Two LSTM models',
        'Test-set R²',
      ],
    },
  },
  fintrack: {
    tr: {
      headline: 'Bütçen sende kalır.',
      problem: 'Hesap açmadan. Verini buluta taşımadan.',
      contribution: 'Tek dosya. Sıfır bağımlılık. Tamamen yerel.',
      lesson: 'Kütüphaneyi kullanmadan önce ne yaptığını anlamak.',
      flow: ['Tek HTML dosyası', 'Canvas 2D', 'localStorage'],
    },
    en: {
      headline: 'Your budget stays with you.',
      problem: 'No account. No budget in the cloud.',
      contribution: 'One file. Zero dependencies. Entirely local.',
      lesson: 'Understand what a library does before using it.',
      flow: ['One HTML file', 'Canvas 2D', 'localStorage'],
    },
  },
  'web-kutuphane': {
    tr: {
      headline: 'Kitaplardan oturumlara, uçtan uca.',
      problem: 'Bir kitap, aynı anda tek kişide.',
      contribution: 'Veri modelinden arayüze kadar bireysel geliştirme.',
      lesson: 'Hazır çözümlerin sessizce verdiği kararları öğrendim.',
      flow: ['Giriş', 'Parola doğrulama', 'Oturum', 'Yetkili erişim'],
    },
    en: {
      headline: 'From books to sessions. End to end.',
      problem: 'One book. One borrower at a time.',
      contribution: 'Solo development, from data model to interface.',
      lesson: 'Learning the decisions a ready-made solution makes for you.',
      flow: ['Sign in', 'Password check', 'Session', 'Authorised access'],
    },
  },
  'sifre-kasam': {
    tr: {
      headline: 'Cihazında kalan şifreli kasa.',
      problem: 'Bulutsuz. Kullanıcıya özel. Şifreli.',
      contribution: 'Uygulama, şifreleme katmanı ve veri göçü.',
      lesson: 'Anahtarın gücü, parolanın entropisinden gelir.',
      flow: [
        'Ana parola',
        'Argon2id',
        'Kasa anahtarı',
        'AES-256-GCM',
        'SQLite',
      ],
    },
    en: {
      headline: 'An encrypted vault that stays on your device.',
      problem: 'Cloudless. Per-user. Encrypted.',
      contribution: 'The app, encryption layer and data migration.',
      lesson: 'A key’s strength comes from the password’s entropy.',
      flow: [
        'Master password',
        'Argon2id',
        'Vault key',
        'AES-256-GCM',
        'SQLite',
      ],
    },
  },
}

function Flow({ steps, dil }: { steps: string[]; dil: Dil }) {
  return (
    <MotionScope
      className={stil.flow}
      aria-label={dil === 'tr' ? 'Çalışma akışı' : 'Workflow'}
    >
      {steps.map((step, i) => (
        <div className={stil.flowStep} key={step}>
          <span className={stil.flowIcon}>
            <Icon
              name={
                ['file', 'sliders', 'layers', 'check', 'database'][i] ?? 'check'
              }
              size={25}
            />
          </span>
          <div>
            <strong>{step}</strong>
            <small>
              {
                (dil === 'tr'
                  ? ({
                      'Dersi taşı':
                        'Dersi başka bir zaman dilimine sürükle ve bırak.',
                      'Kısıtı kontrol et':
                        'Sistem tüm kısıtları gerçek zamanlı olarak kontrol eder.',
                      'Sonucu gör':
                        'Uygunsa yerleştirir, uygun değilse nedenini açıklar.',
                      'Zaman serisi': 'Tarihsel büyüklükler sırayla alındı.',
                      '20 adımlık pencereler':
                        '20 adımlık kaydırmalı pencereler oluşturuldu.',
                      'İki LSTM modeli': 'Bi-LSTM ve dikkat mekanizmalı LSTM.',
                      'Test setinde R²':
                        'Test setinde performans değerlendirildi.',
                      'Öğrenci cevapları':
                        'Soru yanıtları ve etkileşim verileri toplanır.',
                      'Kazanım analizi':
                        'Yapay zekâ ile kazanım bazlı analiz yapılır.',
                      'İçerik önerisi':
                        'Öğrencinin ihtiyacına uygun içerikler önerilir.',
                    } as Record<string, string>)
                  : ({
                      'Move a class': 'Drag a class to another time slot.',
                      'Check constraints':
                        'Check all constraints in real time.',
                      'See the result':
                        'Place a valid class or explain the conflict.',
                      'Time series':
                        'Earthquake magnitudes in chronological order.',
                      '20-step windows': 'Create 20-step input sequences.',
                      'Two LSTM models':
                        'Train Bi-LSTM and attention LSTM in PyTorch.',
                      'Test-set R²':
                        'Evaluate with coefficient of determination.',
                      'Student answers':
                        'Quiz and exam answers are analysed at objective level.',
                      'Objective analysis':
                        'Map each response to learning objectives.',
                      'Content suggestions':
                        'Suggest content for learning gaps.',
                    } as Record<string, string>))[step]
              }
            </small>
          </div>
          {i < steps.length - 1 && (
            <span className={stil.flowArrow} aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </MotionScope>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className={stil.eyebrow}>{children}</span>
}
function Art({
  proje,
  dil,
  region = 'detail',
}: {
  proje: Proje
  dil: Dil
  region?: 'detail' | 'diagram'
}) {
  return (
    <ReferenceArt
      page={proje.slug}
      dil={dil}
      region={region}
      className={stil.supportArt}
    />
  )
}
function Lesson({
  proje,
  dil,
  compact = false,
}: {
  proje: Proje
  dil: Dil
  compact?: boolean
}) {
  const tr = dil === 'tr'
  const lesson = copy[proje.slug]![dil].lesson
  const summaries: Record<string, string> = {
    karnova: tr
      ? 'Function calling, modelin cevabını veritabanındaki gerçek öğrenci kaydına bağlar. Güvenilir yanıt, güvenilir veri yoluyla başlar.'
      : 'Function calling ties the model’s answers to actual student records. A reliable answer starts with a reliable data path.',
    smartscheduler: tr
      ? 'Kullanıcılar sonucun nasıl oluştuğunu görmek istiyor. Gerekçe görünür olduğunda, algoritmanın ürettiği programa güvenmek kolaylaşıyor.'
      : 'People need to see how the result was reached. Visible reasoning makes an algorithmically generated timetable easier to trust.',
    'sismik-analiz': tr
      ? 'Veri sızıntısını önlemek, iyi görünen bir skordan daha değerli. Modellerin başarısızlığını dürüstçe raporlamak da bir mühendislik sonucu.'
      : 'Preventing data leakage matters more than a flattering score. Reporting a model’s failure honestly is an engineering outcome too.',
    fintrack: tr
      ? 'Canvas 2D ile grafikleri kendim çizmek, bir grafik kütüphanesinin ne yaptığını ve neyi gizlediğini anlamamı sağladı.'
      : 'Drawing charts directly with Canvas 2D helped me understand what a chart library does and what it hides.',
    'web-kutuphane': tr
      ? 'Parola hash maliyeti, oturum saklama, HttpOnly ve SameSite kararlarını uygulayarak öğrendim. Üretimde olgun bir kimlik çözümü tercih ederim.'
      : 'I learned password hashing costs, session storage, HttpOnly and SameSite by implementing them. In production I would use a mature authentication solution.',
    'sifre-kasam': tr
      ? '4 haneli PIN’i ana parolayla değiştirdim. Ölçümümde tek Argon2id türetmesi ~220 ms; 10.000 PIN yaklaşık 37 dakikada taranabiliyor.'
      : 'I replaced the four-digit PIN with a master password. My measured Argon2id derivation cost was ~220 ms: all 10,000 PINs could be tried in about 37 minutes.',
  }
  return (
    <section className={`${stil.lesson} ${compact ? stil.compactLesson : ''}`}>
      <span className={stil.quoteMark} aria-hidden="true">
        “
      </span>
      <div>
        <Label>{tr ? 'Öğrendiğim şey' : 'What I learned'}</Label>
        <h2>“{lesson}”</h2>
        <p>{summaries[proje.slug]}</p>
      </div>
    </section>
  )
}
function Notes({ proje, dil }: { proje: Proje; dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <details className={stil.notes}>
      <summary>
        {tr
          ? 'Teknik notlar ve projenin kapsamı'
          : 'Technical notes and project scope'}
      </summary>
      <div>
        <h3>{tr ? 'Problem ve sorumluluğum' : 'The problem and my role'}</h3>
        <p>{t(proje.problem, dil)}</p>
        <p>{t(proje.benimIsim, dil)}</p>
        <h3>{tr ? 'Uygulama kararları' : 'Implementation decisions'}</h3>
        <ul>
          {tListe(proje.yaklasim, dil).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h3>{tr ? 'Sonuç ve öğrenim' : 'Outcome and learning'}</h3>
        <p>{t(proje.sonuc, dil)}</p>
        <p>{t(proje.ogrenilen, dil)}</p>
        {proje.kisit && <p>{t(proje.kisit, dil)}</p>}
      </div>
    </details>
  )
}
function Contributions({ slug, dil }: { slug: string; dil: Dil }) {
  const tr = dil === 'tr'
  const rows: Record<string, string[][]> = {
    karnova: tr
      ? [
          [
            'database',
            'Kazanım temelli veri modeli',
            'Sorular, müfredat kazanımları ve öğrenci cevapları aynı modelde.',
          ],
          [
            'sliders',
            'Gerçek veriye bağlı function calling',
            'Gemini API yanıtları, öğrencinin gerçek kazanım kayıtlarına bağlı.',
          ],
          [
            'shield',
            'Okullar arasında veri yalıtımı',
            'Multi-tenant kurulum ve rol tabanlı yetkilendirme.',
          ],
        ]
      : [
          [
            'database',
            'Objective-based data model',
            'Students, questions, curriculum objectives and answers in one model.',
          ],
          [
            'sliders',
            'Function calling grounded in real records',
            'Gemini answers are tied to actual student objective records.',
          ],
          [
            'shield',
            'Data isolation between schools',
            'Multi-tenant architecture and role-based access control.',
          ],
        ],
    'web-kutuphane': tr
      ? [
          [
            'code',
            'Express REST uçları',
            'Üyelik, giriş, kitap ve ödünç kayıtları için REST API.',
          ],
          [
            'database',
            'MongoDB & Mongoose',
            'Veri modelleri, ilişkiler ve şema doğrulama.',
          ],
          [
            'lock',
            'bcrypt & express-session',
            'Hash’lenmiş parolalar ve sunucu taraflı oturum yönetimi.',
          ],
        ]
      : [
          [
            'code',
            'Express REST endpoints',
            'API endpoints for membership, sign-in, books and loans.',
          ],
          [
            'database',
            'MongoDB & Mongoose',
            'Data models, relationships and schema validation.',
          ],
          [
            'lock',
            'bcrypt & express-session',
            'Hashed passwords and server-side session management.',
          ],
        ],
  }
  return (
    <div className={stil.contributionList}>
      {rows[slug]?.map(([icon, title, body]) => (
        <div key={title}>
          <span className={stil.featureIcon}>
            <Icon name={icon!} size={25} />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
function Result({ proje, dil }: { proje: Proje; dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <div className={stil.outcome}>
      <Label>{tr ? 'Sonuç' : 'Outcome'}</Label>
      <h2>
        {proje.slug === 'karnova'
          ? tr
            ? 'Kazanım bazlı raporlama ve adaptif içerik önerisi.'
            : 'Objective-level reporting and adaptive content recommendations.'
          : tr
            ? 'Katalog, üyelik, ödünç alma ve iade akışı.'
            : 'Catalogue, membership, lending and returns.'}
      </h2>
      <p>
        {proje.slug === 'karnova'
          ? tr
            ? 'Öğretmenler öğrencinin güçlü ve zayıf yönlerini daha net görerek, ihtiyacına uygun içerikle destekleyebiliyor.'
            : 'Teachers can identify strengths and gaps more clearly, then suggest content that meets the student’s needs.'
          : tr
            ? 'Kitapların müsaitlik durumu, üyelik ve oturum tabanlı yetkilendirme birlikte uçtan uca çalışıyor.'
            : 'Book availability, membership and session-based authorisation work together from end to end.'}
      </p>
    </div>
  )
}
function VaultLimits({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <section className={stil.limits}>
      <Label>{tr ? 'Açıkça paylaşmak' : 'Being transparent'}</Label>
      <h2>{tr ? 'Bilinen sınırlar.' : 'Known limitations.'}</h2>
      <div className={stil.limitGrid}>
        {(tr
          ? [
              'Anahtar süreç belleğinde; Keystore / Keychain’de değil.',
              'Pano otomatik temizlenmiyor.',
              'Ekran görüntüsü engellenmiyor.',
              'Arka planda otomatik kilit yok.',
            ]
          : [
              'Key in process memory, outside the OS keystore.',
              'Clipboard is not cleared automatically.',
              'Screenshots are not blocked.',
              'No auto-lock in the background.',
            ]
        ).map((x, i) => (
          <div key={x}>
            <Icon name={['cpu', 'file', 'layers', 'lock'][i]!} size={24} />
            <strong>{x}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
function Validation({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <section className={stil.validation}>
      <Label>{tr ? 'Doğrulama' : 'Technical validation'}</Label>
      <h2>{tr ? 'Test ettiğim senaryolar.' : 'Tests that matter.'}</h2>
      {(tr
        ? [
            'Şifrele–çöz turu',
            'Nonce rastgeleliği',
            'Yanlış parola reddi',
            'Kurcalama tespiti',
            'Anahtar türetme maliyeti',
          ]
        : [
            'Encryption round trip',
            'Nonce randomness',
            'Wrong-password rejection',
            'Tamper detection',
            'Key-derivation cost',
          ]
      ).map((x) => (
        <p key={x}>
          <Icon name="check" size={17} />
          {x}
        </p>
      ))}
    </section>
  )
}
function Features({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <div className={stil.features}>
      {(tr
        ? [
            [
              'chart',
              'Gelir–gider takibi',
              'İşlemleri kaydedin, sabit abonelikleri takip edin.',
            ],
            [
              'chart',
              'Kategori analizi',
              'Harcama dağılımını Canvas 2D grafiklerinde görün.',
            ],
            [
              'layers',
              'Tasarruf hedefleri',
              'TL, dolar, euro ve gram altında hedef belirleyin.',
            ],
            [
              'file',
              'CSV dışa aktarım',
              'Verilerinizi istediğiniz zaman dışa aktarın.',
            ],
          ]
        : [
            [
              'chart',
              'Income and expenses',
              'Track transactions and recurring subscriptions.',
            ],
            [
              'chart',
              'Category analysis',
              'See spending distribution in Canvas 2D charts.',
            ],
            [
              'layers',
              'Savings goals',
              'Set goals in lira, dollar, euro and gram gold.',
            ],
            [
              'file',
              'CSV export',
              'Export your records whenever you need them.',
            ],
          ]
      ).map(([icon, title, body]) => (
        <div key={title}>
          <Icon name={icon!} size={29} />
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  )
}
function CaseBody({ proje, dil }: { proje: Proje; dil: Dil }) {
  const tr = dil === 'tr',
    d = copy[proje.slug]![dil]
  const art = (region: 'detail' | 'diagram' = 'detail') => (
    <ReferenceArt
      page={proje.slug}
      dil={dil}
      region={region}
      className={stil.supportArt}
    />
  )
  if (proje.slug === 'karnova')
    return (
      <>
        <section className={`${stil.section} ${stil.karnovaProblem}`}>
          <div>
            <Label>{tr ? 'Problem' : 'The problem'}</Label>
            <h2>{d.problem}</h2>
            <p>
              {tr
                ? 'Öğretmen için öğrencinin hangi kazanımda takıldığını görünür kılmak.'
                : 'Make it clear which learning objectives a student needs help with.'}
            </p>
          </div>
          <p>
            {tr
              ? 'Geleneksel değerlendirme yöntemleri genellikle sadece sonucu gösterir. Oysa öğrencinin gerçek ihtiyacı, hangi kazanımda zorlandığını anlayıp doğru içerikle desteklenmektir. Karnova, bu süreci veri ve yapay zekâ ile görünür kılar.'
              : 'Traditional assessment often only shows the result. Understanding which objectives a student struggles with makes it possible to offer the right content. Karnova makes this visible through data and AI.'}
          </p>
        </section>
        <Flow steps={d.flow} dil={dil} />
        <section className={`${stil.section} ${stil.karnovaContribution}`}>
          <div>
            <Label>{tr ? 'Benim katkım' : 'My contribution'}</Label>
            <h2>{d.contribution}</h2>
            <p>
              {tr
                ? 'Ürünün teknik temelini oluştururken güvenli, ölçeklenebilir ve sürdürülebilir bir mimari hedefledim.'
                : 'I focused on a secure, scalable and maintainable technical foundation.'}
            </p>
            <Contributions slug={proje.slug} dil={dil} />
          </div>
          {art()}
        </section>
        <div className={stil.pairedOutcome}>
          <Result proje={proje} dil={dil} />
          <Lesson proje={proje} dil={dil} compact />
        </div>
      </>
    )
  if (proje.slug === 'smartscheduler')
    return (
      <>
        <section className={`${stil.section} ${stil.schedulerProblem}`}>
          <div>
            <Label>{tr ? 'Problem' : 'The problem'}</Label>
            <h2>{d.problem}</h2>
            <p>
              {tr
                ? 'Üniversitelerde ders programı oluştururken derslik kapasitesi, öğretim elemanlarının uygunlukları ve zaman çakışmaları birlikte değerlendirilmesi gereken karmaşık kısıtlardır.'
                : 'University timetables must satisfy room capacity, instructor availability and time constraints together.'}
            </p>
            <p>
              {tr
                ? 'Amacım, genetik algoritmanın ürettiği olası programları, kullanıcıların anlayabileceği ve güvenebileceği bir arayüzde sunmaktı.'
                : 'My goal was to present the genetic algorithm’s schedules through an interface that people can understand and trust.'}
            </p>
          </div>
          {art('diagram')}
        </section>
        <section className={`${stil.section} ${stil.schedulerContribution}`}>
          <div>
            <Label>{tr ? 'Benim katkım' : 'My contribution'}</Label>
            <h2>{d.contribution}</h2>
            <p>
              {tr
                ? 'Next.js arayüzü, haftalık ızgara, what-if senaryoları ve tiplenmiş API katmanında çalıştım.'
                : 'I worked on the Next.js interface, weekly grid, what-if scenarios and typed API layer.'}
            </p>
            <aside className={stil.info}>
              {tr
                ? 'Genetik algoritma motoru ve .NET servisleri ekip arkadaşlarımın çalışmasıdır.'
                : 'The genetic algorithm and .NET services were built by my teammates.'}
            </aside>
          </div>
          <div>
            <Label>{tr ? 'Nasıl çalışır?' : 'How it works'}</Label>
            <h3>
              {tr
                ? 'Basit bir akış, güçlü bir geri bildirim.'
                : 'A simple flow. Clear feedback.'}
            </h3>
            <Flow steps={d.flow} dil={dil} />
            {art()}
          </div>
        </section>
        <section className={stil.schedulerResults}>
          <Label>{tr ? 'Sonuçlar' : 'Results'}</Label>
          <h2>
            {tr
              ? 'Daha bilinçli planlama için kullanışlı araçlar.'
              : 'Useful tools for more informed planning.'}
          </h2>
          <div className={stil.features}>
            {(tr
              ? [
                  [
                    'calendar',
                    'Çakışmasız program görüntüleme',
                    'Kısıtları sağlanan tutarlı bir haftalık program.',
                  ],
                  [
                    'layers',
                    'Senaryo karşılaştırma',
                    'Farklı program alternatiflerini yan yana inceleme.',
                  ],
                  [
                    'download',
                    'Dışa aktarma',
                    'Programı paylaşılabilir dosya olarak dışa aktarma.',
                  ],
                ]
              : [
                  [
                    'calendar',
                    'Conflict-free schedule',
                    'A weekly timetable that satisfies the constraints.',
                  ],
                  [
                    'layers',
                    'Scenario comparison',
                    'Compare alternative schedules side by side.',
                  ],
                  [
                    'download',
                    'Export',
                    'Export the timetable as a shareable file.',
                  ],
                ]
            ).map(([icon, title, text]) => (
              <div key={icon}>
                <Icon name={icon!} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <Lesson proje={proje} dil={dil} />
      </>
    )
  if (proje.slug === 'sismik-analiz')
    return (
      <>
        <section className={`${stil.section} ${stil.seismicProblem}`}>
          <div>
            <h2>{d.problem}</h2>
            <p>
              {tr
                ? 'Deprem büyüklüğünün yalnızca geçmiş büyüklüklerden tahmin edilebilir olup olmadığını derin öğrenme modelleriyle inceledim.'
                : 'I examined whether past earthquake magnitudes alone can predict the next magnitude using deep learning.'}
            </p>
          </div>
          <MotionScope className={stil.metrics}>
            {[
              [31915, tr ? 'deprem kaydı' : 'earthquake records'],
              [20, tr ? 'adımlık pencere' : 'step windows'],
              [2, tr ? 'PyTorch modeli' : 'PyTorch models'],
            ].map(([n, label], i) => (
              <div key={i}>
                <Icon name={['database', 'layout', 'boxes'][i]!} />
                <strong>
                  <AnimatedNumber value={Number(n)} dil={dil} />
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </MotionScope>
        </section>
        <section className={stil.seismicProcess}>
          <Label>{tr ? 'Çalışma süreci' : 'Method and process'}</Label>
          <Flow steps={d.flow} dil={dil} />
        </section>
        <section className={`${stil.section} ${stil.seismicContribution}`}>
          <div>
            <h2>{tr ? 'Benim katkım.' : 'My contribution.'}</h2>
            <p>{d.contribution}</p>
            <aside className={stil.info}>
              {tr
                ? 'TensorFlow ve Bi-GRU çalışmaları ekipteki diğer üyelere ait.'
                : 'TensorFlow and Bi-GRU work belongs to other team members.'}
            </aside>
          </div>
          {art('diagram')}
        </section>
        <section className={`${stil.section} ${stil.seismicResults}`}>
          <div>
            <h2>
              {tr
                ? 'Bu kurulum büyüklüğü tahmin edemiyor.'
                : 'This setup cannot predict magnitude.'}
            </h2>
            <p>
              {tr
                ? 'Her iki model de test setinde düşük açıklama gücü elde etti. Geçmiş deprem büyüklükleri tek başına gelecek deprem büyüklüğünü tahmin etmek için yeterli görünmüyor.'
                : 'Both models showed low explanatory power on the test set. Past magnitudes alone do not appear sufficient to predict the next earthquake’s magnitude.'}
            </p>
          </div>
          {art()}
        </section>
        <section className={`${stil.section} ${stil.seismicLesson}`}>
          <div>
            <h2>{tr ? 'Öğrendiğim.' : 'What I learned.'}</h2>
            <p>
              {tr
                ? 'Veri sızıntısını önlemek, iyi görünen bir skordan daha değerli.'
                : 'Preventing data leakage matters more than a flattering score.'}
            </p>
          </div>
          <aside className={stil.info}>
            {tr
              ? 'Zaman serisi problemlerinde veri sızıntısı modelleri olduğundan daha başarılı gösterebilir. Zaman bazlı doğrulama ve doğru metrik, güvenilir bir değerlendirme için gerekli.'
              : 'Data leakage can make a model look better than it is. Time-based validation and the right metric are essential for trustworthy evaluation.'}
          </aside>
        </section>
      </>
    )
  if (proje.slug === 'fintrack')
    return (
      <>
        <section className={`${stil.section} ${stil.financeIntro}`}>
          <div>
            <h2>{d.problem}</h2>
            <p>
              {tr
                ? 'Modern tarayıcınızda tamamen yerel çalışan hafif bir bütçe takip uygulaması. Verileriniz sadece sizin tarayıcınızda saklanır.'
                : 'A lightweight budget tracker that runs locally in your browser. Your data stays on your device.'}
            </p>
          </div>
          <MotionScope className={stil.metrics}>
            {[
              [639, tr ? 'satır' : 'lines'],
              [33, 'KB'],
              [0, tr ? 'bağımlılık' : 'dependencies'],
            ].map(([n, label], i) => (
              <div key={i}>
                <Icon name={['code', 'file', 'lock'][i]!} />
                <strong>
                  {i === 1 ? '~' : ''}
                  <AnimatedNumber value={Number(n)} />
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </MotionScope>
        </section>
        <section className={stil.featureSection}>
          <h2>{tr ? 'Nasıl kurdum?' : 'How I built it.'}</h2>
          <p>
            {tr
              ? 'Basit ama sağlam bir yapı ile tarayıcıda tamamen yerel çalışıyor.'
              : 'A simple, solid structure running entirely in your browser.'}
          </p>
          <Flow steps={d.flow} dil={dil} />
        </section>
        <section className={`${stil.section} ${stil.financeFeatures}`}>
          <div>
            <h2>{tr ? 'Neler yapabiliyor?' : 'What it can do.'}</h2>
            <Features dil={dil} />
          </div>
          <div>
            {art()}
            <aside className={stil.info}>
              {tr
                ? 'Finansal asistan yapay zekâ değil; kural tabanlı eşik kontrolüdür. Döviz kuru isteği dışında hiçbir finans verisi sunucuya gönderilmez.'
                : 'The financial assistant uses hand-written rules, not AI. Apart from exchange-rate requests, no financial data is sent to a server.'}
            </aside>
          </div>
        </section>
        <Lesson proje={proje} dil={dil} />
      </>
    )
  if (proje.slug === 'web-kutuphane')
    return (
      <>
        <section className={stil.section}>
          <div>
            <h2>{d.problem}</h2>
            <p>
              {tr
                ? 'Kitapların müsaitlik durumu takip edilir; her kitap aynı anda yalnızca bir kişide olabilir. Giriş yapan kullanıcılar sadece kendi ödünç alma kayıtlarını görebilir.'
                : 'Book availability is tracked. Each book can only have one active borrower. Signed-in users can see only their own loan records.'}
            </p>
          </div>
          {art()}
        </section>
        <section className={stil.section}>
          <div>
            <h2>{tr ? 'Veri modeli.' : 'Data model.'}</h2>
            <p>
              {tr
                ? 'Üyeler, kitaplar ve ödünç kayıtları. Her ödünç kaydı bir üyeyi bir kitaba bağlar; aynı kitap için tek aktif kayıt bulunur.'
                : 'Members, books and loans. Each loan connects one member to one book. A book can have only one active loan.'}
            </p>
          </div>
          {art('diagram')}
        </section>
        <section className={`${stil.section} ${stil.libraryContribution}`}>
          <div>
            <h2>{tr ? 'Benim katkım.' : 'My contribution.'}</h2>
            <p>{d.contribution}</p>
            <Contributions slug={proje.slug} dil={dil} />
          </div>
          <div>
            <h2>{tr ? 'Güvenli oturum akışı.' : 'Secure session flow.'}</h2>
            <p>
              {tr
                ? 'bcrypt ile parola kontrolü, express-session ile sunucu taraflı oturum.'
                : 'Password checking with bcrypt and server-side sessions with express-session.'}
            </p>
            <Flow steps={d.flow} dil={dil} />
          </div>
        </section>
        <div className={stil.pairedOutcome}>
          <Result proje={proje} dil={dil} />
          <Lesson proje={proje} dil={dil} compact />
        </div>
      </>
    )
  return (
    <>
      <section className={`${stil.section} ${stil.vaultIntro}`}>
        <div>
          <h2>{d.problem}</h2>
          <p>
            {tr
              ? 'Her kullanıcının kendi yerel kasası var. Ana paroladan türetilen anahtar ile veriler yalnızca cihazda şifrelenir ve çözülür.'
              : 'Each user has a separate local vault. A key derived from the master password encrypts and decrypts records on the device.'}
          </p>
        </div>
        <div>
          <Flow steps={d.flow} dil={dil} />
          <p className={stil.caption}>
            {tr
              ? 'Her kullanıcı için rastgele salt; her yazmada yeni nonce. Argon2id: 19 MiB, 2 tur.'
              : 'Random salt per user and a fresh nonce for every write. Argon2id: 19 MiB, 2 passes.'}
          </p>
        </div>
      </section>
      <section className={`${stil.section} ${stil.vaultValidation}`}>
        <div>
          <h2>{tr ? 'Benim katkım.' : 'My contribution.'}</h2>
          <p>
            {tr
              ? 'Flutter uygulaması, şifreleme katmanı ve eski düz metin kayıtlarını güvenle şifreleyen veri göçü bana ait.'
              : 'I built the Flutter app, encryption layer and migration that securely encrypts old plaintext records.'}
          </p>
          <p>
            {tr
              ? 'Parola veya hash’i saklanmaz; giriş, şifreli sabit bir işaretin çözülmesiyle doğrulanır.'
              : 'Neither the password nor its hash is stored. Login is verified by decrypting a fixed encrypted marker.'}
          </p>
        </div>
        <Validation dil={dil} />
      </section>
      <VaultLimits dil={dil} />
      <Lesson proje={proje} dil={dil} />
    </>
  )
}

export default function ProjeDetay({ proje, dil }: { proje: Proje; dil: Dil }) {
  const tr = dil === 'tr',
    d = copy[proje.slug]![dil],
    index = PROJELER.findIndex((p) => p.slug === proje.slug)
  const previous =
    proje.slug === 'karnova'
      ? PROJELER.find((p) => p.slug === 'fintrack')!
      : PROJELER[(index - 1 + PROJELER.length) % PROJELER.length]!
  const next = PROJELER[(index + 1) % PROJELER.length]!
  const metaScope =
    proje.slug === 'karnova'
      ? tr
        ? '3 kişi'
        : '3 people'
      : proje.slug === 'smartscheduler'
        ? tr
          ? '5 kişi · Scrum'
          : '5 people · Scrum'
        : proje.slug === 'sismik-analiz'
          ? tr
            ? '4 kişi'
            : '4 people'
          : tr
            ? 'Bireysel'
            : 'Solo project'
  const heroSummary: Record<string, string> = {
    karnova: tr
      ? 'Kazanım bazlı analiz ve adaptif içerikle kişiselleşen eğitim.'
      : 'Learning-objective analysis and adaptive content for individual learners.',
    smartscheduler: tr
      ? 'Genetik algoritmanın çıktısını, güvenilir bir ders programı arayüzüne dönüştürmek.'
      : 'Turning a genetic algorithm’s output into a timetable people can trust.',
    'sismik-analiz': tr
      ? 'Deprem büyüklüğü, yalnızca geçmiş büyüklüklerden tahmin edilebilir mi?'
      : 'Can past earthquake magnitudes alone predict the next magnitude?',
    fintrack: tr
      ? 'Tek HTML dosyasında, sıfır bağımlılıkla kişisel bütçe takibi.'
      : 'Personal budget tracking in one HTML file with zero dependencies.',
    'web-kutuphane': tr
      ? 'Kitap ödünç alma, üyelik ve elle kurulan kimlik doğrulama.'
      : 'Book lending, membership and authentication built by hand.',
    'sifre-kasam': tr
      ? 'Flutter ile çok kullanıcılı, tamamen çevrimdışı şifre yöneticisi.'
      : 'An offline, multi-user password manager built with Flutter.',
  }
  return (
    <article
      className={`kabuk ${stil.page} ${stil[proje.slug.replaceAll('-', '')]} ${stil.shared}`}
    >
      <header className={stil.hero}>
        <div className={stil.heroCopy}>
          <Link href={`${anaSayfaYolu(dil)}#calismalar`} className={stil.back}>
            ← {tr ? 'Tüm çalışmalar' : 'All projects'}
          </Link>
          <h1>
            {proje.ad}
            <span>.</span>
          </h1>
          <p className={stil.headline}>{d.headline}</p>
          <p className={stil.summary}>{heroSummary[proje.slug]}</p>
          <dl className={stil.meta}>
            {[
              [
                tr ? 'Rol' : 'Role',
                proje.slug === 'karnova'
                  ? tr
                    ? 'Backend & Yapay zekâ'
                    : 'Backend & AI'
                  : t(proje.rol, dil),
                'user',
              ],
              [tr ? 'Kapsam' : 'Scope', metaScope, 'layers'],
              [tr ? 'Yıl' : 'Year', proje.yil, 'calendar'],
            ].map(([label, value, icon]) => (
              <div key={label}>
                <Icon name={icon!} size={23} />
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {(proje.repo || proje.canli) && !proje.repoNot && (
            <div className={stil.links}>
              {proje.canli && (
                <a href={proje.canli} className={stil.primary}>
                  {tr ? 'Canlı demoyu aç' : 'Open live demo'} ↗
                </a>
              )}
              {proje.repo && (
                <a
                  href={proje.repo}
                  className={proje.canli ? stil.secondary : stil.primary}
                >
                  <Icon name="github" size={19} />
                  {tr ? 'Kaynak kodu incele' : 'Explore source code'} →
                </a>
              )}
            </div>
          )}
        </div>
        <div className={stil.heroVisual}>
          <ProjectVisual slug={proje.slug} dil={dil} />
        </div>
      </header>
      <CaseBody proje={proje} dil={dil} />
      <section className={stil.stack}>
        <h2>{tr ? 'Teknolojiler.' : 'Tech stack.'}</h2>
        <ul>
          {proje.stack
            .filter((item) => item !== 'sqflite')
            .map((item) => (
              <li key={item}>
                <TechLogo name={item} />
                {item === 'Google Gemini API'
                  ? 'Gemini API'
                  : item === 'Canvas 2D API'
                    ? 'Canvas 2D'
                    : item}
              </li>
            ))}
        </ul>
      </section>
      <Notes proje={proje} dil={dil} />
      <nav
        className={`${stil.projectNav} ${proje.slug === 'karnova' ? stil.karnovaNav : ''}`}
        aria-label={tr ? 'Projeler arasında gezinme' : 'Browse projects'}
      >
        <Link href={projeYolu(previous.slug, dil)}>
          <span className={stil.navArrow}>←</span>
          <div>
            <small>{tr ? 'Önceki proje' : 'Previous project'}</small>
            <strong>{previous.ad}</strong>
            <p>{t(previous.kenarNotu, dil).replace('\n', ' · ')}</p>
          </div>
        </Link>
        {proje.slug === 'karnova' && (
          <>
            <div className={stil.docsCard}>
              <a href={proje.repo}>
                <Icon name="file" size={24} />
                <span>
                  {tr ? 'Mimari dokümantasyonu' : 'Architecture documentation'}{' '}
                  ↗
                  <small>
                    {tr
                      ? 'Sistem mimarisi, veri modeli ve API yapısı.'
                      : 'System architecture, data model and API.'}
                  </small>
                </span>
              </a>
            </div>
            <p className={stil.privateNote}>
              {tr
                ? 'Kaynak kod özel; mimari dokümantasyonu açık.'
                : 'Source code is private; architecture documentation is public.'}
            </p>
          </>
        )}
        <Link
          href={
            proje.slug === 'sifre-kasam'
              ? `${anaSayfaYolu(dil)}#calismalar`
              : projeYolu(next.slug, dil)
          }
          className={stil.nextProject}
        >
          <span className={stil.navArrow}>→</span>
          <div>
            <small>{tr ? 'Sonraki proje' : 'Next project'}</small>
            <strong>
              {proje.slug === 'sifre-kasam'
                ? tr
                  ? 'Tüm çalışmalar'
                  : 'All projects'
                : next.ad}
            </strong>
            <p>
              {proje.slug === 'sifre-kasam'
                ? tr
                  ? 'Diğer projeleri keşfet.'
                  : 'Explore other projects.'
                : t(next.kenarNotu, dil).replace('\n', ' · ')}
            </p>
          </div>
        </Link>
      </nav>
      {proje.slug === 'sifre-kasam' && (
        <aside className={stil.contact}>
          <div>
            <h2>
              {tr
                ? 'Başka projeleri de görmek ister misiniz?'
                : 'Would you like to explore more projects?'}
            </h2>
            <p>
              {tr
                ? 'Çalışmaları inceleyebilir, fikirlerinizi paylaşabilirsiniz.'
                : 'Explore my work and share your ideas.'}
            </p>
          </div>
          <Link href={`${anaSayfaYolu(dil)}#iletisim`}>
            {tr ? 'İletişime geç' : 'Get in touch'} →
          </Link>
        </aside>
      )}
    </article>
  )
}
