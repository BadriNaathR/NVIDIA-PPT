import { motion } from 'framer-motion'
import { Droplets, GitBranch, ShieldCheck, FlaskConical, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { ServiceTag } from '../components/ui/Tag'

const steps: { n: string; title: string; badge: string; detail: string; icon: LucideIcon; chips: string[] }[] = [
  {
    n: '01',
    title: 'Fuse',
    badge: '7 adapters',
    detail: 'one auditable bundle',
    icon: Droplets,
    chips: ['Weather', 'Gauges', 'Road incidents', 'Federal declarations', 'Population risk', 'Shelters'],
  },
  {
    n: '02',
    title: 'Decide',
    badge: '4 gates · 5 outputs',
    detail: 'AI narrates, math decides',
    icon: GitBranch,
    chips: ['Evidence Verifier', 'Confidence Gate', 'OpenShell Sandbox', 'Policy Verifier'],
  },
  {
    n: '03',
    title: 'Trust',
    badge: 'Guardrails + Relay',
    detail: 'every claim checked, every call traced',
    icon: ShieldCheck,
    chips: ['NeMo Guardrails', 'NeMo Relay'],
  },
  {
    n: '04',
    title: 'Prove',
    badge: 'Real benchmarks',
    detail: 'not self-graded',
    icon: FlaskConical,
    chips: ['NVIDIA NeMo Evaluator'],
  },
]

function StepIcon({ icon: Icon, delay = 0 }: { icon: LucideIcon; delay?: number }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full bg-nvidia/25"
        animate={{ scale: [0.85, 1.4, 0.85], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      <motion.span
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-nvidia/30 bg-nvidia/10"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
        whileHover={{ rotate: 360, scale: 1.15, transition: { duration: 0.7 } }}
      >
        <Icon size={16} className="text-nvidia-bright" strokeWidth={2} />
      </motion.span>
    </div>
  )
}

const proofs: { label: string; tag: string }[] = [
  { label: 'Live run, real API', tag: '$996K exposure · 5 policies · 3-route plan' },
  { label: 'Caught a real hallucination', tag: 'demoted automatically, not scripted' },
  { label: 'Root-caused precision fix', tag: '0.32 → 0.71' },
]

export function Solution() {
  return (
    <Section
      id="solution"
      index={5}
      total={15}
      eyebrow="Our Solution"
      title="LifeShield AI: one pipeline, four real front doors"
      subtitle="A live evidence layer feeds a governed NVIDIA reasoning pipeline — checked, traced, and benchmarked every call."
      accent="green"
      glow="double"
    >
      <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <StaggerItem
            key={s.n}
            entrance={i % 2 === 0 ? 'drop' : 'pop'}
            className="group relative rounded-2xl glass p-5 transition-colors hover:border-nvidia/30"
          >
            <div className="flex items-center justify-between">
              <motion.span
                className="font-mono text-xs font-semibold text-nvidia-bright"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: steps.length * 0.5, ease: 'easeInOut', delay: i * 0.5 }}
              >
                {s.n}
              </motion.span>
              <StepIcon icon={s.icon} delay={i * 0.28} />
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink-50">{s.title}</h3>
            <span className="mt-2 inline-block w-fit rounded-full border border-nvidia/25 bg-nvidia/[0.07] px-2.5 py-1 font-mono text-[12px] font-semibold text-nvidia-bright">
              {s.badge}
            </span>
            <p className="mt-2 text-[13px] leading-snug text-ink-400">{s.detail}</p>
            <div className="flex max-h-0 flex-wrap gap-1 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mt-2.5 group-hover:max-h-28 group-hover:opacity-100">
              {s.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-nvidia/25 bg-nvidia/[0.06] px-2 py-0.5 font-mono text-[9.5px] text-nvidia-bright/90"
                >
                  {c}
                </span>
              ))}
            </div>
            {i < steps.length - 1 && (
              <span className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 overflow-visible bg-line lg:block">
                {/* evidence handed from one stage to the next, on a loop */}
                <motion.span
                  className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-nvidia-bright shadow-[0_0_8px_2px_rgba(143,220,0,0.7)]"
                  animate={{ left: ['-20%', '110%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: steps.length * 0.55, ease: 'easeInOut', delay: i * 0.55 }}
                />
              </span>
            )}
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.25} className="mt-6 rounded-2xl border border-nvidia/25 bg-nvidia/[0.05] p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-nvidia-bright">
            Verified live, tonight — not claimed
          </span>
          <ServiceTag>NVIDIA API</ServiceTag>
        </div>
        <ul className="mt-3 flex flex-col gap-2.5">
          {proofs.map((p, i) => (
            <li key={p.label} className="flex items-start gap-2.5">
              <motion.span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-nvidia-bright"
                animate={{ scale: [1, 2.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-medium leading-snug text-ink-100">{p.label}</span>
                <span className="font-mono text-[12px] text-ink-400">{p.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
