'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function CTASection() {
  const t = useTranslations('booking')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden py-24" id="booking">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--color-surface)' }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,97,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent opacity-50" />

      <div className="container-brand px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Lawyer avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-gold-muted)] shadow-[0_0_24px_rgba(201,169,97,0.18)]">
              <Image
                src="/images/lawyer/contact.webp"
                alt={isAr ? 'المحامي أحمد الجراح' : 'Ahmad Aljarrah'}
                fill
                className="object-cover object-top"
                style={{ filter: 'brightness(0.92) saturate(0.85)' }}
                sizes="80px"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(201,169,97,0.07)' }} />
            </div>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
          >
            {isAr ? 'استشارة مجانية' : 'Free Consultation'}
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--color-text-primary)] mb-4 leading-tight"
            style={{
              fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              fontWeight: isAr ? 700 : 600,
            }}
          >
            {t('title')}
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--color-text-secondary)] mb-10"
            style={{
              fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.7,
            }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="https://wa.me/962792101164"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase w-full sm:w-auto justify-center"
              style={{
                fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                background: 'var(--color-gold-primary)',
                color: '#0A0A0B',
                letterSpacing: isAr ? '0.05em' : '0.15em',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('whatsapp')}
            </a>

            <a
              href={`tel:${tContact('phone')}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm text-sm font-medium uppercase tracking-wider border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                letterSpacing: isAr ? '0.05em' : '0.15em',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span dir="ltr">{tContact('phone')}</span>
            </a>
          </motion.div>

          {/* Contact details grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid sm:grid-cols-3 gap-6 pt-10 border-t border-[var(--color-border)]"
          >
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                label: tContact('address'),
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                label: tContact('hours'),
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: tContact('email'),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-start">
                <span className="text-[var(--color-gold-primary)] mt-0.5 shrink-0">{item.icon}</span>
                <span
                  className="text-[var(--color-text-muted)] text-sm leading-relaxed"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Privacy notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-[var(--color-text-muted)] text-xs"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
          >
            {t('privacy')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
