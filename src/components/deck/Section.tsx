import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { AmbientField } from '../ui/AmbientField'
import { GlowOrb } from '../ui/GlowOrb'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, WordReveal } from '../ui/Reveal'

interface SectionProps {
  id: string
  index: number
  total: number
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  accent?: 'green' | 'cyan' | 'alert'
  tone?: 'void' | 'base'
  align?: 'left' | 'center'
  glow?: 'single' | 'double' | 'none'
  footer?: ReactNode
  headerRight?: ReactNode
  children: ReactNode
  contentClassName?: string
}

const accentText: Record<string, string> = {
  green: 'text-nvidia-bright',
  cyan: 'text-cyan-bright',
  alert: 'text-alert',
}

export function Section({
  id,
  index,
  total,
  eyebrow,
  title,
  subtitle,
  accent = 'green',
  tone = 'void',
  align = 'left',
  glow = 'single',
  footer,
  headerRight,
  children,
  contentClassName,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      data-section
      initial={{ opacity: 0, scale: 0.965, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.5, once: false }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'deck-section relative flex h-dvh w-full flex-col overflow-hidden',
        tone === 'void' ? 'bg-void' : 'bg-surface',
      )}
    >
      <div className="bg-grid bg-grid-live pointer-events-none absolute inset-0 opacity-60" />
      <AmbientField accent={accent} />
      {glow !== 'none' && (
        <GlowOrb color={accent} className="-right-40 -top-40" size={560} />
      )}
      {glow === 'double' && (
        <GlowOrb color={accent === 'green' ? 'cyan' : 'green'} className="-bottom-32 -left-32" size={480} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />

      <div className="relative z-10 flex h-full w-full flex-col overflow-y-auto px-6 pb-[clamp(3.75rem,7vh,4.5rem)] pt-[clamp(3.75rem,11vh,6rem)] sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
            <div className="flex items-center gap-4">
              {headerRight}
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink-600">
                {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className={clsx('mt-[clamp(0.75rem,2.4vh,1.5rem)]', align === 'center' && 'text-center')}>
            <h2 className="text-balance font-display text-[clamp(1.65rem,min(4.4vw,5.6vh),3.4rem)] font-semibold leading-[1.08] tracking-tight text-ink-50">
              {typeof title === 'string' ? <WordReveal text={title} /> : <Reveal>{title}</Reveal>}
            </h2>
            {subtitle && (
              <Reveal delay={0.22}>
                <p
                  className={clsx(
                    'mt-[clamp(0.4rem,1.2vh,0.75rem)] max-w-3xl text-balance text-[15px] leading-relaxed text-ink-400 sm:text-base',
                    align === 'center' && 'mx-auto',
                  )}
                >
                  {subtitle}
                </p>
              </Reveal>
            )}
          </div>

          <div
            className={clsx(
              'mt-[clamp(0.75rem,2.4vh,1.5rem)] flex flex-1 flex-col justify-center',
              contentClassName,
            )}
          >
            {children}
          </div>

          {footer && (
            <div className="mt-[clamp(0.75rem,2vh,1.5rem)] border-t border-line-soft pt-3 text-[10.5px] leading-relaxed text-ink-600">
              {footer}
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30',
          accentText[accent],
        )}
      />
    </motion.section>
  )
}
