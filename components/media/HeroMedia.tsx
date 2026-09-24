import Image from "next/image";
import type { Media } from "@/lib/media";

/**
 * Photographic underlay for the navy hero bands.
 *
 * The scrim is doing real work, not decoration: hero copy is `text-paper` on
 * navy, and dropping a photograph behind it would wreck that contrast. Two
 * stacked layers — a flat navy wash plus a left-weighted gradient — keep the
 * text side dense enough to stay legible while the far edge of the image
 * still reads.
 *
 * Sized by its parent (`relative` + a height), so it never contributes layout
 * shift. `priority` is reserved for the homepage hero, the only true LCP image
 * on the site.
 */
export function HeroMedia({
  media,
  priority = false,
  className = "",
}: {
  media: Media;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden={media.alt === "" ? true : undefined}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy/72" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />
    </div>
  );
}
