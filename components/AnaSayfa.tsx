import Link from 'next/link'
import { PROJELER } from '@/content/projeler'
import { CV, ILETISIM, PROFIL, YAKLASIM } from '@/content/profil'
import { projeYolu, t, type Dil } from '@/lib/i18n'
import Hero from './Hero'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'
import ProjectThumb from './ProjectThumb'
import IletisimFormu from './IletisimFormu'
import stil from './AnaSayfa.module.css'

const summaries: Record<string, { tr: string; en: string }> = {
  karnova: {
    tr: 'Öğrenciyi anlayan eğitim platformu.',
    en: 'A learning platform that understands the student.',
  },
  smartscheduler: {
    tr: 'Karmaşık planlar, anlaşılır arayüzler.',
    en: 'Complex schedules, understandable interfaces.',
  },
  'sismik-analiz': {
    tr: 'Deprem verisinde dürüst model değerlendirmesi.',
    en: 'Honest model evaluation with earthquake data.',
  },
  fintrack: {
    tr: 'Sıfır bağımlılıkla bütçe takibi.',
    en: 'Budget tracking with zero dependencies.',
  },
  'web-kutuphane': {
    tr: 'Kitaplar, üyeler ve ödünç kayıtları.',
    en: 'Books, members and lending records.',
  },
  'sifre-kasam': {
    tr: 'Çevrimdışı, şifreli parola kasası.',
    en: 'An offline, encrypted password vault.',
  },
}
const principleTitles = {
  tr: [
    'Önce doğru metriği bulurum.',
    'Negatif sonucu saklamam.',
    'Bağımlılığın altına bakarım.',
  ],
  en: [
    'Find the right metric.',
    'Report negative results honestly.',
    'Look underneath the dependency.',
  ],
}
const tools = [
  {
    icon: 'server',
    title: { tr: 'Backend', en: 'Backend' },
    names: ['Django', 'ASP.NET Core', 'Node.js'],
  },
  {
    icon: 'layout',
    title: { tr: 'Arayüz', en: 'Interfaces' },
    names: ['Next.js', 'React', 'Flutter'],
  },
  {
    icon: 'database',
    title: { tr: 'Veri', en: 'Data' },
    names: ['PostgreSQL', 'MongoDB', 'SQLite', 'PyTorch'],
  },
  {
    icon: 'tool',
    title: { tr: 'Araçlar', en: 'Tools' },
    names: ['Git', 'Docker', 'GitHub Actions'],
  },
  {
    icon: 'boxes',
    title: { tr: 'Önceki çalışmalar', en: 'Earlier work' },
    names: ['Unity', 'C++', 'Java'],
  },
]
const technologyColors: Record<string, string> = {
  Django: '#168371',
  'ASP.NET Core': '#6d42cb',
  'Node.js': '#599e3b',
  'Next.js': '#15223b',
  React: '#1697bb',
  Flutter: '#288be4',
  PostgreSQL: '#3b6f9d',
  MongoDB: '#45964d',
  SQLite: '#348ec8',
  PyTorch: '#ed6a39',
  Git: '#ef6b48',
  Docker: '#268cc6',
  'GitHub Actions': '#488be9',
  Unity: '#25364d',
  'C++': '#2f72ad',
  Java: '#dc733d',
}

