import { buildPageMetadata } from '@/lib/seo'
import FAQPageClient from './FAQPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'الأسئلة الشائعة | مكتب المحامي الشرعي أحمد الجراح',
    titleEn: 'FAQ | Ahmad Aljarrah Law Firm',
    descAr: 'إجابات على أكثر الأسئلة القانونية الشرعية شيوعاً في قضايا الأحوال الشخصية بالأردن',
    descEn: 'Answers to the most common Sharia legal questions in personal status cases in Jordan',
    path: '/faq',
  })
}

export default function FAQPage() {
  return <FAQPageClient />
}
