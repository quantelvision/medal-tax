"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react/ssr";
import { IconButton } from "@/components/icons";

const EASE_STANDARD = [0.2, 0, 0, 1] as const;
const SHOW_AFTER_PX = 600;

/**
 * Appears once the visitor has scrolled past one viewport-ish of content,
 * disappears again near the top. Sits above the mobile StickyMobileActions
 * bar (bottom-20 on mobile, clearing its ~56px height plus the safe-area
 * inset) rather than overlapping it.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_STANDARD }}
          className="fixed bottom-20 right-5 z-40 md:bottom-6 md:right-8"
        >
          <IconButton
            icon={ArrowUp}
            label="Back to top"
            size="md"
            tooltipSide="left"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            className="rounded-full border border-line bg-paper p-3 text-navy shadow-md transition-colors duration-(--dur-base) ease-standard hover:border-brass/60 hover:text-brass-2"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
