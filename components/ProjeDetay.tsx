import Link from 'next/link'
import { PROJELER, type Proje } from '@/content/projeler'
import { anaSayfaYolu, projeYolu, t, tListe, type Dil } from '@/lib/i18n'
import ProjectVisual from './ProjectVisual'
import Icon from './Icon'
import stil from './ProjeDetay.module.css'

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
      headline: 'Beyond grades. Built around the learner.',
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
    <div
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
          <strong>{step}</strong>
          {i < steps.length - 1 && (
            <span className={stil.flowArrow} aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function Architecture({ slug, dil }: { slug: string; dil: Dil }) {
  const tr = dil === 'tr'
  if (slug === 'web-kutuphane')
    return (
      <div
        className={stil.entities}
        aria-label={tr ? 'Veri modeli' : 'Data model'}
      >
        {[
          [
            tr ? 'Üye' : 'Member',
            '_id',
            tr ? 'ad · e-posta' : 'name · email',
            tr ? 'parola (hash)' : 'password (hash)',
          ],
          [
            tr ? 'Kitap' : 'Book',
            '_id',
            tr ? 'başlık · yazar' : 'title · author',
            tr ? 'durum' : 'status',
          ],
          [
            tr ? 'Ödünç kaydı' : 'Loan',
            tr ? 'üye (ref)' : 'member (ref)',
            tr ? 'kitap (ref)' : 'book (ref)',
            tr ? 'ödünç · iade tarihi' : 'borrowed · returned',
          ],
        ].map((entity, i) => (
          <div key={entity[0]}>
            <Icon
              name={i === 0 ? 'user' : i === 1 ? 'book' : 'file'}
              size={25}
            />
            <strong>{entity[0]}</strong>
            {entity.slice(1).map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
        ))}
      </div>
    )
  if (slug === 'sismik-analiz')
    return (
      <div className={stil.models}>
        {['Bi-LSTM', 'Attention LSTM'].map((model, i) => (
          <div key={model}>
            <strong>{model}</strong>
            <div className={stil.modelFlow}>
              <span>20 × 1</span>
              <b>→</b>
              <span>
                LSTM
                <br />
                LSTM
              </span>
              <b>→</b>
              <span>{i ? 'Attention' : 'Dense'}</span>
              <b>→</b>
              <span>ŷ</span>
            </div>
            <small>R² = {i ? '0.02' : '0.10'}</small>
          </div>
        ))}
      </div>
    )
  if (slug === 'karnova')
    return (
      <div className={stil.objectives}>
        <span className={stil.eyebrow}>
          {tr ? 'Kazanım temelli veri modeli' : 'Objective-based data model'}
        </span>
        <strong>{tr ? 'Öğrenci' : 'Student'}</strong>
        <span className={stil.connector}>↓</span>
        <div>
          <span>{tr ? 'Soru' : 'Question'}</span>
          <span>{tr ? 'Cevap' : 'Answer'}</span>
          <span>{tr ? 'Kazanım' : 'Objective'}</span>
        </div>
        <span className={stil.connector}>↓</span>
        <strong>
          {tr
            ? 'Gerçek veriye bağlı öneriler'
            : 'Suggestions grounded in real data'}
        </strong>
        <small>REST API · Gemini function calling · RBAC</small>
      </div>
    )
  return null
}

export default function ProjeDetay({ proje, dil }: { proje: Proje; dil: Dil }) {
  const tr = dil === 'tr'
  const design = copy[proje.slug]![dil]
  const index = PROJELER.findIndex((item) => item.slug === proje.slug)
  const previous = PROJELER[(index - 1 + PROJELER.length) % PROJELER.length]!
  const next = PROJELER[(index + 1) % PROJELER.length]!
  const scheduler = proje.slug === 'smartscheduler'
  const seismic = proje.slug === 'sismik-analiz'
  const vault = proje.slug === 'sifre-kasam'
  return (
    <article
      className={`kabuk ${stil.page} ${scheduler ? stil.scheduler : ''} ${seismic ? stil.seismic : ''} ${vault ? stil.vault : ''}`}
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
          <p className={stil.headline}>{design.headline}</p>
          <p className={stil.summary}>{t(proje.ozet, dil)}</p>
          <dl className={stil.meta}>
            {[
              [tr ? 'Rol' : 'Role', t(proje.rol, dil), 'user'],
              [tr ? 'Kapsam' : 'Scope', t(proje.tur, dil), 'layers'],
              [tr ? 'Yıl' : 'Year', proje.yil, 'calendar'],
            ].map(([label, value, icon]) => (
              <div key={label}>
                <Icon name={icon!} size={23} />
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {(proje.repo || proje.canli) && (
            <div className={stil.links}>
              {proje.canli && (
                <a href={proje.canli} className={stil.primary}>
                  {tr ? 'Canlı demoyu aç' : 'Open live demo'}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {proje.repo && (
                <a
                  href={proje.repo}
                  className={proje.canli ? stil.secondary : stil.primary}
                >
                  <Icon name={proje.repoNot ? 'file' : 'github'} size={19} />
                  {proje.repoNot
                    ? tr
                      ? 'Mimari dokümantasyonu'
                      : 'Architecture docs'
                    : tr
                      ? 'Kaynak kodu incele'
                      : 'Explore the source'}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
          {proje.repoNot && (
            <p className={stil.repoNote}>{t(proje.repoNot, dil)}</p>
          )}
        </div>
        <div className={stil.heroVisual}>
          <ProjectVisual slug={proje.slug} dil={dil} />
        </div>
      </header>
      <section className={`${stil.section} ${stil.problem}`}>
        <div>
          <span className={stil.eyebrow}>{tr ? 'Problem' : 'The problem'}</span>
          <h2>{design.problem}</h2>
          <p>{t(proje.problem, dil)}</p>
        </div>
        {seismic || proje.slug === 'fintrack' ? (
          <div className={stil.metrics}>
            {(seismic
              ? [
                  ['31.915', tr ? 'deprem kaydı' : 'earthquake records'],
                  ['20', tr ? 'adımlık pencere' : 'step windows'],
                  ['2', tr ? 'PyTorch modeli' : 'PyTorch models'],
                ]
              : [
                  ['639', tr ? 'satır' : 'lines'],
                  ['~33 KB', tr ? 'tek HTML dosyası' : 'one HTML file'],
                  ['0', tr ? 'bağımlılık' : 'dependencies'],
                ]
            ).map(([value, label]) => (
              <div key={label}>
                <Icon name="layers" size={26} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <Architecture slug={proje.slug} dil={dil} />
        )}
      </section>
      <section className={stil.process}>
        <span className={stil.eyebrow}>
          {tr ? 'Nasıl çalışır?' : 'How it works'}
        </span>
        <h2>
          {tr
            ? 'Basit bir akış, güçlü bir temel.'
            : 'A clear flow. A solid foundation.'}
        </h2>
        <Flow steps={design.flow} dil={dil} />
      </section>
      <section className={`${stil.section} ${stil.contribution}`}>
        <div>
          <span className={stil.eyebrow}>
            {tr ? 'Benim katkım' : 'My contribution'}
          </span>
          <h2>{design.contribution}</h2>
          <p>{t(proje.benimIsim, dil)}</p>
          {seismic && <Architecture slug={proje.slug} dil={dil} />}
        </div>
        <div className={stil.approach}>
          {tListe(proje.yaklasim, dil).map((item, i) => (
            <div key={item}>
              <span className={stil.number}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={`${stil.section} ${stil.results}`}>
        <div>
          <span className={stil.eyebrow}>{tr ? 'Sonuç' : 'The outcome'}</span>
          <h2>
            {seismic
              ? tr
                ? 'Bu kurulum büyüklüğü tahmin edemiyor.'
                : 'This setup cannot predict magnitude.'
              : tr
                ? 'Fikirden çalışan bir ürüne.'
                : 'From an idea to a working product.'}
          </h2>
          <p>{t(proje.sonuc, dil)}</p>
        </div>
        {seismic ? (
          <div className={stil.scoreCards}>
            <div>
              <span>Bi-LSTM</span>
              <strong>R² = 0.10</strong>
              <small>
                {tr ? 'Düşük açıklama gücü' : 'Low explanatory power'}
              </small>
            </div>
            <div>
              <span>Attention LSTM</span>
              <strong>R² = 0.02</strong>
              <small>
                {tr ? 'Düşük açıklama gücü' : 'Low explanatory power'}
              </small>
            </div>
          </div>
        ) : proje.slug === 'fintrack' ? (
          <div className={stil.resultVisual}>
            <ProjectVisual slug={proje.slug} dil={dil} compact />
          </div>
        ) : (
          <div className={stil.resultMark}>
            <Icon name={vault ? 'shield' : 'check'} size={47} />
            <strong>
              {vault ? 'AES-256-GCM' : tr ? 'Uçtan uca.' : 'End to end.'}
            </strong>
            <span>
              {vault
                ? tr
                  ? 'Tamamen çevrimdışı'
                  : 'Entirely offline'
                : t(proje.kenarNotu, dil).replace('\n', ' · ')}
            </span>
          </div>
        )}
      </section>
      {proje.kisit && (
        <section className={stil.limits}>
          <span className={stil.eyebrow}>
            {tr ? 'Açıkça paylaşmak' : 'Being transparent'}
          </span>
          <h2>{tr ? 'Bilinen sınırlar.' : 'Known limitations.'}</h2>
          <p>{t(proje.kisit, dil)}</p>
          {vault && (
            <div className={stil.limitGrid}>
              {(tr
                ? [
                    'Anahtar süreç belleğinde; OS güvenli deposunda değil.',
                    'Pano otomatik temizlenmiyor.',
                    'Ekran görüntüsü engellenmiyor.',
                    'Arka planda otomatik kilit yok.',
                  ]
                : [
                    'Key in process memory, outside the OS keystore.',
                    'Clipboard is not cleared automatically.',
                    'Screenshots are not blocked.',
                    'No automatic locking in the background.',
                  ]
              ).map((item, i) => (
                <div key={item}>
                  <Icon
                    name={['cpu', 'file', 'layers', 'lock'][i]!}
                    size={25}
                  />
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      <section className={stil.lesson}>
        <span className={stil.quoteMark} aria-hidden="true">
          “
        </span>
        <div>
          <span className={stil.eyebrow}>
            {tr ? 'Öğrendiğim şey' : 'What I learned'}
          </span>
          <h2>“{design.lesson}”</h2>
          <p>{t(proje.ogrenilen, dil)}</p>
        </div>
      </section>
      <section className={stil.stack}>
        <h2>
          {tr ? 'Teknolojiler' : 'Technologies'}
          <span>.</span>
        </h2>
        <ul>
          {proje.stack.map((item, i) => (
            <li key={item}>
              <span aria-hidden="true">{['◈', '⌘', '▧', '◇'][i % 4]}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <nav
        className={stil.projectNav}
        aria-label={tr ? 'Projeler arasında gezinme' : 'Browse projects'}
      >
        {[
          {
            project: previous,
            label: tr ? 'Önceki proje' : 'Previous project',
            arrow: '←',
          },
          {
            project: next,
            label: tr ? 'Sonraki proje' : 'Next project',
            arrow: '→',
          },
        ].map(({ project, label, arrow }, i) => (
          <Link
            key={project.slug}
            href={projeYolu(project.slug, dil)}
            className={i ? stil.nextProject : ''}
          >
            <span className={stil.navArrow} aria-hidden="true">
              {arrow}
            </span>
            <div>
              <small>{label}</small>
              <strong>{project.ad}</strong>
              <p>{t(project.kenarNotu, dil).replace('\n', ' · ')}</p>
            </div>
          </Link>
        ))}
      </nav>
      {vault && (
        <aside className={stil.contact}>
          <div>
            <h2>
              {tr
                ? 'Başka projeleri de görmek ister misiniz?'
                : 'Let’s talk about your next idea.'}
            </h2>
            <p>
              {tr
                ? 'Farklı alanlarda geliştirdiğim çalışmaları inceleyebilir, fikirlerinizi paylaşabilirsiniz.'
                : 'Explore my work across different fields and share what you have in mind.'}
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
