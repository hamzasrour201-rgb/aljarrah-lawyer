'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, destroyLenis } from '@/lib/lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis()

    // Refresh ScrollTrigger when lenis updates
    lenis.on('scroll', () => ScrollTrigger.update())

    return () => {
      destroyLenis()
      ScrollTrigger.killAll()
    }
  }, [])

  return <>{children}</>
}
