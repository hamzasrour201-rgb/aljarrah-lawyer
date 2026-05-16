import { buildPageMetadata } from '@/lib/seo'
import CaseStudiesPageClient from './CaseStudiesPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'قضايا ناجحة | مكتب المحامي الشرعي أحمد الجراح',
    titleEn: 'Success Stories | Ahmad Aljarrah Law Firm',
    descAr: 'نماذج من القضايا الناجحة التي تابعها مكتب المحامي أحمد الجراح في المحاكم الشرعية الأردنية',
    descEn: 'Examples of successful cases handled by Ahmad Aljarrah Law Firm in Jordanian Sharia courts',
    path: '/case-studies',
  })
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />
}
