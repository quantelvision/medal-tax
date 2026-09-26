"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowClockwise, WarningCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { contactSchema, SERVICE_OPTIONS, type ContactFormValues } from "@/lib/validation/contact";
import { submitContactForm } from "@/app/contact/actions";
import { Select } from "@/components/ui/Select";
import { Icon } from "@/components/icons";

/**
 * Contact form — react-hook-form + zod (lib/validation/contact.ts, the same
 * schema the server action re-validates with), a custom accessible listbox
 * for the service field, and four explicit states: idle, submitting,
 * success, and a failure state that keeps every field exactly as the
 * visitor left it (nothing here ever calls reset() except on success).
 *
 * Accessibility contract:
 *  - Every invalid field carries aria-invalid and aria-describedby pointing
 *    at its own error message.
 *  - On a failed (invalid) submit, a summary of every error appears above
 *    the form and receives focus — screen reader and keyboard users land
 *    directly on the list rather than having to discover errors field by
 *    field.
 *  - A single aria-live="polite" status region announces the submission
 *    lifecycle (sending / sent / failed) — a separate concern from the
 *    error summary above, which is focus-driven rather than live-region-
 *    driven so the two never double-announce the same thing.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [invalidSubmitCount, setInvalidSubmitCount] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Reading summaryRef.current has to happen here, not inside onInvalid
  // itself: onInvalid is passed straight into handleSubmit(), which runs
  // during render to build the actual submit handler, so a ref read there
  // is flagged as a possible during-render access even though it's only
  // ever really invoked later, from a submit event. An effect reacting to
  // the attempt count is the sanctioned place for the ref read instead.
  useEffect(() => {
    if (invalidSubmitCount > 0) summaryRef.current?.focus();
  }, [invalidSubmitCount]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", phone: "", email: "", service: undefined, message: "", company: "" },
  });

  const errorList = Object.entries(errors) as [keyof ContactFormValues, { message?: string }][];

  async function onValid(values: ContactFormValues) {
    setStatus("idle");
    setStatusMessage("Sending your enquiry…");
    const result = await submitContactForm(values);
    if (result.ok) {
      setStatus("success");
      setStatusMessage("Your enquiry has been sent.");
      reset();
    } else {
      setStatus("error");
      setStatusMessage(result.error);
    }
  }

  function onInvalid() {
    setInvalidSubmitCount((c) => c + 1);
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-line bg-paper p-8">
        <p className="font-display text-2xl text-navy">Thank you — we&rsquo;ve received your enquiry.</p>
        <p className="mt-3 text-step-8 leading-relaxed text-slate">
          A member of the Medal Tax team will follow up by phone or WhatsApp
          shortly. For anything urgent, call{" "}
          <a href="tel:+919843355992" className="font-medium text-brass-2">
            +91 98433 55992
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-5" noValidate>
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className="rounded-sm border border-error bg-paper px-5 py-4 outline-none"
        >
          <p className="flex items-center gap-2 text-step-7 font-medium text-error">
            <Icon icon={WarningCircle} size="sm" weight="fill" />
            Please fix the following before sending:
          </p>
          <ul className="mt-2 space-y-1 pl-6 text-step-6 text-error">
            {errorList.map(([field, err]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline underline-offset-2">
                  {err.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot — invisible to real visitors, never announced to
          assistive technology, excluded from the tab order. A filled value
          marks the submission as spam server-side; see actions.ts. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div
        role="status"
        aria-live="polite"
        className={status === "error" ? "rounded-sm border border-error bg-paper px-5 py-3 text-step-6 text-error" : "sr-only"}
      >
        {statusMessage}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field label="Service you need help with" htmlFor="service" error={errors.service?.message}>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select
              id="service"
              name={field.name}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Select a service"
              options={SERVICE_OPTIONS}
              ariaInvalid={!!errors.service}
              ariaDescribedBy={errors.service ? "service-error" : undefined}
            />
          )}
        />
      </Field>

      <Field label="Tell us a little about what you need (optional)" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          className={`${inputClass} min-h-30 resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        data-analytics-event="contact_form_submit"
        className="inline-flex items-center gap-2.5 rounded-sm bg-navy px-7 py-3 text-step-8 font-medium text-paper transition-colors duration-(--dur-base) ease-standard hover:bg-navy-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Icon icon={isSubmitting ? ArrowClockwise : PaperPlaneTilt} size="sm" className={isSubmitting ? "animate-spin" : ""} />
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-step-8 text-ink transition-colors duration-(--dur-base) ease-standard focus-visible:border-brass-2 aria-invalid:border-error";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-step-5 font-medium text-slate">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-step-4 text-error">
          {error}
        </p>
      )}
    </div>
  );
}
