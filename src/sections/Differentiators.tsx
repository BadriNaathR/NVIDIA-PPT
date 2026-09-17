import { motion } from 'framer-motion'
import { BellRing, Globe, Lock, SlidersHorizontal, Sparkles, Zap, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { StaggerGroup, StaggerItem } from '../components/ui/Reveal'

type Entrance = 'pop' | 'swing' | 'drop' | 'flip'

const items: { title: string; icon: LucideIcon; rgb: string; entrance: Entrance }[] = [
  { title: 'Digital Twin "What-If" Simulator', icon: SlidersHorizontal, rgb: '143, 220, 0', entrance: 'drop' },
  { title: 'Domain-grounded RAG, not chat', icon: Sparkles, rgb: '95, 168, 211', entrance: 'pop' },
  { title: 'AI narrates, math decides', icon: Lock, rgb: '167, 139, 250', entrance: 'flip' },
  { title: 'Resilience as a measured feature', icon: Zap, rgb: '250, 204, 21', entrance: 'swing' },
  { title: 'One adapter, three countries', icon: Globe, rgb: '45, 212, 191', entrance: 'pop' },
  { title: 'Proactive, not just reactive', icon: BellRing, rgb: '240, 75, 35', entrance: 'drop' },
]

export function Differentiators() {
  return (
    <Section
      id="differentiators"
      index={10}
      total={15}
      eyebrow="Differentiators"
      title="What makes this different from a chatbot bolted onto a dashboard"
      accent="cyan"
    >
      <StaggerGroup className="grid flex-1 grid-cols-2 gap-[clamp(0.7rem,2.2vh,1.4rem)] sm:grid-cols-3" staggerChildren={0.22}>
        {items.map((it, i) => (
          <StaggerItem
            key={it.title}
            entrance={it.entrance}
            className="group relative flex h-full flex-col items-center justify-center gap-[clamp(0.6rem,2vh,1.3rem)] overflow-hidden rounded-2xl glass p-[clamp(0.9rem,3vh,2rem)] text-center"
            style={{ borderColor: `rgba(${it.rgb}, 0.22)` }}
          >
            {/* colour wash that breathes behind the tile */}
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(120% 90% at 50% 120%, rgba(${it.rgb},0.20), transparent 70%)` }}
              animate={{ opacity: [0.45, 0.95, 0.45] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            />

            <span
              className="absolute left-3 top-2.5 font-mono text-[10px] font-bold tracking-[0.18em]"
              style={{ color: `rgba(${it.rgb}, 0.65)` }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative flex h-[clamp(3rem,9vh,5.4rem)] w-[clamp(3rem,9vh,5.4rem)] items-center justify-center">
              {/* expanding sonar ring */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: `rgba(${it.rgb}, 0.28)` }}
                animate={{ scale: [0.8, 1.55, 0.8], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.24 }}
              />
              {/* a satellite tracing the ring */}
              <motion.span
                className="absolute inset-[-6px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 7 + i, repeat: Infinity, ease: 'linear' }}
              >
                <span
                  className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full"
                  style={{ background: `rgb(${it.rgb})`, boxShadow: `0 0 8px 2px rgba(${it.rgb},0.7)` }}
                />
              </motion.span>
              {/* the icon itself never stops bobbing */}
              <motion.span
                className="relative flex h-full w-full items-center justify-center rounded-full border"
                style={{ borderColor: `rgba(${it.rgb}, 0.4)`, background: `rgba(${it.rgb}, 0.12)` }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                whileHover={{ rotate: 360, scale: 1.14, transition: { duration: 0.8, ease: 'easeInOut' } }}
              >
                <it.icon
                  size={30}
                  strokeWidth={2}
                  style={{ color: `rgb(${it.rgb})`, filter: `drop-shadow(0 0 8px rgba(${it.rgb},0.55))` }}
                />
              </motion.span>
            </div>

            <h3 className="relative text-[clamp(13px,1.45vw,17.5px)] font-semibold leading-snug text-ink-50">
              {it.title}
            </h3>

            {/* underline that draws itself in on hover */}
            <span
              className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3"
              style={{ background: `linear-gradient(90deg, transparent, rgb(${it.rgb}), transparent)` }}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
