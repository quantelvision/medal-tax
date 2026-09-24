/**
 * Downloads each curated pick, crops to its role geometry, encodes WebP under
 * a hard 200KB budget, measures what AVIF would save, then discards the
 * originals. Writes public/images/<page>/<slot>.webp and docs/media-credits.md.
 *
 * Run: node --env-file=.env.local scripts/build-media.mjs
 */
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { picks, ROLES } from "./media-picks.mjs";

const TMP = process.env.TEMP;
const BUDGET = 200 * 1024;

const meta = {};
for (const dir of ["media-candidates", "media-retry"]) {
  const j = JSON.parse(await readFile(path.join(TMP, dir, "candidates.json"), "utf8"));
  for (const list of Object.values(j)) for (const c of list) meta[c.pick] = c;
}

const rows = [];
let totalWebp = 0, totalAvifDelta = 0;

for (const p of picks) {
  const m = meta[p.pick];
  if (!m) throw new Error(`no candidate metadata for ${p.pick}`);
  const { w, h, q } = ROLES[p.role];

  const res = await fetch(m.largeImageURL);
  if (!res.ok) throw new Error(`${p.slot}: download HTTP ${res.status}`);
  const src = Buffer.from(await res.arrayBuffer());

  const base = sharp(src).resize(w, h, { fit: "cover", position: "attention" });

  // Step quality down until the file fits the budget.
  let quality = q, webp;
  for (;;) {
    webp = await base.clone().webp({ quality, effort: 6 }).toBuffer();
    if (webp.length <= BUDGET || quality <= 50) break;
    quality -= 6;
  }
  const avif = await base.clone().avif({ quality: Math.max(quality - 8, 40), effort: 4 }).toBuffer();

  const dir = path.join("public", "images", p.page);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${p.slot}.webp`), webp);

  const saving = 1 - avif.length / webp.length;
  totalWebp += webp.length;
  totalAvifDelta += webp.length - avif.length;

  rows.push({ ...p, ...m, bytes: webp.length, quality, w, h, avifSaving: saving });
  console.log(
    `${p.slot.padEnd(26)} ${String(w).padStart(4)}x${String(h).padEnd(4)} ` +
    `q${quality} ${String(Math.round(webp.length / 1024)).padStart(4)}KB  ` +
    `(avif would save ${(saving * 100).toFixed(0)}%)`
  );
}

console.log(`\ntotal webp: ${(totalWebp / 1024).toFixed(0)}KB across ${rows.length} images`);
console.log(`avif would save a further ${(totalAvifDelta / 1024).toFixed(0)}KB (${(totalAvifDelta / totalWebp * 100).toFixed(0)}%)`);

// ── credits ──────────────────────────────────────────────────────────────
const lines = [
  "# Media credits",
  "",
  "Every photograph on this site is sourced from [Pixabay](https://pixabay.com) under the",
  "[Pixabay Content License](https://pixabay.com/service/license-summary/), which permits",
  "commercial use without attribution. Credit is recorded here anyway, as a matter of practice",
  "and so each asset can be traced back to its source.",
  "",
  "Images were cropped and re-encoded to WebP; originals were not retained.",
  "",
  "| Slot | Page | Photographer | Source | Delivered | Size |",
  "|---|---|---|---|---|---|",
  ...rows.map((r) =>
    `| \`${r.slot}\` | ${r.page} | [${r.user}](${r.userURL}) | [Pixabay #${r.id}](${r.pageURL}) | ${r.w}\u00d7${r.h} | ${Math.round(r.bytes / 1024)}KB |`
  ),
  "",
  "## Slots deliberately without a photograph",
  "",
  "| Slot | Why |",
  "|---|---|",
  "| Team sections (`/`, `/about`) | `AUDIT.md` bars fabricated content and lists real team photography as CONTENT REQUIRED. Stock portraits placed beside named staff would read as photographs of them. |",
  "| `trademark-registration` | Every candidate returned by brand/logo queries was a real registered trademark (Jaguar, Porsche, Apple). Reproducing another proprietor's mark on a page selling trademark registration is inappropriate. The service is also flagged unconfirmed in `AUDIT.md`. |",
  "| `/privacy-policy`, `/terms-of-use`, `/disclaimer`, `/not-found` | Stock photography on legal pages is filler. These use an original brass/navy SVG motif instead. |",
  "",
];
await mkdir("docs", { recursive: true });
await writeFile(path.join("docs", "media-credits.md"), lines.join("\n"));
console.log("docs/media-credits.md written");

for (const d of ["media-candidates", "media-retry"]) {
  await rm(path.join(TMP, d), { recursive: true, force: true });
}
console.log("temp candidate cache cleared");
