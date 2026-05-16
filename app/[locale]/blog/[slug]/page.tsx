import { buildPageMetadata } from '@/lib/seo'
import BlogArticleClient from './BlogArticleClient'

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'مقال قانوني | مكتب أحمد الجراح',
    titleEn: 'Legal Article | Ahmad Aljarrah Law Firm',
    descAr: 'مقال متخصص في قضايا الأحوال الشخصية والشريعة الإسلامية',
    descEn: 'Specialized article on personal status and Islamic Sharia cases',
    path: `/blog/${params.slug}`,
  })
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  return <BlogArticleClient slug={params.slug} />
}
