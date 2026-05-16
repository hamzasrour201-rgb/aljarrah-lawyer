'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <section className="relative overflow-hidden py-28 pt-36">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--color-surface)' }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,97,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent opacity-30" />

      <div className="container-brand px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
        >
          {label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--color-text-primary)] leading-tight mb-4"
          style={{
            fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: isAr ? 700 : 600,
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--color-text-secondary)] max-w-xl mx-auto"
            style={{
              fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent mx-auto mt-6"
        />
      </div>
    </section>
  )
}
