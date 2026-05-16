'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchTo = locale === 'ar' ? 'en' : 'ar'

  const handleSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: switchTo })
    })
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium',
        'border border-[var(--color-border)] text-[var(--color-text-secondary)]',
        'hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]',
        'transition-all duration-300 ease-luxury',
        'disabled:opacity-50',
        className,
      )}
      aria-label={switchTo === 'en' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="opacity-60 text-xs">
        {locale === 'ar' ? 'AR' : 'EN'}
      </span>
      <span className="w-3 h-3 opacity-40">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="text-xs">
        {locale === 'ar' ? 'EN' : 'AR'}
      </span>
    </button>
  )
}
