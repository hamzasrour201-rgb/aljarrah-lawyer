'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'

const categoryIcons = [
  // Divorce & Separation
  <svg key="divorce" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  // Custody & Alimony
  <svg key="custody" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  // Marriage & Dowry
  <svg key="marriage" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  // Lineage & Guardianship
  <svg key="lineage" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  // Inheritance & Estates
  <svg key="inheritance" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  // Appeals & Execution
  <svg key="appeals" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
]

function ServiceCard({ category, icon, index }: { category: { title: string; items: string[] }; icon: React.ReactNode; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <div
        className="border border-[var(--color-border)] rounded-sm overflow-hidden transition-all duration-300 hover:border-[var(--color-gold-muted)]"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-6 text-start group"
        >
          <div className="flex items-center gap-4">
            <span className="text-[var(--color-gold-primary)] shrink-0">{icon}</span>
            <h3
              className="text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-gold-primary)] transition-colors"
              style={{
                fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                fontSize: isAr ? '17px' : '16px',
              }}
            >
              {category.title}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--color-gold-primary)] shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.span>
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0 border-t border-[var(--color-border)]">
                <ul className="mt-4 space-y-2.5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[var(--color-gold-primary)] mt-1 shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ServicesPageClient() {
  const t = useTranslations('servicesPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const categories = t.raw('categories') as Array<{ title: string; items: string[] }>
  const whyUsItems = t.raw('whyUsItems') as string[]

  const whyUsRef = useRef<HTMLElement>(null)
  const whyUsInView = useInView(whyUsRef, { once: true, margin: '-80px' })
  const ctaRef = useRef<HTMLElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      {/* Intro */}
      <section className="py-16">
        <div className="container-brand px-6">
          <p
            className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-center leading-relaxed"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.8 }}
          >
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="pb-20">
        <div className="container-brand px-6">
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <ServiceCard key={i} category={cat} icon={categoryIcons[i]} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Firm */}
      <section ref={whyUsRef} className="pb-16">
        <div className="container-brand px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-10 rounded-sm border border-[var(--color-gold-muted)]"
            style={{ background: 'rgba(201,169,97,0.03)' }}
          >
            <h2
              className="text-[var(--color-text-primary)] text-center mb-8"
              style={{ fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: isAr ? 700 : 600 }}
            >
              {t('whyUsTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyUsItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={whyUsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[var(--color-gold-primary)] mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold-primary)" stroke="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" fill="none" stroke="var(--color-gold-primary)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span
                    className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
                    style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase"
              style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)', letterSpacing: isAr ? '0.05em' : '0.15em' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('ctaBtn')}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
