'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'

export default function WhyChooseUsSection() {
  const t = useTranslations('whyUs')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(201,169,97,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-brand px-6">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left: sticky heading */}
          <div className="lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {isAr ? 'لماذا تختارنا' : 'Why Us'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--color-text-primary)] leading-tight"
              style={{
                fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
                fontSize: 'clamp(30px, 3.5vw, 50px)',
                fontWeight: isAr ? 700 : 600,
              }}
            >
              {t('title')}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px w-14 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent mt-4 origin-left"
            />

            {/* Decorative large number */}
            <div
              className="mt-12 text-[var(--color-gold-primary)] select-none opacity-5 leading-none"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(120px, 15vw, 200px)',
                fontWeight: 700,
              }}
            >
              ✦
            </div>
          </div>

          {/* Right: steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group relative flex gap-6 py-8 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[rgba(201,169,97,0.02)] transition-colors duration-300 px-4 -mx-4 rounded-sm"
              >
                {/* Step number */}
                <div
                  className="shrink-0 text-[var(--color-gold-primary)] font-semibold opacity-40 group-hover:opacity-100 transition-opacity duration-300 leading-none pt-1"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '48px',
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </div>

                {/* Text */}
                <div className="space-y-2 pt-1">
                  <h3
                    className="text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-gold-primary)] transition-colors duration-300"
                    style={{
                      fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-cormorant)',
                      fontSize: isAr ? '18px' : '22px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[var(--color-text-muted)] text-sm leading-relaxed"
                    style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute end-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
