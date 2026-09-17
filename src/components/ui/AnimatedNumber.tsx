import { animate, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
  onComplete?: () => void
}

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  duration = 1.6,
  onComplete,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplay(latest.toFixed(decimals))
  })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onComplete,
    })
    return controls.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, motionValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
