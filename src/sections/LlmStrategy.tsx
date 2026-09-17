import { motion } from 'framer-motion'
import { AlertTriangle, Eye, FileText, Sparkles, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { ServiceTag } from '../components/ui/Tag'

const rotation: { task: string; model: string; tier: string; icon: LucideIcon }[] = [
  {
    task: 'Life-safety synthesis (clean evidence)',
    model: 'Nemotron 3.5 Lightning 30B · LifeShield LoRA',
    tier: 'Fine-tuned',
    icon: Sparkles,
  },
  {
    task: 'Life-safety synthesis (ambiguous evidence)',
    model: 'nvidia/nemotron-3-super-120b-a12b',
    tier: 'High',
    icon: AlertTriangle,
  },
  {
    task: 'Vision damage read',
    model: 'meta/llama-3.2-11b-vision-instruct',
    tier: 'Vision',
    icon: Eye,
  },
  {
    task: 'Forecast / briefs / narratives / SMS drafting',
    model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
    tier: 'Low',
    icon: FileText,
  },
]

const tierTone: Record<string, { badge: string; ring: string; icon: string; border: string }> = {
  'Fine-tuned': { badge: 'bg-nvidia/10 text-nvidia-bright border-nvidia/30', ring: 'bg-nvidia/10', icon: 'text-nvidia-bright', border: 'hover:border-nvidia/30' },
  High: { badge: 'bg-alert/10 text-alert border-alert/30', ring: 'bg-alert/10', icon: 'text-alert', border: 'hover:border-alert/30' },
  Vision: { badge: 'bg-cyan/10 text-cyan-bright border-cyan/30', ring: 'bg-cyan/10', icon: 'text-cyan-bright', border: 'hover:border-cyan/30' },
  Low: { badge: 'bg-panel-raised text-ink-400 border-line', ring: 'bg-panel-raised', icon: 'text-ink-200', border: 'hover:border-border' },
}

function RoutingFlow() {
  const stops = ['Switchyard', 'Environment × Effort', 'NIM', 'LifeShield fine-tune']
  return (
    <Reveal className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl glass p-5">
      {stops.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          {i === 0 || i === 2 ? (
            <ServiceTag>{s}</ServiceTag>
          ) : i === 3 ? (
            <span className="rounded-lg border border-nvidia/30 bg-nvidia/[0.07] px-3 py-1.5 text-[14px] font-medium text-nvidia-bright">
              {s} (Nemotron 3.5 Lightning 30B, B300)
            </span>
          ) : (
            <span className="rounded-lg border border-line-soft px-3 py-1.5 text-[14px] text-ink-200">{s}</span>
          )}
          {i < stops.length - 1 && (
            <div className="relative h-px w-6 overflow-visible bg-line">
              <motion.span
                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-nvidia-bright shadow-[0_0_8px_2px_rgba(143,220,0,0.7)]"
                animate={{ left: ['-5%', '95%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </Reveal>
  )
}

export function LlmStrategy() {
  return (
    <Section
      id="llm"
      index={9}
      total={15}
      eyebrow="LLM Strategy"
      title="One routing layer with a LifeShield fine-tuned model"
      accent="green"
    >
      <RoutingFlow />

      <Reveal delay={0.1} className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">
        Models in the live rotation today
      </Reveal>
      <StaggerGroup className="flex flex-col gap-2.5" staggerChildren={0.2}>
        {rotation.map((r) => {
          const tone = tierTone[r.tier]
          return (
            <StaggerItem
              key={r.task}
              className={`grid grid-cols-1 items-center gap-3 rounded-xl glass p-4 transition-colors sm:grid-cols-[auto_1.5fr_1.5fr_auto] ${tone.border}`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone.ring}`}>
                <r.icon size={17} className={tone.icon} strokeWidth={2} />
              </span>
              <span className="text-[14.5px] text-ink-100">{r.task}</span>
              <code className="text-[13px] text-ink-400">{r.model}</code>
              <span className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${tone.badge}`}>
                {r.tier}
              </span>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </Section>
  )
}
