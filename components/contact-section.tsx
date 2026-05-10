"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Github, Linkedin, Send, Code2 } from "lucide-react"
import React, { useState } from "react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Contact</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Let's connect.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Open to internships, collaborations, and exciting opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-10 pl-0 md:pl-10">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href="mailto:siddhtyagi1845@gmail.com" className="font-semibold text-foreground hover:text-primary transition-colors text-lg">
                    siddhtyagi1845@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-semibold text-foreground text-lg">+91 7017713557</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-foreground text-lg">Greater Noida, India</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/siddhtyagi18" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-2xl bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:bg-background/10 dark:hover:bg-white/10 transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/siddhtyagi" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-2xl bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:bg-background/10 dark:hover:bg-white/10 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://leetcode.com/siddhtyagi18" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-2xl bg-background/5 dark:bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:bg-background/10 dark:hover:bg-white/10 transition-all">
                <Code2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="bg-transparent">
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('saved')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">Name</label>
          <input id="name" type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full h-12 rounded-xl border border-border bg-background/5 dark:bg-white/5 px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground/50" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full h-12 rounded-xl border border-border bg-background/5 dark:bg-white/5 px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground/50" placeholder="your@email.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold">Message</label>
        <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} className="w-full min-h-[150px] rounded-xl border border-border bg-background/5 dark:bg-white/5 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground/50 resize-y" placeholder="Tell me about your project or opportunity..." />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-lg">
          <Send className="h-4 w-4" /> Send Message
        </Button>
        {status === 'saving' && <div className="text-sm">Saving…</div>}
        {status === 'saved' && <div className="text-sm text-emerald-600">Saved — added to contacts sheet.</div>}
        {status === 'error' && <div className="text-sm text-destructive">Error saving. Try again.</div>}
      </div>
    </form>
  )
}
