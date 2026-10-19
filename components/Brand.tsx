import { ERZ_PATH, ERZ_VIEW_BOX } from '@/lib/brand'

export default function Brand({ small = false }: { small?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'clamp(10px, 1.4vw, 19px)',
        fontSize: 'clamp(14px, 1.9vw, 25px)',
        fontWeight: 800,
        letterSpacing: '-.045em',
        whiteSpace: 'nowrap',
      }}
    >
      <svg
        width={small ? 57 : 68}
        height={small ? 21 : 25}
        viewBox={ERZ_VIEW_BOX}
        fill="currentColor"
        style={{
          color: 'var(--color-blue)',
          flexShrink: 0,
          width: 'clamp(42px, 5.5vw, 74px)',
          height: 'auto',
        }}
        aria-hidden="true"
      >
        <path d={ERZ_PATH} />
      </svg>
      <span>erzurumlu.dev</span>
    </span>
  )
}
