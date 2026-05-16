'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'

type Article = { slug: string; title: string; excerpt: string; category: string; readTime: string }

export default function BlogArticleClient({ slug }: { slug: string }) {
  const t = useTranslations('blogPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const articles = t.raw('articles') as Article[]
  const article = articles.find((a) => a.slug === slug) ?? articles[0]
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  return (
    <>
      <PageHero
        label={article.category}
        title={article.title}
        subtitle={`${article.readTime} ${t('minRead')}`}
      />

      <section className="py-20">
        <div className="container-brand px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Placeholder content */}
            <div
              className="rounded-sm border border-[var(--color-border)] p-10 text-center space-y-6"
              style={{ background: 'var(--color-surface)' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(201,169,97,0.1)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>

              <div>
                <h2
                  className="text-[var(--color-text-primary)] mb-2"
                  style={{ fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: isAr ? 700 : 600 }}
                >
                  {t('placeholderCta')}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={font}>
                  {t('placeholderCtaText')}
                </p>
              </div>

              <a
                href="https://wa.me/962792101164"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold"
                style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', ...font }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('placeholderCtaBtn')}
              </a>
            </div>

            {/* Back link */}
            <div className="flex justify-center">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm hover:text-[var(--color-gold-primary)] transition-colors"
                style={font}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isAr ? '' : 'rotate-180'}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {isAr ? 'العودة إلى المقالات' : 'Back to Articles'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
