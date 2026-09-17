import { motion } from 'framer-motion'
import { Cpu, GitBranch, ScrollText, Search, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { PulseIcon } from '../components/ui/PulseIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'

const rows: { cap: string; icon: LucideIcon; nvidia: string; alt: string; result: string }[] = [
  {
    cap: 'Model routing',
    icon: GitBranch,
    nvidia: 'NeMo Switchyard — one router, per-call effort tier',
    alt: 'Hand-rolled routers, LangChain / LiteLLM glue',
    result: '1 config flag',
  },
  {
    cap: 'Guardrails',
    icon: ShieldCheck,
    nvidia: 'NeMo Guardrails — 5 stages, 33 built-in rails',
    alt: 'Ad-hoc filters, different schema per tool',
    result: 'caught a live hallucination',
  },
  {
    cap: 'Retrieval',
    icon: Search,
    nvidia: 'NeMo Retriever — adaptive-cutoff, GPU reranked',
    alt: 'Fixed top-K, DIY FAISS, CPU-bound',
    result: '0.32 → 0.71 precision',
  },
  {
    cap: 'Governance & eval',
    icon: ScrollText,
    nvidia: 'NeMo Relay + Evaluator — one audit trail',
    alt: 'LangSmith, Helicone, spreadsheets',
    result: '4.4× faster recovery',
  },
  {
    cap: 'Compute',
    icon: Cpu,
    nvidia: 'DGX B300 — 1.1 TB aggregate memory, NIM-portable',
    alt: 'Fixed cloud rental, no self-host path',
    result: '152s live run',
  },
]

export function WhyNvidia() {
  return (
    <Section
      id="why-nvidia"
      index={11}
      total={15}
      eyebrow="Why NVIDIA"
      title="One stack vs. a patchwork of point solutions"
      accent="green"
      headerRight={
        <span className="rounded-full border border-nvidia/30 bg-nvidia/[0.08] px-3 py-1 font-mono text-[11px] font-semibold text-nvidia-bright">
          DGX B300
        </span>
      }
    >
      <div className="hidden grid-cols-[1.3fr_1.6fr_1.4fr_1.1fr] gap-4 px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-600 lg:grid">
        <span>Capability</span>
        <span className="text-nvidia-bright">NVIDIA</span>
        <span className="text-alert">Fragmented alternative</span>
        <span>Measured</span>
      </div>
      <StaggerGroup className="flex flex-col gap-2" staggerChildren={0.2}>
        {rows.map((r, i) => (
          <StaggerItem
            key={r.cap}
            entrance="swing"
            className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-xl glass p-[clamp(0.55rem,1.7vh,1rem)] lg:grid-cols-[1.3fr_1.6fr_1.4fr_1.1fr] lg:items-center lg:gap-4"
          >
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(143,220,0,0.09), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: rows.length * 0.8, ease: 'easeInOut', delay: i * 0.8 }}
            />
            <span className="relative flex items-center gap-2.5 text-[14.5px] font-semibold text-ink-50">
              <PulseIcon icon={r.icon} color="green" size={16} index={i} />
              {r.cap}
            </span>
            <span className="relative text-[13.5px] leading-snug text-ink-200">{r.nvidia}</span>
            <span className="relative text-[13.5px] leading-snug text-ink-600 line-through decoration-alert/50">{r.alt}</span>
            <motion.span
              className="relative w-fit rounded-full border border-nvidia/25 bg-nvidia/[0.07] px-2.5 py-1 font-mono text-[12px] font-semibold text-nvidia-bright"
              animate={{ boxShadow: ['0 0 0 0 rgba(143,220,0,0)', '0 0 14px 1px rgba(143,220,0,0.45)', '0 0 0 0 rgba(143,220,0,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: rows.length * 0.8, ease: 'easeInOut', delay: i * 0.8 + 0.5 }}
            >
              {r.result}
            </motion.span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.25} className="mt-[clamp(0.6rem,2vh,1.1rem)] grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard dense value={4.4} decimals={1} suffix="×" tone="green" label="Circuit-breaker speedup" />
        <StatCard dense value={0.71} decimals={2} tone="cyan" label="Retrieval precision" />
        <StatCard dense value={152} suffix="s" tone="green" label="Full live run, real API" />
        <StatCard dense value={6} tone="cyan" label="NVIDIA services, wired live" />
      </Reveal>
    </Section>
  )
}
