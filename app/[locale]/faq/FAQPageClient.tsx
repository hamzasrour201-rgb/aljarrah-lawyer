'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'

type FAQItem = { q: string; a: string }

function FAQCard({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      className="border-b border-[var(--color-border)] last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-start group"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[var(--color-gold-primary)] shrink-0 text-sm font-bold opacity-60"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-gold-primary)] transition-colors leading-snug"
            style={{ ...font, fontSize: isAr ? '16px' : '15px' }}
          >
            {item.q}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[var(--color-gold-primary)] shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 ps-9 text-[var(--color-text-secondary)] leading-relaxed"
              style={{ ...font, fontSize: isAr ? '15px' : '14px', lineHeight: 1.8 }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPageClient() {
  const t = useTranslations('faqPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const items = t.raw('items') as FAQItem[]
  const ctaRef = useRef<HTMLElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      <section className="py-20">
        <div className="container-brand px-6 max-w-3xl mx-auto">
          <div
            className="rounded-sm border border-[var(--color-border)] p-8"
            style={{ background: 'var(--color-surface)' }}
          >
            {items.map((item, i) => (
              <FAQCard key={i} item={item} index={i} />
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
            <p
              className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {t('ctaText')}
            </p>
            <a
              href="https://wa.me/962792101164"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase"
              style={{
                background: 'var(--color-gold-primary)',
                color: '#0A0A0B',
                fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                letterSpacing: isAr ? '0.05em' : '0.12em',
              }}
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
