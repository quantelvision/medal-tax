"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/data/site";
import { ContactNotification } from "@/emails/ContactNotification";
import { ContactConfirmation } from "@/emails/ContactConfirmation";

export type ContactActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong sending your enquiry. Please try again, or call us directly.";

/**
 * Server Function invoked directly from ContactForm's onSubmit handler (the
 * "Event Handlers" pattern in Next's mutating-data guide) rather than via a
 * <form action={...}>, because react-hook-form owns submission — it needs
 * to run client-side validation and hold state through the request, not
 * hand the browser a native form post.
 *
 * Reachable via direct POST regardless of the UI (per Next's own Server
 * Actions guide), so every check below — schema, honeypot, rate limit — is
 * a real security boundary, not just client-side polish duplicated for
 * show.
 */
export async function submitContactForm(input: unknown): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: GENERIC_ERROR };
  }
  const { name, phone, email, service, message, company } = parsed.data;

  // Honeypot: real visitors never populate this field. Fail silently —
  // reporting success tells a bot nothing useful, while a visible error
  // would only invite it to retry differently.
  if (company) {
    return { ok: true };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { limited, retryAfterSeconds } = checkRateLimit(ip);
  if (limited) {
    const minutes = Math.max(1, Math.ceil((retryAfterSeconds ?? 60) / 60));
    return {
      ok: false,
      error: `Too many enquiries from this connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}, or call us directly.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitContactForm: RESEND_API_KEY is not set — see .env.example");
    return { ok: false, error: GENERIC_ERROR };
  }
  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const notifyTo = process.env.CONTACT_NOTIFICATION_TO || site.email;

  try {
    const notification = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: email,
      subject: `New enquiry — ${service} (${name})`,
      react: ContactNotification({ name, phone, email, service, message }),
    });
    if (notification.error) {
      console.error("submitContactForm: Resend notification error", notification.error);
      return { ok: false, error: GENERIC_ERROR };
    }
  } catch (err) {
    console.error("submitContactForm: failed to send notification", err);
    return { ok: false, error: GENERIC_ERROR };
  }

  // Confirmation to the sender is opt-in: Resend requires a verified sending
  // domain for mail that reaches arbitrary recipients (its sandbox address
  // only delivers to the account's own verified email), so this stays off
  // until that's confirmed. See .env.example / README.
  if (process.env.CONTACT_SEND_CONFIRMATION === "true") {
    try {
      const confirmation = await resend.emails.send({
        from,
        to: email,
        subject: "We've received your enquiry — Medal Tax",
        react: ContactConfirmation({ name, service }),
      });
      if (confirmation.error) {
        // The business notification already went out — don't fail the
        // whole submission over the optional courtesy copy.
        console.error("submitContactForm: Resend confirmation error", confirmation.error);
      }
    } catch (err) {
      console.error("submitContactForm: failed to send confirmation", err);
    }
  }

  return { ok: true };
}
