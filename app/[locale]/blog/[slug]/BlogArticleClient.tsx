'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import { Link } from '@/i18n/navigation'
import { articles, type ArticleSection } from '@/lib/articleContent'

type ArticleMeta = { slug: string; title: string; excerpt: string; category: string; readTime: string }

function renderSection(section: ArticleSection, isAr: boolean, font: React.CSSProperties, index: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2
          key={index}
          className="text-[var(--color-text-primary)] font-bold mt-10 mb-4 pb-2 border-b border-[var(--color-border)]"
          style={{
            fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
            fontSize: isAr ? '22px' : '21px',
            fontWeight: isAr ? 700 : 600,
          }}
        >
          {section.text}
        </h2>
      )
    case 'h3':
      return (
        <h3
          key={index}
          className="text-[var(--color-gold-primary)] font-semibold mt-6 mb-3"
          style={{ ...font, fontSize: '16px' }}
        >
          {section.text}
        </h3>
      )
    case 'p':
      return (
        <p
          key={index}
          className="text-[var(--color-text-secondary)] leading-relaxed"
          style={{ ...font, fontSize: isAr ? '16px' : '15px', lineHeight: 1.9 }}
        >
          {section.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={index} className="space-y-2.5 my-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[var(--color-gold-primary)] mt-1 shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
                style={font}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )
    case 'cta':
      return (
        <div
          key={index}
          className="my-10 p-8 rounded-sm border border-[var(--color-gold-muted)] text-center"
          style={{ background: 'rgba(201,169,97,0.04)' }}
        >
          <p className="text-[var(--color-text-primary)] font-semibold mb-4" style={{ ...font, fontSize: '17px' }}>
            {section.text}
          </p>
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
            {isAr ? 'تواصل معنا على واتساب' : 'Contact Us on WhatsApp'}
          </a>
        </div>
      )
    default:
      return null
  }
}

export default function BlogArticleClient({ slug }: { slug: string }) {
  const t = useTranslations('blogPage')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font: React.CSSProperties = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  const articleData = articles[slug]
  const localeData = articleData ? (isAr ? articleData.ar : articleData.en) : null

  // Fallback to messages if slug not found in content
  const articlesMeta = t.raw('articles') as ArticleMeta[]
  const meta = articlesMeta.find((a) => a.slug === slug) ?? articlesMeta[0]

  // Table of contents: extract h2 headings
  const tocItems = localeData?.sections
    .filter((s) => s.type === 'h2')
    .map((s) => s.text ?? '') ?? []

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = meta.title

  const formattedDate = localeData
    ? new Date(localeData.date).toLocaleDateString(isAr ? 'ar-JO' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <>
      <PageHero
        label={meta.category}
        title={meta.title}
        subtitle={`${meta.readTime} ${t('minRead')}`}
      />

      <section className="py-16">
        <div className="container-brand px-6">
          <div className={`flex gap-10 items-start max-w-6xl mx-auto ${isAr ? 'flex-row-reverse' : ''}`}>

            {/* Main Article */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 min-w-0"
            >
              {/* Meta bar */}
              <div className={`flex items-center gap-4 mb-8 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-widest uppercase border border-[var(--color-gold-muted)] px-3 py-1 rounded-sm" style={font}>
                  {meta.category}
                </span>
                {formattedDate && (
                  <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                    {formattedDate}
                  </span>
                )}
                <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                  {meta.readTime} {t('minRead')}
                </span>
                <span className="text-[var(--color-text-muted)] text-xs" style={font}>
                  {isAr ? 'بقلم: المحامي أحمد الجراح' : 'By: Ahmad Aljarrah, Esq.'}
                </span>
              </div>

              {/* Article content */}
              {localeData ? (
                <div className="space-y-4">
                  {localeData.sections.map((section, i) => renderSection(section, isAr, font, i))}
                </div>
              ) : (
                // Fallback for unknown slugs
                <div className="rounded-sm border border-[var(--color-border)] p-10 text-center space-y-4" style={{ background: 'var(--color-surface)' }}>
                  <p className="text-[var(--color-text-secondary)]" style={font}>{t('placeholderCtaText')}</p>
                  <a
                    href="https://wa.me/962792101164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold"
                    style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', ...font }}
                  >
                    {t('placeholderCtaBtn')}
                  </a>
                </div>
              )}

              {/* Share buttons */}
              <div className={`mt-12 pt-6 border-t border-[var(--color-border)] flex items-center gap-3 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                  {isAr ? 'شارك المقال' : 'Share'}
                </span>
                {/* WhatsApp share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300"
                  aria-label="Share on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                {/* Facebook share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[#1877F2] hover:border-[#1877F2] transition-all duration-300"
                  aria-label="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Twitter / X share */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-primary)] transition-all duration-300"
                  aria-label="Share on X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              {/* Back link */}
              <div className={`mt-8 flex ${isAr ? 'justify-end' : 'justify-start'}`}>
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
            </motion.article>

            {/* Sidebar: TOC + Related */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-72 shrink-0 sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div
                  className="rounded-sm border border-[var(--color-border)] p-6 space-y-3"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <p className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    {isAr ? 'محتويات المقال' : 'Table of Contents'}
                  </p>
                  <nav>
                    <ol className="space-y-2">
                      {tocItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--color-gold-primary)] text-xs shrink-0 mt-0.5" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600 }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[var(--color-text-secondary)] text-xs leading-relaxed" style={font}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                {/* CTA card */}
                <div
                  className="rounded-sm border border-[var(--color-gold-muted)] p-6 space-y-4 text-center"
                  style={{ background: 'rgba(201,169,97,0.04)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(201,169,97,0.1)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5">
                      <path d="M12 3v18M3 9l9-6 9 6"/>
                      <path d="M6 12H3l3 6H3M18 12h3l-3 6h3"/>
                      <line x1="3" y1="18" x2="9" y2="18"/><line x1="15" y1="18" x2="21" y2="18"/>
                    </svg>
                  </div>
                  <p className="text-[var(--color-text-primary)] font-semibold text-sm" style={font}>
                    {isAr ? 'هل تحتاج استشارة قانونية؟' : 'Need Legal Advice?'}
                  </p>
                  <a
                    href="https://wa.me/962792101164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-semibold w-full justify-center"
                    style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', ...font }}
                  >
                    {isAr ? 'احجز استشارتك' : 'Book Consultation'}
                  </a>
                </div>
              </aside>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
