import type { ReactNode } from 'react'
import { FONT_DEGISKENLERI } from '@/app/fonts'
import { UI } from '@/content/ceviri'
import { PROFIL, ILETISIM } from '@/content/profil'
import { t, type Dil } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import Ustluk from './Ustluk'
import Kunye from './Kunye'

/**
 * İki dilin ortak <html>/<body> kabuğu.
 *
 * Neden iki ayrı kök layout var: `lang` özniteliği rotaya göre değişmeli
 * (ekran okuyucular telaffuzu buna göre seçer, arama motorları dili buradan
 * anlar). App Router'da `<html>` yalnızca kök layout'ta yaşadığı için
 * `(tr)` ve `(en)` route grupları kendi kök layout'larını taşıyor ve ikisi de
 * bu bileşeni çağırıyor.
 */
export default function Kok({ dil, children }: { dil: Dil; children: ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFIL.ad,
    jobTitle: t(PROFIL.unvan, dil),
    email: `mailto:${ILETISIM.eposta}`,
    url: `${SITE_URL}/`,
    sameAs: [ILETISIM.github, ILETISIM.linkedin],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Topkapı Üniversitesi',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İstanbul',
      addressCountry: 'TR',
    },
  }

  return (
    <html lang={dil} className={FONT_DEGISKENLERI}>
      <body>
        <a className="atlaBaglantisi" href="#icerik">
          {t(UI.icerigeGec, dil)}
        </a>
        <Ustluk dil={dil} />
        <main id="icerik">{children}</main>
        <Kunye dil={dil} />
        {/* JSON-LD içeriği tamamen bu dosyadaki sabitlerden gelir, dışarıdan
            veri almaz. Yine de `<` kaçırılıyor: aksi halde ileride bir metne
            "</script>" girerse etiket erkenden kapanır ve kalan JSON sayfaya
            HTML olarak düşer. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}
