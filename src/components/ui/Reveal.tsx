import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { dropIn, fadeUp, flipIn, popIn, stagger, swingIn, viewport } from '../../lib/motion'

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delayChildren?: number
  staggerChildren?: number
}

export function StaggerGroup({
  children,
  delayChildren = 0.34,
  staggerChildren = 0.26,
  ...rest
}: StaggerProps) {
  return (
    <motion.div
      variants={stagger(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const entrances: Record<string, Variants> = { pop: popIn, swing: swingIn, drop: dropIn, flip: flipIn, fade: fadeUp }

interface StaggerItemProps extends RevealProps {
  /** Which entrance this item uses. Mixing them across a grid keeps a slide from feeling uniform. */
  entrance?: keyof typeof entrances
}

export function StaggerItem({ children, entrance = 'pop', ...rest }: StaggerItemProps) {
  return (
    <motion.div
      variants={entrances[entrance]}
      whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 340, damping: 16 } }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Headline that assembles word by word, so the title reads before the body arrives. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(0.04, 0.055)}
      style={{ display: 'inline-block' }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={{
            hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
