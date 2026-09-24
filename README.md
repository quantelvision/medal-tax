# Medal Tax — Redesign

Next.js 16 (App Router) + TypeScript + Tailwind v4 rebuild of medaltax.com.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Key docs

- `AUDIT.md` — full content/URL/contact audit, IA, and CONTENT REQUIRED items to resolve with Medal Tax before launch.
- `.env.example` — analytics env vars (GA4 / GTM / Search Console) plus the contact form's Resend/email vars — fill in real values in `.env.local`, never commit them.
- `next.config.ts` — 301 redirect map from every legacy medaltax.com URL found during the audit.

## Structure

- `lib/data/site.ts` — business info, offices, team, phone/WhatsApp helpers
- `lib/data/services.ts` — full service inventory (12 services, 4 categories) with FAQs, process, documents
- `app/` — all routes (homepage, services directory + dynamic service pages, about, contact, who-we-help, resources, legal pages, sitemap.ts, robots.ts)
- `components/` — layout (header/footer), conversion (CTA/Call/WhatsApp buttons, sticky mobile bar), content (FAQ accordion, breadcrumb, service sections), media (HomepageVideo), seo (schema.org JSON-LD)

## Homepage video

`components/media/HomepageVideo.tsx` is a drop-in slot. Add the production
assets under `public/videos/` and `public/images/`, flip `VIDEO_READY` to
`true` — no other changes needed. Until then it renders an honest
development placeholder rather than a stock video.

## Contact form

`components/content/ContactForm.tsx` (react-hook-form + zod) submits to the
Server Action in `app/contact/actions.ts`, which sends email via
[Resend](https://resend.com). The shared validation schema lives in
`lib/validation/contact.ts` and is used by both the client (inline field
errors) and the server (a real security boundary — Server Actions are
reachable by direct POST regardless of the UI).

To receive real enquiries:

1. Create a Resend account and an API key, and set `RESEND_API_KEY` in
   `.env.local` (never commit it — see `.env.example` for the full list of
   contact-form env vars and what each one does).
2. Without any further setup, the form already works: it sends from
   Resend's sandbox address to `CONTACT_NOTIFICATION_TO` (defaults to
   `info@medaltax.com`).
3. To send from a Medal Tax address instead of the sandbox one, verify a
   sending domain in Resend and set `CONTACT_FROM_EMAIL` to an address on
   it.
4. Only once that domain is verified, set `CONTACT_SEND_CONFIRMATION=true`
   to also email the visitor a confirmation copy — sending a confirmation to
   an arbitrary visitor address from the unverified sandbox address fails
   silently, which is why this stays off until a real domain is confirmed.

Email templates are React Email components in `emails/`. Rate limiting
(`lib/rate-limit.ts`) and a honeypot field are basic, in-process
protections appropriate for a marketing site's enquiry volume — see that
file's comments for what it does and doesn't cover.

## Analytics & performance monitoring

`@vercel/analytics` and `@vercel/speed-insights` are wired into
`app/layout.tsx` (`<Analytics />` / `<SpeedInsights />`). Both are no-ops
unless the site is actually deployed on Vercel — no env vars or setup
needed, they activate automatically once deployed there. This is separate
from the GA4/GTM setup in `.env.example`, which works anywhere.

## Before launch

See "Outstanding CONTENT REQUIRED items" at the bottom of `AUDIT.md` —
notably: confirm Trademark Registration as a real service, and supply
business hours and the production video. Terms of Use and Disclaimer now
have general placeholder-quality legal text (not fabricated, but not
reviewed either) — have Medal Tax or counsel confirm or replace it before
launch.
