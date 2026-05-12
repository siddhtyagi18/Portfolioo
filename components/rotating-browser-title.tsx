"use client"

import { useEffect } from "react"

const titles = ["Siddh Tyagi - Portfolio", "Viratian", "Portfolio"]

export function RotatingBrowserTitle() {
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % titles.length
      document.title = titles[currentIndex]
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  return null
}
