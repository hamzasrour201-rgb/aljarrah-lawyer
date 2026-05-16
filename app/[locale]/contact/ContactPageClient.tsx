'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import PageHero from '@/components/shared/PageHero'
import { siteConfig } from '@/lib/seo'

const SocialLinks = [
  {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: siteConfig.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: siteConfig.social.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function ContactPageClient() {
  const t = useTranslations('contactPage')
  const tContact = useTranslations('contact')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const font = { fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }

  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })

  const caseTypes = t.raw('caseTypes') as string[]
  const [form, setForm] = useState({ name: '', phone: '', email: '', caseType: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `${isAr ? 'الاسم' : 'Name'}: ${form.name}\n${isAr ? 'الهاتف' : 'Phone'}: ${form.phone}\n${isAr ? 'البريد' : 'Email'}: ${form.email}\n${isAr ? 'نوع القضية' : 'Case Type'}: ${form.caseType}\n${isAr ? 'الرسالة' : 'Message'}: ${form.message}`
    window.open(`https://wa.me/962792101164?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inputClass = 'w-full px-4 py-3 text-sm bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-sm focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors'

  return (
    <>
      <PageHero label={t('heroLabel')} title={t('heroTitle')} subtitle={t('heroSub')} />

      <section className="py-20">
        <div className="container-brand px-6">
          <div className={`grid lg:grid-cols-2 gap-12 items-start ${isAr ? 'lg:grid-flow-dense' : ''}`}>

            {/* LEFT: Contact Info */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, x: isAr ? 40 : -40 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className={`space-y-8 ${isAr ? 'lg:col-start-2' : ''}`}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-gold-muted)] shrink-0">
                  <Image
                    src="/images/lawyer/contact.webp"
                    alt={isAr ? 'المحامي أحمد الجراح' : 'Ahmad Aljarrah'}
                    fill
                    className="object-cover object-top"
                    style={{ filter: 'brightness(0.92) saturate(0.85)' }}
                    sizes="64px"
                  />
                  <div className="absolute inset-0" style={{ background: 'rgba(201,169,97,0.07)' }} />
                </div>
                <div>
                  <p className="text-[var(--color-text-primary)] font-semibold" style={{ fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)', fontSize: '20px' }}>
                    {isAr ? 'أحمد الجراح' : 'Ahmad Aljarrah'}
                  </p>
                  <p className="text-[var(--color-gold-primary)] text-xs tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                    {isAr ? 'محامي شرعي' : 'Sharia Lawyer'}
                  </p>
                </div>
              </div>

              <h2 className="text-[var(--color-text-primary)] text-lg font-semibold" style={font}>
                {t('infoTitle')}
              </h2>

              {/* Info items */}
              <div className="space-y-5">
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    label: isAr ? 'الهاتف / واتساب' : 'Phone / WhatsApp',
                    content: <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--color-gold-primary)] transition-colors" dir="ltr">{tContact('phone')}</a>,
                    action: { href: siteConfig.social.whatsapp, label: isAr ? 'فتح واتساب' : 'Open WhatsApp' },
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: isAr ? 'العنوان' : 'Address',
                    content: <span>{tContact('address')}</span>,
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    label: isAr ? 'ساعات العمل' : 'Office Hours',
                    content: <span>{tContact('hours')}</span>,
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                    label: isAr ? 'البريد الإلكتروني' : 'Email',
                    content: <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--color-gold-primary)] transition-colors" dir="ltr">{siteConfig.email}</a>,
                  },
                ].map(({ icon, label, content, action }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-[var(--color-gold-primary)] mt-0.5 shrink-0">{icon}</span>
                    <div className="space-y-0.5">
                      <p className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed" style={font}>{content}</p>
                      {action && (
                        <a href={action.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[var(--color-gold-primary)] text-xs font-semibold mt-1 hover:underline" style={font}>
                          {action.label}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <p className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                  {t('socialTitle')}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {SocialLinks.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center rounded-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-primary)] transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: isAr ? -40 : 40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-sm border border-[var(--color-border)] p-8 space-y-5"
              style={{ background: 'var(--color-surface)' }}
            >
              <h2 className="text-[var(--color-text-primary)] font-semibold" style={{ ...font, fontSize: '18px' }}>
                {t('formTitle')}
              </h2>

              <form onSubmit={handleWhatsApp} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{t('nameLabel')}</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder={t('namePlaceholder')} required className={inputClass} style={font} dir={isAr ? 'rtl' : 'ltr'} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{t('phoneLabel')}</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder={t('phonePlaceholder')} type="tel" required className={inputClass} style={{ fontFamily: 'var(--font-inter)' }} dir="ltr" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{t('emailLabel')}</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder={t('emailPlaceholder')} type="email" className={inputClass} style={{ fontFamily: 'var(--font-inter)' }} dir="ltr" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{t('caseTypeLabel')}</label>
                  <select name="caseType" value={form.caseType} onChange={handleChange} className={inputClass} style={font} dir={isAr ? 'rtl' : 'ltr'}>
                    <option value="">{t('caseTypePlaceholder')}</option>
                    {caseTypes.map((ct) => <option key={ct} value={ct}>{ct}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[var(--color-text-muted)] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>{t('messageLabel')}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder={t('messagePlaceholder')} rows={5} required className={`${inputClass} resize-none`} style={font} dir={isAr ? 'rtl' : 'ltr'} />
                </div>

                <p className="text-[var(--color-text-muted)] text-xs" style={font}>{t('privacy')}</p>

                <button
                  type="submit"
                  className="btn-shimmer w-full flex items-center justify-center gap-2.5 py-4 rounded-sm text-sm font-semibold tracking-wider"
                  style={{ background: 'var(--color-gold-primary)', color: '#0A0A0B', fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('submitViaWhatsApp')}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container-brand px-6">
          <h3 className="text-[var(--color-text-primary)] font-semibold mb-4" style={font}>{t('mapTitle')}</h3>
          <div className="rounded-sm overflow-hidden border border-[var(--color-border)]" style={{ height: '380px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.5!2d35.85!3d32.5556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDMzJzIwLjIiTiAzNcKwNTEnMDAuMCJF!5e0!3m2!1sar!2sjo!4v1600000000000!5m2!1sar!2sjo&style=feature:all|element:geometry|color:0x0a0a0b&style=feature:all|element:labels.text.fill|color:0x9e9e9e"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isAr ? 'موقع المكتب' : 'Office Location'}
            />
          </div>
        </div>
      </section>
    </>
  )
}
