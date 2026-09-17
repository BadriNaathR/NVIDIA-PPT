import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { Card } from './Card'
import { CoinBurst } from './CoinBurst'
import { CoinFlip } from './CoinFlip'
import { PercentRing } from './PercentRing'
import { ZapPulse } from './ZapPulse'

interface StatCardProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  tone?: 'green' | 'cyan' | 'alert' | 'neutral'
  className?: string
  dense?: boolean
}

const toneText: Record<string, string> = {
  green: 'text-nvidia-bright',
  cyan: 'text-cyan-bright',
  alert: 'text-alert',
  neutral: 'text-ink-50',
}

const toneHex: Record<string, string> = {
  green: '#8fdc00',
  cyan: '#5fa8d3',
  alert: '#f04b23',
  neutral: '#f5f7fa',
}

export function StatCard({ value, decimals, prefix, suffix, label, tone = 'green', className, dense = false }: StatCardProps) {
  const isDollar = prefix === '$' || prefix === '~$'
  const isPercent = suffix === '%'
  const isSpeed = suffix === '×'
  const [burst, setBurst] = useState(false)
  const iconSize = dense ? 20 : 24

  return (
    <Card dense={dense} className={clsx('relative flex flex-col justify-center', dense ? 'gap-1' : 'gap-1.5', className)}>
      {(isDollar || isPercent || isSpeed) && (
        <div className="absolute right-2 top-2">
          {isDollar && <CoinFlip size={iconSize} />}
          {isPercent && <PercentRing value={value} size={iconSize} color={toneHex[tone]} />}
          {isSpeed && <ZapPulse size={iconSize} />}
        </div>
      )}
      {isDollar && <CoinBurst active={burst} originClassName="right-2 top-2" originSize={iconSize} />}
      <motion.div
        animate={burst ? { scale: [1, 1.18, 0.97, 1], x: [0, -3, 3, -1, 0] } : undefined}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={clsx(
          'font-display font-semibold tabular-nums',
          dense
            ? 'text-[clamp(1.35rem,min(3vw,4vh),2.1rem)]'
            : 'text-[clamp(1.65rem,min(3.6vw,5vh),2.9rem)]',
          toneText[tone],
        )}
      >
        <AnimatedNumber
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          onComplete={isDollar ? () => setBurst(true) : undefined}
        />
      </motion.div>
      <p className={clsx('leading-snug text-ink-200', dense ? 'text-[clamp(11px,1vw,12.5px)]' : 'text-[clamp(12px,1.1vw,13.5px)]')}>
        {label}
      </p>
    </Card>
  )
}
