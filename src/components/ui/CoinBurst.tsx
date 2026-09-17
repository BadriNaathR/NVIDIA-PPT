import { motion } from 'framer-motion'

const GOLD_FACE = 'radial-gradient(circle at 32% 28%, #fffbe6 0%, #fde68a 26%, #eab308 58%, #a16207 100%)'

/** Each coin is launched on its own arc: out and up first, then pulled down past the card edge. */
const COINS = Array.from({ length: 18 }, (_, i) => {
  const spread = (i / 17 - 0.5) * 2 // -1 .. 1
  const lift = 54 + ((i * 13) % 46)
  return {
    x: spread * (46 + ((i * 17) % 40)),
    peak: -lift,
    fall: 70 + ((i * 23) % 50),
    size: 11 + ((i * 5) % 8),
    delay: Math.abs(spread) * 0.12 + (i % 3) * 0.035,
    spin: (i % 2 === 0 ? 1 : -1) * (540 + i * 40),
    tilt: (i % 2 === 0 ? -1 : 1) * (200 + i * 30),
    dur: 1.25 + (i % 4) * 0.12,
  }
})

const GLINTS = [
  { x: -34, y: -26, d: 0.18 },
  { x: 30, y: -34, d: 0.34 },
  { x: -18, y: 16, d: 0.5 },
  { x: 40, y: 6, d: 0.62 },
]

interface CoinBurstProps {
  active: boolean
  /** Tailwind position classes matching where the source coin icon sits, e.g. "right-2 top-2". */
  originClassName?: string
  /** The coin icon's box size in px, so the burst can center itself on it. */
  originSize?: number
}

/**
 * Fired once when a dollar stat finishes counting up: the coin splits along a bright
 * fault line, then a fountain of spinning coins erupts and falls away under gravity —
 * anchored on the coin icon itself, not the middle of the card.
 */
export function CoinBurst({ active, originClassName = 'right-2 top-2', originSize = 24 }: CoinBurstProps) {
  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden>
      <div
        className={`absolute flex items-center justify-center ${originClassName}`}
        style={{ width: originSize, height: originSize }}
      >
        {/* the split: a hairline fault that flashes open across the card */}
        <motion.div
          className="absolute h-[2px] w-full origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, #fffbe6, #fde68a, transparent)' }}
          initial={{ scaleX: 0, opacity: 0, rotate: -8 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.7, 0], rotate: -8 }}
          transition={{ duration: 0.42, ease: 'easeOut', times: [0, 0.35, 0.6, 1] }}
        />

        {/* the two halves parting */}
        {[-1, 1].map((dir) => (
          <motion.span
            key={dir}
            className="absolute h-7 w-7 rounded-full"
            style={{ background: GOLD_FACE, clipPath: dir < 0 ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)' }}
            initial={{ opacity: 0.95, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{ opacity: [0.95, 0.9, 0], x: dir * 46, y: 34, rotate: dir * 160, scale: 0.5 }}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
          />
        ))}

        {/* shockwave rings */}
        <motion.div
          className="absolute rounded-full border-2 border-yellow-300/70"
          style={{ height: 26, width: 26 }}
          initial={{ opacity: 0.85, scale: 0.3 }}
          animate={{ opacity: 0, scale: 5.2 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute rounded-full border border-yellow-200/50"
          style={{ height: 26, width: 26 }}
          initial={{ opacity: 0.6, scale: 0.3 }}
          animate={{ opacity: 0, scale: 3.6 }}
          transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute h-8 w-8 rounded-full bg-white"
          initial={{ opacity: 0.9, scale: 0.1 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* the fountain */}
        {COINS.map((c, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: c.size,
              height: c.size,
              background: GOLD_FACE,
              boxShadow: 'inset 0 0 0 1px rgba(120,80,0,0.45), 0 0 10px rgba(250,204,21,0.55)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.3, rotateY: 0, rotateZ: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, c.x * 0.6, c.x],
              y: [0, c.peak, c.fall],
              scale: [0.3, 1, 0.85],
              rotateY: c.spin,
              rotateZ: c.tilt,
            }}
            transition={{
              duration: c.dur,
              delay: 0.1 + c.delay,
              ease: ['easeOut', 'easeIn'],
              times: [0, 0.42, 1],
              opacity: { duration: c.dur, delay: 0.1 + c.delay, times: [0, 0.12, 0.72, 1] },
            }}
          />
        ))}

        {/* glints left hanging in the air */}
        {GLINTS.map((g, i) => (
          <motion.span
            key={`g${i}`}
            className="absolute font-display text-[11px] text-yellow-100"
            style={{ textShadow: '0 0 8px rgba(253,224,71,0.9)' }}
            initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.3, 0.4], x: g.x, y: g.y }}
            transition={{ duration: 0.9, delay: g.d, ease: 'easeOut' }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* the card itself takes the recoil */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 0 0 40px rgba(250,204,21,0.35)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  )
}
