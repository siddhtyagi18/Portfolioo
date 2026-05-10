"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
}

export function HeroSection() {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, duration: number, delay: number}[]>([])
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    const reduced = mq ? mq.matches : false
    setPrefersReducedMotion(reduced)

    const count = typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 20
    setParticles(reduced ? [] : generateParticles(count)) // fewer particles on mobile or disabled for reduced motion
  }, [])

  const particleColor = mounted && resolvedTheme === 'light' ? 'bg-purple-500/10' : 'bg-purple-500/30'
  const globeBorder = mounted && resolvedTheme === 'light' ? 'border-purple-500/10' : 'border-purple-500/20'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Colorful blurred blobs for depth (motion-enabled) */}
      <motion.div
        className="blob blob-1 z-0"
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob blob-2 z-0"
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* subtle flowing lines and mesh */}
      <div className="flow-lines z-0" aria-hidden />
      <div className="mesh-svg z-0" aria-hidden>
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="mesh-anim">
          <g>
            <path className="mesh-path" d="M0 120 C150 200 350 40 500 120 C650 200 800 80 1000 120" />
            <path className="mesh-path" d="M0 220 C150 300 350 140 500 220 C650 300 800 180 1000 220" transform="translate(-80,40)" />
            <path className="mesh-path" d="M0 320 C150 400 350 240 500 320 C650 400 800 280 1000 320" transform="translate(-160,80)" />
          </g>
        </svg>
      </div>

      <div className="bg-overlay z-0" />
      <div className="stars-bg z-0" />
      
      {/* Subtle Dynamic Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!prefersReducedMotion && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute rounded-full ${particleColor}`}
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.45, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Abstract Wireframe Globe Background */}
      <div className="absolute right-[-10%] top-[10%] opacity-40 dark:opacity-30 pointer-events-none z-0 hidden lg:block globe-container">
        {/* Slow Pulsing Orb behind globe */}
        <motion.div 
          className="absolute inset-0 bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className={`w-[800px] h-[800px] rounded-full border ${globeBorder} globe relative`}>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateX(45deg)' }}></div>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateX(90deg)' }}></div>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateX(135deg)' }}></div>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateY(45deg)' }}></div>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateY(90deg)' }}></div>
          <div className={`absolute inset-0 rounded-full border ${globeBorder}`} style={{ transform: 'rotateY(135deg)' }}></div>
        </div>
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-sm text-foreground"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for Internships
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 drop-shadow-sm dark:drop-shadow-2xl text-foreground">
            Hi, I'm <span className="text-gradient">Siddh Tyagi</span>.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed font-light">
            Full Stack Developer & AI Enthusiast building modern web experiences with clean design and scalable code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_rgba(147,51,234,0.4)] dark:shadow-[0_0_40px_-10px_rgba(147,51,234,0.8)] transition-all hover:scale-105">
            <a href="/Siddh_Tyagi_Resume.pdf" download="Siddh_Tyagi_Resume.pdf" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-black/10 dark:border-white/10 bg-background/50 hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 text-foreground">
            <Link href="#projects">
              View Projects
            </Link>
          </Button>
        </motion.div>

        {/* Scroll indicator removed for a cleaner hero */}
      </div>
    </section>
  )
}
