"use client"

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { X, Award, Sparkles } from "lucide-react"
import React, { useState, useEffect, useCallback, useRef } from "react"

/* ───────────────────────── certificate data ───────────────────────── */
const certificates = [
  { title: "C Programming", src: "/certificates/C.png", issuer: "HackerRank", date: "May 2024", link: "#", tags: ["C", "Algorithms"], color: "#22d3ee" },
  { title: "DSA in C", src: "/certificates/DSA-C.png", issuer: "NPTEL", date: "April 2024", link: "#", tags: ["DSA", "C"], color: "#a78bfa" },
  { title: "Java Programming", src: "/certificates/Java.png", issuer: "Coursera", date: "Jan 2024", link: "#", tags: ["Java", "OOP"], color: "#f472b6" },
  { title: "Java Collections", src: "/certificates/JavaCollections.png", issuer: "HackerRank", date: "Feb 2024", link: "#", tags: ["Java", "Collections"], color: "#34d399" },
  { title: "MySQL", src: "/certificates/MySQL.png", issuer: "HackerRank", date: "Mar 2024", link: "#", tags: ["SQL", "Database"], color: "#fbbf24" },
  { title: "OOPs Concepts", src: "/certificates/Oops.png", issuer: "LinkedIn Learning", date: "Nov 2023", link: "#", tags: ["OOP", "Design"], color: "#60a5fa" },
  { title: "Hackathon Winner", src: "/certificates/hackathon.jpeg", issuer: "Galgotias University", date: "Oct 2023", link: "#", tags: ["Innovation", "Teamwork"], color: "#fb923c" },
]

