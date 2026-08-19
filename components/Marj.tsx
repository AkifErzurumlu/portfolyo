import type { ReactNode } from 'react'
import stil from './Marj.module.css'

/**
 * Kenar notlu iki sütunlu satır. Not, süsleme değil içeriğin bir parçasıdır:
 * "3 kişilik ekip", "R² = 0.10 · negatif bulgu" gibi dürüstlük çıpalarını
 * sayfanın mimarisine gömer. 860px altında notun sırası öne alınır ve
 * başlığın üstünde küçük bir satır olarak görünür.
 */
export default function Marj({
  not,
  vurgulu = false,
  children,
}: {
  not?: string
  vurgulu?: boolean
  children: ReactNode
}) {
  return (
    <div className={stil.marj}>
      <div className={`${stil.not} ${vurgulu ? stil.notVurgulu : ''}`}>{not}</div>
      <div className={stil.icerik}>{children}</div>
    </div>
  )
}
