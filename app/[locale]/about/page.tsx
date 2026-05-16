import { buildPageMetadata } from '@/lib/seo'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'تعرف علينا | مكتب المحامي الشرعي أحمد الجراح',
    titleEn: 'About Us | Ahmad Aljarrah Law Firm',
    descAr: 'تعرف على مكتب المحامي الشرعي أحمد الجراح وخبرته في قضايا الأحوال الشخصية في الأردن',
    descEn: 'Learn about Ahmad Aljarrah Law Firm and its expertise in personal status cases in Jordan',
    path: '/about',
  })
}

export default function AboutPage() {
  return <AboutPageClient />
}
