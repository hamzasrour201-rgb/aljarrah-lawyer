'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import PageHero from '@/components/shared/PageHero'

function InfoCard({ icon, title, children, delay }: { icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const locale = useLocale()
  const isAr = locale === 'ar'
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 rounded-sm border border-[var(--color-border)] space-y-3"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-gold-primary)]">{icon}</span>
        <h3
          className="text-[var(--color-text-primary)] font-semibold text-sm tracking-wide uppercase"
          style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
        >
          {title}
        </h3>
      </div>
      <div
        className="text-[var(--color-text-secondary)] text-sm leading-relaxed space-y-1"
        style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function AboutPageClient() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      {/* Main Section */}
      <section ref={sectionRef} className="section-padding overflow-hidden">
        <div className="container-brand px-6">
          <div className={`grid lg:grid-cols-2 gap-16 items-start ${isAr ? 'lg:grid-flow-dense' : ''}`}>

            {/* Photo column */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative ${isAr ? 'lg:col-start-2' : ''}`}
            >
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                {/* Corner accents */}
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
                <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[var(--color-gold-primary)] opacity-70 z-20" />

                {/* Gold border */}
                <div
                  className="absolute inset-0 rounded-sm z-10"
                  style={{ boxShadow: '0 0 0 1px rgba(201,169,97,0.35), inset 0 0 60px rgba(201,169,97,0.04)' }}
                />

                {/* Image */}
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <Image
                    src="/images/lawyer/about.webp"
                    alt={isAr ? 'المحامي الشرعي أحمد الجراح' : 'Ahmad Aljarrah — Sharia Lawyer'}
                    fill
                    className="object-cover object-top"
                    style={{ filter: 'brightness(0.92) contrast(1.08) saturate(0.85)' }}
                    data-cursor="image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at top, rgba(201,169,97,0.08) 0%, transparent 70%)' }}
                  />
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className={`absolute -bottom-6 ${isAr ? '-start-6' : '-end-6'} glass-dark border border-[var(--color-gold-muted)] p-5 rounded-sm z-20`}
                >
                  <div className="text-[var(--color-gold-primary)] font-bold leading-none text-4xl" style={{ fontFamily: 'var(--font-cormorant)' }}>+15</div>
                  <div className="text-[var(--color-text-muted)] text-xs tracking-widest uppercase mt-1" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
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
              className="space-y-6 pt-8 lg:pt-0"
            >
              <p className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
                {t('mainLabel')}
              </p>
              <h2
                className="text-[var(--color-text-primary)] leading-tight"
                style={{
                  fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
                  fontSize: 'clamp(26px, 3vw, 44px)',
                  fontWeight: isAr ? 700 : 600,
                }}
              >
                {t('mainTitle')}
              </h2>
              <div className="h-px w-14 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent" />
              <p className="text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', fontSize: '15px', lineHeight: 1.85 }}>
                {t('mainContent')}
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', fontSize: '15px', lineHeight: 1.85 }}>
                {t('mainContent2')}
              </p>

              {/* Docs box */}
              <div className="border border-[var(--color-gold-muted)] rounded-sm p-5 space-y-2" style={{ background: 'rgba(201,169,97,0.04)' }}>
                <p className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
                  {t('docsLabel')}
                </p>
                <h3 className="text-[var(--color-text-primary)] font-semibold" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', fontSize: '16px' }}>
                  {t('docsTitle')}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
                  {t('docsContent')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="pb-24">
        <div className="container-brand px-6">
          <div className="grid sm:grid-cols-3 gap-6">

            <InfoCard
              delay={0}
              title={t('hoursTitle')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              }
            >
              <p className="font-medium">{t('hoursDays')}</p>
              <p>{t('hoursTime')}</p>
            </InfoCard>

            <InfoCard
              delay={0.1}
              title={t('titleLabel')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v18M3 9l9-6 9 6" /><path d="M6 12H3l3 6H3M18 12h3l-3 6h3" />
                  <line x1="3" y1="18" x2="9" y2="18" /><line x1="15" y1="18" x2="21" y2="18" />
                </svg>
              }
            >
              <p className="font-medium">{t('titleName')}</p>
              <p>{t('titleRole1')}</p>
              <p>{t('titleRole2')}</p>
            </InfoCard>

            <InfoCard
              delay={0.2}
              title={t('locationTitle')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              }
            >
              <p className="font-medium">{t('locationLine1')}</p>
              <p>{t('locationLine2')}</p>
              <p className="text-[var(--color-text-muted)]">{t('locationLine3')}</p>
            </InfoCard>

          </div>
        </div>
      </section>
    </>
  )
}
