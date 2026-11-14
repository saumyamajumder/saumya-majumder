# Saumya Majumder — Portfolio

A single-page, animated freelance portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Framer Motion and next-themes.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where to edit

- **All copy and data:** `data/site.ts` (search for `TODO`)
- **Projects:** `projects` in `data/site.ts` + images in `public/images/projects/` (set `placeholder: false` and add URLs)
- **Portrait:** `public/images/portrait-placeholder.webp` (update `siteConfig.portrait` if you rename it)
- **CV download:** `public/Resume.docx` (linked from `siteConfig.cvHref`)
- **Social share image:** `app/opengraph-image.png` / `app/twitter-image.png`
- **Design tokens:** `app/globals.css` (colours, gradients, type scale, container)
- **Animation presets:** `lib/motion.ts`
- **Contact form backend:** `app/api/contact/route.ts` (sends via Resend when configured)

## Environment

Copy `.env.example` to `.env.local` (or set the variables on your host):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG / sitemap URL. **Set before `npm run build`.** |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery. Without them the form says it isn't connected and points to email / WhatsApp. |

## Structure

```
app/                 layout, page, globals.css, api/contact
components/layout/   Header, Footer, ThemeToggle, MobileMenu, Logo, WhatsAppFab
components/sections/ Hero, About, Services, Projects, Experience, Skills, Education, CtaBand, Faq, Contact
components/modals/   Modal (shared), ServiceModal, SuccessModal
components/shared/   AddressCard, SocialLinks
components/ui/       shadcn primitives + AnimatedButton, SectionHeading, Counter
data/site.ts         content
lib/                 motion presets, hooks, contact schema, utils
types/               shared interfaces
```
