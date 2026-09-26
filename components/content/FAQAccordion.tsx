"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react/ssr";
import type { FAQ } from "@/lib/data/services";
import { Icon } from "@/components/icons";
import { FAQSchema } from "@/components/seo/StructuredData";

const EASE_STANDARD = [0.2, 0, 0, 1] as const;

export function FAQAccordion({ faqs, title = "Frequently asked questions" }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();
  // A second, independent reduced-motion guard on top of the global
  // MotionConfig in MotionProvider — same layered pattern as Reveal.tsx.
  // The global config strips transform-driven motion automatically; height
  // is a layout animation, not a transform, so it needs its own check.
  const reduceMotion = useReducedMotion();

  if (!faqs.length) return null;

  return (
    <div>
      <FAQSchema faqs={faqs} />
      <h2 className="font-display text-3xl text-navy">{title}</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const buttonId = `${uid}-faq-button-${i}`;
          const panelId = `${uid}-faq-panel-${i}`;
          return (
            <div key={faq.q}>
              <button
                id={buttonId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="text-step-11 font-medium text-ink">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-brass-2 transition-transform duration-(--dur-base) ease-standard"
                  style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
                >
                  {/* bold at 16px: this caret is the affordance that says the
                      row opens, and regular reads too faint at this size. */}
                  <Icon icon={CaretDown} size="xs" weight="bold" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: EASE_STANDARD }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-5 pr-8 text-step-8 leading-relaxed text-slate">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
