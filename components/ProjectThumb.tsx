import Icon from './Icon'
import stil from './ProjectThumb.module.css'
export default function ProjectThumb({ slug }: { slug: string }) {
  return (
    <div className={stil.thumb} aria-hidden="true">
      {slug === 'sismik-analiz' ? (
        <svg viewBox="0 0 240 100" fill="none">
          <path
            d="M0 52h28l3-6 4 12 5-20 4 32 5-53 4 70 5-47 4 23 5-33 4 44 4-55 4 60 5-31 4 18 4-11 5 4 5-14 4 22 5-30 4 33 4-21 5 13 4-9 4 5h64"
            stroke="#244bff"
            strokeWidth="2.7"
          />
          <path d="M0 52h240" stroke="#244bff" strokeOpacity=".13" />
        </svg>
      ) : slug === 'fintrack' ? (
        <div className={stil.donut} />
      ) : slug === 'web-kutuphane' ? (
        <div className={stil.books}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className={stil.vault}>
          <Icon name="lock" size={46} />
          <span>••••••</span>
        </div>
      )}
    </div>
  )
}
