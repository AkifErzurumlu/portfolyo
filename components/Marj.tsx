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
  // `belir` / `belirNot` kaydırma animasyonunu getirir. Marj her yerde
  // kullanıldığı için sınıfları burada vermek, proje kartlarından detay
  // sayfası bloklarına kadar hepsini tek noktadan tutarlı hale getiriyor.
  return (
    <div className={stil.marj}>
      <div className={`belirNot ${stil.not} ${vurgulu ? stil.notVurgulu : ''}`}>
        {not}
      </div>
      <div className={`belir ${stil.icerik}`}>{children}</div>
    </div>
  )
}
