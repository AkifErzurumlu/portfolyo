'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

const Progress = createContext(1)

/** Each illustration plays once when it becomes visible; reduced-motion shows the final state. */
export default function MotionScope({
  children,
  className = '',
  label,
  duration = 1600,
  resetKey,
}: {
  children: ReactNode
  className?: string
  label?: string
  duration?: number
  resetKey?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setPhase(0)
    setReady(false)
    let frame = 0,
      disposed = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => {
      cancelAnimationFrame(frame)
      setReady(true)
      setPhase(1)
    }
    if (reduced.matches) {
      finish()
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        setReady(true)
        let start: number | undefined
        const tick = (now: number) => {
          if (disposed) return
          start ??= now
          const p = Math.min((now - start) / duration, 1)
          setPhase(1 - Math.pow(1 - p, 3))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    const changed = () => {
      if (reduced.matches) {
        observer.disconnect()
        finish()
      }
    }
    reduced.addEventListener('change', changed)
    return () => {
      disposed = true
      observer.disconnect()
      cancelAnimationFrame(frame)
      reduced.removeEventListener('change', changed)
    }
  }, [duration, resetKey])
  return (
    <Progress.Provider value={phase}>
      <div
        ref={ref}
        className={`motion-scene ${className}`}
        data-ready={ready}
        data-phase={phase.toFixed(3)}
        style={{ '--phase': phase } as CSSProperties}
        aria-label={label}
      >
        {children}
      </div>
    </Progress.Provider>
  )
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  dil = 'tr',
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  dil?: 'tr' | 'en'
}) {
  const phase = useContext(Progress)
  return (
    <span data-counter={value} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {new Intl.NumberFormat(dil === 'tr' ? 'tr-TR' : 'en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value * phase)}
      {suffix}
    </span>
  )
}

export function useSceneProgress() {
  return useContext(Progress)
}
