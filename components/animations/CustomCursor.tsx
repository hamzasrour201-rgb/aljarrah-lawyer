'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLocale } from 'next-intl'

export default function CustomCursor() {
  const locale = useLocale()
  const isAr = locale === 'ar'

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 300 }
  const ringX = useSpring(useMotionValue(-100), springConfig)
  const ringY = useSpring(useMotionValue(-100), springConfig)

  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleLinkEnter = () => setIsHoveringLink(true)
    const handleLinkLeave = () => setIsHoveringLink(false)
    const handleImageEnter = () => setIsHoveringImage(true)
    const handleImageLeave = () => setIsHoveringImage(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    const addLinkListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor="link"]')
      const images = document.querySelectorAll('img, [data-cursor="image"]')

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleLinkEnter)
        el.addEventListener('mouseleave', handleLinkLeave)
      })
      images.forEach((el) => {
        el.addEventListener('mouseenter', handleImageEnter)
        el.addEventListener('mouseleave', handleImageLeave)
      })
    }

    addLinkListeners()
    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const ringSize = isHoveringImage ? 72 : isHoveringLink ? 56 : 32

  return (
    <>
      {/* Dot — use physical left-0 so x=clientX always measures from the physical left edge,
           regardless of dir="rtl" on <html>. Logical start-0 would map to right-0 in RTL. */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-gold-primary)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[var(--color-gold-primary)] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHoveringLink || isHoveringImage ? 0.6 : 0.3) : 0,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {isHoveringImage && (
          <span
            className="text-[var(--color-gold-primary)] text-[9px] font-medium uppercase tracking-wider whitespace-nowrap"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {isAr ? 'اعرف أكثر' : 'View More'}
          </span>
        )}
      </motion.div>
    </>
  )
}
