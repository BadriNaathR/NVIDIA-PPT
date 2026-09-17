import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'

const phases = [
  {
    tag: 'NOW',
    title: 'Hardening',
    tone: 'alert' as const,
    items: [
      'Real datastore for runs/approvals (Postgres)',
      "Real authentication (today's login is disclosed as mock)",
      'Fix the Twilio trial-template send path',
    ],
  },
  {
    tag: 'NEXT',
    title: 'Scale the same design',
    tone: 'cyan' as const,
    items: [
      'NIM + NVIDIA Dynamo',
      'Business-interruption exposure modeling',
      'Event-bus-driven Proactive Monitor',
      'Per-customer evidence-source configuration',
    ],
  },
  {
    tag: 'LATER',
    title: 'New capabilities',
    tone: 'green' as const,
    items: [
      'Cross-event memory, trend reasoning and country adapters',
      'NVIDIA Omniverse',
      'NVIDIA Metropolis',
      'Human-reviewed damage-ratio calibration from real claims data',
    ],
  },
]

const toneMap = {
  alert: { badge: 'bg-alert/10 text-alert border-alert/30', dot: 'bg-alert' },
  cyan: { badge: 'bg-cyan/10 text-cyan-bright border-cyan/30', dot: 'bg-cyan-bright' },
  green: { badge: 'bg-nvidia/10 text-nvidia-bright border-nvidia/30', dot: 'bg-nvidia-bright' },
}

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      index={14}
      total={15}
      eyebrow="Roadmap"
      title="Ordered by what unlocks the next thing"
      accent="green"
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 lg:grid-cols-3" staggerChildren={0.2}>
        {phases.map((phase, i) => {
          const tone = toneMap[phase.tone]
          return (
            <StaggerItem key={phase.tag} entrance="flip" className="relative flex flex-col rounded-2xl glass p-5">
              <span className={clsx('flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-bold', tone.badge)}>
                {phase.tag === 'NOW' && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-alert" />
                  </span>
                )}
                {phase.tag}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-ink-50">{phase.title}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {phase.items.map((it, pi) => (
                  <li key={it} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-400">
                    <motion.span
                      className={clsx('mt-1.5 h-1 w-1 shrink-0 rounded-full', tone.dot)}
                      animate={{ scale: [1, 2.3, 1], opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 + pi * 0.3 }}
                    />
                    {it}
                  </li>
                ))}
              </ul>
              {i < phases.length - 1 && (
                <span className="absolute -right-2 top-8 hidden h-px w-4 overflow-visible bg-line lg:block">
                  <motion.span
                    className={clsx('absolute -top-[3px] h-[7px] w-[7px] rounded-full', tone.dot)}
                    animate={{ left: ['-20%', '110%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut', delay: i * 0.8 }}
                  />
                </span>
              )}
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <Reveal delay={0.35} className="glass relative mt-5 overflow-hidden rounded-2xl p-5">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <motion.div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-alert via-cyan-bright to-nvidia-bright"
            animate={{ right: ['100%', '0%'] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          />
          {phases.map((phase) => {
            const tone = toneMap[phase.tone]
            return (
              <div key={phase.tag} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
                <motion.span
                  className={clsx('h-3 w-3 rounded-full border-2', tone.dot)}
                  style={{ borderColor: 'rgba(11,14,20,1)' }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-400">{phase.tag}</span>
              </div>
            )
          })}
        </div>
        <p className="relative mt-4 text-center text-[13px] leading-relaxed text-ink-400">
          Same architecture, every phase — <span className="text-ink-100">nothing here requires starting over.</span>
        </p>
      </Reveal>
    </Section>
  )
}
