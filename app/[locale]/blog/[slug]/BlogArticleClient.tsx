'use client'

import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import PageHero from '@/components/shared/PageHero'
import { articles, extractH2Headings, getRelatedArticles } from '@/lib/articleContent'

// ─── Inline bold processor ────────────────────────────────────────────────────
function processInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-[var(--color-text-primary)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

// ─── Markdown → JSX renderer ─────────────────────────────────────────────────
function MarkdownContent({
  content,
  isAr,
  font,
}: {
  content: string
  isAr: boolean
  font: React.CSSProperties
}) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trimEnd()

    // skip # title and empty
    if (line.startsWith('# ') || line.trim() === '') {
      i++
      continue
    }

    // ## H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-[var(--color-text-primary)] mt-10 mb-4 pb-2 border-b border-[var(--color-border)]"
          style={{
            fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
            fontSize: isAr ? '22px' : '21px',
            fontWeight: isAr ? 700 : 600,
          }}
        >
          {line.slice(3)}
        </h2>,
      )
      i++
      continue
    }

    // ### H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-[var(--color-gold-primary)] font-semibold mt-6 mb-3"
          style={{ ...font, fontSize: '16px' }}
        >
          {line.slice(4)}
        </h3>,
      )
      i++
      continue
    }

    // Unordered list (- item)
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trimEnd().startsWith('- ')) {
        items.push(lines[i].trimEnd().slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2.5 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="text-[var(--color-gold-primary)] mt-1 shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={font}>
                {processInline(item)}
              </span>
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list (1. item)
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimEnd())) {
        items.push(lines[i].trimEnd().replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-3 my-4 list-none">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(201,169,97,0.12)', color: 'var(--color-gold-primary)', fontFamily: 'var(--font-cormorant)' }}
              >
                {j + 1}
              </span>
              <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={font}>
                {processInline(item)}
              </span>
            </li>
          ))}
        </ol>,
      )
      continue
    }

    // Table (| col |)
    if (line.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].trimEnd().startsWith('|')) {
        const row = lines[i].trimEnd()
        if (!row.includes('---')) {
          const cells = row
            .split('|')
            .filter((c) => c.trim() !== '')
            .map((c) => c.trim())
          rows.push(cells)
        }
        i++
      }
      if (rows.length > 0) {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ background: 'rgba(201,169,97,0.08)' }}>
                  {rows[0].map((cell, j) => (
                    <th
                      key={j}
                      className="px-4 py-3 text-[var(--color-gold-primary)] font-semibold border border-[var(--color-border)] text-start"
                      style={font}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, j) => (
                  <tr
                    key={j}
                    className="border-b border-[var(--color-border)]"
                    style={{ background: j % 2 === 0 ? 'var(--color-surface)' : 'rgba(255,255,255,0.01)' }}
                  >
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        className="px-4 py-3 text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                        style={font}
                      >
                        {processInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )
      }
      continue
    }

    // CTA line: **text.** at end of article
    if (line.startsWith('**') && line.endsWith('**')) {
      const text = line.slice(2, -2)
      elements.push(
        <div
          key={`cta-${i}`}
          className="my-10 p-8 rounded-sm border border-[var(--color-gold-muted)] text-center"
          style={{ background: 'rgba(201,169,97,0.04)' }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,169,97,0.1)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5">
              <path d="M12 3v18M3 9l9-6 9 6" />
              <path d="M6 12H3l3 6H3M18 12h3l-3 6h3" />
              <line x1="3" y1="18" x2="9" y2="18" />
              <line x1="15" y1="18" x2="21" y2="18" />
            </svg>
          </div>
          <p className="text-[var(--color-text-primary)] font-semibold mb-5" style={{ ...font, fontSize: '17px' }}>
            {text}
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
        </div>,
      )
      i++
      continue
    }

    // Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-[var(--color-text-secondary)] leading-relaxed"
        style={{ ...font, fontSize: isAr ? '16px' : '15px', lineHeight: 1.9 }}
      >
        {processInline(line)}
      </p>,
    )
    i++
  }

  return <div className="space-y-4">{elements}</div>
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function BlogArticleClient({ slug }: { slug: string }) {
  const locale = useLocale()
  const t = useTranslations('blogPage')
  const isAr = locale === 'ar'
  const font: React.CSSProperties = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  const articleEntry = articles[slug]
  const localeKey = isAr ? 'ar' : 'en'
  const data = articleEntry ? articleEntry[localeKey] : null

  const tocItems = data ? extractH2Headings(data.content) : []
  const related = getRelatedArticles(slug, localeKey, 3)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = data?.title ?? ''

  const formattedDate = data
    ? new Date(data.date).toLocaleDateString(isAr ? 'ar-JO' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  if (!data) {
    return (
      <>
        <PageHero label={isAr ? 'المدونة' : 'Blog'} title={isAr ? 'المقال غير موجود' : 'Article Not Found'} />
        <section className="py-20">
          <div className="container-brand px-6 text-center">
            <p className="text-[var(--color-text-secondary)] mb-6" style={font}>
              {isAr ? 'عذراً، لم يتم العثور على هذا المقال.' : 'Sorry, this article could not be found.'}
            </p>
            <Link href="/blog" className="text-[var(--color-gold-primary)] underline" style={font}>
              {isAr ? 'العودة إلى المقالات' : 'Back to Articles'}
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero label={data.category} title={data.title} subtitle={`${data.readTime} ${t('minRead')}`} />

      <section className="py-16">
        <div className="container-brand px-6">
          <div className={`flex gap-10 items-start max-w-6xl mx-auto ${isAr ? 'flex-row-reverse' : ''}`}>

            {/* ── Main Article ── */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 min-w-0 max-w-[720px]"
            >
              {/* Meta bar */}
              <div className={`flex items-center gap-4 mb-8 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                <span
                  className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-[var(--color-gold-primary)] border border-[var(--color-gold-muted)] rounded-sm"
                  style={font}
                >
                  {data.category}
                </span>
                {formattedDate && (
                  <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                    {formattedDate}
                  </span>
                )}
                <span className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                  {data.readTime}
                </span>
                <span className="text-[var(--color-text-muted)] text-xs" style={font}>
                  {isAr ? 'بقلم: المحامي أحمد الجراح' : 'By: Ahmad Aljarrah, Esq.'}
                </span>
              </div>

              {/* Rendered markdown */}
              <MarkdownContent content={data.content} isAr={isAr} font={font} />

              {/* Share buttons */}
              <div className={`mt-12 pt-6 border-t border-[var(--color-border)] flex items-center gap-3 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                  {isAr ? 'شارك المقال' : 'Share'}
                </span>
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
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
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

            {/* ── Sidebar ── */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-72 shrink-0 sticky top-24 space-y-6">
                {/* TOC */}
                <div className="rounded-sm border border-[var(--color-border)] p-6 space-y-3" style={{ background: 'var(--color-surface)' }}>
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
                <div className="rounded-sm border border-[var(--color-gold-muted)] p-6 space-y-4 text-center" style={{ background: 'rgba(201,169,97,0.04)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(201,169,97,0.1)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="1.5">
                      <path d="M12 3v18M3 9l9-6 9 6" />
                      <path d="M6 12H3l3 6H3M18 12h3l-3 6h3" />
                      <line x1="3" y1="18" x2="9" y2="18" />
                      <line x1="15" y1="18" x2="21" y2="18" />
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

          {/* ── Related Articles ── */}
          {related.length > 0 && (
            <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-[var(--color-border)]">
              <p className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.25em] uppercase mb-2 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
                {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
              </p>
              <h3
                className="text-[var(--color-text-primary)] text-center mb-8"
                style={{ fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: isAr ? 700 : 600 }}
              >
                {isAr ? 'مقالات قد تهمّك' : 'You May Also Like'}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((art, idx) => (
                  <motion.div
                    key={art.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group border border-[var(--color-border)] rounded-sm p-6 flex flex-col gap-3 hover:border-[var(--color-gold-muted)] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(201,169,97,0.06)]"
                    style={{ background: 'var(--color-surface)' }}
                  >
                    <span
                      className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-[var(--color-gold-primary)] border border-[var(--color-gold-muted)] rounded-sm w-fit"
                      style={font}
                    >
                      {art.category}
                    </span>
                    <h4
                      className="text-[var(--color-text-primary)] font-semibold leading-snug group-hover:text-[var(--color-gold-primary)] transition-colors duration-300"
                      style={{ ...font, fontSize: isAr ? '15px' : '14px', lineHeight: 1.5 }}
                    >
                      {art.title}
                    </h4>
                    <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed line-clamp-2 flex-1" style={font}>
                      {art.excerpt}
                    </p>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="flex items-center gap-1.5 text-[var(--color-gold-primary)] text-xs font-semibold hover:gap-2.5 transition-all duration-300 mt-1"
                      style={font}
                    >
                      {isAr ? 'اقرأ المزيد' : 'Read More'}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isAr ? 'rotate-180' : ''}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
