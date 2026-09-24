"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react/ssr";
import { howWeWork } from "@/lib/media";
import { Icon } from "@/components/icons";

/**
 * The homepage "See how we work" loop.
 *
 * Ambient, not cinematic: muted, looping, no controls, no audio track in the
 * encode at all. It carries no information that isn't also in the surrounding
 * copy, so it is presentational.
 *
 * Reduced motion is honoured properly rather than cosmetically — under
 * `prefers-reduced-motion: reduce` the clip never autoplays. The poster frame
 * shows instead with a control to start it deliberately, so the content stays
 * reachable for anyone who wants it.
 *
 * The decision is made after mount (matchMedia is unavailable on the server),
 * so the poster is what renders first either way. That also means the video
 * element is never the LCP candidate — the poster image is, and it is
 * preloaded.
 */
export function HomepageVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Autoplay only once we know motion is welcome.
  useEffect(() => {
    if (reducedMotion === false && videoRef.current) {
      videoRef.current.play().catch(() => {
        /* Autoplay can still be refused by the browser; the poster remains. */
      });
    }
  }, [reducedMotion]);

  const showVideo = reducedMotion === false || started;

  return (
    <figure className="relative m-0 aspect-video w-full overflow-hidden rounded-lg bg-navy-2">
      <Image
        src={howWeWork.poster}
        alt=""
        fill
        sizes="(min-width: 1280px) 1216px, 100vw"
        placeholder="blur"
        className="object-cover"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={howWeWork.poster.src}
          muted
          loop
          playsInline
          autoPlay={reducedMotion === false}
          preload={reducedMotion === false ? "auto" : "none"}
          aria-label={howWeWork.description}
        >
          <source src={howWeWork.webm} type="video/webm" />
          <source src={howWeWork.mp4} type="video/mp4" />
        </video>
      )}

      {reducedMotion === true && !started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="group absolute inset-0 flex items-center justify-center bg-navy/45 transition-colors duration-(--dur-base) ease-standard hover:bg-navy/30"
        >
          <span className="flex items-center gap-3 rounded-sm border border-paper/50 bg-navy/70 px-5 py-3 text-[14.5px] font-medium text-paper">
            <Icon icon={Play} size="sm" weight="fill" />
            Play the loop
          </span>
        </button>
      )}

      <figcaption className="sr-only">{howWeWork.description}</figcaption>
    </figure>
  );
}
