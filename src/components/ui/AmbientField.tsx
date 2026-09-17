import { motion } from 'framer-motion'

const accentRgb: Record<string, string> = {
  green: '143, 220, 0',
  cyan: '95, 168, 211',
  alert: '240, 75, 35',
}

// Deterministic scatter — a seeded spread reads as organic without re-randomising on render.
const MOTES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 97,
  bottom: -10 - ((i * 37) % 40),
  size: 2 + (i % 3),
  dur: 9 + ((i * 7) % 9),
  delay: (i * 1.31) % 11,
  bright: i % 4 === 0,
}))

/**
 * Always-on background motion for a slide: rising motes, a slow light sweep and a
 * breathing corner bracket. Purely decorative and pointer-transparent.
 */
export function AmbientField({ accent = 'green' }: { accent?: 'green' | 'cyan' | 'alert' }) {
  const rgb = accentRgb[accent]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="ambient-mote absolute rounded-full"
          style={{
            left: `${m.left}%`,
            bottom: `${m.bottom}px`,
            width: m.size,
            height: m.size,
            background: m.bright ? `rgba(${rgb}, 0.9)` : 'rgba(214, 222, 227, 0.45)',
            boxShadow: m.bright ? `0 0 8px 1px rgba(${rgb}, 0.6)` : 'none',
            ['--mote-dur' as string]: `${m.dur}s`,
            ['--mote-delay' as string]: `${m.delay}s`,
          }}
        />
      ))}

      <span
        className="ambient-sweep absolute inset-y-0 left-0 w-[28%]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.05), transparent)`,
        }}
      />

      <motion.span
        className="absolute left-0 top-0 h-[2px] w-full origin-left"
        style={{ background: `linear-gradient(90deg, rgba(${rgb},0.55), transparent)` }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
