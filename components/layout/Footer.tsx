/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/seo'

const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
}

const serviceLinks = [
  { key: 'marriage', href: '/services' },
  { key: 'custody', href: '/services' },
  { key: 'inheritance', href: '/services' },
  { key: 'dowry', href: '/services' },
  { key: 'wills', href: '/services' },
  { key: 'other', href: '/services' },
]

const quickLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'caseStudies', href: '/case-studies' },
  { key: 'blog', href: '/blog' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
]

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const isAr = locale === 'ar'

  const fontAr = { fontFamily: 'var(--font-plex-arabic)' }
  const fontEn = { fontFamily: 'var(--font-inter)' }
  const font = isAr ? fontAr : fontEn

  const areas = t.raw('footer.areas') as string[]

  return (
    <footer style={{ backgroundColor: '#050505' }}>
      <div className="divider-gold" />

      <div className="container-brand py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="space-y-5">
            <div>
              <div
                className="text-[var(--color-gold-primary)] text-2xl font-bold"
                style={{ fontFamily: 'var(--font-amiri)' }}
              >
                {isAr ? 'أحمد الجراح' : 'Ahmad Aljarrah'}
              </div>
              <div
                className="text-[var(--color-text-tertiary)] text-xs tracking-widest uppercase mt-0.5"
                style={fontEn}
              >
                {isAr ? 'محامي شرعي' : 'Sharia Lawyer'}
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={font}>
              {t('footer.tagline')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { href: siteConfig.social.facebook, icon: <SocialIcons.Facebook />, label: 'Facebook' },
                { href: siteConfig.social.instagram, icon: <SocialIcons.Instagram />, label: 'Instagram' },
                { href: siteConfig.social.twitter, icon: <SocialIcons.Twitter />, label: 'Twitter' },
                { href: siteConfig.social.linkedin, icon: <SocialIcons.Linkedin />, label: 'LinkedIn' },
                { href: siteConfig.social.whatsapp, icon: <SocialIcons.WhatsApp />, label: 'WhatsApp' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-primary)] transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Areas served */}
            <div className="space-y-2">
              <p className="text-[var(--color-text-muted)] text-[10px] font-semibold tracking-widest uppercase" style={fontEn}>
                {t('footer.areasTitle')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="text-[var(--color-text-muted)] text-[11px] border border-[var(--color-border)] rounded-sm px-2 py-0.5"
                    style={font}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h3
              className="text-[var(--color-text-primary)] font-semibold text-sm tracking-wider uppercase"
              style={fontEn}
            >
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-gold-primary)] transition-colors duration-200 flex items-center gap-2 group"
                    style={font}
                  >
                    <span className="w-3 h-px bg-[var(--color-gold-deep)] group-hover:bg-[var(--color-gold-primary)] group-hover:w-5 transition-all duration-300" />
                    {t(`nav.${key}` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-5">
            <h3
              className="text-[var(--color-text-primary)] font-semibold text-sm tracking-wider uppercase"
              style={fontEn}
            >
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-gold-primary)] transition-colors duration-200 flex items-center gap-2 group"
                    style={font}
                  >
                    <span className="w-3 h-px bg-[var(--color-gold-deep)] group-hover:bg-[var(--color-gold-primary)] group-hover:w-5 transition-all duration-300" />
                    {t(`services.items.${key}.title` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-5">
            <h3
              className="text-[var(--color-text-primary)] font-semibold text-sm tracking-wider uppercase"
              style={fontEn}
            >
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]" style={font}>
                <MapPin size={15} className="text-[var(--color-gold-primary)] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{t('contact.address')}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors"
                  dir="ltr"
                >
                  <Phone size={15} className="text-[var(--color-gold-primary)] shrink-0" />
                  <span style={fontEn}>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors"
                >
                  <Mail size={15} className="text-[var(--color-gold-primary)] shrink-0" />
                  <span style={fontEn}>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]" style={font}>
                <Clock size={15} className="text-[var(--color-gold-primary)] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{t('contact.hours')}</span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 hover:opacity-90"
              style={{ background: '#25D366', color: '#fff', ...font }}
            >
              <SocialIcons.WhatsApp />
              {isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}
            </a>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto sm:mx-0">
            <p className="text-[var(--color-text-secondary)] text-sm shrink-0" style={font}>
              {t('footer.newsletter')}
            </p>
            <form className="flex w-full gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1 min-w-0 px-4 py-2.5 text-sm bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] rounded-sm focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors"
                style={font}
                dir={isAr ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium bg-[var(--color-gold-primary)] text-[var(--color-bg-primary)] rounded-sm hover:bg-[var(--color-gold-light)] transition-colors shrink-0"
                style={font}
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="container-brand px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--color-text-tertiary)] text-xs" style={font}>
            © 2026 {isAr ? 'مكتب المحامي الشرعي أحمد الجراح —' : 'Ahmad Aljarrah Law Firm —'} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[var(--color-text-tertiary)] text-xs hover:text-[var(--color-gold-primary)] transition-colors" style={font}>
              {t('footer.privacy')}
            </Link>
            <span className="text-[var(--color-border-strong)]">·</span>
            <Link href="/terms" className="text-[var(--color-text-tertiary)] text-xs hover:text-[var(--color-gold-primary)] transition-colors" style={font}>
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
