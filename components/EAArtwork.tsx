import MotionScope from './MotionScope'
import type { Dil } from '@/lib/i18n'
import s from './AnimatedArt.module.css'

export default function EAArtwork({ dil }: { dil: Dil }) {
  return (
    <MotionScope
      className={s.sculpture}
      label={
        dil === 'tr'
          ? 'Hareketli EA monogramı ve cam katmanlar'
          : 'Animated EA monogram and glass layers'
      }
    >
      <svg viewBox="0 0 500 520" role="img" aria-label="EA">
        <defs>
          <linearGradient id="ea-front" x1="0" x2="1" y2="1">
            <stop stopColor="#4e88ff" />
            <stop offset=".5" stopColor="#174cff" />
            <stop offset="1" stopColor="#0827bf" />
          </linearGradient>
          <linearGradient id="ea-side">
            <stop stopColor="#1239e8" />
            <stop offset="1" stopColor="#041975" />
          </linearGradient>
          <linearGradient id="ea-glass" x1="0" x2="1" y2="1">
            <stop stopColor="#fff" stopOpacity=".85" />
            <stop offset=".5" stopColor="#b9d1ff" stopOpacity=".25" />
            <stop offset="1" stopColor="#749cff" stopOpacity=".5" />
          </linearGradient>
          <radialGradient id="ea-halo">
            <stop stopColor="#cfdeff" />
            <stop offset="1" stopColor="#e9f1ff" stopOpacity=".4" />
          </radialGradient>
          <filter id="ea-shadow">
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="12"
              floodColor="#2451cc"
              floodOpacity=".22"
            />
          </filter>
        </defs>
        <circle cx="266" cy="222" r="210" fill="url(#ea-halo)" />
        <g className={s.pedestal} filter="url(#ea-shadow)">
          <path d="m55 397 248-95 176 95-249 100Z" fill="#fafdff" />
          <path d="m55 397 175 100v23L55 420Z" fill="#d4e2fd" />
          <path d="m230 497 249-100v23L230 520Z" fill="#b9cdf5" />
        </g>
        <g
          className={s.glassBack}
          fill="url(#ea-glass)"
          stroke="#fff"
          strokeWidth="1.2"
        >
          <path d="m265 102 141 57v256l-141-57Z" />
          <path d="m374 125 94 38v205l-94-38Z" />
        </g>
        <g className={s.letterE} filter="url(#ea-shadow)">
          <path
            d="m90 135 137-42 90 43-139 43Zm0 126 137-42 90 43-139 43Zm0 103 137-42 90 43-139 43Z"
            fill="#588dff"
          />
          <path
            d="m178 179 139-43v67l-139 42Zm0 126 139-43v57l-139 43Zm0 103 139-43v67l-139 43Z"
            fill="url(#ea-side)"
          />
          <path
            d="m90 135 88 44v66l-49-25v48l49 37v57l-49-24v49l49 21v67l-88-45V262l88 43v-60l-88-44Z"
            fill="url(#ea-front)"
            stroke="#6fa2ff"
            strokeWidth="1"
          />
        </g>
        <g className={s.letterA} filter="url(#ea-shadow)">
          <path
            d="m313 161 48-22 102 249-49 26-62-70-36 27-49-26Z"
            fill="url(#ea-side)"
          />
          <path
            d="m313 161 101 253-51-24-30-77-32 48-45-22Z"
            fill="url(#ea-front)"
            stroke="#6397ff"
          />
          <path d="m313 161 48-22 102 249-49 26Z" fill="#1c45f7" />
        </g>
        <g
          className={s.glassFront}
          fill="url(#ea-glass)"
          stroke="#f8fcff"
          strokeWidth="1.5"
        >
          <path d="m88 140 119 45v74L88 214Z" />
          <path d="m242 238 29 12v211l-29-12Z" />
          <path d="m367 302 92 36v85l-92-36Z" />
        </g>
        <g
          className={s.connectors}
          stroke="#5b7cff"
          strokeWidth="1"
          fill="none"
        >
          <path
            pathLength="1"
            d="M180 90V45l98 33v65M383 175l87 36v96M277 142l106 33"
          />
          {[
            [180, 45],
            [278, 78],
            [383, 175],
            [470, 211],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill="#194cff" />
          ))}
        </g>
      </svg>
      <div className={s.artBadge}>
        <i />
        <div>
          <strong>Full-stack developer</strong>
          <span>Python / TypeScript</span>
        </div>
      </div>
    </MotionScope>
  )
}
