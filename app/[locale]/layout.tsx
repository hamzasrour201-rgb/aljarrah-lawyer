import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider'
import CustomCursor from '@/components/animations/CustomCursor'
import LocaleAttributes from '@/components/LocaleAttributes'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) notFound()

  const messages = await getMessages()
  const isRtl = locale === 'ar'

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang','${locale}');document.documentElement.setAttribute('dir','${isRtl ? 'rtl' : 'ltr'}')`,
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <LocaleAttributes />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </NextIntlClientProvider>
    </>
  )
}
