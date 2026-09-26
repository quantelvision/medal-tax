"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Media } from "@/lib/media";

/**
 * Same navy-scrimmed photographic underlay as HeroMedia, progressively
 * enhanced with an autoplaying video playlist on top (video 1 -> 2 -> ... ->
 * back to 1, plain hard cuts between clips, no crossfade).
 *
 * The image is not just a loading placeholder — it is the permanent,
 * unconditional fallback: under `prefers-reduced-motion: reduce`, before
 * client JS has run, or if video playback ever fails to start, visitors see
 * the same static hero image this section always had. Same safety
 * contract as components/media/HomepageVideo.tsx (see that file's comments
 * for the full reasoning): the reduced-motion check starts as `null`
 * (decided neither way yet) and video only mounts once it resolves to
 * `false`, so the image — with `priority`, preloaded — stays the one true
 * LCP candidate regardless of what the video does.
 */
export function HeroVideoBackground({
  media,
  videos,
  className = "",
}: {
  media: Media;
  videos: readonly { mp4: string; webm: string }[];
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Changing a <source>'s src via React re-render does not itself reload the
  // <video> element in any browser — .load() is required before the new
  // source will actually play. Runs on mount (once reducedMotion resolves to
  // false) and every time the playlist advances.
  //
  // The <video> tag deliberately has NO `autoPlay` attribute (see below) —
  // this effect is the ONLY thing that ever starts playback. A real,
  // confirmed-intermittent bug existed here before: with both `autoPlay` on
  // the element AND this effect calling .load()+.play(), the two raced.
  // The browser's own autoplay-on-mount kicked off a load, then this effect
  // fired straight after and called .load() again, which ABORTS the
  // in-flight load and restarts it — but .play() right behind it could win
  // the race before the restarted fetch produced any data. Result,
  // confirmed via repeated fresh-navigation checks: `video.paused === false`
  // (it believes it's playing) while `video.readyState === 0` (literally no
  // frame data yet) — nothing paints, so the image underneath is all that's
  // ever visible, indefinitely if the reload never quite recovers. Removing
  // the competing `autoPlay` attribute leaves exactly one code path that
  // ever calls load()/play(), so there's nothing left to race against.
  useEffect(() => {
    if (reducedMotion !== false || !videos.length) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {
      /* Autoplay can still be refused by the browser; the image underneath remains. */
    });
  }, [index, reducedMotion, videos.length]);

  const current = videos[index];
  const showVideo = reducedMotion === false && !!current;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Image
        src={media.src}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onEnded={() => setIndex((i) => (i + 1) % videos.length)}
        >
          <source src={current.webm} type="video/webm" />
          <source src={current.mp4} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-navy/72" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />
    </div>
  );
}
