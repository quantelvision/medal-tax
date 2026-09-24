"use client";

import { Children, cloneElement, isValidElement, useCallback, useRef, useState, type ReactElement } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type ItemProps = { hidden?: boolean; delay?: number };

/**
 * Staggers a group of <RevealItem> children in on scroll — one shared
 * IntersectionObserver trigger for the whole group, each child offset by a
 * small delay computed from its position. Every child animates on
 * transform + opacity only, via RevealItem.
 *
 * Same safety contract as Reveal.tsx (see that file's comments for the full
 * reasoning, including why the mount-time visibility check runs from a
 * callback ref rather than a useEffect body): content renders fully visible
 * until JavaScript has confirmably mounted and decided otherwise, and a
 * failsafe timer guarantees the group reveals even if the observer never
 * fires.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's reveal. Kept small per the brief. */
  stagger?: number;
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
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ItemProps>[];

  return (
    <div ref={setRef} className={className}>
      {items.map((child, i) => cloneElement(child, { hidden, delay: i * stagger }))}
    </div>
  );
}
