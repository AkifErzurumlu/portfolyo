import { UI } from '@/content/ceviri'
import { CV, HERO, ILETISIM, PROFIL } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import stil from './Hero.module.css'

export default function Hero({ dil }: { dil: Dil }) {
  return (
    <section className={stil.hero}>
      <div className={`kabuk ${stil.ic}`}>
        <div className="giris">
          <h1 className={stil.baslik}>
            {t(HERO.baslikOnce, dil)} <em className={stil.vurgu}>{t(HERO.baslikVurgu, dil)}</em>{' '}
            {t(HERO.baslikSonra, dil)}
          </h1>

          <p className={stil.alt}>{t(HERO.alt, dil)}</p>

          <div className={stil.eylemler}>
            <a className={stil.dugme} href="#calismalar">
              {t(UI.calismalar, dil)}
            </a>
            <a className={stil.dugme} href={CV[dil]} download>
              {t(UI.cvIndir, dil)}
            </a>
            <a className={`marka ${stil.dugme}`} href={`mailto:${ILETISIM.eposta}`}>
              {ILETISIM.eposta}
            </a>
          </div>
        </div>

        <dl className={stil.meta}>
          <div>
            <dt className={stil.metaEtiket}>{dil === 'tr' ? 'Konum' : 'Location'}</dt>
            <dd>{t(PROFIL.konum, dil)}</dd>
          </div>
          <div>
            <dt className={stil.metaEtiket}>{dil === 'tr' ? 'Eğitim' : 'Education'}</dt>
            <dd>{t(PROFIL.egitim, dil)}</dd>
          </div>
          <div>
            <dt className={stil.metaEtiket}>{dil === 'tr' ? 'Durum' : 'Status'}</dt>
            <dd>
              <span className={stil.durumNokta} aria-hidden="true">
                ●{' '}
              </span>
              {t(PROFIL.durum, dil)}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
