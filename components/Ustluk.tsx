'use client'
import { usePathname } from 'next/navigation'
import { anaSayfaYolu, type Dil } from '@/lib/i18n'
import Brand from './Brand'
import stil from './Ustluk.module.css'
export default function Ustluk({ dil }: { dil: Dil }) {
  const pathname = usePathname() || anaSayfaYolu(dil)
  const home = anaSayfaYolu(dil)
  const slug = pathname.split('/').filter(Boolean).at(-1)
  const project =
    pathname.includes('/projeler/') || pathname.includes('/projects/')
  const alternate = project
    ? (dil === 'tr' ? '/en/projects/' : '/projeler/') + slug + '/'
    : anaSayfaYolu(dil === 'tr' ? 'en' : 'tr')
  return (
    <header className={stil.ustluk}>
      <div className={`kabuk ${stil.ic}`}>
        <a
          href={home}
          aria-label={
            dil === 'tr'
              ? 'Emin Akif Erzurumlu ana sayfa'
              : 'Emin Akif Erzurumlu home'
          }
        >
          <Brand />
        </a>
        <div className={stil.sag}>
          <nav
            className={stil.gezinme}
            aria-label={dil === 'tr' ? 'Ana menü' : 'Main navigation'}
          >
            <a href={home + '#calismalar'}>
              {dil === 'tr' ? 'Çalışmalar' : 'Work'}
            </a>
            <a href={home + '#hakkimda'}>
              {dil === 'tr' ? 'Hakkımda' : 'About'}
            </a>
            <a href={home + '#iletisim'}>
              {dil === 'tr' ? 'İletişim' : 'Contact'}
            </a>
          </nav>
          <div
            className={stil.diller}
            aria-label={dil === 'tr' ? 'Site dili' : 'Site language'}
          >
            {dil === 'tr' ? (
              <span aria-current="true">TR</span>
            ) : (
              <a href={alternate} lang="tr" aria-label="Türkçeye geç">
                TR
              </a>
            )}
            <span className={stil.ayrac}>/</span>
            {dil === 'en' ? (
              <span aria-current="true">EN</span>
            ) : (
              <a href={alternate} lang="en" aria-label="Switch to English">
                EN
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
