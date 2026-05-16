import type { Metadata } from 'next'

export const siteConfig = {
  name: {
    ar: 'مكتب المحامي الشرعي أحمد الجراح',
    en: 'Ahmad Aljarrah Law Firm',
  },
  url: 'https://aljarrahlawyer.com',
  phone: '+962792101164',
  email: 'info@aljarrahlawyer.com',
  social: {
    facebook: 'https://www.facebook.com/aljarrahlawyer/',
    instagram: 'https://www.instagram.com/ahmed.aljarrah.75',
    twitter: 'https://x.com/aljarrahahmed1',
    linkedin: 'https://jo.linkedin.com/in/ahmed-aljarrah-1ab1a9193',
    whatsapp: 'https://wa.me/962792101164',
  },
  address: {
    ar: 'إربد، دوار النسيم، بجانب مجمع الفارعة التجاري',
    en: 'Irbid, Al-Naseem Roundabout, next to Al-Fari\'a Commercial Complex',
    country: 'JO',
    city: 'Irbid',
  },
  geo: {
    lat: '32.5556',
    lng: '35.8500',
  },
  hours: 'Sa-Th 08:00-17:00',
}

export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteConfig.name.ar,
  alternateName: 'Aljarrah Lawyer',
  image: `${siteConfig.url}/images/lawyer/hero.webp`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  description: 'محامي شرعي متخصص في قضايا الأحوال الشخصية في الأردن',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'دوار النسيم، بجانب مجمع الفارعة التجاري',
    addressLocality: 'إربد',
    addressCountry: 'JO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  openingHours: siteConfig.hours,
  areaServed: ['إربد', 'عمان', 'الزرقاء', 'الأردن'],
  priceRange: '$$',
  serviceType: [
    'قضايا الطلاق',
    'قضايا النفقة',
    'قضايا الحضانة',
    'قضايا الإرث',
    'قضايا الأحوال الشخصية',
  ],
  sameAs: Object.values(siteConfig.social).filter((v) => !v.includes('wa.me')),
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'أحمد عوض الجراح',
  alternateName: 'Ahmad Awad Aljarrah',
  jobTitle: 'محامي شرعي',
  worksFor: {
    '@type': 'LegalService',
    name: siteConfig.name.ar,
  },
  url: siteConfig.url,
  sameAs: Object.values(siteConfig.social).filter((v) => !v.includes('wa.me')),
}

export function buildPageMetadata(opts: {
  locale: string
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  path?: string
}): Metadata {
  const isAr = opts.locale === 'ar'
  const path = opts.path ?? ''

  return {
    title: isAr ? opts.titleAr : opts.titleEn,
    description: isAr ? opts.descAr : opts.descEn,
    alternates: {
      canonical: isAr ? `${siteConfig.url}${path}` : `${siteConfig.url}/en${path}`,
      languages: {
        ar: `${siteConfig.url}${path}`,
        en: `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: isAr ? opts.titleAr : opts.titleEn,
      description: isAr ? opts.descAr : opts.descEn,
      url: isAr ? `${siteConfig.url}${path}` : `${siteConfig.url}/en${path}`,
      images: [{ url: `${siteConfig.url}/images/lawyer/hero.webp`, width: 1200, height: 630 }],
    },
  }
}
