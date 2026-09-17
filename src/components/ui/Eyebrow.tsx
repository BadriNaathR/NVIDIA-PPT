import { clsx } from 'clsx'

interface EyebrowProps {
  children: React.ReactNode
  accent?: 'green' | 'cyan' | 'alert'
  className?: string
}

const accentMap = {
  green: 'bg-nvidia text-nvidia',
  cyan: 'bg-cyan text-cyan',
  alert: 'bg-alert text-alert',
}

export function Eyebrow({ children, accent = 'green', className }: EyebrowProps) {
  const [dot] = accentMap[accent].split(' ')
  const text = accentMap[accent].split(' ')[1]
  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      <span className={clsx('h-1.5 w-1.5 animate-[hop_2.2s_cubic-bezier(0.34,1.56,0.64,1)_infinite] rounded-full', dot)} />
      <span
        className={clsx(
          'font-mono text-[11.5px] font-medium uppercase tracking-[0.28em]',
          text,
        )}
      >
        {children}
      </span>
    </div>
  )
}
