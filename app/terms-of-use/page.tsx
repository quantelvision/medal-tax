import type { Metadata } from "next";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { BrandMotif } from "@/components/media/BrandMotif";
import { Grain } from "@/components/patterns";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Medal Tax website.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
};

// The existing medaltax.com/terms-of-use/ page could not be retrieved during
// the original audit. This is now general, standard website-terms language
// (not tax/legal advice, and not a Medal-Tax-specific claim of any kind) —
// added at the user's explicit request after the page sat as just a heading
// for a few rounds. Still needs a review by Medal Tax/counsel before launch;
// robots.index stays false for that reason.
export default function TermsOfUsePage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Terms of Use", url: "/terms-of-use" }]} />
      <div className="relative mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-20 prose-medal">
        <BrandMotif className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[420px] w-[420px] opacity-[0.18]" />
        <Grain tone="light" className="-z-10" />
        <h1 className="font-display text-4xl text-navy">Terms of Use</h1>
        <p className="mt-8 text-[14px] text-slate">Last updated: {new Date().getFullYear()}</p>

        <h2 className="mt-10 font-display text-2xl text-navy">Acceptance of these terms</h2>
        <p>
          By accessing or using this website, you agree to be bound by these
          Terms of Use. If you do not agree with any part of these terms,
          please do not use this website.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Use of this website</h2>
        <p>
          This website is provided for general informational purposes about
          {" "}{site.name} and the services it offers. You may browse its
          content and use the contact form to send an enquiry. You agree not
          to use this website in any way that could damage, disable, or
          impair it, or interfere with anyone else&rsquo;s use of it.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">No professional-client relationship</h2>
        <p>
          Viewing this website, or submitting an enquiry through it, does not
          by itself create a professional engagement or client relationship
          with {site.name}. An engagement begins only once both parties have
          agreed on the specific scope of work.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Intellectual property</h2>
        <p>
          The text, graphics, logos, and other content on this website belong
          to {site.name} or its licensors and are protected by applicable
          intellectual property laws. You may view and print pages for your
          own personal, non-commercial reference, but may not reproduce,
          republish, or distribute this content without prior written
          permission.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Links to other websites</h2>
        <p>
          This website may link to third-party websites for convenience.
          {" "}{site.name} does not control and is not responsible for the
          content, accuracy, or practices of any linked website.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Limitation of liability</h2>
        <p>
          This website and its content are provided &ldquo;as is&rdquo;,
          without warranties of any kind, express or implied. To the fullest
          extent permitted by law, {site.name} will not be liable for any
          loss or damage arising from your use of, or inability to use, this
          website.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Changes to these terms</h2>
        <p>
          These terms may be updated from time to time. Continued use of this
          website after a change is posted constitutes acceptance of the
          updated terms.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Governing law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes
          arising from them are subject to the jurisdiction of the courts in
          Tamil Nadu.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${site.email}`} className="text-brass-2">{site.email}</a>.
        </p>
      </div>
    </div>
  );
}
