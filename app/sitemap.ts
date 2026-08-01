import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { articles } from '@/lib/articleContent'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/en`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/en/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/en/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/en/blog`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/en/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/en/faq`,      lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = Object.entries(articles).flatMap(([slug, entry]) => [
    {
      url: `${base}/blog/${slug}`,
      lastModified: new Date(entry.ar.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${base}/en/blog/${slug}`,
      lastModified: new Date(entry.en.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  return [...staticRoutes, ...articleRoutes]
}
