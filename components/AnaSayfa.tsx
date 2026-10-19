import Link from 'next/link'
import { PROJELER } from '@/content/projeler'
import { CV, ILETISIM, PROFIL, YAKLASIM } from '@/content/profil'
import { projeYolu, t, type Dil } from '@/lib/i18n'
import Hero from './Hero'
import MotionScope from './MotionScope'
import TechLogo from './TechLogo'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'
import ProjectThumb from './ProjectThumb'
import IletisimFormu from './IletisimFormu'
import stil from './AnaSayfa.module.css'

const summaries: Record<string, { tr: string; en: string }> = {
  karnova: {
    tr: 'Öğrenciyi anlayan eğitim platformu.',
    en: 'An AI-powered learning platform.',
  },
  smartscheduler: {
    tr: 'Karmaşık planlar, anlaşılır arayüzler.',
    en: 'University timetables made understandable.',
  },
  'sismik-analiz': {
    tr: 'Deprem verisinde dürüst model değerlendirmesi.',
    en: 'Earthquake data analysis and visualization.',
  },
  fintrack: {
    tr: 'Kişisel finans takip uygulaması.',
    en: 'A personal finance tracker.',
  },
  'web-kutuphane': {
    tr: 'Kitapları keşfet, düzenle, her yerden eriş.',
    en: 'A digital library system.',
  },
  'sifre-kasam': {
    tr: 'Çevrimdışı, şifreli parola kasası.',
    en: 'An offline, encrypted password manager.',
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
const principleCopy = {
  tr: [
    'Varsayımlarla değil, ölçülebilir hedeflerle geliştiririm.',
    'Dener, öğrenir, sonuç ne olursa olsun şeffaf şekilde paylaşırım.',
    'Sadece kod yazmakla kalmam, kararların teknik ve iş tarafını da düşünürüm.',
  ],
  en: [
    'I focus on metrics that actually show progress.',
    'If something doesn’t work, I share it clearly.',
    'I try to understand the root cause, not just the surface.',
  ],
}
const projectTags: Record<string, { tr: string[]; en: string[] }> = {
  karnova: {
    tr: ['Backend & Yapay zekâ'],
    en: ['Backend & AI'],
  },
  smartscheduler: {
    tr: ['Frontend Lead'],
    en: ['Frontend Lead'],
  },
  'sismik-analiz': { tr: ['Derin öğrenme'], en: ['Deep learning'] },
  fintrack: { tr: ['Web geliştirme'], en: ['Web development'] },
  'web-kutuphane': { tr: ['Full-stack'], en: ['Full-stack'] },
  'sifre-kasam': { tr: ['Mobil geliştirme'], en: ['Mobile development'] },
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
export default function AnaSayfa({ dil }: { dil: Dil }) {
  const featured = PROJELER.slice(0, 2),
    more = PROJELER.slice(2)
  return (
    <>
      <Hero dil={dil} />
      <section id="calismalar" className={`kabuk ${stil.work}`}>
        <div className={stil.sectionHeading}>
          <h2>
            {dil === 'tr' ? 'Koddan fazlası' : 'Beyond the code'}
            <span>.</span>
          </h2>
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
                  <span className={stil.tags}>
                    {projectTags[p.slug]![dil].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
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
              <ProjectThumb slug={p.slug} dil={dil} />
              <h3>{p.ad}</h3>
              <p>{t(summaries[p.slug]!, dil)}</p>
              <span className={stil.smallMeta}>
                <span className={stil.tags}>
                  {projectTags[p.slug]![dil].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
                <span className={stil.smallArrow} aria-hidden="true">
                  <Icon name="arrow-right" size={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section id="yaklasim" className={`kabuk ${stil.approach}`}>
        <div className={stil.sectionHeading}>
          <h2>
            {dil === 'tr' ? 'Nasıl çalışırım?' : 'How I work'}
            <span>.</span>
          </h2>
          {true && (
            <p>
              {dil === 'tr'
                ? 'Teknolojiyi, gerçek problemlere sade ve sürdürülebilir çözümler üretmek için kullanırım.'
                : 'I use technology to build clear, sustainable solutions to real problems.'}
            </p>
          )}
        </div>
        <MotionScope className={stil.principles}>
          {YAKLASIM.map((p, i) => (
            <article key={p.kanit}>
              <span className={stil.principleIcon}>
                <Icon name={['chart', 'document', 'boxes'][i]!} size={38} />
              </span>
              <h3>{principleTitles[dil][i]}</h3>
              <p>{principleCopy[dil][i]}</p>
            </article>
          ))}
        </MotionScope>
      </section>
      <section id="hakkimda" className={`kabuk ${stil.about}`}>
        <div className={stil.aboutCopy}>
          <h2>
            {dil === 'tr' ? 'Hakkımda' : 'About me'}
            <span>.</span>
          </h2>
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
              <span className={stil.educationDates}>2023 – 2027</span>
            </p>
          </div>
        </div>
        <div className={`${stil.aboutFact} ${stil.location}`}>
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
      <section id="yigin" className={`kabuk ${stil.stack}`}>
        <div className={stil.sectionHeading}>
          <h2>
            {dil === 'tr'
              ? 'Birlikte kullandığım araçlar'
              : 'Tools I build with'}
            <span>.</span>
          </h2>
          {true && (
            <p>
              {dil === 'tr'
                ? 'Projelere göre farklı araçlar ve teknolojiler kullanıyorum.'
                : 'Different tools for different problems.'}
            </p>
          )}
        </div>
        <MotionScope className={stil.toolGroups}>
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
                    <span aria-hidden="true">
                      <TechLogo name={name} size={15} />
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </MotionScope>
      </section>
      <section id="iletisim" className={`kabuk ${stil.contactWrap}`}>
        <div className={stil.contact}>
          <div className={stil.contactCopy}>
            <h2>
              <>
                {dil === 'tr' ? 'Birlikte ne' : 'What could we'}
                <br />
                {dil === 'tr' ? 'geliştirebiliriz?' : 'build together?'}
              </>
            </h2>
            <p>
              {dil === 'tr'
                ? 'Fikirlerini dinlemek, yeni projeler konuşmak ve birlikte üretmek için buradayım.'
                : 'I’m here to hear your ideas, discuss new projects and build together.'}
            </p>
            <div className={stil.contactLinks}>
              <a href={'mailto:' + ILETISIM.eposta}>
                <Icon name="mail" size={22} />
                {ILETISIM.eposta}
              </a>
              <a href={ILETISIM.linkedin}>
                <Icon name="linkedin" size={22} />
                {dil === 'tr'
                  ? 'LinkedIn profilimi ziyaret et'
                  : 'Visit my LinkedIn profile'}
                <Icon name="arrow-right" size={15} />
              </a>
              <a href={CV[dil]} download>
                <Icon name="document" size={22} />
                {dil === 'tr' ? 'CV’mi indir' : 'Download CV'}
              </a>
            </div>
          </div>
          <IletisimFormu dil={dil} />
        </div>
      </section>
    </>
  )
}
