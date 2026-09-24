import { Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";

/**
 * Sent to the business (CONTACT_NOTIFICATION_TO) every time the contact
 * form is submitted successfully. This is the always-on email — see
 * ContactConfirmation.tsx for the sender-facing one, which is gated behind
 * domain verification.
 */
export function ContactNotification({
  name,
  phone,
  email,
  service,
  message,
}: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
}) {
  return (
    <EmailLayout
      previewText={`New enquiry from ${name} — ${service}`}
      eyebrow="Website enquiry"
      heading="New contact form submission"
    >
      <Row label="Name" value={name} />
      <Row label="Phone" value={phone} />
      <Row label="Email" value={email} />
      <Row label="Service" value={service} />
      {message ? (
        <Section style={{ marginTop: "16px" }}>
          <Text style={{ margin: "0 0 6px", color: COLORS.slate, fontSize: "12px", fontWeight: 600 }}>
            MESSAGE
          </Text>
          <Text style={{ margin: 0, color: COLORS.ink, fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {message}
          </Text>
        </Section>
      ) : null}
    </EmailLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: "10px" }}>
      <Text style={{ margin: 0, color: COLORS.slate, fontSize: "12px", fontWeight: 600 }}>{label.toUpperCase()}</Text>
      <Text style={{ margin: "2px 0 0", color: COLORS.ink, fontSize: "15px" }}>{value}</Text>
    </Section>
  );
}

export default ContactNotification;
