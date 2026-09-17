import { motion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { sections } from '../../data/sections'

const dotAccent: Record<string, string> = {
  green: 'bg-nvidia-bright shadow-[0_0_10px_rgba(143,220,0,0.7)]',
  cyan: 'bg-cyan-bright shadow-[0_0_10px_rgba(95,168,211,0.7)]',
  alert: 'bg-alert shadow-[0_0_10px_rgba(240,75,35,0.7)]',
}

// The travel between slides gets its own smooth, unhurried motion (eased scroll +
// a whole-slide fade/scale/blur crossfade in Section.tsx); content inside each slide
// then reveals in its own staggered rhythm on top of that.
const SCROLL_DURATION_MS = 950
const NAV_LOCK_MS = SCROLL_DURATION_MS + 150

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** Animates scrollTop over a fixed, deliberately unhurried duration — a native
 * scrollIntoView()'s speed is UA-determined and often feels abrupt on a full-page slide. */
function animateScrollTo(el: HTMLElement, targetTop: number, duration: number) {
  const startTop = el.scrollTop
  const delta = targetTop - startTop
  if (Math.abs(delta) < 1) return
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    el.scrollTop = startTop + delta * easeInOutCubic(t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function DeckShell({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const targetRef = useRef(0)
  const navLockRef = useRef(false)
  const navLockTimer = useRef<number | undefined>(undefined)
  const { scrollYProgress } = useScroll({ container: scrollerRef })
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 })

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement)
            if (idx !== -1) {
              setActive(idx)
              // Keep the nav target in sync with whatever the user actually settled on,
              // including free (wheel/trackpad) scrolling outside of goTo().
              if (!navLockRef.current) targetRef.current = idx
            }
          }
        })
      },
      { root, threshold: 0.55 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [children])

  const goTo = useCallback((idx: number) => {
    const root = scrollerRef.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>('[data-section]')
    const clamped = Math.max(0, Math.min(idx, els.length - 1))
    targetRef.current = clamped
    navLockRef.current = true
    window.clearTimeout(navLockTimer.current)
    navLockTimer.current = window.setTimeout(() => {
      navLockRef.current = false
    }, NAV_LOCK_MS)
    const target = els[clamped]
    if (target) animateScrollTo(root, target.offsetTop, SCROLL_DURATION_MS)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore OS/browser key-auto-repeat so holding (or a fast double-fire on) a
      // key can't compound into skipping a section before the scroll settles.
      if (e.repeat) return
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        if (navLockRef.current) return
        goTo(targetRef.current + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        if (navLockRef.current) return
        goTo(targetRef.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(sections.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  // One wheel gesture = one slide, always animated at the same deliberate pace —
  // otherwise a fast trackpad flick snaps through several sections instantly.
  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      if (navLockRef.current) return
      if (e.deltaY > 4) goTo(targetRef.current + 1)
      else if (e.deltaY < -4) goTo(targetRef.current - 1)
    }
    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
  }, [goTo])

  return (
    <div className="relative h-dvh w-full bg-void">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-nvidia via-cyan to-nvidia"
        style={{ scaleX: progress }}
      />

      <div className="glass pointer-events-none fixed left-6 top-6 z-40 flex items-center gap-2.5 rounded-full px-4 py-2 sm:left-10 sm:top-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nvidia-bright opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-nvidia-bright" />
        </span>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-200">
          LifeShield <span className="text-ink-600">/ AI</span>
        </span>
      </div>

      <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 sm:right-7 lg:flex">
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={
                'max-w-0 overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-ink-400 opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:opacity-100'
              }
            >
              {s.label}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? `scale-[1.7] ${dotAccent[s.accent]}`
                  : 'bg-ink-600 group-hover:bg-ink-200'
              }`}
            />
          </button>
        ))}
      </nav>

      <div className="glass fixed bottom-6 left-6 z-40 hidden rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-600 sm:left-10 md:block">
        NVIDIA GSI Open Hackathon
      </div>

      <div
        ref={scrollerRef}
        className="deck-scroller h-dvh w-full snap-y snap-mandatory overflow-y-scroll"
      >
        {children}
      </div>
    </div>
  )
}
