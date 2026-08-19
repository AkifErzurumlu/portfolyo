import Link from 'next/link'
import type { Proje } from '@/content/projeler'
import { UI } from '@/content/ceviri'
import { projeYolu, t, type Dil } from '@/lib/i18n'
import Marj from './Marj'
import stil from './ProjeKart.module.css'

export default function ProjeKart({ proje, dil }: { proje: Proje; dil: Dil }) {
  return (
    <Link href={projeYolu(proje.slug, dil)} className={stil.kart}>
      <Marj not={t(proje.kenarNotu, dil)}>
        <div className={stil.ust}>
          <h3 className={stil.ad}>{proje.ad}</h3>
          <span className={stil.yil}>{proje.yil}</span>
        </div>

        <p className={stil.ozet}>{t(proje.ozet, dil)}</p>

        <div className={stil.alt}>
          <span className={stil.yigin}>{proje.stack.join(' · ')}</span>
          <span className={stil.oku} aria-hidden="true">
            {t(UI.detay, dil)} →
          </span>
        </div>
      </Marj>
    </Link>
  )
}
