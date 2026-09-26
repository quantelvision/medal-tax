"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { CaretDown, Check } from "@phosphor-icons/react";
import { Icon } from "@/components/icons";

/**
 * Accessible custom listbox, styled to match the plain text/textarea inputs
 * elsewhere on this form (same border, background, type size) and reusing
 * the one existing shadow precedent on this site — the header's services
 * mega-menu popover (components/layout/Header.tsx) — rather than inventing
 * a new elevation style.
 *
 * Radix Select provides the full keyboard contract on its own: arrow keys
 * move the highlighted item, type-ahead jumps to a matching item, Home/End
 * jump to the first/last item, and Escape closes without changing the
 * selection. Nothing here reimplements any of that.
 *
 * Note: `@phosphor-icons/react` (not the `/ssr` entry used elsewhere in this
 * codebase) — this file is already a client component, and Radix Select's
 * item highlighting depends on client-side state the plain SSR icon entry
 * has no reason to know about; there is no server-rendering benefit being
 * given up here that Icon.tsx's SSR-preference would otherwise buy.
 *
 * `onBlur` is wired to `Root`'s `onOpenChange`, firing only when the popover
 * actually CLOSES — not to the Trigger's own DOM blur event. On a touch
 * device, opening the popover moves focus into it as part of the same
 * gesture, which fires a genuine `blur` on the trigger the instant it
 * opens. Wiring react-hook-form's onBlur straight to that (the more
 * "obvious" approach) meant the field was flagged invalid the moment a
 * visitor tapped it open, before they could possibly have chosen anything —
 * confirmed via CDP touch-event dispatch: aria-invalid flips true exactly
 * on the open-completing touchend, not on any subsequent interaction.
 */
export function Select({
  id,
  name,
  value,
  onValueChange,
  onBlur,
  placeholder,
  options,
  ariaInvalid,
  ariaDescribedBy,
  disabled,
}: {
  id: string;
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  options: readonly string[];
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  disabled?: boolean;
}) {
  return (
    <RadixSelect.Root
      name={name}
      value={value}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (!open) onBlur?.();
      }}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        id={id}
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        className="flex w-full items-center justify-between rounded-sm border border-line bg-paper px-4 py-3 text-left text-step-8 text-ink outline-none transition-colors duration-(--dur-base) ease-standard focus-visible:border-brass-2 data-[placeholder]:text-slate aria-invalid:border-error"
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="ml-2 shrink-0 text-slate">
          <Icon icon={CaretDown} size="xs" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-line bg-paper shadow-xl"
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1.5 text-slate">
            <Icon icon={CaretDown} size="xs" className="rotate-180" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option}
                value={option}
                className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2.5 text-step-7 text-ink outline-none transition-colors duration-(--dur-fast) ease-standard data-[highlighted]:bg-paper-2 data-[highlighted]:text-brass-2 data-[state=checked]:font-medium"
              >
                <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="text-brass-2">
                  <Icon icon={Check} size="xs" weight="bold" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1.5 text-slate">
            <Icon icon={CaretDown} size="xs" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
