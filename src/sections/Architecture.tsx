import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Cpu, Database, Send, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'

type NodeKind = 'sigma' | 'ai'

interface Node {
  label: string
  kind: NodeKind
}

interface Layer {
  n: string
  name: string
  icon: LucideIcon
  nodes: Node[]
}

const layers: Layer[] = [
  {
    n: '1',
    name: 'Evidence',
    icon: Database,
    nodes: [
      { label: 'NWS / IMD', kind: 'sigma' },
      { label: 'USGS / CWC', kind: 'sigma' },
      { label: 'HCFCD', kind: 'sigma' },
      { label: 'TranStar', kind: 'sigma' },
      { label: 'FEMA', kind: 'sigma' },
      { label: 'Pop / SVI', kind: 'sigma' },
      { label: 'OSM Shelters', kind: 'sigma' },
    ],
  },
  {
    n: '2',
    name: 'NVIDIA Runtime',
    icon: Cpu,
    nodes: [
      { label: 'Deep Agent Orchestrator', kind: 'ai' },
      { label: 'NeMo Switchyard', kind: 'ai' },
      { label: 'NIM', kind: 'ai' },
      { label: 'NeMo Relay', kind: 'ai' },
    ],
  },
  {
    n: '3',
    name: 'Decision Gates',
    icon: ShieldCheck,
    nodes: [
      { label: 'Evidence Verifier', kind: 'sigma' },
      { label: 'Confidence Gate', kind: 'sigma' },
      { label: 'OpenShell Sandbox', kind: 'ai' },
      { label: 'Policy Verifier', kind: 'sigma' },
    ],
  },
  {
    n: '4',
    name: 'Decision Outputs',
    icon: Send,
    nodes: [
      { label: 'Life-Safety', kind: 'ai' },
      { label: 'Insurer Exposure', kind: 'sigma' },
      { label: 'Evacuation Plan', kind: 'sigma' },
      { label: 'Forward Forecast', kind: 'ai' },
      { label: 'Counterfactual', kind: 'ai' },
    ],
  },
  {
    n: '5',
    name: 'Human Approval',
    icon: UserCheck,
    nodes: [
      { label: 'Decision Brief', kind: 'sigma' },
      { label: 'Approve / Reject', kind: 'ai' },
    ],
  },
]

const crossCutting: Node[] = [
  { label: 'NeMo Guardrails', kind: 'ai' },
  { label: 'NeMo Retriever', kind: 'sigma' },
  { label: 'Proactive Monitor', kind: 'ai' },
  { label: 'Circuit Breaker', kind: 'sigma' },
  { label: 'NeMo Evaluator', kind: 'ai' },
]

// One shared timeline: a pulse of evidence "arrives" at layer i exactly when
// connector i-1 finishes traveling — icon glow, the row-wash, the per-pill flash,
// and the traveling comet all stay in lockstep off this single clock.
const SEGMENT = 0.85
const TOTAL_CYCLE = layers.length * SEGMENT

function NodePill({ node, activateDelay }: { node: Node; activateDelay?: number }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 420, damping: 20 }}
      className={clsx(
        'relative inline-flex cursor-default items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[13px] font-medium backdrop-blur-md transition-shadow',
        node.kind === 'sigma'
          ? 'border-cyan/30 bg-cyan/[0.07] text-cyan-bright hover:shadow-[0_0_16px_-2px_rgba(95,168,211,0.5)]'
          : 'border-nvidia/30 bg-nvidia/[0.07] text-nvidia-bright hover:shadow-[0_0_16px_-2px_rgba(118,185,0,0.5)]',
      )}
    >
      {activateDelay !== undefined && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 0 0 rgba(143,220,0,0)',
              node.kind === 'sigma' ? '0 0 14px 1px rgba(95,168,211,0.7)' : '0 0 14px 1px rgba(143,220,0,0.7)',
              '0 0 0 0 rgba(143,220,0,0)',
            ],
          }}
          transition={{ duration: 0.7, repeat: Infinity, repeatDelay: TOTAL_CYCLE - 0.7, ease: 'easeOut', delay: activateDelay }}
        />
      )}
      <span className="relative font-mono text-[10px] opacity-80">{node.kind === 'sigma' ? 'Σ' : 'AI'}</span>
      <span className="relative">{node.label}</span>
    </motion.span>
  )
}

