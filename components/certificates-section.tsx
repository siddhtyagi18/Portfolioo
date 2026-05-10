"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect, useRef } from "react"

const certificates = [
  { title: "C Programming", src: "/certificates/C.png", issuer: "HackerRank", date: "May 2024", link: "#" },
  { title: "DSA in C", src: "/certificates/DSA-C.png", issuer: "NPTEL", date: "April 2024", link: "#" },
  { title: "Java Programming", src: "/certificates/Java.png", issuer: "Coursera", date: "Jan 2024", link: "#" },
  { title: "Java Collections", src: "/certificates/JavaCollections.png", issuer: "HackerRank", date: "Feb 2024", link: "#" },
  { title: "MySQL", src: "/certificates/MySQL.png", issuer: "HackerRank", date: "Mar 2024", link: "#" },
  { title: "OOPs Concepts", src: "/certificates/Oops.png", issuer: "LinkedIn Learning", date: "Nov 2023", link: "#" },
  { title: "Hackathon Winner", src: "/certificates/hackathon.jpeg", issuer: "Galgotias University", date: "Oct 2023", link: "#" },
]

export function CertificatesSection() {
  return (
    <section id="certificates" className="py-24 container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Achievements</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Hover over any certificate to view details and verify authenticity.
          </p>
        </div>
        
        {/* Redesigned certificates layout: stacked highlights, featured, and grid */}
        <CertificatesGrid certificates={certificates} />
      </motion.div>
      {/* Modal viewer state */}
      
    </section>
  )
}

function CertificatesGrid({ certificates }: { certificates: typeof certificates }) {
  const [active, setActive] = useState<any | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    if (active) {
      document.addEventListener('keydown', onKey)
      // focus modal for accessibility
      setTimeout(() => modalRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6">
          {certificates.slice(0,2).map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              className="relative aspect-[4/3] w-full rounded-xl group cursor-pointer glass-card overflow-hidden"
              onClick={() => setActive(cert)}
            >
              <Image src={cert.src} alt={cert.title} fill className="object-cover" />
              <div className="absolute left-4 top-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">{cert.issuer}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          {certificates[2] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full sm:w-[520px] aspect-[4/3] rounded-2xl glass-card overflow-hidden cursor-pointer"
              onClick={() => setActive(certificates[2])}
            >
              <Image src={certificates[2].src} alt={certificates[2].title} fill className="object-cover" />
              <div className="absolute left-6 bottom-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg">
                <h4 className="text-lg font-bold text-white">{certificates[2].title}</h4>
                <p className="text-sm text-white/80">{certificates[2].issuer} • {certificates[2].date}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {certificates.slice(3).map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
              className="relative aspect-[4/3] w-full rounded-xl group cursor-pointer glass-card overflow-hidden"
              onClick={() => setActive(cert)}
            >
              <Image src={cert.src} alt={cert.title} fill className="object-cover" />
              <div className="absolute left-4 top-4 bg-white/10 text-xs px-3 py-1 rounded-full text-white/90">{cert.issuer}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-3xl h-[70vh] bg-transparent rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            ref={modalRef}
          >
            <Image src={active.src} alt={active.title} fill className="object-contain" />
            <div className="absolute left-6 bottom-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-3 rounded-lg">
              <h3 className="text-xl font-bold">{active.title}</h3>
              <p className="text-sm">{active.issuer} • {active.date}</p>
              <div className="mt-3 flex gap-3">
                <Button asChild className="bg-white text-black rounded-full">
                  <a href={active.link} target="_blank" rel="noopener noreferrer">Verify <ExternalLink className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button onClick={() => setActive(null)} className="bg-black/40 text-white rounded-full">Close</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
