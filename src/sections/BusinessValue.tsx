import { Clock, Globe, Landmark, Lock, PieChart, TrendingUp, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { PulseIcon } from '../components/ui/PulseIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'

const gov: { label: string; tag: string; icon: LucideIcon }[] = [
  { label: 'Minutes, not hours', tag: 'defensible warning, full audit trail', icon: Clock },
  { label: 'Liability reduction', tag: 'human decides, every input traceable', icon: Landmark },
  { label: 'One system, 3 countries', tag: 'not a bespoke build per city', icon: Globe },
]

const insurers: { label: string; tag: string; icon: LucideIcon }[] = [
  { label: 'Portfolio-level triage', tag: 'the moment an event starts', icon: PieChart },
  { label: '$424B protection gap', tag: 'un-priced opportunity', icon: TrendingUp },
  { label: 'No model touches $', tag: 'goes to actuarial review', icon: Lock },
]

export function BusinessValue() {
  return (
    <Section
      id="business-value"
      index={12}
      total={15}
      eyebrow="Business Value"
      title="What this is worth to each buyer, in their own currency"
      accent="cyan"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StaggerGroup className="rounded-2xl glass p-5" staggerChildren={0.2}>
          <h3 className="text-[16px] font-semibold text-cyan-bright">For Government / NDMA agencies</h3>
          <div className="mt-3 flex flex-col gap-3">
            {gov.map((g, i) => (
              <StaggerItem key={g.label} entrance="swing" className="flex items-center gap-3">
                <PulseIcon icon={g.icon} color="cyan" index={i} />
                <div className="flex flex-col">
                  <span className="text-[14.5px] font-medium leading-snug text-ink-100">{g.label}</span>
                  <span className="font-mono text-[11px] text-ink-600">{g.tag}</span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>

        <StaggerGroup className="rounded-2xl glass p-5" staggerChildren={0.2}>
          <h3 className="text-[16px] font-semibold text-nvidia-bright">For Insurers</h3>
          <div className="mt-3 flex flex-col gap-3">
            {insurers.map((g, i) => (
              <StaggerItem key={g.label} entrance="swing" className="flex items-center gap-3">
                <PulseIcon icon={g.icon} color="green" index={i} />
                <div className="flex flex-col">
                  <span className="text-[14.5px] font-medium leading-snug text-ink-100">{g.label}</span>
                  <span className="font-mono text-[11px] text-ink-600">{g.tag}</span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>

      <Reveal delay={0.25} className="glass mt-6 rounded-2xl p-6 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-ink-600">
          The pitch in one sentence for either buyer
        </p>
        <p className="shimmer-text mx-auto mt-3 max-w-3xl text-balance font-display text-[clamp(1.15rem,2.4vw,1.65rem)] font-medium leading-snug">
          "We turn five disconnected data feeds into one auditable, guardrail-checked decision in minutes — priced on
          decisions supported, not seats."
        </p>
      </Reveal>
    </Section>
  )
}
