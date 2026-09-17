import { motion } from 'framer-motion'

export function CoinFlip({ size = 28 }: { size?: number }) {
  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0" style={{ perspective: 240 }}>
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full font-display text-[13px] font-bold shadow-[0_0_14px_rgba(250,204,21,0.6)]"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(150deg,#fde68a,#eab308 55%,#a16207)',
              color: '#4a3200',
            }}
          >
            $
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full font-display text-[13px] font-bold shadow-[0_0_14px_rgba(250,204,21,0.6)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(150deg,#fde68a,#eab308 55%,#a16207)',
              color: '#4a3200',
            }}
          >
            $
          </div>
        </motion.div>
      </div>

      {/* Orbiting twinkle sparkles for extra shimmer around the coin */}
      <motion.span
        className="absolute -right-1 -top-1 text-[9px] text-yellow-300"
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute -bottom-1 -left-1 text-[7px] text-yellow-200"
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
      >
        ✦
      </motion.span>
    </motion.div>
  )
}
