import { motion } from 'framer-motion'
import { FlaskConical, ScrollText, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { PulseIcon } from '../components/ui/PulseIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'

const categories: { title: string; icon: LucideIcon; points: { label: string; tag: string }[] }[] = [
  {
    title: 'Guardrails',
    icon: ShieldCheck,
    points: [
      { label: 'Grounding self-check', tag: 'every narrative verified' },
      { label: 'Live hallucination catch', tag: 'auto-demoted mid-run' },
      { label: 'Fails open, never silent', tag: 'emergency always gets through' },
    ],
  },
  {
    title: 'Traceability & Cost',
    icon: ScrollText,
    points: [
      { label: 'Full audit trace', tag: 'every call, live' },
      { label: 'Circuit-breaker recovery', tag: '418s → 95.3s · 4.4×' },
    ],
  },
  {
    title: 'Evaluation (Real)',
    icon: FlaskConical,
    points: [
      { label: '2 real benchmarks', tag: 'retrieval + life-safety' },
      { label: 'Root-caused precision bug', tag: '0.32 → 0.71 F1' },
      { label: 'Golden-dataset, real pipeline', tag: 'not self-graded' },
    ],
  },
]

export function TrustEvaluation() {
  return (
    <Section
      id="trust"
      index={8}
      total={15}
      eyebrow="Trust, Traceability & Evaluation"
      title={'"Is this trustworthy" has a measured answer here'}
      accent="green"
    >
      <StaggerGroup className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {categories.map((c, ci) => (
          <StaggerItem key={c.title} entrance="flip" className="relative overflow-hidden rounded-2xl glass p-5">
            {/* a verification sweep passes over each panel in turn */}
            <motion.span
              className="pointer-events-none absolute inset-x-0 h-24"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(143,220,0,0.10), transparent)' }}
              animate={{ y: ['-100%', '420%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut', delay: ci * 1.05 }}
            />
            <div className="relative flex items-center gap-2.5">
              <PulseIcon icon={c.icon} color="green" box={36} size={17} index={ci} />
              <h3 className="text-[15.5px] font-semibold text-nvidia-bright">{c.title}</h3>
            </div>
            <ul className="relative mt-3 flex flex-col gap-2.5">
              {c.points.map((p, pi) => (
                <li key={p.label} className="flex items-start gap-2">
                  <motion.span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-nvidia-bright"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: ci * 0.3 + pi * 0.35 }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[13.5px] font-medium leading-snug text-ink-100">{p.label}</span>
                    <span className="font-mono text-[11px] text-ink-600">{p.tag}</span>
                  </div>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.25} className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">
          Measured, not estimated
        </p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard value={0.71} decimals={2} tone="green" label="Retrieval precision" />
          <StatCard value={95.3} decimals={1} suffix="s" tone="cyan" label="Circuit-breaker recovery time" />
          <StatCard value={4.4} decimals={1} suffix="×" tone="green" label="Circuit-breaker speedup" />
          <StatCard value={0.73} decimals={2} tone="cyan" label="Retrieval F1 score" />
        </div>
      </Reveal>
    </Section>
  )
}
