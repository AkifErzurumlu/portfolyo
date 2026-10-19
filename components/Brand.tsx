export default function Brand({ small = false }: { small?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: small ? 10 : 14,
        fontSize: small ? 17 : 21,
        fontWeight: 800,
        letterSpacing: '-.045em',
        whiteSpace: 'nowrap',
      }}
    >
      <svg
        width={small ? 39 : 48}
        height={small ? 28 : 34}
        viewBox="0 0 58 40"
        fill="currentColor"
        style={{ color: 'var(--color-blue)', flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M8 5h25l-5 7H13l-3 5h15l-5 7H6L0 34h25l5-8H17l3-5h13L43 4l15 30H47L42 23l-7 11H25L44 2h-9l-2 3H8Z" />
      </svg>
      <span>erzurumlu.dev</span>
    </span>
  )
}
