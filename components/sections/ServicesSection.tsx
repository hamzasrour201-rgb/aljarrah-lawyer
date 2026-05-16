'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  marriage: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.7C12 21.7 3 16 3 9.5C3 7.01 4.99 5 7.5 5C9 5 10.5 5.75 12 7.25C13.5 5.75 15 5 16.5 5C19.01 5 21 7.01 21 9.5C21 16 12 21.7 12 21.7Z" />
    </svg>
  ),
  custody: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  inheritance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  dowry: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  wills: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  other: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
}

const SERVICE_KEYS = ['marriage', 'custody', 'inheritance', 'dowry', 'wills', 'other']

// Bento layout config: [colSpan, rowSpan]
const BENTO_SIZES = [
  [2, 1], // marriage — wide
  [1, 1], // custody
  [1, 1], // inheritance
  [1, 1], // dowry
  [1, 1], // wills
  [2, 1], // other — wide
]

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="services" className="section-padding" style={{ background: 'var(--color-surface)' }}>
      <div className="container-brand px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
          >
            {t('label')}
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
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-16 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent mx-auto mt-4"
          />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_KEYS.map((key, i) => {
            const [colSpan] = BENTO_SIZES[i]
            const isWide = colSpan === 2
            const subItems = t.raw(`items.${key}.sub`) as string[]

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`group relative p-7 rounded-sm border border-[var(--color-border)] transition-all duration-400 cursor-default ${
                  isWide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
                style={{ background: 'var(--color-background)' }}
                whileHover={{
                  borderColor: 'var(--color-gold-muted)',
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Gold corner accent on hover */}
                <div className="absolute top-0 start-0 w-6 h-6 border-t border-s border-[var(--color-gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-sm" />
                <div className="absolute bottom-0 end-0 w-6 h-6 border-b border-e border-[var(--color-gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-sm" />

                {/* Icon */}
                <div className="text-[var(--color-gold-primary)] mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  {SERVICE_ICONS[key]}
                </div>

                {/* Title */}
                <h3
                  className="text-[var(--color-text-primary)] font-semibold mb-2 group-hover:text-[var(--color-gold-primary)] transition-colors duration-300"
                  style={{
                    fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-cormorant)',
                    fontSize: isAr ? '18px' : '22px',
                  }}
                >
                  {t(`items.${key}.title` as never)}
                </h3>

                {/* Description */}
                <p
                  className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {t(`items.${key}.description` as never)}
                </p>

                {/* Sub-items */}
                <ul className="space-y-1.5">
                  {subItems.slice(0, isWide ? 4 : 3).map((sub, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-gold-primary)] mt-2 shrink-0" />
                      <span
                        className="text-[var(--color-text-muted)] text-xs leading-relaxed"
                        style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                      >
                        {sub}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <div className="mt-5">
                  <span
                    className="text-[var(--color-gold-primary)] text-xs uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5"
                    style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                  >
                    {t('viewMore')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
