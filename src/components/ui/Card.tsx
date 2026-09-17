import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { fadeUp } from '../../lib/motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  dense?: boolean
}

export function Card({ children, className, hover = true, dense = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={hover ? onMouseMove : undefined}
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={clsx(
        'glass spot-card h-full rounded-2xl transition-colors duration-300',
        dense ? 'p-[clamp(0.6rem,1.8vh,1.05rem)]' : 'p-[clamp(0.85rem,2.4vh,1.4rem)]',
        hover && 'hover:border-white/[0.16]',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
