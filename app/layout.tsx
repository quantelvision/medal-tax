import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileActions } from "@/components/conversion/StickyMobileActions";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { PatternDefs } from "@/components/patterns";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollToTop } from "@/components/motion/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.medaltax.com"),
  title: {
    default: "Medal Tax — Tax, GST & Business Compliance Advisory",
    template: "%s | Medal Tax",
  },
  description:
    "Medal Tax is a tax consultancy firm providing income tax, GST, TDS, accounting, audit and business registration services for individuals and businesses since 2016.",
  openGraph: {
    type: "website",
    siteName: "Medal Tax",
    title: "Medal Tax — Tax, GST & Business Compliance Advisory",
    description:
      "Income tax, GST, TDS, accounting, audit and business registration services from a tax consultancy trusted since 2016.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medal Tax — Tax, GST & Business Compliance Advisory",
    description:
      "Income tax, GST, TDS, accounting, audit and business registration services from a tax consultancy trusted since 2016.",
  },
  alternates: {
    canonical: "/",
  },
  // Was documented in .env.example but never actually consumed anywhere —
  // set NEXT_PUBLIC_GSC_VERIFICATION and this renders the
  // <meta name="google-site-verification"> tag Search Console asks for.
  // Omitted entirely (not an empty tag) when the env var isn't set.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital@0;1&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <PatternDefs />
        <OrganizationSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1 pb-16 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <StickyMobileActions />
          <ScrollToTop />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      {/* Same "documented but never wired up" gap as the GSC verification
          tag above. Both render nothing when their env var is unset, so a
          site without real IDs configured yet stays exactly as before. */}
      {process.env.NEXT_PUBLIC_GTM_CONTAINER_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID} />
      )}
      {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      )}
    </html>
  );
}
