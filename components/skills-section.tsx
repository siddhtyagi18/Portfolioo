"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, LineChart, MonitorSmartphone, Database, Brain, Wrench, Terminal, AppWindow, Cpu, FileJson, Server, Globe, Box, Settings, HardDrive, Share2, Layers, BookOpen, Fingerprint } from "lucide-react"
import React from "react"

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "Python", icon: <Terminal className="w-3 h-3 mr-2 text-yellow-400" /> },
      { name: "Java", icon: <Box className="w-3 h-3 mr-2 text-red-500" /> },
      { name: "C", icon: <Cpu className="w-3 h-3 mr-2 text-blue-500" /> },
      { name: "SQL", icon: <Database className="w-3 h-3 mr-2 text-blue-400" /> }
    ]
  },
  {
    title: "Data Science & Analytics",
    icon: <LineChart className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "Pandas", icon: <Box className="w-3 h-3 mr-2 text-white" /> },
      { name: "NumPy", icon: <Box className="w-3 h-3 mr-2 text-blue-400" /> },
      { name: "Matplotlib", icon: <LineChart className="w-3 h-3 mr-2 text-blue-500" /> },
      { name: "Seaborn", icon: <LineChart className="w-3 h-3 mr-2 text-teal-500" /> }
    ]
  },
  {
    title: "Web & App Development",
    icon: <MonitorSmartphone className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "HTML", icon: <FileJson className="w-3 h-3 mr-2 text-orange-500" /> },
      { name: "CSS", icon: <AppWindow className="w-3 h-3 mr-2 text-blue-500" /> },
      { name: "JavaScript", icon: <FileJson className="w-3 h-3 mr-2 text-yellow-400" /> },
      { name: "Android Development", icon: <MonitorSmartphone className="w-3 h-3 mr-2 text-green-500" /> }
    ]
  },
  {
    title: "Database Management",
    icon: <Database className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "MySQL", icon: <Database className="w-3 h-3 mr-2 text-blue-400" /> },
      { name: "Firebase", icon: <Server className="w-3 h-3 mr-2 text-yellow-500" /> }
    ]
  },
  {
    title: "Core Concepts",
    icon: <Brain className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "DSA", icon: <Layers className="w-3 h-3 mr-2 text-purple-400" /> },
      { name: "OOP", icon: <BookOpen className="w-3 h-3 mr-2 text-pink-400" /> },
      { name: "DBMS", icon: <HardDrive className="w-3 h-3 mr-2 text-indigo-400" /> }
    ]
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "Git", icon: <Share2 className="w-3 h-3 mr-2 text-orange-600" /> },
      { name: "GitHub", icon: <Globe className="w-3 h-3 mr-2 text-white" /> },
      { name: "VS Code", icon: <AppWindow className="w-3 h-3 mr-2 text-blue-500" /> },
      { name: "Android Studio", icon: <Settings className="w-3 h-3 mr-2 text-green-500" /> }
    ]
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-primary uppercase">SKILLS</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">What I work with</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card card-accent p-8 flex flex-col h-full transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="group-hover:rotate-12 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="outline" 
                    className="skill-badge bg-background/5 dark:bg-[#13131f] border border-input text-foreground text-sm py-2 px-4 font-normal rounded-full hover:bg-background/10 dark:hover:bg-[#1c1c2e] hover:border-white/10 transition-colors flex items-center shadow-inner"
                  >
                    {skill.icon}
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

