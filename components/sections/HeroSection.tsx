'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

function AnimatedTitle({ text }: { text: string; isAr?: boolean }) {
  const words = text.split(' ')
  return (
    <span className="inline">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden me-[0.25em] last:me-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.4 + wi * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAr = locale === 'ar'

  // Parallax: image moves at 0.7× scroll speed
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,97,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Decorative corner lines */}
      <div className="absolute top-24 start-8 w-16 h-16 border-t border-s border-[var(--color-gold-muted)] opacity-30" />
      <div className="absolute top-24 end-8 w-16 h-16 border-t border-e border-[var(--color-gold-muted)] opacity-30" />
      <div className="absolute bottom-16 start-8 w-16 h-16 border-b border-s border-[var(--color-gold-muted)] opacity-30" />
      <div className="absolute bottom-16 end-8 w-16 h-16 border-b border-e border-[var(--color-gold-muted)] opacity-30" />

      {/* ── Main 2-column grid ── */}
      <div className="container-brand px-6 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-80px)] py-16 ${isAr ? 'lg:grid-flow-dense' : ''}`}>

          {/* ── TEXT COLUMN ── */}
          <motion.div
            className={`flex flex-col ${isAr ? 'items-end text-end lg:col-start-2' : 'items-start text-start'} gap-6`}
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Pre-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {t('preHeadline')}
            </motion.p>

            {/* Main heading */}
            <h1
              className="text-[var(--color-text-primary)] leading-none"
              style={{
                fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
                fontSize: 'clamp(44px, 7vw, 96px)',
                fontWeight: isAr ? 700 : 600,
                letterSpacing: isAr ? '0' : '-0.02em',
              }}
            >
              <AnimatedTitle text={t('name1')} isAr={isAr} />
            </h1>

            {/* Name 2 — divider + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <div className="h-px w-14 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent" />
              <span
                className="text-[var(--color-gold-primary)]"
                style={{
                  fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                  fontSize: 'clamp(13px, 1.3vw, 17px)',
                  letterSpacing: isAr ? '0.1em' : '0.25em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {t('name2')}
              </span>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="text-[var(--color-text-secondary)] max-w-md"
              style={{
                fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                fontSize: 'clamp(14px, 1.4vw, 17px)',
                lineHeight: 1.75,
              }}
            >
              {t('subHeadline')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className={`flex flex-col sm:flex-row gap-4 ${isAr ? 'sm:flex-row-reverse' : ''}`}
            >
              <a
                href="https://wa.me/962792101164"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider uppercase"
                style={{
                  fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                  background: 'var(--color-gold-primary)',
                  color: '#0A0A0B',
                  letterSpacing: isAr ? '0.05em' : '0.15em',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('ctaPrimary')}
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-medium uppercase tracking-wider border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] transition-all duration-300"
                style={{
                  fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                  letterSpacing: isAr ? '0.05em' : '0.15em',
                }}
              >
                {t('ctaSecondary')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={isAr ? 'rotate-180' : ''}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* ── IMAGE COLUMN ── */}
          <motion.div
            className={`relative hidden lg:flex justify-center ${isAr ? 'lg:col-start-1' : ''}`}
            initial={{ opacity: 0, x: isAr ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Gold corner frame */}
            <div className="relative w-full max-w-[420px] aspect-[3/4]">

              {/* Corner accent lines */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-[var(--color-gold-primary)] opacity-70 z-20" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[var(--color-gold-primary)] opacity-70 z-20" />

              {/* Gold border frame */}
              <div
                className="absolute inset-0 rounded-sm z-10"
                style={{ boxShadow: '0 0 0 1px rgba(201,169,97,0.35), inset 0 0 60px rgba(201,169,97,0.04)' }}
              />

              {/* Parallax image wrapper */}
              <div className="absolute inset-0 overflow-hidden rounded-sm">
                <motion.div
                  className="absolute inset-0 scale-[1.15]"
                  style={{ y: imageY }}
                >
                  <Image
                    src="/images/lawyer/hero.webp"
                    alt={isAr ? 'المحامي الشرعي أحمد الجراح' : 'Ahmad Aljarrah — Sharia Lawyer'}
                    fill
                    priority
                    className="object-cover object-top"
                    style={{
                      filter: 'brightness(0.92) contrast(1.08) saturate(0.85)',
                    }}
                    data-cursor="image"
                  />
                  {/* Gold radial overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at top, rgba(201,169,97,0.08) 0%, transparent 70%)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Floating gold scales icon — top-right corner */}
              <motion.div
                className={`absolute -top-5 ${isAr ? '-left-5' : '-right-5'} z-30 glass-dark border border-[var(--color-gold-muted)] rounded-full w-14 h-14 flex items-center justify-center`}
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18M3 9l9-6 9 6" />
                  <path d="M6 12H3l3 6H3M18 12h3l-3 6h3" />
                  <line x1="3" y1="18" x2="9" y2="18" />
                  <line x1="15" y1="18" x2="21" y2="18" />
                </svg>
              </motion.div>

              {/* Years-experience badge — bottom */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className={`absolute -bottom-5 ${isAr ? '-right-5' : '-left-5'} z-30 glass-dark border border-[var(--color-gold-muted)] px-5 py-3 rounded-sm`}
              >
                <div
                  className="text-[var(--color-gold-primary)] font-bold leading-none text-3xl"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  15+
                </div>
                <div
                  className="text-[var(--color-text-muted)] text-[10px] tracking-widest uppercase mt-0.5"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {isAr ? 'سنة خبرة' : 'Years Exp.'}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[var(--color-text-muted)] text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {isAr ? 'مرر' : 'Scroll'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[var(--color-border)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--color-gold-primary)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
