import { Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { site } from "@/lib/data/site";

/**
 * Sent to the person who submitted the form — only when
 * CONTACT_SEND_CONFIRMATION=true, which requires a Resend-verified sending
 * domain (see .env.example and the contact-form section of the README for
 * why this is off by default).
 */
export function ContactConfirmation({ name, service }: { name: string; service: string }) {
  return (
    <EmailLayout
      previewText="We've received your enquiry — Medal Tax"
      eyebrow="Medal Tax"
      heading="Thank you — we've received your enquiry"
    >
      <Text style={{ margin: "0 0 14px", color: COLORS.ink, fontSize: "15px", lineHeight: "1.6" }}>
        Hi {name},
      </Text>
      <Text style={{ margin: "0 0 14px", color: COLORS.ink, fontSize: "15px", lineHeight: "1.6" }}>
        Thanks for getting in touch about <strong>{service}</strong>. A member of the Medal Tax team will follow up
        by phone or WhatsApp shortly.
      </Text>
      <Text style={{ margin: 0, color: COLORS.ink, fontSize: "15px", lineHeight: "1.6" }}>
        For anything urgent, call {site.phones.primary} or write to{" "}
        <a href={`mailto:${site.email}`} style={{ color: COLORS.brass2 }}>
          {site.email}
        </a>
        .
      </Text>
    </EmailLayout>
  );
}

export default ContactConfirmation;
