import { motion, useInView, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion'
import { useEffect, useRef } from 'react'

/** A small ring that fills up like a dial, in sync with a percentage stat counting up. */
export function PercentRing({
  value,
  size = 28,
  color = '#76b900',
}: {
  value: number
  size?: number
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const progress = useMotionValue(0)
  const r = size / 2 - 3
  const circumference = 2 * Math.PI * r
  const dashoffset = useTransform(progress, (p) => circumference * (1 - Math.min(Math.abs(p), 100) / 100))

  useEffect(() => {
    if (!inView) return
    const controls = fmAnimate(progress, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [inView, value, progress])

  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashoffset, filter: `drop-shadow(0 0 4px ${color}aa)` }}
        />
      </svg>
    </div>
  )
}
