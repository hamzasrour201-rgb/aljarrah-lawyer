import { buildPageMetadata } from '@/lib/seo'
import ServicesPageClient from './ServicesPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'خدماتنا القانونية الشرعية | مكتب أحمد الجراح',
    titleEn: 'Our Legal Services | Ahmad Aljarrah Law Firm',
    descAr: 'خدمات قانونية شرعية شاملة في قضايا الأحوال الشخصية — طلاق، نفقة، حضانة، إرث، مهر، وصايا',
    descEn: 'Comprehensive Sharia legal services in personal status cases — divorce, alimony, custody, inheritance, dowry, wills',
    path: '/services',
  })
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
