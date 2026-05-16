# مكتب المحامي الشرعي أحمد الجراح — Ahmad Aljarrah Law Firm

A bilingual (Arabic/English) dark-luxury law firm website built with Next.js 14, featuring full RTL support, Framer Motion animations, and a premium gold-on-black design system.

**Live URL:** [https://aljarrahlawyer.com](https://aljarrahlawyer.com)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** (App Router) | Framework |
| **next-intl v4** | Bilingual AR/EN + RTL routing |
| **Framer Motion** | Animations & transitions |
| **Tailwind CSS** | Utility styling |
| **TypeScript** | Type safety |

---

## Pages

| Route | Arabic | English |
|-------|--------|---------|
| `/` | الرئيسية | Homepage |
| `/about` | تعرف علينا | About Us |
| `/services` | الخدمات | Services (7 categories) |
| `/case-studies` | قضايا ناجحة | Success Stories |
| `/blog` | المقالات | Legal Articles (8 posts) |
| `/blog/[slug]` | مقال | Article Detail |
| `/contact` | تواصل معنا | Contact (form + map) |
| `/faq` | الأسئلة الشائعة | FAQ (10 Q&As) |

---

## Features

- **Bilingual RTL/LTR** — Arabic served at `/`, English at `/en/*`
- **Custom gold cursor** — physical `left-0` anchoring works in both RTL and LTR
- **Parallax hero image** — `useScroll` + `useTransform` at 0.7x scroll speed
- **Gold-frame lawyer photos** — 4 images with filters + gold overlay
- **Floating WhatsApp button** — bottom-left in RTL, bottom-right in LTR, pulse animation
- **Services accordion** — 7 expandable categories with Framer Motion
- **FAQ accordion** — 10 animated Q&As
- **Contact form** — sends pre-filled WhatsApp message on submit
- **SEO metadata** — per-page canonical + OG tags for both locales
- **Schema.org** — LegalService + Person structured data

---

## Project Structure

```
app/
  [locale]/           # AR (default, no prefix) + EN (/en/*)
    page.tsx          # Homepage
    about/
    services/
    case-studies/
    blog/[slug]/
    contact/
    faq/
components/
  layout/             # Navbar, Footer, WhatsAppButton
  sections/           # HeroSection, AboutPreviewSection, ...
  animations/         # CustomCursor, PageTransition
  shared/             # PageHero, SectionHeading, ...
messages/
  ar.json             # All Arabic strings
  en.json             # All English strings
public/
  images/lawyer/      # hero.webp, about.webp, portrait.webp, contact.webp
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# Arabic:  http://localhost:3000
# English: http://localhost:3000/en

# Production build
npm run build
npm start
```

---

## Deployment

Deployed on **Vercel** with zero-config Next.js support.

```bash
npm i -g vercel
vercel --prod
```

---

## Contact

**Ahmad Aljarrah Law Firm**
- Location: Irbid, Al-Naseem Roundabout, Jordan
- Phone: +962 79 210 1164
- Email: info@aljarrahlawyer.com

---

© 2026 Ahmad Aljarrah Law Firm — All rights reserved.
