import { motion } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import team1 from "../assets/team/team-1.jpg";
import team2 from "../assets/team/team-2.png";
import team3 from "../assets/team/team-3.png";
import team4 from "../assets/team/team-4.jpg";
import { AmbientField } from "../components/ui/AmbientField";
import { GlowOrb } from "../components/ui/GlowOrb";
import { Reveal, StaggerGroup, StaggerItem } from "../components/ui/Reveal";
import { ServiceTag } from "../components/ui/Tag";

const team = [
  { name: "Ramakrishnan Vedanarayanan", photo: team1, objectPosition: "50% 12%" },
  { name: "Srinivasan D", photo: team2, objectPosition: "50% 15%" },
  { name: "Kishoor", photo: team3, objectPosition: "50% 10%" },
  { name: "Badrinaath R", photo: team4, objectPosition: "50% 20%" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    el.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  }

  return (
    <motion.section
      id="hero"
      data-section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, scale: 0.965, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ amount: 0.5, once: false }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="deck-section relative flex h-dvh w-full flex-col overflow-hidden bg-void"
    >
      <div className="bg-grid bg-grid-live pointer-events-none absolute inset-0 opacity-60" />
      <AmbientField accent="green" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), rgba(118, 185, 0, 0.12), transparent 60%)",
        }}
      />
      <GlowOrb color="green" className="-right-40 -top-52" size={620} />
      <GlowOrb
        color="cyan"
        className="-bottom-52 -left-40"
        size={560}
        duration={11}
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-16 sm:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-nvidia-bright">
                NVIDIA GSI Open Hackathon
              </span>
              <span className="h-1 w-1 rounded-full bg-ink-600" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-400">
                Team Cognitive Core
              </span>
            </div>
          </Reveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="shimmer-text mt-6 font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight"
          >
            LifeShield AI
          </motion.h1>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-[16px] leading-relaxed text-ink-400 sm:text-lg">
              An NVIDIA-native disaster intelligence &amp; decision command
              system — fusing live evidence into governed, auditable,
              life-safety decisions.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-7">
              <ServiceTag>NVIDIA NIM</ServiceTag>
            </div>
          </Reveal>

          <StaggerGroup
            className="mt-14 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            delayChildren={0.5}
          >
            {team.map((member, i) => (
              <StaggerItem
                key={member.name}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 },
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="h-16 w-16 overflow-hidden rounded-full border-2 border-line ring-2 ring-nvidia/20 transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_rgba(118,185,0,0.55)] hover:ring-nvidia/50 sm:h-20 sm:w-20"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: member.objectPosition }}
                  />
                </motion.div>
                <span className="text-center text-[12px] font-medium leading-tight text-ink-200 sm:text-[13px]">
                  {member.name}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.75} className="mt-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600">
              Tata Consultancy Services
            </p>
          </Reveal>

          <Reveal
            delay={0.85}
            className="mt-8 flex items-center gap-2 rounded-full glass px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright" />
            <span className="text-[12px] text-ink-400">
              Mentor · <span className="text-ink-100">Mr. Swaminathan</span>,
              NVIDIA
            </span>
          </Reveal>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="flex flex-col items-center gap-1.5 text-ink-600">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-[1px] bg-gradient-to-b from-ink-600 to-transparent"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
