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
        width={small ? 39 : 48}
        height={small ? 28 : 34}
        viewBox="0 0 44 28"
        fill="currentColor"
        style={{
          color: 'var(--color-blue)',
          flexShrink: 0,
          width: 'clamp(36px, 4.6vw, 62px)',
          height: 'auto',
        }}
        aria-hidden="true"
      >
        <path d="M11 2h16l-4 6H7zM6 11h16l-4 6h-8l-3 5h12l-4 6H0zM30 2l14 26h-8l-8-15-9 15h-8z" />
      </svg>
      <span>erzurumlu.dev</span>
    </span>
  )
}
