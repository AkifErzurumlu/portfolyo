export const DILLER = ['tr', 'en'] as const

export type Dil = (typeof DILLER)[number]

/**
 * İki dilli metin. Her iki alan da zorunlu — bir çeviri unutulursa
 * TypeScript derleme anında hata verir, siteye eksik metin çıkmaz.
 */
export type Metin = Record<Dil, string>
export type MetinListesi = Record<Dil, readonly string[]>

export function t(metin: Metin, dil: Dil): string {
  return metin[dil]
}

export function tListe(liste: MetinListesi, dil: Dil): readonly string[] {
  return liste[dil]
}

/** Dil değiştirme düğmesi için karşı dilin kökü. */
export function digerDil(dil: Dil): Dil {
  return dil === 'tr' ? 'en' : 'tr'
}

/** Bir projenin o dildeki detay sayfası yolu. */
export function projeYolu(slug: string, dil: Dil): string {
  return dil === 'tr' ? `/projeler/${slug}/` : `/en/projects/${slug}/`
}

/** Ana sayfa yolu. */
export function anaSayfaYolu(dil: Dil): string {
  return dil === 'tr' ? '/' : '/en/'
}
