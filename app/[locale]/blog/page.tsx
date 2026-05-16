import { buildPageMetadata } from '@/lib/seo'
import BlogPageClient from './BlogPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'المقالات القانونية | مكتب المحامي الشرعي أحمد الجراح',
    titleEn: 'Legal Articles | Ahmad Aljarrah Law Firm',
    descAr: 'مقالات قانونية متخصصة في قضايا الأحوال الشخصية والشريعة الإسلامية في الأردن',
    descEn: 'Specialized legal articles on personal status and Islamic Sharia cases in Jordan',
    path: '/blog',
  })
}

export default function BlogPage() {
  return <BlogPageClient />
}
