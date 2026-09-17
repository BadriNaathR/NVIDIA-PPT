import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  tone?: 'green' | 'cyan' | 'alert' | 'neutral'
  className?: string
}

const toneMap = {
  green: 'border-nvidia/40 bg-nvidia/10 text-nvidia-bright',
  cyan: 'border-cyan/40 bg-cyan/10 text-cyan-bright',
  alert: 'border-alert/40 bg-alert/10 text-alert',
  neutral: 'border-border bg-panel-raised/70 text-ink-200',
}

export function Tag({ children, tone = 'green', className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium backdrop-blur-md',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Consistent badge for a named NVIDIA service, e.g. "NIM", "NeMo Guardrails". */
export function ServiceTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md border border-nvidia/30 bg-nvidia/[0.08] px-2.5 py-1 font-mono text-[12px] font-semibold tracking-tight text-nvidia-bright backdrop-blur-md',
        'shadow-[0_0_0_0_rgba(118,185,0,0)] hover:border-nvidia/60 hover:shadow-[0_0_18px_-2px_rgba(118,185,0,0.45)]',
        className,
      )}
    >
      <span className="h-1 w-1 animate-pulse-slow rounded-full bg-nvidia-bright" />
      {children}
    </motion.span>
  )
}
