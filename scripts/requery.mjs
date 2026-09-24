/**
 * Second sourcing pass for slots whose first query drifted off-message.
 * Differences from pass 1:
 *  - several query attempts per slot, pooled
 *  - ordered by Pixabay relevance, NOT raw downloads (downloads kept surfacing
 *    the same few over-used generic stock photos across unrelated queries)
 *  - globally de-duplicated against every image already seen or picked
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const KEY = process.env.PIXABAY_API_KEY;
if (!KEY) throw new Error("PIXABAY_API_KEY missing");
const [, , PREV, OUT] = process.argv;

const RETRY = {
  "home-hero":              ["document archive folders", "office files shelf", "business paperwork desk"],
  "about-hero":             ["coworking office interior", "office workspace desk", "office meeting room window"],
  "about-principles":       ["staircase architecture", "concrete architecture detail", "library interior"],
  "income-tax-filing":      ["tax return document", "filing documents folder", "paperwork signing desk"],
  "gst-services":           ["invoice document", "receipt bill paper", "billing paperwork"],
  "accounting-services":    ["financial statement spreadsheet", "balance sheet report", "accounting books desk"],
  "audit-services":         ["magnifying glass document", "checklist review clipboard", "inspection documents"],
  "amazon-seller-onboarding": ["cardboard boxes warehouse", "parcel delivery box", "shipping box stack"],
  "trademark-registration": ["brand logo design", "copyright law book", "notary stamp document"],
  "aud-businesses":         ["shop owner store", "retail store counter", "entrepreneur workshop"],
  "contact-offices":        ["chennai", "tamil nadu", "madras india"],
  "cat-ecommerce":          ["online shopping laptop", "warehouse shelves", "delivery parcels"],
};

const TILE = 320, COLS = 4, KEEP = 4;
const seen = new Set();
const prev = JSON.parse(await readFile(path.join(PREV, "candidates.json"), "utf8"));
for (const list of Object.values(prev)) for (const c of list) seen.add(c.id);

async function search(q) {
  const u = new URL("https://pixabay.com/api/");
  u.searchParams.set("key", KEY); u.searchParams.set("q", q);
  u.searchParams.set("image_type", "photo"); u.searchParams.set("orientation", "horizontal");
  u.searchParams.set("safesearch", "true"); u.searchParams.set("per_page", "20");
  const r = await fetch(u);
  return r.ok ? (await r.json()).hits ?? [] : [];
}
const usable = (h) => !h.isAiGenerated && !h.isLowQuality && h.imageWidth >= 1280 && h.imageHeight >= 720;

async function label(buf, text) {
  const bar = Buffer.from(
    `<svg width="${TILE}" height="26"><rect width="100%" height="100%" fill="#101a2e"/>` +
    `<text x="7" y="18" font-family="monospace" font-size="14" fill="#d7b06b">${text}</text></svg>`);
  return sharp(buf).resize(TILE, TILE, { fit: "cover", position: "attention" })
    .composite([{ input: bar, top: TILE - 26, left: 0 }]).png().toBuffer();
}

const manifest = {}; const tiles = [];
for (const [id, queries] of Object.entries(RETRY)) {
  const pool = [];
  for (const q of queries) {
    for (const h of (await search(q)).filter(usable)) {
      if (seen.has(h.id) || pool.some((p) => p.id === h.id)) continue;
      pool.push({ ...h, _q: q });
    }
  }
  const shortlist = pool.slice(0, KEEP);
  shortlist.forEach((h) => seen.add(h.id));
  manifest[id] = shortlist.map((h, i) => ({
    pick: `${id}.r${i}`, id: h.id, query: h._q, tags: h.tags, user: h.user, userURL: h.userURL,
    pageURL: h.pageURL, largeImageURL: h.largeImageURL, w: h.imageWidth, h: h.imageHeight,
  }));
  for (let i = 0; i < shortlist.length; i++) {
    const res = await fetch(shortlist[i].webformatURL);
    tiles.push(await label(Buffer.from(await res.arrayBuffer()), `${id}.r${i}`));
  }
  console.log(`  ${id.padEnd(26)} pool ${String(pool.length).padStart(3)} → kept ${shortlist.length}`);
}

await mkdir(OUT, { recursive: true });
const rows = Math.ceil(tiles.length / COLS);
await sharp({ create: { width: COLS * TILE, height: rows * TILE, channels: 3, background: "#f6f3ec" } })
  .composite(tiles.map((input, i) => ({ input, left: (i % COLS) * TILE, top: Math.floor(i / COLS) * TILE })))
  .jpeg({ quality: 82 }).toFile(path.join(OUT, "sheet-retry.jpg"));
await writeFile(path.join(OUT, "candidates.json"), JSON.stringify(manifest, null, 2));
console.log(`\nsheet-retry.jpg — ${tiles.length} tiles across ${Object.keys(manifest).length} slots`);