/* ───────────────────────── 3D tilt card wrapper ───────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 40 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 40 })

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                      MAIN COMPONENT                                */
/* ═══════════════════════════════════════════════════════════════════ */
export function CertificatesSection() {
  const [isVaultOpen, setIsVaultOpen] = useState(false)
  const [activeCard, setActiveCard] = useState<typeof certificates[0] | null>(null)

  // Lock scroll when vault or modal is open
  useEffect(() => {
    document.body.style.overflow = isVaultOpen || activeCard ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isVaultOpen, activeCard])

  const openVault = () => setIsVaultOpen(true)

  const closeVault = () => {
    setActiveCard(null)
    setIsVaultOpen(false)
  }

  /* ─── fan-out positions: smooth arc from center ─── */
  const getCardTransform = (index: number, total: number) => {
    const arcSpread = Math.min(total * 24, 160)
    const startAngle = -arcSpread / 2
    const step = arcSpread / (total - 1 || 1)
    const angle = startAngle + index * step
    const radians = (angle * Math.PI) / 180
    const radius = 300

    return {
      x: Math.sin(radians) * radius,
      y: -Math.cos(radians) * radius * 0.4 + 30,
      rotate: angle * 0.35,
    }
  }

  return (
    <section
      id="certificates"
      className="py-12 container mx-auto px-4 relative flex flex-col items-center justify-center"
    >
      {/* ───── Section label ───── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Achievement Vault
        </h2>
      </motion.div>

      {/* ───── THE VAULT TRIGGER BUTTON ───── */}
      <motion.button
        onClick={openVault}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group focus:outline-none cursor-pointer"
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-purple-500/30 dark:bg-purple-400/20 blur-xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-0 rounded-2xl bg-fuchsia-500/20 dark:bg-fuchsia-400/15 blur-2xl pointer-events-none"
        />

        {/* The badge */}
        <div className="relative flex items-center gap-3 px-7 py-4 rounded-2xl border border-purple-500/30 dark:border-purple-400/25 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_0_40px_rgba(147,51,234,0.15)] dark:shadow-[0_0_40px_rgba(147,51,234,0.25)] group-hover:border-purple-400/60 group-hover:shadow-[0_0_60px_rgba(147,51,234,0.3)] transition-all duration-500">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/40 dark:border-purple-300/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-1 rounded-full border border-fuchsia-400/30 dark:border-fuchsia-300/20 border-t-transparent border-l-transparent"
            />
            <Award className="w-6 h-6 text-purple-500 dark:text-purple-400 relative z-10 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
          </div>

          <div className="text-left">
            <span className="block text-sm font-bold text-foreground tracking-wide">
              Unlock Certifications
            </span>
            <span className="block text-[11px] text-muted-foreground font-mono tracking-wider">
              {certificates.length} ACHIEVEMENTS
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-purple-400/60 dark:text-purple-300/50 ml-1 group-hover:text-purple-400 transition-colors" />
        </div>
      </motion.button>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*              FULL-SCREEN VAULT OVERLAY                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isVaultOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
          >
            {/* ── Premium backdrop with blur ── */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(30px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-zinc-950/80"
              onClick={closeVault}
            />

            {/* ── Animated aurora mesh background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Central soft glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 60%)",
                }}
              />
              {/* Drifting orb — top-left purple */}
              <motion.div
                animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                className="absolute top-[15%] left-[20%] w-[350px] h-[350px] rounded-full opacity-[0.07]"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.8), transparent 65%)" }}
              />
              {/* Drifting orb — bottom-right blue */}
              <motion.div
                animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                className="absolute bottom-[10%] right-[15%] w-[400px] h-[300px] rounded-full opacity-[0.06]"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.8), transparent 65%)" }}
              />
              {/* Drifting orb — center-right pink */}
              <motion.div
                animate={{ x: [0, 20, -15, 0], y: [0, -20, 10, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] right-[25%] w-[250px] h-[250px] rounded-full opacity-[0.05]"
                style={{ background: "radial-gradient(circle, rgba(236,72,153,0.8), transparent 65%)" }}
              />
              {/* Bottom edge soft gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-zinc-950/50 to-transparent" />
            </div>

            {/* ── Close button ── */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
              onClick={closeVault}
              className="absolute top-6 right-6 z-[95] p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 hover:rotate-90 transition-all duration-500 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* (title removed for clean minimal look) */}

            {/* ══════ CLEAN CERTIFICATE CARDS — image only ══════ */}
            <div className="relative z-[91] flex items-center justify-center w-full h-full">
              {certificates.map((cert, i) => {
                const { x, y, rotate } = getCardTransform(i, certificates.length)
                return (
                  <motion.div
                    key={cert.title}
                    initial={{
                      x: 0,
                      y: 100,
                      rotate: 0,
                      scale: 0.2,
                      opacity: 0,
                      filter: "blur(16px)",
                    }}
                    animate={{
                      x,
                      y,
                      rotate,
                      scale: 1,
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      x: 0,
                      y: 80,
                      rotate: 0,
                      scale: 0.15,
                      opacity: 0,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.4,
                        delay: (certificates.length - 1 - i) * 0.04,
                        ease: "easeIn",
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 16,
                      mass: 0.8,
                      delay: i * 0.07,
                    }}
                    className="absolute cursor-pointer"
                    style={{ zIndex: i }}
                    onClick={() => setActiveCard(cert)}
                  >
                    <TiltCard>
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          y: -14,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 300, damping: 22 },
                        }}
                        className="relative w-[190px] sm:w-[220px] aspect-[4/3] rounded-xl overflow-hidden border border-white/12 bg-zinc-900/60 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.5)] group"
                      >
                        {/* Hover glow ring */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none z-20"
                          style={{
                            boxShadow: `inset 0 0 15px ${cert.color}12, 0 0 25px ${cert.color}10`,
                          }}
                        />

                        {/* Certificate image fills the entire card */}
                        <Image
                          src={cert.src}
                          alt={cert.title}
                          fill
                          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                        />

                        {/* Subtle bottom gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />


                      </motion.div>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom hint */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-[11px] font-mono tracking-widest uppercase z-[92]"
            >
              ESC to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*                  CERTIFICATE MODAL                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer"
              onClick={() => setActiveCard(null)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.88, y: 40, opacity: 0, filter: "blur(6px)" }}
              animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.92, y: 20, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl z-10 bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-4 right-4 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all text-white hover:rotate-90 duration-300 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-full aspect-[4/3] bg-zinc-950">
                <Image
                  src={activeCard.src}
                  alt={activeCard.title}
                  fill
                  className="object-contain p-4 md:p-8"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Keyboard listener for ESC ─── */}
      <EscapeListener
        onEscape={() => {
          if (activeCard) setActiveCard(null)
          else if (isVaultOpen) setIsVaultOpen(false)
        }}
        active={isVaultOpen || !!activeCard}
      />
    </section>
  )
}

/* ───────────────────────── ESC key listener ────────────────────────── */
function EscapeListener({ onEscape, active }: { onEscape: () => void; active: boolean }) {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [active, onEscape])
  return null
}
