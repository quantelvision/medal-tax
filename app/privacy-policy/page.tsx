import type { Metadata } from "next";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { BrandMotif } from "@/components/media/BrandMotif";
import { Grain } from "@/components/patterns";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Medal Tax collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy-policy" }]} />
      <div className="relative mx-auto max-w-[720px] px-5 py-(--space-section-sm) md:px-8 md:py-(--space-section) prose-medal">
        <BrandMotif className="pointer-events-none absolute -right-40 -top-16 -z-10 h-[420px] w-[420px] opacity-[0.18]" />
        <Grain tone="light" className="-z-10" />
        <h1 className="font-display text-4xl text-navy">Privacy Policy</h1>
        <p className="mt-2 text-step-6 text-slate">Last updated: February 5, 2026</p>

        <p className="mt-8">
          Medal Tax (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates medaltax.com. This Privacy
          Policy explains how we collect, use, store, and protect your
          personal information. By using this website, you agree to this
          policy.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">1. Information we collect</h2>
        <ul className="list-disc pl-5">
          <li>Name, email address, phone number</li>
          <li>Business and tax-related information you submit</li>
          <li>Payment details via third-party gateways</li>
          <li>IP address, browser type, device information</li>
          <li>Cookies and usage data</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-navy">2. How we use your information</h2>
        <ul className="list-disc pl-5">
          <li>Provide and manage our services</li>
          <li>Respond to enquiries and support requests</li>
          <li>Process payments and transactions</li>
          <li>Improve website performance and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-navy">3. Cookies &amp; tracking</h2>
        <p>
          We use cookies and similar technologies for analytics and website
          functionality. You can disable cookies in your browser, but some
          features may not work properly.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">4. Sharing of information</h2>
        <p>We do not sell your personal data. Information may be shared only with:</p>
        <ul className="list-disc pl-5">
          <li>Payment processors and service providers</li>
          <li>Analytics and hosting partners</li>
          <li>Government or legal authorities when required by law</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-navy">5. Data security</h2>
        <p>
          We implement reasonable technical and organizational safeguards.
          However, no system is completely secure, and absolute protection
          cannot be guaranteed.
        </p>

        <h2 className="mt-10 font-display text-2xl text-navy">6. Data retention</h2>
        <p>Personal data is retained only as long as necessary for legal, contractual, or business purposes.</p>

        <h2 className="mt-10 font-display text-2xl text-navy">7. Your rights</h2>
        <ul className="list-disc pl-5">
          <li>Access your personal data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent where applicable</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-navy">8. Third-party links</h2>
        <p>This website may contain links to external sites. We are not responsible for their privacy practices or content.</p>

        <h2 className="mt-10 font-display text-2xl text-navy">9. Children&rsquo;s privacy</h2>
        <p>Our services are not intended for individuals under 16 years of age. We do not knowingly collect data from minors.</p>

        <h2 className="mt-10 font-display text-2xl text-navy">10. Changes to this policy</h2>
        <p>We may update this Privacy Policy at any time. Changes will be reflected on this page with a revised date.</p>

        <h2 className="mt-10 font-display text-2xl text-navy">11. Contact</h2>
        <p>
          For privacy-related questions, contact:{" "}
          <a href="mailto:support@medaltax.com" className="text-brass-2">
            support@medaltax.com
          </a>
        </p>
      </div>
    </div>
  );
}
