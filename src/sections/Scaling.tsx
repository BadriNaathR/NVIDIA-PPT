import { motion } from 'framer-motion'
import { Award, Database, Radio, Server, Users, Zap, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { PulseIcon } from '../components/ui/PulseIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'

const technical: { label: string; tag: string; icon: LucideIcon }[] = [
  { label: 'NIM + NVIDIA Dynamo', tag: "Switchyard's prod path exists", icon: Server },
  { label: 'Postgres audit log', tag: 'replaces in-memory store', icon: Database },
  { label: 'Event-bus Proactive Monitor', tag: 'not a 45s poll', icon: Radio },
  { label: 'Multi-tenant adapters', tag: 'config per customer, not per city', icon: Users },
]

const patents: { label: string; tag: string; icon: LucideIcon }[] = [
  { label: 'Evidence-agreement gate', tag: 'novel, weighted decision method', icon: Award },
  { label: 'Adaptive-cutoff retrieval', tag: 'patentable vs. fixed top-K', icon: Award },
  { label: 'Circuit-breaker fallback', tag: '4.4× speedup, reusable pattern', icon: Zap },
]

export function Scaling() {
  return (
    <Section
      id="scaling"
      index={13}
      total={15}
      eyebrow="Scaling This as a Product"
      title="From hackathon build to a licensable, patentable platform"
      accent="cyan"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StaggerGroup staggerChildren={0.2}>
          <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-cyan-bright">Technical scaling</h3>
          <div className="flex flex-col gap-2.5">
            {technical.map((t, i) => (
              <StaggerItem
                key={t.label}
                entrance="swing"
                className="flex items-center gap-3 rounded-xl glass p-3.5"
              >
                <PulseIcon icon={t.icon} color="cyan" index={i} />
                <div className="flex flex-col">
                  <span className="text-[14.5px] font-medium leading-snug text-ink-100">{t.label}</span>
                  <span className="font-mono text-[11px] text-ink-600">{t.tag}</span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>

        <StaggerGroup staggerChildren={0.2}>
          <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-nvidia-bright">IP / patent angle</h3>
          <div className="flex flex-col gap-2.5">
            {patents.map((p, i) => (
              <StaggerItem
                key={p.label}
                entrance="drop"
                className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-nvidia/20 bg-nvidia/[0.04] p-3.5"
              >
                <motion.span
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(143,220,0,0.10), transparent)' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut', delay: i * 1.1 }}
                />
                <PulseIcon icon={p.icon} color="green" index={i} />
                <div className="relative flex flex-col">
                  <span className="text-[14.5px] font-medium leading-snug text-ink-100">{p.label}</span>
                  <span className="font-mono text-[11px] text-nvidia-bright/70">{p.tag}</span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>

      <Reveal delay={0.3} className="mt-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">
          Same codebase, no rewrite
        </p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard dense value={4} tone="cyan" label="Infra upgrades to production" />
          <StatCard dense value={3} tone="green" label="Patentable techniques identified" />
          <StatCard dense value={0} tone="cyan" label="Rewrites required" />
          <StatCard dense value={1} tone="green" label="Platform, many customers" />
        </div>
      </Reveal>
    </Section>
  )
}
