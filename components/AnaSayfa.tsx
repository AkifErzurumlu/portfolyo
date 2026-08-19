import { UI } from '@/content/ceviri'
import { ARSIV, PROJELER } from '@/content/projeler'
import { YAKLASIM, YIGIN } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import Bolum from './Bolum'
import Hero from './Hero'
import IletisimBilgileri from './IletisimBilgileri'
import IletisimFormu from './IletisimFormu'
import Marj from './Marj'
import ProjeKart from './ProjeKart'
import stil from './AnaSayfa.module.css'

export default function AnaSayfa({ dil }: { dil: Dil }) {
  const oneCikanlar = PROJELER.filter((p) => p.oneCikan)
  const digerleri = PROJELER.filter((p) => !p.oneCikan)

  return (
    <>
      <Hero dil={dil} />

      <Bolum id="calismalar" etiket={t(UI.secilmisCalismalar, dil)}>
        {oneCikanlar.map((proje) => (
          <ProjeKart key={proje.slug} proje={proje} dil={dil} />
        ))}
      </Bolum>

      <Bolum etiket={t(UI.digerProjeler, dil)}>
        {digerleri.map((proje) => (
          <ProjeKart key={proje.slug} proje={proje} dil={dil} />
        ))}
      </Bolum>

      <Bolum id="yaklasim" etiket={t(UI.nasilCalisirim, dil)}>
        <div className={stil.yaklasim}>
          {YAKLASIM.map((ilke) => (
            <div key={ilke.kanit} className={stil.ilke}>
              <Marj not={ilke.kanit}>
                <h3 className={stil.ilkeBaslik}>{t(ilke.baslik, dil)}</h3>
                <p className={stil.ilkeMetin}>{t(ilke.metin, dil)}</p>
              </Marj>
            </div>
          ))}
        </div>
      </Bolum>

      <Bolum id="yigin" etiket={t(UI.yigin, dil)}>
        <dl className={stil.yigin}>
          {YIGIN.map((grup) => (
            <div key={grup.baslik.tr} className={stil.yiginGrup}>
              <dt>{t(grup.baslik, dil)}</dt>
              <dd>{grup.ogeler.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </Bolum>

      <Bolum id="arsiv" etiket={t(UI.eskiCalismalar, dil)}>
        <div className={stil.arsiv}>
          {ARSIV.map((oge) => (
            <div key={oge.ad.tr} className={stil.arsivSatir}>
              <span className={stil.arsivAd}>{t(oge.ad, dil)}</span>
              <span className={stil.arsivYigin}>{oge.stack}</span>
            </div>
          ))}
        </div>
      </Bolum>

      <Bolum id="iletisim" etiket={t(UI.iletisim, dil)} baslik={t(UI.iletisimBaslik, dil)}>
        {/* Giriş metni kenar notu ızgarasına sarılıyor: başlıkla aynı dikey
            eksende dursun. E-posta ve alt satır kasten ızgaranın dışında,
            kabuğun tam genişliğinde. */}
        <Marj>
          <p className={stil.iletisimMetin}>{t(UI.iletisimMetin, dil)}</p>

          <div className={stil.iletisimIzgara}>
            <IletisimFormu dil={dil} />
            <IletisimBilgileri dil={dil} />
          </div>
        </Marj>
      </Bolum>
    </>
  )
}
