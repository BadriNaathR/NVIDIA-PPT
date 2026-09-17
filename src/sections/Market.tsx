import { motion } from 'framer-motion'
import { Briefcase, Landmark, ShieldHalf, Siren, type LucideIcon } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { CoinFlip } from '../components/ui/CoinFlip'
import { PulseIcon } from '../components/ui/PulseIcon'
import { Reveal, StaggerGroup, StaggerItem } from '../components/ui/Reveal'

const stakeholders: { name: string; desc: string; icon: LucideIcon }[] = [
  { name: 'Government / NDMA', desc: 'Duty officers — public-safety liability, evacuation authority', icon: Landmark },
  { name: 'Insurance', desc: 'Underwriters, claims teams — loss-ratio, exposure triage', icon: ShieldHalf },
  { name: 'Field Response', desc: 'First responders, dispatchers — one instruction, one route', icon: Siren },
  { name: 'Executive / Leadership', desc: 'A decision in four sentences, not a dashboard', icon: Briefcase },
]

const tam = [
  { segment: 'Incident & Emergency Mgmt', y2024: '$137.5B', forecast: '$196.2B by 2030', cagr: '6.1%' },
  { segment: 'Flood Insurance', y2024: '$17.5B (2026)', forecast: '$37.1B by 2030', cagr: '20.7%' },
  { segment: 'AI in Insurance', y2024: '$8.99–11.3B', forecast: '$93.9B by 2035', cagr: '23.8%' },
  { segment: 'Cat. Modeling Software', y2024: '$1.82B', forecast: '$3.85B by 2033', cagr: '8.6%' },
  { segment: 'Flood Warning Systems', y2024: '$3.5B', forecast: '$9.0B by 2032', cagr: '12.0%' },
]

export function Market() {
  return (
    <Section
      id="market"
      index={4}
      total={15}
      eyebrow="Market"
      title="Stakeholders and Total Addressable Market"
      accent="cyan"
    >
      <StaggerGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stakeholders.map((s, i) => (
          <StaggerItem key={s.name} entrance={i % 2 === 0 ? 'pop' : 'drop'} className="rounded-xl glass p-4">
            <PulseIcon icon={s.icon} color="cyan" box={36} size={17} index={i} />
            <h3 className="mt-2.5 text-[15px] font-semibold text-cyan-bright">{s.name}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-400">{s.desc}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.15} className="mt-[clamp(0.75rem,2.4vh,1.5rem)]">
        <div className="mb-2 flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-ink-200">
          <CoinFlip size={20} />
          TAM by segment — 2024 size vs. forecast ($B)
        </div>
        <div className="glass overflow-hidden rounded-xl">
          <div className="grid grid-cols-4 bg-panel-raised/70 px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wider text-ink-600">
            <span>Segment</span>
            <span>2024</span>
            <span>Forecast</span>
            <span>CAGR</span>
          </div>
          {tam.map((row, i) => (
            <motion.div
              key={row.segment}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid grid-cols-4 items-center overflow-hidden px-4 py-[clamp(0.5rem,1.5vh,0.85rem)] text-[14.5px] ${i % 2 === 0 ? 'bg-panel/40' : 'bg-transparent'}`}
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(143,220,0,0.08), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: tam.length * 0.7, ease: 'easeInOut', delay: i * 0.7 }}
              />
              <span className="relative font-medium text-ink-100">{row.segment}</span>
              <span className="relative text-ink-200">{row.y2024}</span>
              <span className="relative text-ink-200">{row.forecast}</span>
              <motion.span
                className="relative font-mono font-semibold text-nvidia-bright"
                animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              >
                ↑ {row.cagr}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
