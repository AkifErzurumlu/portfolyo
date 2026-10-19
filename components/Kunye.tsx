import { type Dil, anaSayfaYolu } from '@/lib/i18n'
import { ILETISIM } from '@/content/profil'
import Brand from './Brand'
import Icon from './Icon'
import stil from './Kunye.module.css'
export default function Kunye({ dil }: { dil: Dil }) {
  const home = anaSayfaYolu(dil)
  return (
    <footer className={stil.kunye}>
      <div className={`kabuk ${stil.ic}`}>
        <a href={home} aria-label="erzurumlu.dev">
          <Brand small />
        </a>
        <p>
          © 2026 Emin Akif Erzurumlu
          <span>
            {dil === 'tr'
              ? '. Tüm hakları saklıdır.'
              : '. All rights reserved.'}
          </span>
        </p>
        <div className={stil.sag}>
          <div className={stil.sosyal}>
            <a href={ILETISIM.github} aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={ILETISIM.linkedin} aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </div>
          <nav aria-label={dil === 'tr' ? 'Alt menü' : 'Footer navigation'}>
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
        </div>
      </div>
    </footer>
  )
}
