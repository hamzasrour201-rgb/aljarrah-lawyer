'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'

export default function BlogPreviewSection() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const articles = t.raw('articles') as Array<{
    slug: string
    title: string
    excerpt: string
    category: string
    readTime: string
  }>

  return (
    <section ref={ref} className="section-padding">
      <div className="container-brand px-6">
        {/* Header */}
        <div className={`flex items-end justify-between mb-12 flex-wrap gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
            >
              {isAr ? 'المدونة القانونية' : 'Legal Blog'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--color-text-primary)]"
              style={{
                fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
                fontSize: 'clamp(26px, 3.5vw, 48px)',
                fontWeight: isAr ? 700 : 600,
              }}
            >
              {t('title')}
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-[var(--color-gold-primary)] text-sm font-medium uppercase tracking-wider hover:gap-3 transition-all duration-300 group"
            style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
          >
            {t('viewAll')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-sm border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-gold-muted)] transition-all duration-400"
              style={{ background: 'var(--color-surface)' }}
            >
              {/* Article image placeholder */}
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, var(--color-surface-2) 0%, hsl(${40 + i * 15}, 30%, 12%) 100%)`,
                }}
              >
                {/* Category badge */}
                <div className="absolute top-4 start-4 z-10">
                  <span
                    className="px-3 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: 'rgba(201,169,97,0.15)',
                      color: 'var(--color-gold-primary)',
                      fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(201,169,97,0.2)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, var(--color-gold-primary) 0%, transparent 50%)',
                }} />
              </div>

              <div className="p-6">
                {/* Read time */}
                <p
                  className="text-[var(--color-text-muted)] text-xs mb-3 flex items-center gap-1.5"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {article.readTime} {t('readTime')}
                </p>

                {/* Title */}
                <h3
                  className="text-[var(--color-text-primary)] font-semibold leading-snug mb-3 group-hover:text-[var(--color-gold-primary)] transition-colors duration-300"
                  style={{
                    fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-cormorant)',
                    fontSize: isAr ? '17px' : '20px',
                  }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="text-[var(--color-text-muted)] text-sm leading-relaxed line-clamp-2"
                  style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {article.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
                  <a
                    href={`/${locale}/blog/${article.slug}`}
                    className="text-[var(--color-gold-primary)] text-xs uppercase tracking-wider font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300"
                    style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                  >
                    {isAr ? 'اقرأ المزيد' : 'Read More'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
