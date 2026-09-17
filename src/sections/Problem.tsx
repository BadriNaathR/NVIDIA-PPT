import { motion } from 'framer-motion'
import { Building2, CloudRainWind, Landmark, MapPin, Timer, TrendingUp, Users } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'

const causes = [
  {
    lead: 'Climate volatility',
    body: 'Warmer air, more moisture — rainfall is more frequent and intense.',
    icon: CloudRainWind,
  },
  {
    lead: 'Urbanization outpaces infra',
    body: '28.1M (1970) → 35.1M (2020) exposed, +24.9% — cities outgrow drainage.',
    icon: Building2,
  },
  {
    lead: 'Decisions take too long',
    body: 'Evacuation calls still depend on a human reading five feeds under pressure.',
    icon: Timer,
  },
  {
    lead: 'A trust gap, not a capital gap',
    body: "Insurers & governments have the money — not a fast, trustworthy way to decide.",
    icon: Landmark,
  },
  {
    lead: 'Hits the vulnerable hardest',
    body: '80–90% of losses uninsured in emerging markets; ~7% covered in Asia vs. 34% advanced.',
    icon: Users,
  },
]

export function Problem() {
  return (
    <Section
      id="problem"
      index={2}
      total={15}
      eyebrow="The Business Problem"
      title="Flooding is the most frequent, least-served disaster on Earth"
      accent="alert"
    >
      <StaggerGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StaggerItem>
          <StatCard dense value={320} prefix="$" suffix="B" tone="alert" label="Global disaster losses, 2024" />
        </StaggerItem>
        <StaggerItem>
          <StatCard dense value={424} prefix="$" suffix="B" tone="alert" label="Insurance protection gap" />
        </StaggerItem>
        <StaggerItem>
          <StatCard dense value={49} suffix="M" tone="alert" label="People hit by floods in 2024" />
        </StaggerItem>
        <StaggerItem>
          <StatCard dense value={83} suffix="%" tone="cyan" label="Of flood losses uninsured" />
        </StaggerItem>
      </StaggerGroup>

      <Reveal delay={0.15} className="mt-[clamp(0.75rem,2.2vh,1.4rem)]">
        <p className="text-[14px] font-semibold uppercase tracking-wide text-ink-200">
          Why this keeps getting worse, not better
        </p>
      </Reveal>

      <StaggerGroup
        className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        staggerChildren={0.2}
      >
        {causes.map((c, i) => (
          <StaggerItem
            key={c.lead}
            entrance={i % 2 === 0 ? 'drop' : 'pop'}
            className="group relative flex flex-col items-start gap-2.5 overflow-hidden rounded-xl glass p-[clamp(0.7rem,2vh,1.15rem)]"
          >
            <motion.span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
              style={{ background: 'linear-gradient(0deg, rgba(240,75,35,0.14), transparent)' }}
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
            {/* each cause keeps hopping on its own beat — the pressure never lets up */}
            <span
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-alert/30 bg-alert/10 [animation:var(--animate-hop-slow)]"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <c.icon size={19} className="text-alert" strokeWidth={2} />
            </span>
            <span className="relative text-[clamp(13px,1.2vw,14.5px)] font-semibold leading-snug text-ink-50">{c.lead}</span>
            <span className="relative text-[clamp(12px,1.05vw,13.5px)] leading-snug text-ink-400">{c.body}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal
        delay={0.3}
        className="mt-[clamp(0.75rem,2.2vh,1.4rem)] flex flex-col items-center gap-3 rounded-2xl glass p-[clamp(0.9rem,2.6vh,1.5rem)] sm:flex-row sm:gap-5"
      >
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full bg-alert/25"
            animate={{ scale: [0.85, 1.5, 0.85], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-alert/40 bg-alert/10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TrendingUp size={22} className="text-alert" strokeWidth={2.2} />
          </motion.span>
        </div>

        <p className="text-center text-[clamp(13.5px,1.2vw,15px)] leading-snug text-ink-200 sm:text-left">
          Getting worse, not better —{' '}
          <span className="font-semibold text-ink-50">every year without faster, trustworthy decision-support compounds the loss.</span>
        </p>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-1.5 sm:ml-auto">
          {['Chennai', 'Bengaluru', 'Houston'].map((city, i) => (
            <motion.span
              key={city}
              className="flex items-center gap-1 rounded-full border border-alert/25 bg-alert/[0.06] px-2.5 py-1 font-mono text-[11px] text-alert/90"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <MapPin size={11} strokeWidth={2.2} />
              {city}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
