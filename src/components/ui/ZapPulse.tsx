import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

/** A lightning bolt that flashes on a loop — for speedup / "x times faster" stats. */
export function ZapPulse({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
      animate={{ scale: [1, 1.18, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.55), transparent 70%)' }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.5, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
      />
      <Zap size={size * 0.75} className="relative fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
    </motion.div>
  )
}
