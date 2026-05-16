'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function AboutPreviewSection() {
  const t = useTranslations('about')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [imgError, setImgError] = useState(false)

  const credentials = t.raw('credentials') as string[]

  return (
    <section ref={ref} id="about" className="section-padding overflow-hidden">
      <div className="container-brand px-6">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isAr ? 'lg:grid-flow-dense' : ''}`}>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative ${isAr ? 'lg:col-start-2' : ''}`}
          >
            <div className="photo-frame frame-corners relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              {/* Gradient fallback background */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: 'linear-gradient(145deg, hsl(35,20%,13%) 0%, var(--color-surface) 50%, hsl(35,15%,10%) 100%)',
                }}
              />

              {/* Arabesque (only shown when image fails) */}
              {imgError && (
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg width="160" height="160" viewBox="0 0 200 200" fill="var(--color-gold-primary)">
                    <path d="M100 10 L115 40 L148 40 L122 60 L132 93 L100 73 L68 93 L78 60 L52 40 L85 40Z" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
              )}

              {/* Lawyer photo */}
              {!imgError && (
                <Image
                  src="/images/lawyer/about.webp"
                  alt={isAr ? 'المحامي أحمد الجراح' : 'Ahmad Aljarrah — Sharia Lawyer'}
                  fill
                  className="object-cover object-top rounded-sm relative z-10"
                  style={{ filter: 'brightness(0.93) contrast(1.06) saturate(0.88)' }}
                  onError={() => setImgError(true)}
                  data-cursor="image"
                />
              )}

              {/* Subtle gold radial overlay */}
              <div
                className="absolute inset-0 rounded-sm z-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top, rgba(201,169,97,0.06) 0%, transparent 65%)',
                }}
              />

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`absolute -bottom-6 ${isAr ? '-start-6' : '-end-6'} glass-dark border border-[var(--color-gold-muted)] p-5 rounded-sm z-20`}
              >
                <div
                  className="text-[var(--color-gold-primary)] font-bold leading-none text-4xl"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {t('yearsExp')}
                </div>
                <div
                  className="text-[var(--color-text-muted)] text-xs tracking-widest uppercase mt-1"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {isAr ? 'سنة خبرة' : 'Years Exp.'}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            {/* Label */}
            <p
              className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {t('label')}
            </p>

            {/* Title */}
            <h2
              className="text-[var(--color-text-primary)] leading-tight"
              style={{
                fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
                fontSize: 'clamp(30px, 3.5vw, 52px)',
                fontWeight: isAr ? 700 : 600,
              }}
            >
              {t('title')}
            </h2>

            {/* Gold divider */}
            <div className="h-px w-14 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent" />

            {/* Bio */}
            <p
              className="text-[var(--color-text-secondary)] leading-relaxed text-base"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {t('bio')}
            </p>

            {/* Credentials */}
            <ul className="space-y-3">
              {credentials.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--color-gold-primary)] mt-0.5 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span
                    className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
                    style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={`/${locale === 'ar' ? '' : 'en/'}about`}
                className="inline-flex items-center gap-2 text-[var(--color-gold-primary)] text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-300 group"
                style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
              >
                {t('readMore')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
