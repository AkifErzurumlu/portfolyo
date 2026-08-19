'use client'

import { useId, useState, type FormEvent } from 'react'
import { UI } from '@/content/ceviri'
import { FORM_ANAHTARI, FORM_UC_NOKTASI, ILETISIM } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import stil from './IletisimFormu.module.css'

type Durum = 'bosta' | 'gonderiliyor' | 'basarili' | 'hata' | 'posta'

/**
 * Site saf statik olduğu için formu alacak bir sunucumuz yok.
 *
 * FORM_ANAHTARI tanımlıysa gönderi Web3Forms'a gider. Tanımlı değilse ya da
 * istek başarısız olursa mesaj `mailto` ile kullanıcının e-posta istemcisinde
 * önceden doldurulmuş olarak açılır. İki yolda da mesaj kaybolmaz — bir iş
 * başvurusunu sessizce yutmak, formu hiç koymamaktan kötüdür.
 */
export default function IletisimFormu({ dil }: { dil: Dil }) {
  const [durum, setDurum] = useState<Durum>('bosta')
  const kimlik = useId()

  const postaAc = (ad: string, eposta: string, mesaj: string) => {
    const konu = encodeURIComponent(
      dil === 'tr' ? `Portfolyo üzerinden mesaj — ${ad}` : `Message from portfolio — ${ad}`,
    )
    const govde = encodeURIComponent(`${mesaj}\n\n—\n${ad}\n${eposta}`)
    window.location.href = `mailto:${ILETISIM.eposta}?subject=${konu}&body=${govde}`
    setDurum('posta')
  }

  async function gonder(olay: FormEvent<HTMLFormElement>) {
    olay.preventDefault()
    const form = olay.currentTarget
    const veri = new FormData(form)

    const ad = String(veri.get('ad') ?? '').trim()
    const eposta = String(veri.get('eposta') ?? '').trim()
    const mesaj = String(veri.get('mesaj') ?? '').trim()

    // Bal küpü doldurulmuşsa gönderen bir bot. Sessizce başarılı gösteriyoruz:
    // bota hata dönmek, ona neyi atlaması gerektiğini öğretir.
    if (String(veri.get('website') ?? '')) {
      setDurum('basarili')
      form.reset()
      return
    }

    if (!FORM_ANAHTARI) {
      postaAc(ad, eposta, mesaj)
      form.reset()
      return
    }

    setDurum('gonderiliyor')

    try {
      const yanit = await fetch(FORM_UC_NOKTASI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_ANAHTARI,
          subject: `Portfolyo — ${ad}`,
          name: ad,
          email: eposta,
          message: mesaj,
        }),
      })

      if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`)

      setDurum('basarili')
      form.reset()
    } catch {
      setDurum('hata')
    }
  }

  return (
    <form className={stil.form} onSubmit={gonder} noValidate={false}>
      <div className={stil.satir}>
        <div className={stil.alan}>
          <label className={stil.etiket} htmlFor={`${kimlik}-ad`}>
            {t(UI.formAd, dil)} <span className={stil.zorunlu}>*</span>
          </label>
          <input
            className={stil.girdi}
            id={`${kimlik}-ad`}
            name="ad"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder={t(UI.formAdIpucu, dil)}
            disabled={durum === 'gonderiliyor'}
          />
        </div>

        <div className={stil.alan}>
          <label className={stil.etiket} htmlFor={`${kimlik}-eposta`}>
            {t(UI.formEposta, dil)} <span className={stil.zorunlu}>*</span>
          </label>
          <input
            className={`${stil.girdi} marka`}
            id={`${kimlik}-eposta`}
            name="eposta"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            placeholder={t(UI.formEpostaIpucu, dil)}
            disabled={durum === 'gonderiliyor'}
          />
        </div>
      </div>

      <div className={stil.alan}>
        <label className={stil.etiket} htmlFor={`${kimlik}-mesaj`}>
          {t(UI.formMesaj, dil)} <span className={stil.zorunlu}>*</span>
        </label>
        <textarea
          className={stil.girdi}
          id={`${kimlik}-mesaj`}
          name="mesaj"
          required
          maxLength={2000}
          placeholder={t(UI.formMesajIpucu, dil)}
          disabled={durum === 'gonderiliyor'}
        />
      </div>

      <div className={stil.balKupu} aria-hidden="true">
        <label htmlFor={`${kimlik}-website`}>Website</label>
        <input id={`${kimlik}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={stil.eylem}>
        <button className={stil.dugme} type="submit" disabled={durum === 'gonderiliyor'}>
          {durum === 'gonderiliyor' ? t(UI.formGonderiliyor, dil) : t(UI.formGonder, dil)}
        </button>

        <p className={stil.durum} role="status" aria-live="polite">
          {durum === 'basarili' ? (
            <span className={stil.durumBasarili}>{t(UI.formBasarili, dil)}</span>
          ) : null}
          {durum === 'posta' ? <span>{t(UI.formPostaAcildi, dil)}</span> : null}
          {durum === 'hata' ? (
            <span className={stil.durumHata}>
              {t(UI.formHata, dil)}{' '}
              <a className="marka" href={`mailto:${ILETISIM.eposta}`}>
                {ILETISIM.eposta}
              </a>
            </span>
          ) : null}
        </p>
      </div>
    </form>
  )
}
