'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'

type Case = { title: string; type: string; region: string; result: string; duration: string }

function CaseCard({ c, index }: { c: Case; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations('caseStudiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  const colors = ['var(--color-gold-primary)', '#C9A961', '#B8956E', 'var(--color-gold-primary)', '#C9A961', '#B8956E']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="relative border border-[var(--color-border)] rounded-sm p-7 space-y-5 hover:border-[var(--color-gold-muted)] transition-colors duration-300 group"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Number */}
      <div
        className="absolute top-5 end-5 text-3xl font-bold opacity-10 leading-none select-none"
        style={{ fontFamily: 'var(--font-cormorant)', color: colors[index % colors.length] }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Gold accent line */}
      <div className="h-0.5 w-10 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent" />

      {/* Title */}
      <h3
        className="text-[var(--color-text-primary)] font-semibold leading-snug group-hover:text-[var(--color-gold-primary)] transition-colors duration-300 pe-6"
        style={{ ...font, fontSize: isAr ? '17px' : '16px' }}
      >
        {c.title}
      </h3>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t('typeLabel'), value: c.type },
          { label: t('regionLabel'), value: c.region },
          { label: t('durationLabel'), value: c.duration },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[var(--color-text-muted)] text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
              {label}
            </p>
            <p className="text-[var(--color-text-secondary)] text-sm" style={font}>{value}</p>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <p className="text-[var(--color-text-muted)] text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {t('resultLabel')}
        </p>
        <p className="text-[var(--color-gold-primary)] text-sm leading-relaxed" style={font}>{c.result}</p>
      </div>
    </motion.div>
  )
}

export default function CaseStudiesPageClient() {
  const t = useTranslations('caseStudiesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const cases = t.raw('cases') as Case[]
  const ctaRef = useRef<HTMLElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      {/* Intro */}
      <section className="py-16">
        <div className="container-brand px-6 max-w-3xl mx-auto text-center space-y-4">
          <p
            className="text-[var(--color-text-secondary)] leading-relaxed"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8 }}
          >
            {t('intro')}
          </p>
          <div className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] text-xs" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {t('confidentialNote')}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="pb-20">
        <div className="container-brand px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <CaseCard key={i} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="pb-24">
        <div className="container-brand px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center p-10 rounded-sm border border-[var(--color-gold-muted)]"
            style={{ background: 'rgba(201,169,97,0.04)' }}
          >
            <h2
              className="text-[var(--color-text-primary)] mb-3"
              style={{ fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: isAr ? 700 : 600 }}
            >
              {t('ctaTitle')}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed" style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}>
              {t('ctaText')}
            </p>
            <a
              href="https://wa.me/962792101164"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold"
              style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {t('ctaBtn')}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
