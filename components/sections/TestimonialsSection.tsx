'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const items = t.raw('items') as Array<{ text: string; name: string; caseType: string }>

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(201,169,97,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-brand px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
          >
            {isAr ? 'آراء العملاء' : 'Client Reviews'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--color-text-primary)]"
            style={{
              fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: isAr ? 700 : 600,
            }}
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="relative p-10 rounded-sm border border-[var(--color-border)]"
            style={{ background: 'var(--color-background)' }}
          >
            {/* Quote mark */}
            <div
              className="absolute -top-4 start-10 text-[var(--color-gold-primary)] opacity-20 leading-none"
              style={{
                fontFamily: 'var(--font-amiri)',
                fontSize: '120px',
                lineHeight: 1,
              }}
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  className="text-[var(--color-text-secondary)] leading-relaxed mb-8 relative z-10"
                  style={{
                    fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                    fontSize: isAr ? '18px' : '17px',
                    lineHeight: 1.8,
                  }}
                >
                  {items[active].text}
                </p>

                <div className="flex items-center justify-between gap-4">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    {/* Circle portrait */}
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[var(--color-gold-muted)]">
                      <Image
                        src="/images/lawyer/portrait.webp"
                        alt={items[active].name}
                        fill
                        className="object-cover object-top"
                        style={{ filter: 'brightness(0.9) saturate(0.8)' }}
                        sizes="44px"
                      />
                      {/* gold tint */}
                      <div
                        className="absolute inset-0"
                        style={{ background: 'rgba(201,169,97,0.08)' }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-[var(--color-text-primary)] font-semibold"
                        style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                      >
                        {items[active].name}
                      </p>
                      <p
                        className="text-[var(--color-gold-primary)] text-xs uppercase tracking-wider mt-0.5"
                        style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                      >
                        {items[active].caseType}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold-primary)">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300"
                aria-label={`Testimonial ${i + 1}`}
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '28px' : '8px',
                    height: '8px',
                    background: i === active ? 'var(--color-gold-primary)' : 'var(--color-border)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Prev/Next arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setActive((p) => (p - 1 + items.length) % items.length)}
              className="p-2 border border-[var(--color-border)] rounded-sm text-[var(--color-text-muted)] hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] transition-all duration-300"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % items.length)}
              className="p-2 border border-[var(--color-border)] rounded-sm text-[var(--color-text-muted)] hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] transition-all duration-300"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
