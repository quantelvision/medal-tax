"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Matches --ease-entrance in globals.css. Framer Motion needs the numeric
 *  array form, not the CSS custom property, so the two are kept in sync by
 *  hand — there is no way to read a CSS custom property into a JS-driven
 *  animation without a runtime getComputedStyle call, which isn't worth it
 *  for four numbers that don't change. */
const EASE_ENTRANCE = [0.05, 0.7, 0.1, 1] as const;

/**
 * Scroll-reveal wrapper — rebuilt on Framer Motion for Phase 6, replacing
 * the earlier CSS + raw IntersectionObserver version from Phase 1.
 *
 * That earlier version had one job above all others: never let a wrapped
 * section become permanently invisible if JavaScript fails, is slow, or
 * never runs. Framer Motion's own `whileInView` pattern does NOT preserve
 * that guarantee out of the box — passing a real `initial="hidden"` value
 * bakes `opacity: 0` into the server-rendered HTML itself, so a page with no
 * JavaScript at all would ship literally invisible content. That is the
 * exact bug this project already shipped and fixed once; this rewrite is
 * built specifically to not reintroduce it. The mechanism:
 *
 *  - `initial={false}` on the motion.div — Framer Motion never writes an
 *    "initial" style of its own, on the server or the client. The element's
 *    rendered appearance is always exactly whatever `animate` currently
 *    evaluates to.
 *  - `animate` is driven by `hidden`, computed from state that all starts
 *    "not yet decided" identically on the server and the client's first
 *    render — so there is no hydration mismatch, and while nothing has been
 *    decided yet the content is unconditionally visible. That is what makes
 *    the component safe before JavaScript has had a chance to run at all.
 *  - `mountVisible` is set from a callback ref, not a useEffect: it fires
 *    the instant the DOM node mounts, checking whether the element is
 *    already on screen (or already scrolled past). Deciding this in a ref
 *    callback rather than an effect body also happens to be what satisfies
 *    the react-hooks/set-state-in-effect rule — effects are for
 *    synchronizing with external systems, and a one-off DOM measurement at
 *    mount is exactly that "external system" read, just expressed as a ref
 *    callback instead of an effect.
 *  - `inView` (IntersectionObserver-based, triggered once) is consumed
 *    directly from useInView rather than mirrored into its own state.
 *  - A 1200ms failsafe timer reveals the content regardless, in case
 *    everything else somehow never fires. Its setState call happens inside
 *    the timer's callback, not synchronously in the effect body, which is
 *    exactly the "subscribe to an external system, setState in a callback"
 *    pattern the same lint rule expects.
 *  - Entering the hidden state (ref callback decides "not already visible")
 *    uses a variant with `duration: 0` — an instant, invisible snap, not an
 *    animated fade-out the user would see happen. Only the reveal itself
 *    (hidden -> visible) uses the real eased transition. 8-16px of travel,
 *    transform + opacity only.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const domRef = useRef<HTMLDivElement>(null);
  const failsafeRef = useRef<number | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [mountVisible, setMountVisible] = useState(false);
  const [failsafeVisible, setFailsafeVisible] = useState(false);
  const inView = useInView(domRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  const setRef = useCallback((node: HTMLDivElement | null) => {
    domRef.current = node;
    if (!node) {
      window.clearTimeout(failsafeRef.current);
      return;
    }
    setReady(true);
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setMountVisible(true);
    failsafeRef.current = window.setTimeout(() => setFailsafeVisible(true), 1200);
  }, []);

  const visible = mountVisible || inView || failsafeVisible;
  const hidden = ready && !visible && !reduceMotion;

  return (
    <motion.div
      ref={setRef}
      initial={false}
      animate={hidden ? "hidden" : "visible"}
      variants={{
        hidden: { opacity: 0, y: 12, transition: { duration: 0 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_ENTRANCE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
