import { YAZI_TIPLERI } from '@/app/fonts'
import { UI } from '@/content/ceviri'
import { ILETISIM, PROFIL } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import stil from './Kunye.module.css'

/** Build anında sabitlenir — statik çıktıda derleme tarihini gösterir. */
const GUNCELLEME = new Date()

const KAYNAK = 'https://github.com/AkifErzurumlu/portfolyo'

export default function Kunye({ dil }: { dil: Dil }) {
  const tarih = new Intl.DateTimeFormat(dil === 'tr' ? 'tr-TR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(GUNCELLEME)

  return (
    <footer id="kunye" className={stil.kunye}>
      <div className="kabuk">
        <div className={stil.ust}>
          <p className={stil.etiket}>{t(UI.kunye, dil)}</p>

          <div>
            <dl className={stil.satirlar}>
              <div className={stil.alan}>
                <dt>{t(UI.kunyeYapim, dil)}</dt>
                <dd>Next.js 15 · TypeScript · CSS Modules</dd>
              </div>
              <div className={stil.alan}>
                <dt>{t(UI.kunyeYaziTipleri, dil)}</dt>
                <dd>{YAZI_TIPLERI}</dd>
              </div>
              <div className={stil.alan}>
                <dt>{t(UI.kunyeGuncelleme, dil)}</dt>
                <dd>{tarih}</dd>
              </div>
              <div className={stil.alan}>
                <dt>{t(UI.kunyeKaynak, dil)}</dt>
                <dd>
                  <a className="baglanti" href={KAYNAK}>
                    github.com/AkifErzurumlu/portfolyo
                  </a>
                </dd>
              </div>
              <div className={stil.alan}>
                <dt className="marka">GitHub</dt>
                <dd>
                  <a className="baglanti" href={ILETISIM.github}>
                    AkifErzurumlu
                  </a>
                </dd>
              </div>
              <div className={stil.alan}>
                <dt className="marka">LinkedIn</dt>
                <dd>
                  <a className="baglanti" href={ILETISIM.linkedin}>
                    emin-akif-erzurumlu
                  </a>
                </dd>
              </div>
            </dl>

            <p className={stil.telif}>
              © {GUNCELLEME.getFullYear()} {PROFIL.ad}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
