import { clsx } from 'clsx'
import { motion } from 'framer-motion'

interface GlowOrbProps {
  className?: string
  color?: 'green' | 'cyan' | 'alert'
  size?: number
  duration?: number
}

const colorMap = {
  green: 'bg-nvidia',
  cyan: 'bg-cyan',
  alert: 'bg-alert',
}

export function GlowOrb({ className, color = 'green', size = 520, duration = 9 }: GlowOrbProps) {
  return (
    <motion.div
      aria-hidden
      className={clsx('pointer-events-none absolute rounded-full opacity-20 blur-[120px]', colorMap[color], className)}
      style={{ width: size, height: size }}
      animate={{ x: [0, 24, -10, 0], y: [0, -30, 10, 0], opacity: [0.16, 0.26, 0.18, 0.16] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
