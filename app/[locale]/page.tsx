import type { Metadata } from 'next'
import { buildPageMetadata, legalServiceSchema, personSchema } from '@/lib/seo'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CTASection from '@/components/sections/CTASection'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale,
    titleAr: 'مكتب المحامي الشرعي أحمد الجراح | محامي شرعي في الأردن',
    titleEn: 'Ahmad Aljarrah Law Firm | Sharia Lawyer in Jordan',
    descAr: 'محامي شرعي متخصص في قضايا الأحوال الشخصية بالأردن — زواج، طلاق، حضانة، نفقة، إرث. خبرة +15 سنة.',
    descEn: 'Sharia Lawyer specializing in Personal Status Law in Jordan — marriage, divorce, custody, alimony, inheritance. 15+ years experience.',
  })
}

export default async function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([legalServiceSchema, personSchema]) }}
      />
      <HeroSection />
      <StatsSection />
      <AboutPreviewSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  )
}
