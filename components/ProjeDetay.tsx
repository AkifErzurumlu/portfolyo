import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Proje } from '@/content/projeler'
import { UI } from '@/content/ceviri'
import { anaSayfaYolu, t, tListe, type Dil } from '@/lib/i18n'
import Marj from './Marj'
import stil from './ProjeDetay.module.css'

function Blok({ baslik, children }: { baslik: string; children: ReactNode }) {
  return (
    <div className={stil.blok}>
      <Marj not={baslik}>{children}</Marj>
    </div>
  )
}

export default function ProjeDetay({ proje, dil }: { proje: Proje; dil: Dil }) {
  return (
    <article className="kabuk">
      <div className={stil.bas}>
        <Link href={anaSayfaYolu(dil)} className={`baglanti ${stil.geri}`}>
          ← {t(UI.geriDon, dil)}
        </Link>

        <h1 className={stil.baslik}>{proje.ad}</h1>
        <p className={stil.ozet}>{t(proje.ozet, dil)}</p>

        <dl className={stil.meta}>
          <div>
            <dt>{t(UI.rol, dil)}</dt>
            <dd>{t(proje.rol, dil)}</dd>
          </div>
          <div>
            <dt>{dil === 'tr' ? 'Kapsam' : 'Scope'}</dt>
            <dd>{t(proje.tur, dil)}</dd>
          </div>
          <div>
            <dt>{t(UI.yil, dil)}</dt>
            <dd>{proje.yil}</dd>
          </div>
        </dl>
      </div>

      <div className={stil.govde}>
        <Blok baslik={t(UI.problem, dil)}>
          <p className={stil.metin}>{t(proje.problem, dil)}</p>
        </Blok>

        <Blok baslik={t(UI.yaklasimBaslik, dil)}>
          <ul className={stil.liste}>
            {tListe(proje.yaklasim, dil).map((madde) => (
              <li key={madde}>{madde}</li>
            ))}
          </ul>
        </Blok>

        <Blok baslik={t(UI.benimIsim, dil)}>
          <p className={stil.metin}>{t(proje.benimIsim, dil)}</p>
        </Blok>

        <Blok baslik={t(UI.sonuc, dil)}>
          <p className={stil.metin}>{t(proje.sonuc, dil)}</p>
        </Blok>

        {proje.kisit ? (
          <Blok baslik={t(UI.bilinenKisit, dil)}>
            {/* Başlık kenar notunda zaten var; kutunun içinde tekrarlanmaz. */}
            <div className={stil.kisit}>
              <p className={stil.kisitMetin}>{t(proje.kisit, dil)}</p>
            </div>
          </Blok>
        ) : null}

        <Blok baslik={t(UI.ogrenilen, dil)}>
          <p className={stil.metin}>{t(proje.ogrenilen, dil)}</p>
        </Blok>

        {proje.ekip ? (
          <Blok baslik={t(UI.ekip, dil)}>
            <div className={stil.ekip}>
              {proje.ekip.map((uye) => (
                <div key={uye.ad} className={stil.ekipSatir}>
                  {uye.site ? (
                    <a className={`baglanti ${stil.ekipAd}`} href={uye.site}>
                      {uye.ad} ↗
                    </a>
                  ) : (
                    <span className={stil.ekipAd}>{uye.ad}</span>
                  )}
                  <span className={stil.ekipRol}>{t(uye.rol, dil)}</span>
                </div>
              ))}
            </div>
          </Blok>
        ) : null}

        <Blok baslik={t(UI.kullanilan, dil)}>
          <p className={stil.yiginListe}>{proje.stack.join(' · ')}</p>

          {proje.repo || proje.canli ? (
            <div className={stil.baglantilar} style={{ marginTop: '1.25rem' }}>
              {proje.repo ? (
                <a className="baglanti" href={proje.repo}>
                  {t(UI.kaynakKod, dil)} ↗
                </a>
              ) : null}
              {proje.canli ? (
                <a className="baglanti" href={proje.canli}>
                  {t(UI.canliDemo, dil)} ↗
                </a>
              ) : null}
            </div>
          ) : null}

          {proje.repoNot ? <p className={stil.repoNot}>{t(proje.repoNot, dil)}</p> : null}
        </Blok>
      </div>
    </article>
  )
}
