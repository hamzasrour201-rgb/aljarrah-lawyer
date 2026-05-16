import type { Metadata } from 'next'
import { plexArabic, amiri, cormorant, inter } from './fonts'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aljarrahlawyer.com'),
}

// Root HTML shell — lang/dir are set dynamically in [locale]/layout.tsx
// via an inline script, suppressHydrationWarning prevents React warnings.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={cn(
        plexArabic.variable,
        amiri.variable,
        cormorant.variable,
        inter.variable,
      )}
    >
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  )
}
