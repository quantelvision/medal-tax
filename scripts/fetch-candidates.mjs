/**
 * Step 1 of media sourcing: fetch candidates per slot, filter out the junk,
 * and build labelled contact sheets so the shortlist can actually be LOOKED at
 * before anything is chosen. Nothing is written to public/ here.
 *
 * Run: node --env-file=.env.local scripts/fetch-candidates.mjs <outDir>
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { slots } from "./media-manifest.mjs";

const KEY = process.env.PIXABAY_API_KEY;
if (!KEY) throw new Error("PIXABAY_API_KEY missing — run with --env-file=.env.local");

const OUT = process.argv[2];
if (!OUT) throw new Error("usage: fetch-candidates.mjs <outDir>");

const TILE = 320, COLS = 4, KEEP = 4;

async function search(query, orient) {
  const u = new URL("https://pixabay.com/api/");
  u.searchParams.set("key", KEY);
  u.searchParams.set("q", query);
  u.searchParams.set("image_type", "photo");
  u.searchParams.set("orientation", orient);
  u.searchParams.set("safesearch", "true");
  u.searchParams.set("per_page", "20");
  const r = await fetch(u);
  if (!r.ok) throw new Error(`${query}: HTTP ${r.status}`);
  return (await r.json()).hits ?? [];
}

/** Reject AI-generated, low-quality, and anything too small to use at 1280w. */
const usable = (h) =>
  !h.isAiGenerated && !h.isLowQuality && h.imageWidth >= 1280 && h.imageHeight >= 720;

async function label(buf, text) {
  const img = sharp(buf).resize(TILE, TILE, { fit: "cover", position: "attention" });
  const bar = Buffer.from(
    `<svg width="${TILE}" height="26"><rect width="100%" height="100%" fill="#101a2e"/>` +
    `<text x="7" y="18" font-family="monospace" font-size="14" fill="#d7b06b">${text}</text></svg>`
  );
  return img.composite([{ input: bar, top: TILE - 26, left: 0 }]).png().toBuffer();
}

const manifest = {};
const groups = {};

for (const slot of slots) {
  let hits = (await search(slot.query, slot.orient)).filter(usable);
  if (!hits.length) {
    console.warn(`  !! ${slot.id} ("${slot.query}") — no usable hits`);
    continue;
  }
  hits.sort((a, b) => b.downloads - a.downloads);
  const shortlist = hits.slice(0, KEEP);
  manifest[slot.id] = shortlist.map((h, i) => ({
    pick: `${slot.id}.${i}`, id: h.id, tags: h.tags, user: h.user, userURL: h.userURL,
    pageURL: h.pageURL, largeImageURL: h.largeImageURL,
    w: h.imageWidth, h: h.imageHeight, downloads: h.downloads,
  }));

  const tiles = [];
  for (let i = 0; i < shortlist.length; i++) {
    const res = await fetch(shortlist[i].webformatURL);
    tiles.push(await label(Buffer.from(await res.arrayBuffer()), `${slot.id}.${i}`));
  }
  (groups[slot.group] ??= []).push(...tiles);
  console.log(`  ok ${slot.id.padEnd(26)} "${slot.query}" → ${hits.length} usable, kept ${shortlist.length}`);
}

await mkdir(OUT, { recursive: true });
for (const [group, tiles] of Object.entries(groups)) {
  const rows = Math.ceil(tiles.length / COLS);
  const sheet = sharp({
    create: { width: COLS * TILE, height: rows * TILE, channels: 3, background: "#f6f3ec" },
  }).composite(tiles.map((input, i) => ({
    input, left: (i % COLS) * TILE, top: Math.floor(i / COLS) * TILE,
  })));
  await sheet.jpeg({ quality: 82 }).toFile(path.join(OUT, `sheet-${group}.jpg`));
  console.log(`sheet-${group}.jpg  (${tiles.length} tiles)`);
}
await writeFile(path.join(OUT, "candidates.json"), JSON.stringify(manifest, null, 2));
console.log(`\ncandidates.json — ${Object.keys(manifest).length} slots`);
