import { Manrope } from 'next/font/google'
export const govdeFontu = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-govde',
  display: 'swap',
})
export const FONT_DEGISKENLERI = govdeFontu.variable
export const YAZI_TIPLERI = 'Manrope'
