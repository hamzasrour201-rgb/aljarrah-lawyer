'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'

export default function WhyChooseAljarrahSection() {
  const t = useTranslations('whyChooseAljarrah')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const services = t.raw('services') as string[]
  const fontAr = { fontFamily: 'var(--font-plex-arabic)' }
  const fontEn = { fontFamily: 'var(--font-inter)' }
  const font = isAr ? fontAr : fontEn

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,97,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-brand px-6 relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.25em] uppercase text-center mb-3"
          style={fontEn}
        >
          {t('label')}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--color-text-primary)] text-center mb-2"
          style={{
            fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: isAr ? 700 : 600,
          }}
        >
          {t('title')}
        </motion.h2>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-10 rounded-sm border border-[var(--color-gold-muted)] overflow-hidden"
          style={{ background: 'var(--color-surface)' }}
        >
          {/* Header strip */}
          <div
            className="px-8 py-5 border-b border-[var(--color-gold-muted)]"
            style={{ background: 'rgba(201,169,97,0.06)' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,169,97,0.15)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5">
                  <path d="M12 3v18M3 9l9-6 9 6"/>
                  <path d="M6 12H3l3 6H3M18 12h3l-3 6h3"/>
                  <line x1="3" y1="18" x2="9" y2="18"/><line x1="15" y1="18" x2="21" y2="18"/>
                </svg>
              </div>
              <div>
                <p
                  className="text-[var(--color-gold-primary)] font-semibold"
                  style={{ ...font, fontSize: isAr ? '17px' : '16px' }}
                >
                  {t('subtitle')}
                </p>
                <p className="text-[var(--color-text-muted)] text-xs mt-0.5" style={font}>
                  {t('tagline')}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-6">
            {/* Services */}
            <div>
              <p className="text-[var(--color-text-primary)] font-semibold mb-4" style={{ ...font, fontSize: '15px' }}>
                {t('servicesTitle')}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 16 : -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[var(--color-gold-primary)] mt-0.5 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
                      style={font}
                    >
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent" />

            {/* Mission */}
            <div>
              <p className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.15em] uppercase mb-2" style={fontEn}>
                {t('missionTitle')}
              </p>
              <p
                className="text-[var(--color-text-secondary)] leading-relaxed"
                style={{ ...font, fontSize: isAr ? '16px' : '15px', lineHeight: 1.85 }}
              >
                {t('mission')}
              </p>
            </div>

            {/* CTA */}
            <div className={`pt-2 flex ${isAr ? 'justify-end' : 'justify-start'}`}>
              <a
                href="https://wa.me/962792101164"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-sm text-sm font-semibold tracking-wider"
                style={{
                  background: 'var(--color-gold-primary)',
                  color: '#0A0A0B',
                  ...font,
                  letterSpacing: isAr ? '0.05em' : '0.1em',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {isAr ? 'احجز استشارتك' : 'Book Your Consultation'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
