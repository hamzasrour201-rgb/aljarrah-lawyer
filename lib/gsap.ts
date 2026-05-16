import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
}

export function initScrollTrigger() {
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    start: 'top 85%',
  })
}
