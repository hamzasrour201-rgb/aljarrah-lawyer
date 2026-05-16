'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, Phone } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'
import { siteConfig } from '@/lib/seo'

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'caseStudies', href: '/case-studies' },
  { key: 'blog', href: '/blog' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 60)
    if (y > lastScrollY.current && y > 120) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
    lastScrollY.current = y
  })

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-30 transition-all duration-500',
          isScrolled ? 'glass-dark' : 'bg-transparent',
        )}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container-brand">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-tight group">
              <span
                className="text-[var(--color-gold-primary)] transition-opacity duration-300 group-hover:opacity-80"
                style={{
                  fontFamily: 'var(--font-amiri)',
                  fontSize: locale === 'ar' ? '20px' : '18px',
                  fontWeight: 700,
                }}
              >
                {locale === 'ar' ? 'أحمد الجراح' : 'Ahmad Aljarrah'}
              </span>
              <span
                className="text-[var(--color-text-tertiary)] text-xs tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {locale === 'ar' ? 'محامي شرعي' : 'Sharia Lawyer'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredLink(null)}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.key)}
                  className="relative px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {t(link.key as any)}
                  {hoveredLink === link.key && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 inset-x-4 h-px bg-[var(--color-gold-primary)]"
                      style={{ originX: locale === 'ar' ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              <LanguageToggle className="hidden sm:flex" />

              {/* WhatsApp / Phone CTA */}
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-sm btn-shimmer',
                  'bg-[var(--color-gold-primary)] text-[var(--color-bg-primary)]',
                  'hover:bg-[var(--color-gold-light)] transition-all duration-300',
                )}
                style={{ fontFamily: locale === 'ar' ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
              >
                <Phone size={14} />
                {t('bookConsultation')}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom gold line when scrolled */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent"
          animate={{ opacity: isScrolled ? 0.2 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
