import { z } from "zod";
import { services } from "@/lib/data/services";

/**
 * Single source of truth for the contact form's shape, imported by both the
 * client (react-hook-form's zodResolver) and the server action — "server-
 * side re-validation with the same zod schema" means literally the same
 * imported object, not a hand-kept-in-sync copy.
 *
 * The service list is derived from the live services data, not hardcoded,
 * so it can never drift from what /services actually offers.
 */
const serviceNames = services.map((s) => s.name);
export const SERVICE_OPTIONS = [...serviceNames, "Other / not sure"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "That name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can reach you on.")
    .max(20, "That phone number looks too long.")
    .regex(/^[+()\d][\d\s()+-]*$/, "Use only digits, spaces and + ( ) -."),
  email: z.email("Enter a valid email address."),
  service: z.enum(SERVICE_OPTIONS, {
    error: "Select a service.",
  }),
  message: z
    .string()
    .trim()
    .max(2000, "Keep the message under 2000 characters.")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot — real visitors never see or fill this field (see ContactForm's
   * markup). Deliberately unconstrained here: the actual enforcement is in
   * the server action (`if (company) return { ok: true }`, silently
   * dropping the submission), not in this schema. An earlier version of
   * this field used `z.string().max(0)`, which rejects any non-empty value
   * — meaning a JS-executing bot that fills the honeypot would fail
   * CLIENT-SIDE validation and see a visible error, not the silent "success"
   * the server action is written to present. A honeypot has no client-side
   * security value anyway (a real user never reaches it either way), so
   * there is nothing to gain by validating it here at all.
   */
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
