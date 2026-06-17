import type { Metadata } from 'next'
import { siteConfig } from '@/lib/seo'
import { articles } from '@/lib/articleContent'
import BlogArticleClient from './BlogArticleClient'

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const entry = articles[params.slug]
  const isAr = params.locale === 'ar'
  const data = entry ? (isAr ? entry.ar : entry.en) : null
  const arData = entry?.ar
  const enData = entry?.en

  const title = data?.title ?? (isAr ? 'مقال قانوني | مكتب أحمد الجراح' : 'Legal Article | Ahmad Aljarrah Law Firm')
  const description = data?.metaDesc ?? (isAr ? 'مقال متخصص في قضايا الأحوال الشخصية' : 'Specialized article on personal status cases')
  const keywords = data?.keywords ?? []
  const path = `/blog/${params.slug}`
  const canonicalAr = `${siteConfig.url}${path}`
  const canonicalEn = `${siteConfig.url}/en${path}`

  const articleSchema = entry
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        author: {
          '@type': 'Person',
          name: isAr ? 'المحامي أحمد الجراح' : 'Lawyer Ahmad Aljarrah',
        },
        publisher: {
          '@type': 'Organization',
          name: isAr ? 'مكتب المحامي الشرعي أحمد الجراح' : 'Ahmad Aljarrah Law Firm',
          url: siteConfig.url,
        },
        datePublished: data?.date,
        inLanguage: isAr ? 'ar' : 'en',
        url: isAr ? canonicalAr : canonicalEn,
        image: `${siteConfig.url}/images/lawyer/hero.webp`,
        keywords: keywords.join(', '),
      }
    : null

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: isAr ? canonicalAr : canonicalEn,
      languages: arData && enData
        ? { ar: canonicalAr, en: canonicalEn }
        : undefined,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: isAr ? canonicalAr : canonicalEn,
      publishedTime: data?.date,
      authors: [isAr ? 'المحامي أحمد الجراح' : 'Lawyer Ahmad Aljarrah'],
      images: [{ url: `${siteConfig.url}/images/lawyer/hero.webp`, width: 1200, height: 630 }],
    },
    other: articleSchema
      ? { 'script:ld+json': JSON.stringify(articleSchema) }
      : {},
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  return <BlogArticleClient slug={params.slug} />
}
