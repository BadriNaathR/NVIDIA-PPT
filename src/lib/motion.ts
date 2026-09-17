import type { Variants } from 'framer-motion'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
}

/** A jumpier entrance: pops up from below and overshoots slightly, like a little hop into place. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 170, damping: 14, mass: 0.9 },
  },
}

/** Swings in from the left edge with a slight tilt — used to break up grids of pop-ins. */
export const swingIn: Variants = {
  hidden: { opacity: 0, x: -44, rotate: -4 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 150, damping: 16 },
  },
}

/** Drops from above and lands with a bounce, like a card dealt onto the table. */
export const dropIn: Variants = {
  hidden: { opacity: 0, y: -60, rotate: 3 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 13, mass: 0.8 },
  },
}

/** Unfolds around the X axis — reads as a panel flipping face-up. */
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -55, y: 24 },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

/**
 * The slide lands instantly; its contents are what take their time. `delayChildren`
 * holds everything back until the heading has read, then each item follows the last
 * by `staggerChildren` so the eye is led through the slide one beat at a time.
 */
export const stagger = (delayChildren = 0.34, staggerChildren = 0.26): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
})

export const viewport = { once: true, margin: '-8% 0px -8% 0px' } as const

/** Ambient loops — attach to anything that should keep breathing after it lands. */
export const floatLoop = (distance = 6, duration = 3.4, delay = 0) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
})

export const pulseLoop = (delay = 0, duration = 2.6) => ({
  animate: { scale: [1, 1.12, 1], opacity: [0.55, 0.95, 0.55] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
})
