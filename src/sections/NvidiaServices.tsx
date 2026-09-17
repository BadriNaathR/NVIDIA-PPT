import { motion } from 'framer-motion'
import { Activity, FlaskConical, Route, Search, ShieldCheck, Waypoints, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { PulseIcon } from '../components/ui/PulseIcon'
import { StaggerGroup, StaggerItem } from '../components/ui/Reveal'

const services: { name: string; desc: string; file: string; icon: LucideIcon }[] = [
  { name: 'NVIDIA NIM', desc: 'Every reasoning + vision call, OpenAI-compatible dispatch', file: 'nim_client.py', icon: Route },
  { name: 'NeMo Switchyard', desc: 'Picks target + effort tier per call, by evidence ambiguity', file: 'switchyard_router.py', icon: Waypoints },
  { name: 'NeMo Relay', desc: 'Tokens, latency, cost, full audit trace — every call', file: 'relay_governance.py', icon: Activity },
  { name: 'NeMo Guardrails', desc: 'Grounding self-check, input moderation, bias proxy', file: 'guardrails/*_rails.py', icon: ShieldCheck },
  { name: 'NeMo Retriever', desc: '34-doc corpus, adaptive-cutoff similarity ranking', file: 'retriever_client.py', icon: Search },
  { name: 'NVIDIA NeMo Evaluator', desc: '2 real benchmarks vs. golden data, not self-graded', file: 'nemo_evaluator_suite.py', icon: FlaskConical },
]

export function NvidiaServices() {
  return (
    <Section
      id="services"
      index={7}
      total={15}
      eyebrow="Live NVIDIA Services"
      title="Six NVIDIA services in the live inference path"
      accent="green"
    >
      <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <StaggerItem
            key={s.name}
            entrance={i % 2 === 0 ? 'pop' : 'drop'}
            className="relative flex flex-col gap-2.5 overflow-hidden rounded-2xl glass p-5 transition-colors hover:border-nvidia/30"
          >
            {/* a request travels through each service in sequence — the path is live */}
            <motion.span
              className="absolute left-0 top-0 h-[2px] w-1/3 rounded-full bg-gradient-to-r from-transparent via-nvidia-bright to-transparent"
              animate={{ x: ['-40%', '340%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: services.length * 0.45, ease: 'easeInOut', delay: i * 0.45 }}
            />
            <div className="flex items-center gap-2.5">
              <PulseIcon icon={s.icon} color="green" box={36} size={17} index={i} />
              <h3 className="text-[15.5px] font-semibold text-ink-50">{s.name}</h3>
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink-400">{s.desc}</p>
            <motion.code
              className="mt-auto w-fit rounded-md bg-void px-2 py-1 font-mono text-[11.5px] text-nvidia-bright/80"
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {s.file}
            </motion.code>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
