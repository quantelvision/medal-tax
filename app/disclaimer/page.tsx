import type { Metadata } from "next";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { BrandMotif } from "@/components/media/BrandMotif";
import { Grain } from "@/components/patterns";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for the Medal Tax website.",
  alternates: { canonical: "/disclaimer" },
  robots: { index: false, follow: true },
};

// No dedicated disclaimer page existed on the live medaltax.com site at the
// time of the original audit. This is general, standard disclaimer language
// (not tax/legal advice, and not a Medal-Tax-specific claim of any kind);
// Medal Tax (ideally with counsel) should confirm or replace this wording
// before launch.
export default function DisclaimerPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Disclaimer", url: "/disclaimer" }]} />
      <div className="relative mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-20 prose-medal">
        <BrandMotif className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[420px] w-[420px] opacity-[0.18]" />
        <Grain tone="light" className="-z-10" />
        <h1 className="font-display text-4xl text-navy">Disclaimer</h1>
        <p className="mt-8">
          The information provided on this website is for general
          informational purposes only and does not constitute professional
          tax, legal, or financial advice. Tax laws, rates, and procedures
          change and can vary based on individual circumstances — always
          confirm your specific situation with {site.name} or another
          qualified professional before acting on any information found on
          this site.
        </p>
        <p>
          {site.name} does not guarantee specific outcomes, timelines, or
          approvals from any government authority or department in
          connection with the services described on this website.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">No client relationship</h2>
        <p>
          Browsing this website or submitting an enquiry through it does not
          create a professional-client relationship with {site.name}. That
          relationship begins only once both parties have agreed on the
          specific scope of work.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">External links</h2>
        <p>
          Any links to third-party websites are provided for convenience
          only. {site.name} does not endorse and is not responsible for the
          content of any linked website.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {site.name} accepts no
          liability for any loss or damage arising from reliance on
          information found on this website. Always seek advice specific to
          your own circumstances before acting.
        </p>
      </div>
    </div>
  );
}
