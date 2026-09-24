import { Body, Container, Head, Hr, Html, Preview, Section, Tailwind, Text } from "@react-email/components";
import type { ReactNode } from "react";

/**
 * Shared shell for both contact-form emails — the same navy/paper/brass
 * system as the site, expressed as inline styles (via @react-email's
 * Tailwind wrapper, which resolves classes to inline styles at send time,
 * since email clients strip <style> tags and external stylesheets).
 *
 * Colours are the literal hex values from app/globals.css's @theme block —
 * email clients can't read CSS custom properties, so these are duplicated
 * by necessity, not by choice. If the palette changes there, it needs a
 * manual update here too.
 */
const COLORS = {
  navy: "#101a2e",
  paper: "#f6f3ec",
  paper2: "#efe9dd",
  ink: "#171b1f",
  slate: "#5b6472",
  brass2: "#8a5f2b",
  line: "#dcd5c6",
};

export function EmailLayout({
  previewText,
  eyebrow,
  heading,
  children,
}: {
  previewText: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body style={{ backgroundColor: COLORS.paper2, margin: 0, padding: "32px 16px" }}>
          <Container
            style={{
              backgroundColor: COLORS.paper,
              maxWidth: "560px",
              border: `1px solid ${COLORS.line}`,
            }}
          >
            <Section style={{ backgroundColor: COLORS.navy, padding: "28px 32px" }}>
              <Text style={{ margin: 0, color: "#d7b06b", fontSize: "13px", letterSpacing: "0.04em" }}>
                {eyebrow}
              </Text>
              <Text
                style={{
                  margin: "6px 0 0",
                  color: COLORS.paper,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "24px",
                  lineHeight: "1.25",
                }}
              >
                {heading}
              </Text>
            </Section>

            <Section style={{ padding: "28px 32px" }}>{children}</Section>

            <Hr style={{ borderColor: COLORS.line, margin: 0 }} />
            <Section style={{ padding: "18px 32px" }}>
              <Text style={{ margin: 0, color: COLORS.slate, fontSize: "12px", lineHeight: "1.5" }}>
                Medal Tax &middot; #55, Rameshnagar 4th St, Pallavan Nagar, Maduravoyal, Chennai - 600095
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export { COLORS };
