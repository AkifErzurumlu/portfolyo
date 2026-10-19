import type { CSSProperties } from 'react'
const paths: Record<string, string[]> = {
  'arrow-right': ['M4 12h16', 'm13 5 7 7-7 7'],
  'arrow-left': ['M20 12H4', 'm11 5-7 7 7 7'],
  file: ['M5 3h10l4 4v14H5z', 'M14 3v5h5', 'M8 12h8', 'M8 16h8'],
  layers: ['m12 3 10 5-10 5L2 8 12 3Z', 'm2 13 10 5 10-5', 'm2 18 10 5 10-5'],
  calendar: ['M4 5h16v16H4z', 'M8 2v6', 'M16 2v6', 'M4 11h16'],
  shield: ['m12 2 9 4v7c0 5-9 9-9 9s-9-4-9-9V6l9-4Z', 'm7 12 3 3 7-7'],
  cpu: [
    'M6 6h12v12H6z',
    'M9 9h6v6H9z',
    'M9 2v4',
    'M15 2v4',
    'M9 18v4',
    'M15 18v4',
    'M2 9h4',
    'M2 15h4',
    'M18 9h4',
    'M18 15h4',
  ],
  sliders: [
    'M4 21V14',
    'M4 10V3',
    'M12 21v-9',
    'M12 8V3',
    'M20 21v-5',
    'M20 12V3',
    'M1 10h6',
    'M9 12h6',
    'M17 16h6',
  ],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M4 17v4h16v-4'],
  mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
  location: [
    'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z',
    'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  ],
  graduation: [
    'm2 8 10-5 10 5-10 5L2 8Z',
    'M6 10v7c4 3 8 3 12 0v-7',
    'M22 8v8',
  ],
  chart: ['M5 20V10h3v10', 'M11 20V4h3v16', 'M17 20v-7h3v7'],
  document: ['M5 3h10l4 4v14H5z', 'M14 3v5h5', 'M8 12h8', 'M8 16h8'],
  boxes: [
    'm12 2 8 4-8 4-8-4 8-4Z',
    'm4 6 8 4 8-4',
    'M12 10v9',
    'm4 13 8 5 8-5',
    'm4 8-3 2v8l7 4 4-2 4 2 7-4v-8l-3-2',
  ],
  code: ['m8 5-7 7 7 7', 'm16 5 7 7-7 7', 'm14 3-4 18'],
  server: ['M3 3h18v7H3z', 'M3 14h18v7H3z', 'M7 6h.01', 'M7 17h.01'],
  layout: ['M3 3h18v18H3z', 'M3 9h18', 'M9 9v12'],
  database: [
    'M20 5c0 2-4 3-8 3S4 7 4 5s4-3 8-3 8 1 8 3Z',
    'M4 5v14c0 4 16 4 16 0V5',
    'M4 12c0 4 16 4 16 0',
  ],
  tool: [
    'M14 5a5 5 0 0 0-6 6L2 17a3 3 0 0 0 5 5l6-7a5 5 0 0 0 6-6l-4 3-3-3 2-4Z',
  ],
  book: [
    'M12 5c-4-3-8-3-10-2v16c3-1 7-1 10 2 3-3 7-3 10-2V3c-3-1-7-1-10 2Z',
    'M12 5v16',
  ],
  lock: ['M5 10h14v11H5z', 'M8 10V6a4 4 0 0 1 8 0v4', 'M12 14v3'],
  check: ['m5 12 4 4L20 5'],
  external: ['M14 3h7v7', 'm21 3-10 10', 'M10 3H3v18h18v-7'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  close: ['m5 5 14 14', 'M19 5 5 19'],
  globe: [
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    'M3 12h18',
    'M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  ],
  user: ['M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z', 'M4 21v-3c0-7 16-7 16 0v3'],
  github: [
    'M9 19c-4 1-4-2-6-2',
    'M9 22v-4c-4-1-6-3-6-7 0-2 1-4 2-5 0-2 0-3 1-4 3 0 4 2 6 2s3-2 6-2c1 1 1 2 1 4 1 1 2 3 2 5 0 4-2 6-6 7v4',
  ],
  linkedin: ['M4 9v12', 'M4 3v1', 'M10 21V9h4v2c3-4 7-2 7 2v8', 'M10 9v12'],
}
export default function Icon({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: string
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      style={style}
      aria-hidden="true"
    >
      {(paths[name] ?? paths.code)!.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
