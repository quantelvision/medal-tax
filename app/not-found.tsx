import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA, SecondaryCTA } from "@/components/conversion/Buttons";
import { BrandMotif } from "@/components/media/BrandMotif";
import { Grain } from "@/components/patterns";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[60vh] max-w-[var(--container-page)] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center md:px-8">
      <BrandMotif className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-[0.15]" />
      <Grain tone="light" className="-z-10" />
      <p className="font-display text-2xl text-brass-2">404</p>
      <h1 className="mt-4 font-display text-4xl text-navy md:text-5xl">We couldn&rsquo;t find that page.</h1>
      <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate">
        The page you&rsquo;re looking for may have moved or no longer exists.
        Here&rsquo;s where to go instead.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <PrimaryCTA href="/">Return Home</PrimaryCTA>
        <SecondaryCTA href="/services">Browse Services</SecondaryCTA>
        <SecondaryCTA href="/contact">Contact Us</SecondaryCTA>
      </div>
      <p className="mt-10 text-[14px] text-slate">
        Looking for an old page?{" "}
        <Link href="/services" className="font-medium text-brass-2">
          View all services
        </Link>
        .
      </p>
    </div>
  );
}
