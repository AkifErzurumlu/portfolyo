import { UI } from '@/content/ceviri'
import { PROFIL } from '@/content/profil'
import { anaSayfaYolu, digerDil, t, type Dil } from '@/lib/i18n'
import stil from './Ustluk.module.css'

export default function Ustluk({ dil }: { dil: Dil }) {
  const karsi = digerDil(dil)

  return (
    <header className={stil.ustluk}>
      <div className={`kabuk ${stil.ic}`}>
        <a href={anaSayfaYolu(dil)} className={stil.ad}>
          {PROFIL.ad}
        </a>

        <div className={stil.sag}>
          <nav className={stil.gezinme} aria-label={t(UI.calismalar, dil)}>
            <a className="baglanti" href="#calismalar">
              {t(UI.calismalar, dil)}
            </a>
            <a className="baglanti" href="#yaklasim">
              {t(UI.yaklasim, dil)}
            </a>
            <a className="baglanti" href="#iletisim">
              {t(UI.iletisim, dil)}
            </a>
          </nav>

          <a
            className={stil.dil}
            href={anaSayfaYolu(karsi)}
            lang={karsi}
            aria-label={t(UI.dilEtiketi, dil)}
          >
            {t(UI.dilDegistir, dil)}
          </a>
        </div>
      </div>
    </header>
  )
}
