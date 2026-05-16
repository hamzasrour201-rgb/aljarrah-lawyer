import { buildPageMetadata } from '@/lib/seo'
import ContactPageClient from './ContactPageClient'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildPageMetadata({
    locale: params.locale,
    titleAr: 'تواصل معنا | مكتب المحامي الشرعي أحمد الجراح',
    titleEn: 'Contact Us | Ahmad Aljarrah Law Firm',
    descAr: 'تواصل مع المحامي الشرعي أحمد الجراح للحصول على استشارة قانونية مجانية',
    descEn: 'Contact Sharia Lawyer Ahmad Aljarrah for a free legal consultation',
    path: '/contact',
  })
}

export default function ContactPage() {
  return <ContactPageClient />
}
