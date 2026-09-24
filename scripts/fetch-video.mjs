/**
 * Sources the single looping motion element for the homepage "See how we work"
 * band. Builds a poster contact-sheet so candidates can be judged before one
 * is committed. Nothing is written to public/ here.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const KEY = process.env.PIXABAY_API_KEY;
const OUT = process.argv[2];
const TILE = 400, COLS = 3;

async function search(q) {
  const u = new URL("https://pixabay.com/api/videos/");
  u.searchParams.set("key", KEY); u.searchParams.set("q", q);
  u.searchParams.set("safesearch", "true"); u.searchParams.set("per_page", "20");
  const r = await fetch(u);
  return r.ok ? (await r.json()).hits ?? [] : [];
}

const pool = [];
const seen = new Set();
for (const q of ["paperwork", "office documents", "writing desk", "typing keyboard", "business meeting office", "archive files"]) {
  for (const h of await search(q)) {
    if (seen.has(h.id)) continue;
    seen.add(h.id);
    const v = h.videos?.large?.url ? h.videos.large : h.videos?.medium;
    if (!v?.url) continue;
    // Want a short, loopable, landscape clip that is not enormous.
    if (h.duration > 30 || v.width < v.height) continue;
    pool.push({ id: h.id, q, duration: h.duration, url: v.url, w: v.width, h: v.height,
      size: v.size, user: h.user, userURL: h.userURL, pageURL: h.pageURL, tags: h.tags,
      poster: v.thumbnail });
  }
}
pool.sort((a, b) => a.duration - b.duration);
const short = pool.slice(0, 9);

const tiles = [];
for (let i = 0; i < short.length; i++) {
  let buf;
  try {
    const r = await fetch(short[i].poster);
    if (!r.ok) throw new Error(String(r.status));
    buf = Buffer.from(await r.arrayBuffer());
  } catch { buf = await sharp({ create: { width: TILE, height: TILE, channels: 3, background: "#16233c" } }).png().toBuffer(); }
  const bar = Buffer.from(
    `<svg width="${TILE}" height="30"><rect width="100%" height="100%" fill="#101a2e"/>` +
    `<text x="8" y="21" font-family="monospace" font-size="15" fill="#d7b06b">v${i} · ${short[i].duration}s · ${Math.round((short[i].size||0)/1e6)}MB</text></svg>`);
  tiles.push(await sharp(buf).resize(TILE, TILE, { fit: "cover", position: "attention" })
    .composite([{ input: bar, top: TILE - 30, left: 0 }]).png().toBuffer());
}

await mkdir(OUT, { recursive: true });
const rows = Math.ceil(tiles.length / COLS);
await sharp({ create: { width: COLS * TILE, height: rows * TILE, channels: 3, background: "#f6f3ec" } })
  .composite(tiles.map((input, i) => ({ input, left: (i % COLS) * TILE, top: Math.floor(i / COLS) * TILE })))
  .jpeg({ quality: 85 }).toFile(path.join(OUT, "video-sheet.jpg"));
await writeFile(path.join(OUT, "videos.json"), JSON.stringify(short, null, 2));
short.forEach((v, i) => console.log(`v${i}  ${String(v.duration).padStart(2)}s  ${v.w}x${v.h}  ${String(Math.round((v.size||0)/1e6)).padStart(2)}MB  "${v.q}"  ${v.tags.slice(0,54)}`));
