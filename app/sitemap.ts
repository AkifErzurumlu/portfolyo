import type { MetadataRoute } from 'next'
import { PROJELER } from '@/content/projeler'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * Her sayfanın iki dildeki karşılığı `alternates.languages` ile bildiriliyor:
 * Google böylece Türkçe ve İngilizce sürümü ayrı iki sayfa değil, aynı
 * içeriğin iki dili olarak görüyor ve arayana doğru olanı gösteriyor.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const guncelleme = new Date()

  const anaSayfalar: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: guncelleme,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { tr: `${SITE_URL}/`, en: `${SITE_URL}/en/` } },
    },
    {
      url: `${SITE_URL}/en/`,
      lastModified: guncelleme,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { tr: `${SITE_URL}/`, en: `${SITE_URL}/en/` } },
    },
  ]

  const projeSayfalari: MetadataRoute.Sitemap = PROJELER.flatMap((proje) => {
    const tr = `${SITE_URL}/projeler/${proje.slug}/`
    const en = `${SITE_URL}/en/projects/${proje.slug}/`
    const diller = { languages: { tr, en } }

    return [
      {
        url: tr,
        lastModified: guncelleme,
        changeFrequency: 'yearly' as const,
        priority: proje.oneCikan ? 0.8 : 0.6,
        alternates: diller,
      },
      {
        url: en,
        lastModified: guncelleme,
        changeFrequency: 'yearly' as const,
        priority: proje.oneCikan ? 0.7 : 0.5,
        alternates: diller,
      },
    ]
  })

  return [...anaSayfalar, ...projeSayfalari]
}
