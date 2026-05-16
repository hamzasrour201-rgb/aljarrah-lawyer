'use client'

import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

type Props = {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionHeading({ label, title, subtitle, center, className }: Props) {
  const locale = useLocale()
  const isAr = locale === 'ar'

  return (
    <div className={cn('space-y-3', center && 'text-center', className)}>
      {label && (
        <p
          className="text-[var(--color-gold-primary)] text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
        >
          {label}
        </p>
      )}
      <h2
        className="text-[var(--color-text-primary)] leading-tight"
        style={{
          fontFamily: isAr ? 'var(--font-amiri)' : 'var(--font-cormorant)',
          fontSize: 'clamp(32px, 4vw, 60px)',
          fontWeight: isAr ? 700 : 600,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[var(--color-text-secondary)] text-base leading-relaxed max-w-2xl"
          style={{
            fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)',
            marginInline: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
      {/* Decorative underline */}
      <div
        className={cn(
          'h-px w-16 bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent',
          center && 'mx-auto',
        )}
      />
    </div>
  )
}
