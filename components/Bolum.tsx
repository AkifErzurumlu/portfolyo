import type { ReactNode } from 'react'
import stil from './Bolum.module.css'

export default function Bolum({
  id,
  etiket,
  baslik,
  children,
}: {
  id?: string
  etiket: string
  baslik?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={stil.bolum}>
      <div className="kabuk">
        <div className={stil.baslikSatiri}>
          <p className={stil.etiket}>{etiket}</p>
          {baslik ? <h2 className={stil.baslik}>{baslik}</h2> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
