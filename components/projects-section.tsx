"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "TruthCheck-AI",
    description: "AI-powered misinformation detection platform with real-time analysis and confidence scoring.",
    image: "/projects/truthcheck-ai.jpg",
    tags: ["JavaScript", "Web Technologies", "AI"],
    github: "#"
  },
  {
    title: "Online Course Recommendation System",
    description: "Smart recommendation platform that suggests courses based on user interests and preferences.",
    image: "/projects/course-recommendation.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "#"
  },
  {
    title: "Electricity Billing System",
    description: "Java-based billing management system for efficient electricity record handling and bill generation.",
    image: "/projects/electricity-billing.jpg",
    tags: ["Core Java", "OOP", "File I/O"],
    github: "#"
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Featured work</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group bg-white/95 dark:bg-[#0b0b0d]/80 border border-border dark:border-white/5 shadow-sm rounded-2xl text-foreground">
                <div className="relative h-56 w-full overflow-hidden bg-muted border-b border-black/5 dark:border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-0 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-transparent font-medium py-1 px-3"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pb-6 pt-0">
                  <Button variant="outline" size="sm" asChild className="rounded-full px-5 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 shadow-sm text-foreground">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
