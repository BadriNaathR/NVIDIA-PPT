import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Tone = 'green' | 'cyan' | 'alert' | 'amber'

const tone: Record<Tone, { ring: string; border: string; bg: string; text: string }> = {
  green: { ring: 'bg-nvidia/25', border: 'border-nvidia/30', bg: 'bg-nvidia/10', text: 'text-nvidia-bright' },
  cyan: { ring: 'bg-cyan/25', border: 'border-cyan/30', bg: 'bg-cyan/10', text: 'text-cyan-bright' },
  alert: { ring: 'bg-alert/25', border: 'border-alert/30', bg: 'bg-alert/10', text: 'text-alert' },
  amber: { ring: 'bg-yellow-400/25', border: 'border-yellow-400/30', bg: 'bg-yellow-400/10', text: 'text-yellow-300' },
}

interface PulseIconProps {
  icon: LucideIcon
  color?: Tone
  /** Outer box size in px. */
  box?: number
  size?: number
  /** Staggers the loop so a column of icons ripples rather than pulsing in unison. */
  index?: number
  className?: string
}

/** Icon in a ring that emits a sonar pulse, bobs continuously and spins on hover. */
export function PulseIcon({ icon: Icon, color = 'green', box = 32, size = 15, index = 0, className }: PulseIconProps) {
  const t = tone[color]
  return (
    <span className={clsx('relative flex shrink-0 items-center justify-center', className)} style={{ width: box, height: box }}>
      <motion.span
        className={clsx('absolute inset-0 rounded-full', t.ring)}
        animate={{ scale: [0.85, 1.5, 0.85], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: index * 0.26 }}
      />
      <motion.span
        className={clsx('relative flex h-full w-full items-center justify-center rounded-full border', t.border, t.bg)}
        animate={{ y: [0, -3.5, 0] }}
        transition={{ duration: 3.2 + index * 0.15, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        whileHover={{ rotate: 360, scale: 1.15, transition: { duration: 0.7, ease: 'easeInOut' } }}
      >
        <Icon size={size} className={t.text} strokeWidth={2} />
      </motion.span>
    </span>
  )
}
