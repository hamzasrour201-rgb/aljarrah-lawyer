'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import LanguageToggle from './LanguageToggle'
import { siteConfig } from '@/lib/seo'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'caseStudies', href: '/case-studies' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
]

export default function MobileMenu({ isOpen, onClose }: Props) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 z-50 h-full w-[85vw] max-w-sm bg-[var(--color-bg-secondary)] flex flex-col"
            style={{ [isRtl ? 'right' : 'left']: 0 }}
            initial={{ x: isRtl ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
              <span
                className="text-[var(--color-gold-primary)]"
                style={{ fontFamily: 'var(--font-amiri)', fontSize: '20px' }}
              >
                {locale === 'ar' ? 'المحامي أحمد الجراح' : 'Ahmad Aljarrah'}
              </span>
              <button
                onClick={onClose}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.key}
                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 px-4 text-[var(--color-text-primary)] hover:text-[var(--color-gold-primary)] hover:bg-[var(--color-bg-elevated)] rounded-sm transition-all duration-200 text-base font-medium"
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {t(link.key as any)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom */}
            <div className="px-6 py-6 border-t border-[var(--color-border)] space-y-4">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 bg-[var(--color-gold-primary)] text-[var(--color-bg-primary)] rounded-sm font-semibold text-sm transition-all duration-300 hover:bg-[var(--color-gold-light)]"
              >
                {t('bookConsultation')}
              </a>
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
