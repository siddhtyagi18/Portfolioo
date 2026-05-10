"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Sun, Moon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md border-black/5 dark:border-white/5 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Siddh.
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#skills" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#certificates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Certificates
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          <Button asChild variant="outline" className="rounded-full border-black/10 dark:border-white/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hidden md:flex items-center gap-2">
            <a href="/Siddh_Tyagi_Resume.pdf" download="Siddh_Tyagi_Resume.pdf" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
