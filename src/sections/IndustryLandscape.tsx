import { motion } from 'framer-motion'
import { ArrowRight, Boxes, Calculator, Satellite, Sparkles, Waves, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'

const STAGES = ['Detect', 'Decide', 'Act', 'Verify']

const rows: { name: string; good: string; gap: string; icon: LucideIcon; covers: boolean[] }[] = [
  {
    name: 'Google Flood Hub',
    good: 'Free AI flood forecasts, 2B people, 150+ countries',
    gap: 'Forecast only — no exposure math, routing, or audit trail',
    icon: Waves,
    covers: [true, false, false, false],
  },
  {
    name: 'One Concern',
    good: 'AI "digital twin" disaster simulation, $150M+ raised',
    gap: 'Pre-event scoring — not a live, in-the-moment pipeline',
    icon: Boxes,
    covers: [true, true, false, false],
  },
  {
    name: 'Floodbase',
    good: 'Satellite detection for parametric insurance triggers',
    gap: 'Payout triggers only — no life-safety guidance',
    icon: Satellite,
    covers: [true, true, false, false],
  },
  {
    name: 'ICEYE',
    good: 'SAR satellite constellation, real-time imagery',
    gap: 'A data provider, not a decision layer',
    icon: Satellite,
    covers: [true, false, false, false],
  },
  {
    name: 'Traditional cat-modeling',
    good: 'Mature actuarial loss modeling ($1.82B market)',
    gap: 'Post-event / pricing-cycle — not real-time',
    icon: Calculator,
    covers: [false, true, false, true],
  },
]

function CoverageBar({ covers, i }: { covers: boolean[]; i: number }) {
  return (
    <div className="mt-3 flex items-center gap-1.5">
      {STAGES.map((stage, si) => (
        <div key={stage} className="flex flex-1 flex-col items-center gap-1">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            {covers[si] ? (
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-cyan-bright"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left', width: '100%' }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 + si * 0.08, ease: 'easeOut' }}
              />
            ) : (
              <motion.span
                className="absolute inset-y-0 left-0 w-full rounded-full bg-alert/40"
                animate={{ opacity: [0.3, 0.75, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 + si * 0.1 }}
              />
            )}
          </div>
          <span className={`font-mono text-[8.5px] uppercase tracking-wide ${covers[si] ? 'text-cyan-bright/70' : 'text-alert/60'}`}>
            {stage}
          </span>
        </div>
      ))}
    </div>
  )
}

// Average of the 5 competitor coverage scores above — the one number worth carrying forward.
const avgCompetitorScore = rows.reduce((sum, r) => sum + r.covers.filter(Boolean).length, 0) / rows.length

function CoverageVerdict() {
  return (
    <Reveal delay={0.4} className="mt-4 flex items-center justify-center gap-6 rounded-xl glass p-[clamp(1rem,3vh,1.75rem)] sm:gap-10">
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-bold leading-none text-ink-400">
          {avgCompetitorScore.toFixed(1)}
          <span className="text-[0.4em] text-ink-600">/4</span>
        </span>
        <span className="text-[12px] uppercase tracking-wide text-ink-600">avg. competitor coverage</span>
      </div>

      <motion.span
        className="text-cyan-bright"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowRight size={28} strokeWidth={2.5} />
      </motion.span>

      <div className="flex flex-col items-center gap-1">
        <motion.span
          className="font-display text-[clamp(2.8rem,7.5vw,4.4rem)] font-bold leading-none text-nvidia-bright"
          animate={{ textShadow: ['0 0 0px rgba(143,220,0,0)', '0 0 24px rgba(143,220,0,0.55)', '0 0 0px rgba(143,220,0,0)'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          4<span className="text-[0.4em] text-nvidia-bright/60">/4</span>
        </motion.span>
        <span className="text-[12px] font-semibold uppercase tracking-wide text-nvidia-bright">LifeShield AI</span>
      </div>
    </Reveal>
  )
}

export function IndustryLandscape() {
  return (
    <Section
      id="landscape"
      index={3}
      total={15}
      eyebrow="Industry Landscape"
      title="What exists today — and the gap each one leaves open"
      accent="cyan"
    >
      <div className="relative overflow-hidden">
        {/* a radar sweep passes over the whole competitive field on a loop */}
        <motion.div
          className="pointer-events-none absolute -inset-8 z-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(95,168,211,0.14) 18deg, transparent 46deg)',
            mixBlendMode: 'screen',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <StaggerGroup className="relative z-10 grid grid-cols-1 gap-[clamp(0.55rem,1.6vh,0.9rem)] sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.16}>
          {rows.map((r, i) => (
            <StaggerItem
              key={r.name}
              entrance="flip"
              className="relative overflow-hidden rounded-xl glass p-[clamp(0.75rem,2vh,1.1rem)] transition-colors hover:border-cyan/30"
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(95,168,211,0.10), transparent 60%)' }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              />
              <div className="relative flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-cyan/25"
                    animate={{ scale: [0.85, 1.5, 0.85], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  />
                  <motion.span
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }}
                    whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                  >
                    <r.icon size={16} className="text-cyan-bright" strokeWidth={2} />
                  </motion.span>
                </div>
                <span className="text-[clamp(13.5px,1.3vw,15px)] font-semibold text-ink-50">{r.name}</span>
              </div>

              <p className="relative mt-2.5 text-[clamp(12px,1.05vw,13.5px)] leading-snug text-ink-200">{r.good}</p>
              <p className="relative mt-1.5 border-l-2 border-alert/40 pl-2.5 text-[clamp(11.5px,1vw,13px)] leading-snug text-ink-400">
                {r.gap}
              </p>

              <CoverageBar covers={r.covers} i={i} />
            </StaggerItem>
          ))}

          <StaggerItem
            entrance="pop"
            className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-nvidia/30 bg-nvidia/[0.06] p-[clamp(0.75rem,2vh,1.1rem)] text-center"
          >
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(120% 100% at 50% 120%, rgba(143,220,0,0.16), transparent 70%)' }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-nvidia/40 bg-nvidia/15"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={18} className="text-nvidia-bright" strokeWidth={2} />
            </motion.span>
            <p className="relative text-[clamp(13px,1.15vw,14.5px)] font-semibold leading-snug text-nvidia-bright">
              Nobody covers all four stages
            </p>
            <p className="relative text-[clamp(11.5px,1vw,12.5px)] leading-snug text-ink-400">
              That full row, lit end to end — Detect through Verify — is the gap LifeShield AI is built to close.
            </p>
          </StaggerItem>
        </StaggerGroup>
      </div>

      <CoverageVerdict />
    </Section>
  )
}