export default function AnaSayfa({ dil }: { dil: Dil }) {
  const featured = PROJELER.slice(0, 2),
    more = PROJELER.slice(2)
  return (
    <>
      <Hero dil={dil} />
      <section id="calismalar" className={'kabuk ' + stil.work}>
        <div className={stil.sectionHeading}>
          <h2>{dil === 'tr' ? 'Koddan fazlası.' : 'Beyond the code.'}</h2>
          <p>{dil === 'tr' ? 'Seçilmiş projeler' : 'Selected projects'}</p>
        </div>
        <div className={stil.featured}>
          {featured.map((p) => (
            <article key={p.slug} className={stil.featuredCard}>
              <ProjectVisual slug={p.slug} dil={dil} compact />
              <Link href={projeYolu(p.slug, dil)} className={stil.projectLink}>
                <div>
                  <h3>{p.ad}</h3>
                  <p>{t(summaries[p.slug]!, dil)}</p>
                  <span>{t(p.rol, dil)}</span>
                </div>
                <span className={stil.roundArrow} aria-hidden="true">
                  <Icon name="arrow-right" size={23} />
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className={stil.more}>
          {more.map((p) => (
            <Link
              key={p.slug}
              href={projeYolu(p.slug, dil)}
              className={stil.smallCard}
            >
              <ProjectThumb slug={p.slug} />
              <h3>{p.ad}</h3>
              <p>{t(summaries[p.slug]!, dil)}</p>
              <span className={stil.smallMeta}>
                {p.slug === 'sismik-analiz'
                  ? 'Python · PyTorch'
                  : p.slug === 'fintrack'
                    ? 'JavaScript · Canvas 2D'
                    : p.slug === 'web-kutuphane'
                      ? 'Node.js · MongoDB'
                      : 'Flutter · Dart'}
                <span aria-hidden="true">
                  <Icon name="arrow-right" size={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section id="yaklasim" className={'kabuk ' + stil.approach}>
        <div className={stil.sectionHeading}>
          <h2>{dil === 'tr' ? 'Nasıl çalışırım?' : 'How I work.'}</h2>
          <p>
            {dil === 'tr'
              ? 'Teknolojiyi, gerçek problemlere sade ve sürdürülebilir çözümler üretmek için kullanırım.'
              : 'I use technology to build clear, sustainable solutions to real problems.'}
          </p>
        </div>
        <div className={stil.principles}>
          {YAKLASIM.map((p, i) => (
            <article key={p.kanit}>
              <span className={stil.principleIcon}>
                <Icon name={['chart', 'document', 'boxes'][i]!} size={38} />
              </span>
              <h3>{principleTitles[dil][i]}</h3>
              <p>{t(p.metin, dil)}</p>
              <Link href={projeYolu(p.kanit, dil)} className={stil.evidence}>
                {PROJELER.find((project) => project.slug === p.kanit)!.ad}
                <Icon name="external" size={13} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section id="hakkimda" className={'kabuk ' + stil.about}>
        <div className={stil.aboutCopy}>
          <h2>{dil === 'tr' ? 'Hakkımda.' : 'About me.'}</h2>
          <p>
            {dil === 'tr'
              ? 'Topkapı Üniversitesi’nde yazılım mühendisliği okuyorum. Backend, yapay zekâ ve arayüzler üzerine çalışıyorum.'
              : 'I study software engineering at Topkapı University. I work across backend, AI and interfaces.'}
          </p>
        </div>
        <div className={stil.aboutFact}>
          <Icon name="graduation" size={27} />
          <div>
            <h3>{dil === 'tr' ? 'Eğitim' : 'Education'}</h3>
            <p>
              {dil === 'tr' ? 'Topkapı Üniversitesi' : 'Topkapı University'}
              <br />
              {dil === 'tr' ? 'Yazılım Mühendisliği' : 'Software Engineering'}
              <br />
              2023 – 2027
            </p>
          </div>
        </div>
        <div className={stil.aboutFact}>
          <Icon name="location" size={26} />
          <div>
            <h3>{dil === 'tr' ? 'Konum' : 'Location'}</h3>
            <p>
              {t(PROFIL.konum, dil)}
              <br />
              {dil === 'tr'
                ? 'Staj ve yeni mezun pozisyonlarına açığım.'
                : 'Open to internships and new-graduate roles.'}
            </p>
          </div>
        </div>
      </section>
      <section id="yigin" className={'kabuk ' + stil.stack}>
        <div className={stil.sectionHeading}>
          <h2>
            {dil === 'tr'
              ? 'Birlikte kullandığım araçlar.'
              : 'Tools I build with.'}
          </h2>
          <p>
            {dil === 'tr'
              ? 'Projelere göre farklı araçlar ve teknolojiler kullanıyorum.'
              : 'Different tools for different problems.'}
          </p>
        </div>
        <div className={stil.toolGroups}>
          {tools.map((group, i) => (
            <div
              key={group.icon}
              className={stil.toolGroup}
              id={i === 4 ? 'arsiv' : undefined}
            >
              <h3>
                <Icon name={group.icon} size={21} />
                {t(group.title, dil)}
              </h3>
              <ul>
                {group.names.map((name) => (
                  <li key={name}>
                    <span
                      style={{ color: technologyColors[name] }}
                      aria-hidden="true"
                    >
                      {name === 'Django'
                        ? 'dj'
                        : name === 'React'
                          ? '⚛'
                          : name === 'Docker'
                            ? '▥'
                            : name === 'Java'
                              ? '♨'
                              : name === 'MongoDB'
                                ? '◆'
                                : name === 'C++'
                                  ? 'C⁺'
                                  : name.slice(0, 1)}
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={stil.languages}>
          <span>{dil === 'tr' ? 'Diller' : 'Languages'}</span>TypeScript ·
          JavaScript · Python · C# · Java · C · C++ · Dart · SQL
        </p>
      </section>
      <section id="iletisim" className={'kabuk ' + stil.contactWrap}>
        <div className={stil.contact}>
          <div className={stil.contactCopy}>
            <h2>
              {dil === 'tr' ? (
                <>
                  Birlikte ne
                  <br />
                  geliştirebiliriz?
                </>
              ) : (
                'What could we build together?'
              )}
            </h2>
            <p>
              {dil === 'tr'
                ? 'Fikirlerini dinlemek, yeni projeler konuşmak ve birlikte üretmek için buradayım.'
                : 'I am here to listen, talk about new projects and build together.'}
            </p>
            <div className={stil.contactLinks}>
              <a href={'mailto:' + ILETISIM.eposta}>
                <Icon name="mail" size={22} />
                {ILETISIM.eposta}
              </a>
              <a href={ILETISIM.github}>
                <Icon name="github" size={22} />
                {dil === 'tr'
                  ? 'GitHub profilimi ziyaret et'
                  : 'Visit my GitHub'}
                <Icon name="external" size={15} />
              </a>
              <a href={ILETISIM.linkedin}>
                <Icon name="linkedin" size={22} />
                {dil === 'tr'
                  ? 'LinkedIn profilimi ziyaret et'
                  : 'Visit my LinkedIn'}
                <Icon name="external" size={15} />
              </a>
              <a href={CV[dil]} download>
                <Icon name="document" size={22} />
                {dil === 'tr' ? 'CV’mi indir' : 'Download CV'}
              </a>
            </div>
            <p className={stil.availability}>{t(PROFIL.durum, dil)}</p>
          </div>
          <IletisimFormu dil={dil} />
        </div>
      </section>
    </>
  )
}
