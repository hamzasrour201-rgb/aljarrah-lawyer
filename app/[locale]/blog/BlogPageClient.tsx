'use client'

import { useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'

type Article = { slug: string; title: string; excerpt: string; category: string; readTime: string }

const articleDates = [
  '2026-01-10',
  '2026-01-25',
  '2026-02-08',
  '2026-02-22',
  '2026-03-05',
  '2026-03-20',
  '2026-04-02',
]

function ArticleCard({ article, index, date }: { article: Article; index: number; date: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations('blogPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  const formatted = new Date(date).toLocaleDateString(isAr ? 'ar-JO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group relative border border-[var(--color-border)] rounded-sm p-7 flex flex-col gap-4 hover:border-[var(--color-gold-muted)] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(201,169,97,0.06)]"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Category + read time */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-[var(--color-gold-primary)] border border-[var(--color-gold-muted)] rounded-sm"
          style={font}
        >
          {article.category}
        </span>
        <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
          {article.readTime} {t('minRead')}
        </span>
      </div>

      {/* Title */}
      <h2
        className="text-[var(--color-text-primary)] font-semibold leading-snug group-hover:text-[var(--color-gold-primary)] transition-colors duration-300"
        style={{ ...font, fontSize: isAr ? '17px' : '16px', lineHeight: 1.5 }}
      >
        {article.title}
      </h2>

      {/* Excerpt */}
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2 flex-1" style={font}>
        {article.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
          {formatted}
        </span>
        <Link
          href={`/blog/${article.slug}`}
          className="flex items-center gap-1.5 text-[var(--color-gold-primary)] text-xs font-semibold hover:gap-2.5 transition-all duration-300"
          style={font}
        >
          {t('readMore')}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={isAr ? 'rotate-180' : ''}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

export default function BlogPageClient() {
  const t = useTranslations('blogPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }
  const articles = t.raw('articles') as Article[]
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(articles.map((a) => a.category)))]
  const filtered = activeCategory === 'all' ? articles : articles.filter((a) => a.category === activeCategory)

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      <section className="py-20">
        <div className="container-brand px-6">
          {/* Category filter pills */}
          <div className={`flex flex-wrap gap-2 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 text-xs font-semibold tracking-wider rounded-sm border transition-all duration-200"
                style={{
                  ...font,
                  background: activeCategory === cat ? 'var(--color-gold-primary)' : 'transparent',
                  color: activeCategory === cat ? '#0A0A0B' : 'var(--color-text-muted)',
                  borderColor: activeCategory === cat ? 'var(--color-gold-primary)' : 'var(--color-border)',
                  letterSpacing: isAr ? '0.04em' : '0.1em',
                  textTransform: isAr ? 'none' : 'uppercase',
                }}
              >
                {cat === 'all' ? t('filterAll') : cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article, i) => {
              const originalIndex = articles.findIndex((a) => a.slug === article.slug)
              return (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  index={i}
                  date={articleDates[originalIndex] ?? articleDates[0]}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
