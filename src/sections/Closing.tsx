import { motion } from 'framer-motion'
import { MessageCircleQuestion } from 'lucide-react'
import { Section } from '../components/deck/Section'
import { StaggerGroup, StaggerItem } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'
import { ServiceTag } from '../components/ui/Tag'

const services = ['NIM', 'Switchyard', 'Relay', 'Guardrails', 'Retriever', 'Evaluator']

const orbiters = Array.from({ length: 8 }, (_, i) => ({
  angle: (i / 8) * 360,
  radius: 92 + (i % 2) * 18,
  dur: 14 + i * 1.5,
  size: 3 + (i % 3),
}))

export function Closing() {
  return (
    <Section
      id="closing"
      index={15}
      total={15}
      eyebrow="Closing"
      title="Built on NVIDIA, verified live, ready to scale"
      accent="green"
      glow="double"
      align="center"
    >
      <StaggerGroup className="mx-auto grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4" staggerChildren={0.2}>
        {[
          { value: 424, prefix: '$', suffix: 'B', tone: 'alert' as const, label: 'Protection gap we attack' },
          { value: 4.4, decimals: 1, suffix: '×', tone: 'green' as const, label: 'Measured speedup' },
          { value: 152, suffix: 's', tone: 'cyan' as const, label: 'Full live run' },
          { value: 3, tone: 'green' as const, label: 'Countries proven' },
        ].map((s, i) => (
          <StaggerItem key={s.label}>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <StatCard dense {...s} />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
        {services.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 18, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 1.25 + i * 0.12 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
            >
              <ServiceTag>{s}</ServiceTag>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto mt-9 flex flex-col items-center gap-3">
        {/* an orbit of particles keeps circling the sign-off for the whole time this slide sits on screen */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
          {orbiters.map((o, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-nvidia-bright/70"
              style={{ width: o.size, height: o.size, boxShadow: '0 0 6px 1px rgba(143,220,0,0.5)' }}
              animate={{
                x: [
                  Math.cos((o.angle * Math.PI) / 180) * o.radius,
                  Math.cos(((o.angle + 360) * Math.PI) / 180) * o.radius,
                ],
                y: [
                  Math.sin((o.angle * Math.PI) / 180) * o.radius * 0.4,
                  Math.sin(((o.angle + 360) * Math.PI) / 180) * o.radius * 0.4,
                ],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{ duration: o.dur, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* a ring of light expands out from behind the sign-off, then keeps a slow breathing pulse */}
        <motion.span
          className="pointer-events-none absolute top-6 h-24 w-24 rounded-full border border-nvidia/40"
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: [0, 0.7, 0], scale: [0.2, 3.4, 4] }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 2.1, ease: 'easeOut' }}
        />
        <motion.span
          className="pointer-events-none absolute top-6 h-16 w-16 rounded-full border border-cyan/30"
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        <motion.p
          initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 2.1 }}
          className="shimmer-text font-display text-[clamp(2rem,4.5vw,3rem)] font-bold"
        >
          Thank you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 2.4 }}
          className="flex items-center gap-2"
        >
          <motion.span
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            <MessageCircleQuestion size={18} className="text-cyan-bright" strokeWidth={2} />
          </motion.span>
          <span className="font-display text-[15px] font-semibold text-ink-100">Questions? We're ready.</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2.7 }}
          className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-600"
        >
          Team Cognitive Core · Tata Consultancy Services · Mentor: Mr. Swaminathan, NVIDIA
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 3.1 }}
        className="mx-auto mt-7 flex w-fit flex-col items-center gap-2.5 rounded-2xl border border-nvidia/30 bg-nvidia/[0.06] px-6 py-4"
      >
        <motion.span
          className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-nvidia-bright"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          The Ask
        </motion.span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ServiceTag>NVIDIA Inception</ServiceTag>
          <ServiceTag>DGX Cloud</ServiceTag>
        </div>
      </motion.div>
    </Section>
  )
}
