# Medal Tax Redesign — Audit, IA & Migration Notes

## 1. Audit summary (source: live crawl of medaltax.com, September 2026)

**Business facts confirmed on the live site:**
- Established 2016 (stated on About page)
- Head office: #55, Rameshnagar 4th St, Pallavan Nagar, Maduravoyal, Chennai - 600095
- Branch office: #91/2, Cutchery Street, Next to Indian Bank, Tirupathur - 635601
- Phones: +91 98433 55992 / +91 89252 93929 (WhatsApp)
- Email: info@medaltax.com
- Team (from live About page): Vinoth Kumar (Tax Consultant & Advisory), Vicky (APOB Registration), Shalini (GST Filing), Nivedha (GST Registration)
- 11 services with dedicated pages + IEC referenced in the enquiry form/landing page without its own URL

**Not found / not carried over:**
- Social media links in header/footer all pointed to "#" — no verified handles, so not linked in the redesign.
- Homepage "Customer Satisfaction / Years of Experience / Happy Clients" counters rendered as 0% / 0+ / 0+ on the live site — never actually populated, so omitted rather than invented.
- The `/accounting-services/` page contains a second, mismatched landing-page layout with four client testimonials (Rohit Sharma, Anjali Mehta, Suresh Kumar, Sneha Iyer). These read as template/demo content rather than verified client feedback and have been **excluded** from the redesign per the no-fabricated-testimonials rule. Recommend replacing with real, consented testimonials if available.
- Bank account and IFSC details shown on the live `/contact-us-2/` page have been **deliberately omitted** from the redesign for security best practice — not something a public marketing site should expose regardless of source.
- `/terms-of-use/` could not be retrieved with usable content during this audit; the new Terms of Use page is a structured CONTENT REQUIRED placeholder pending the real text.
- No blog/resource content exists on the live site — the new Resources page is a working shell, honestly labelled, with no invented articles.

**Trademark Registration — flag:** This project's brief asked for a dedicated Trademark Registration page. It does **not** appear anywhere on the live medaltax.com site (navigation, service list, or contact form). The page has been built with general, factual information about the trademark process and no Medal-Tax-specific history or claims. **Confirm with Medal Tax before launch** whether this is an active offering.

**IEC Registration — confirmed real, no old URL:** Appears in the `/contact-us-2/` enquiry form and the `/accounting-services/` service cards, but never had its own page. Built fresh at `/services/import-export-code`.

## 2. Information architecture

```
/                         Homepage
/about                    Who We Are (incl. team, #team anchor)
/services                 Services directory (by category)
/services/[slug]          12 individual service pages
/who-we-help              Audience-led navigation
/resources                Insights shell (CONTENT REQUIRED)
/contact                  Contact + enquiry form
/privacy-policy           Migrated from live site
/terms-of-use             CONTENT REQUIRED placeholder
/disclaimer               New — general professional-services disclaimer, flagged for review
```

### Service categories
- **Tax & Compliance** — Income Tax Filing, GST Services, TDS Services, Services for Non-Residents
- **Accounting & Financial Services** — Accounting Services, Audit Services, Corporate Finance
- **Business & Registration Services** — Digital Signature, Corporate Services, Corporate Governance, IEC Registration, Trademark Registration
- **E-Commerce & Business Support** — Amazon Seller Onboarding

## 3. URL migration table

| Old URL | New URL | Status |
|---|---|---|
| /income-tax-2/ | /services/income-tax-filing | 301 |
| /gst-2/ | /services/gst-services | 301 |
| /tds-2/ | /services/tds-services | 301 |
| /digital-signature-2/ | /services/digital-signature | 301 |
| /corporate-governance/ | /services/corporate-governance | 301 |
| /non-residents/ | /services/non-resident-services | 301 |
| /accounting-services/ | /services/accounting-services | 301 |
| /audit-services/ | /services/audit-services | 301 |
| /corporate-services/ | /services/corporate-services | 301 |
| /corporate-finance/ | /services/corporate-finance | 301 |
| /amazon-onboarding-support/ | /services/amazon-seller-onboarding | 301 |
| /about-us-2/ | /about | 301 |
| /contact-us-2/ | /contact | 301 |
| /privacy-policy-2/ | /privacy-policy | 301 |
| /terms-of-use/ | /terms-of-use | same path, no redirect needed |

Implemented in `next.config.ts` as permanent redirects (no chains — each old URL maps directly to its final destination).

## 4. Contacts wired into the site

| Person | Phone | Service tie-in |
|---|---|---|
| Karthik | 9629473631 | Income Tax Filing |
| Imran | 9731562158 | Amazon Seller Onboarding |
| Vinoth Kumar | 89252 93929 | General / Tax Consultant & Advisory |
| Vicky | 86100 14497 | APOB Registration |
| Shalini | 86440 88880 | GST Filing |
| Nivedha | 93448 92750 | GST Registration |

All call links use `tel:` and all WhatsApp links use `https://wa.me/<number>?text=<service-specific message>`.

## 5. Outstanding CONTENT REQUIRED items for Medal Tax to supply

1. Confirm Trademark Registration as an active service (or remove the page).
2. Real Terms of Use text.
3. Business hours for the Contact page.
4. Verified social media handles, if any exist.
5. Real client testimonials (with consent) — none were used from the old site's placeholder-style content.
6. Production homepage video + poster image (component is built and ready — see `components/media/HomepageVideo.tsx`).
7. Genuine team or office photography, if Medal Tax wants to move beyond the typography-led team presentation.
8. GA4 / GTM / Search Console IDs (environment variables only — see `.env.example`).
