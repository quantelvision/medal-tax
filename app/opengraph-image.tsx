import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Medal Tax — Tax, GST & Business Compliance Advisory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site had no og:image/twitter:image at all before this — every shared
// link showed no preview. Generated at build time (predictable inputs, no
// request data), not a static file, so it always matches the current brand
// mark and palette. Read as base64 rather than an ArrayBuffer/Uint8Array —
// simpler and avoids the @ts-expect-error the Uint8Array approach needs.
const logoData = await readFile(join(process.cwd(), "public/images/brand/brand-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#101a2e",
          backgroundImage: "radial-gradient(circle at 50% 35%, #16233c 0%, #101a2e 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og's ImageResponse renders its own image pipeline, not next/image */}
        <img src={logoSrc} width={168} height={120} alt="" />
        <div
          style={{
            marginTop: 28,
            fontSize: 68,
            fontWeight: 600,
            color: "#f6f3ec",
            letterSpacing: "-0.01em",
          }}
        >
          Medal Tax
        </div>
        <div style={{ marginTop: 14, fontSize: 30, color: "#d7b06b" }}>
          Tax, GST &amp; Business Compliance Advisory
        </div>
      </div>
    ),
    { ...size }
  );
}
