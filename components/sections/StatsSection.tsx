'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { key: 'experience', value: 15, suffix: '+', prefix: '' },
  { key: 'cases', value: 2500, suffix: '+', prefix: '' },
  { key: 'clients', value: 1800, suffix: '+', prefix: '' },
  { key: 'response', value: 24, suffix: '/7', prefix: '' },
]

function Counter({ target, suffix, prefix, active }: { target: number; suffix: string; prefix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const t = useTranslations('stats')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const statLabels: Record<string, string> = {
    experience: t('experience'),
    cases: t('cases'),
    clients: t('clients'),
    response: t('responseLabel'),
  }

  return (
    <div
      ref={ref}
      className="relative border-y border-[var(--color-border)]"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent opacity-40" />

      <div className="container-brand px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-[var(--color-border)]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center py-10 px-4 gap-2"
            >
              <span
                className="text-[var(--color-gold-primary)] font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                }}
              >
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  active={inView}
                />
              </span>
              <span
                className="text-[var(--color-text-muted)] text-xs tracking-wider uppercase"
                style={{ fontFamily: isAr ? 'var(--font-plex-arabic)' : 'var(--font-inter)' }}
              >
                {statLabels[stat.key]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent opacity-40" />
    </div>
  )
}
