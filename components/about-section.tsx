"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Code2 } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* A bit about me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-bold tracking-widest text-primary uppercase">About</h3>
            {/* heading removed as requested */}
          </div>
          
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            <p>
              I’m Siddh Tyagi, a B.Tech CSE (Data Science) student at Galgotias University(2024-2028) passionate about building modern, scalable, and impactful digital experiences. I enjoy transforming ideas into real-world applications through clean code, problem solving, and intuitive design.
            </p>
            <p>
              Currently focused on Full Stack Development, Data Structures &amp; Algorithms, and AI-powered applications. I love exploring new technologies, participating in hackathons, and creating projects that combine innovation with practical utility.
            </p>
            <p>
              Beyond coding, I’m continuously improving my problem-solving mindset, learning system design concepts, and working towards becoming a high-impact software engineer.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Badge variant="outline" className="rounded-full px-4 py-2 border-white/10 bg-white/5 text-sm font-medium">Problem Solver</Badge>
            <Badge variant="outline" className="rounded-full px-4 py-2 border-white/10 bg-white/5 text-sm font-medium">AI Enthusiast</Badge>
            <Badge variant="outline" className="rounded-full px-4 py-2 border-white/10 bg-white/5 text-sm font-medium">Fast Learner</Badge>
          </div>
        </motion.div>



      </div>
    </section>
  )
}