/** A comet with a multi-particle tail travels from this layer down to the next. */
function FlowConnector({ index }: { index: number }) {
  const delay = index * SEGMENT
  const repeatDelay = TOTAL_CYCLE - SEGMENT
  const shared = { duration: SEGMENT, delay, repeat: Infinity, repeatDelay, ease: 'easeInOut' as const }
  return (
    <div className="relative ml-[23px] h-4 w-[3px] overflow-visible rounded-full bg-line/70">
      <motion.div
        className="absolute -left-[5px] h-4 w-[13px] rounded-full"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(143,220,0,0.9))' }}
        initial={{ top: '-25%' }}
        animate={{ top: ['-25%', '100%'] }}
        transition={shared}
      />
      {[0, 0.05, 0.1].map((tailDelay, ti) => (
        <motion.span
          key={ti}
          className="absolute -left-[2.5px] h-[8px] w-[8px] rounded-full bg-nvidia-bright"
          style={{
            boxShadow: `0 0 ${12 - ti * 3}px ${3 - ti}px rgba(143,220,0,${0.85 - ti * 0.25})`,
            opacity: 1 - ti * 0.3,
          }}
          initial={{ top: '-25%', opacity: 0 }}
          animate={{ top: ['-25%', '100%'], opacity: [0, 1 - ti * 0.3, 1 - ti * 0.3, 0] }}
          transition={{ ...shared, delay: delay + tailDelay }}
        />
      ))}
    </div>
  )
}

