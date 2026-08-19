import { UI } from '@/content/ceviri'
import { CV, ILETISIM, PROFIL } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import stil from './IletisimBilgileri.module.css'

export default function IletisimBilgileri({ dil }: { dil: Dil }) {
  return (
    <dl className={stil.bilgiler}>
      <div>
        <dt className={stil.etiket}>{t(UI.formEposta, dil)}</dt>
        <dd className={stil.deger}>
          <a className="baglanti marka" href={`mailto:${ILETISIM.eposta}`}>
            {ILETISIM.eposta}
          </a>
        </dd>
      </div>

      <div>
        <dt className={stil.etiket}>{t(UI.iletisimKonum, dil)}</dt>
        <dd className={stil.deger}>{t(PROFIL.konum, dil)}</dd>
      </div>

      <div>
        <dt className={stil.etiket}>{t(UI.iletisimYanit, dil)}</dt>
        <dd className={stil.deger}>{t(UI.iletisimYanitDeger, dil)}</dd>
      </div>

      <div>
        <dt className={stil.etiket}>{t(UI.iletisimBaglantilar, dil)}</dt>
        <dd className={`${stil.deger} ${stil.baglantiListe}`}>
          <a className="baglanti marka" href={ILETISIM.linkedin}>
            LinkedIn ↗
          </a>
          <a className="baglanti marka" href={ILETISIM.github}>
            GitHub ↗
          </a>
          <a className="baglanti" href={CV[dil]} download>
            {t(UI.cvIndir, dil)}
          </a>
        </dd>
      </div>
    </dl>
  )
}
