import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

/**
 * Yazı tipleri build sırasında indirilip statik çıktıya gömülür.
 * Tarayıcı Google CDN'e istek atmaz: gizlilik için de, CLS için de daha iyi.
 * `latin-ext` alt kümesi Türkçe ı, ğ, ş, İ, ç, ö, ü karakterleri için zorunlu.
 */

export const baslikFontu = Newsreader({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-baslik',
  display: 'swap',
})

export const govdeFontu = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-govde',
  display: 'swap',
})

export const monoFontu = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const FONT_DEGISKENLERI = [
  baslikFontu.variable,
  govdeFontu.variable,
  monoFontu.variable,
].join(' ')

/** Künyede gösterilen isimler. */
export const YAZI_TIPLERI = 'Newsreader · IBM Plex Sans · IBM Plex Mono'