function LayerIcon({ icon: Icon, pulseDelay }: { icon: LucideIcon; pulseDelay: number }) {
  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full bg-nvidia/50"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 2.1, 2.1], opacity: [0.75, 0, 0] }}
        transition={{ duration: SEGMENT, delay: pulseDelay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - SEGMENT, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-nvidia/60"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1.5], opacity: [0.85, 0, 0] }}
        transition={{ duration: SEGMENT * 0.7, delay: pulseDelay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - SEGMENT * 0.7, ease: 'easeOut' }}
      />
      <motion.span
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-nvidia/40 bg-nvidia/10"
        animate={{
          borderColor: ['rgba(118,185,0,0.4)', 'rgba(143,220,0,0.95)', 'rgba(118,185,0,0.4)'],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 0.5, delay: pulseDelay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - 0.5, ease: 'easeOut' }}
      >
        <Icon size={17} className="text-nvidia-bright" strokeWidth={2} />
      </motion.span>
    </div>
  )
}

/** The vertical spine running behind every layer — a continuous current the per-layer
 * connectors are just close-up views of, so the whole pipeline reads as one live circuit. */
function Spine() {
  return (
    <div className="pointer-events-none absolute bottom-2 left-[3.5px] top-2 hidden w-px sm:block">
      <div className="h-full w-full bg-gradient-to-b from-transparent via-line to-transparent" />
      <motion.div
        className="absolute left-1/2 h-20 w-[3px] -translate-x-1/2 rounded-full"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(143,220,0,0.9), transparent)' }}
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: TOTAL_CYCLE, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

/** The right-edge rail that visually makes good on the cross-cutting card's own claim —
 * it "wraps every stage above" — by physically connecting a line from it up past every
 * layer, with a tick touching each one and a slow, non-sequential pulse (this isn't
 * data flowing stage-to-stage, it's oversight watching every stage at once). */
function WrapRail() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 top-2 hidden w-px sm:block">
      <div className="h-full w-full bg-gradient-to-b from-cyan/0 via-cyan/50 to-cyan-bright/80" />
      <motion.span
        className="absolute left-1/2 h-16 w-[3px] -translate-x-1/2 rounded-full"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(95,168,211,0.9), transparent)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: TOTAL_CYCLE * 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function WrapTick({ delay = 0 }: { delay?: number }) {
  return (
    <span className="pointer-events-none absolute -right-[1px] top-1/2 hidden h-px w-3 -translate-y-1/2 bg-cyan/50 sm:block">
      <motion.span
        className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-bright"
        animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </span>
  )
}

export function Architecture() {
  return (
    <Section
      id="architecture"
      index={6}
      total={15}
      eyebrow="Detailed Architecture"
      title="The pipeline — every box is real, running code"
      accent="green"
      glow="double"
    >
      <div className="flex items-center gap-5 text-[12.5px] text-ink-400">
        <span className="flex items-center gap-1.5">
          <span className="font-mono text-cyan-bright">Σ</span> deterministic math
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-mono text-nvidia-bright">AI</span> NVIDIA-hosted call
        </span>
        <motion.span
          className="ml-auto flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-nvidia-bright/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: TOTAL_CYCLE, repeat: Infinity, ease: 'linear' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-nvidia-bright shadow-[0_0_8px_2px_rgba(143,220,0,0.8)]" />
          live pipeline
        </motion.span>
      </div>

      <div className="relative pr-3 sm:pr-4">
        <WrapRail />

        <StaggerGroup className="relative flex flex-col pl-1" staggerChildren={0.2}>
          <Spine />
          {layers.map((layer, i) => {
            const pulseDelay = i * SEGMENT
            return (
              <StaggerItem key={layer.n} entrance={i % 2 === 0 ? 'swing' : 'pop'}>
                <motion.div
                  className="relative overflow-hidden rounded-xl glass p-3"
                  animate={{
                    borderColor: ['rgba(255,255,255,0.08)', 'rgba(143,220,0,0.35)', 'rgba(255,255,255,0.08)'],
                  }}
                  transition={{ duration: 0.6, delay: pulseDelay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - 0.6, ease: 'easeOut' }}
                >
                  {/* the arrival wash — the row itself lights up exactly when the comet lands */}
                  <motion.span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, rgba(143,220,0,0.14), transparent 65%)' }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay: pulseDelay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - 0.7, ease: 'easeOut' }}
                  />
                  <WrapTick delay={i * 0.3} />
                  <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex shrink-0 items-center gap-2.5 sm:w-40">
                      <LayerIcon icon={layer.icon} pulseDelay={pulseDelay} />
                      <span className="text-[13.5px] font-semibold uppercase tracking-wide text-ink-100">{layer.name}</span>
                    </div>
                    <div className="flex flex-1 flex-wrap gap-1.5">
                      {layer.nodes.map((node, ni) => (
                        <NodePill key={node.label} node={node} activateDelay={pulseDelay + 0.15 + ni * 0.05} />
                      ))}
                    </div>
                  </div>
                </motion.div>
                {i < layers.length - 1 && <FlowConnector index={i} />}
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <Reveal delay={0.3} className="glass relative mt-3 overflow-hidden rounded-xl border-dashed p-3">
          <motion.span
            className="pointer-events-none absolute inset-0"
            style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(95,168,211,0.16) 40deg, transparent 90deg)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <WrapTick />
          <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 text-[12.5px] font-semibold uppercase tracking-wide text-ink-400 sm:w-40">
              Cross-cutting
              <span className="ml-1.5 font-normal normal-case text-cyan-bright/70">· wraps every stage above</span>
            </span>
            <div className="flex flex-1 flex-wrap gap-1.5">
              {crossCutting.map((node, i) => (
                <NodePill key={node.label} node={node} activateDelay={i * 0.3} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
