/**
 * Screenshot helper. Drives Chrome over the DevTools Protocol rather than the
 * `--screenshot` CLI flag, because on Windows `--window-size` does not reliably
 * set the *layout* viewport — narrow captures came back with desktop layout
 * cropped to a phone-width canvas, which looks like a CSS overflow bug but is
 * not one. Emulation.setDeviceMetricsOverride sets it for real.
 *
 * Also reports documentElement.scrollWidth so genuine horizontal overflow is
 * measured rather than eyeballed.
 *
 * Usage: node scripts/shoot.mjs <chromePath> <outDir> <baseUrl> <w> <label> <path>...
 */
import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const [, , CHROME, OUT, BASE, WIDTH, LABEL, ...PATHS] = process.argv;
const port = 9333 + (Number(WIDTH) % 50);

// path.resolve, not path.join: a relative --user-data-dir gets resolved by
// Chrome itself relative to its own binary's directory (Program Files, no
// write access), so Chrome exits immediately (code 21) rather than starting.
// Confirmed by reproducing with stdio inherited instead of ignored.
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.resolve(OUT, `.prof-${WIDTH}`)}`,
  "about:blank",
], { stdio: "ignore" });

const send = (ws, id, method, params = {}) =>
  new Promise((res) => {
    const on = (e) => {
      const m = JSON.parse(e.data);
      if (m.id === id) { ws.removeEventListener("message", on); res(m.result); }
    };
    ws.addEventListener("message", on);
    ws.send(JSON.stringify({ id, method, params }));
  });

async function targets() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (r.ok) { const j = await r.json(); if (j.length) return j; }
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("chrome did not expose a debugging target");
}

await mkdir(OUT, { recursive: true });
const target = (await targets()).find((t) => t.type === "page");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
await send(ws, ++id, "Page.enable");
await send(ws, ++id, "Emulation.setDeviceMetricsOverride", {
  width: Number(WIDTH), height: 900, deviceScaleFactor: 1,
  mobile: Number(WIDTH) < 640,
});

for (const p of PATHS) {
  const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-");
  await send(ws, ++id, "Page.navigate", { url: BASE + p });
  await new Promise((r) => setTimeout(r, 2200));

  // Walk the page so lazy-loaded images actually decode. captureBeyondViewport
  // renders off-screen content but never scrolls, so without this every image
  // below the fold comes back blank - which reads as a broken site when it is
  // only a capture artefact.
  await send(ws, ++id, "Runtime.evaluate", {
    awaitPromise: true,
    expression: `(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 220));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 400));
      await Promise.all(Array.from(document.images)
        .filter(i => !i.complete)
        .map(i => new Promise(r => { i.onload = i.onerror = r; })));
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const { result: metrics } = await send(ws, ++id, "Runtime.evaluate", {
    expression: `JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight})`,
    returnByValue: true,
  });
  const { sw, cw, h } = JSON.parse(metrics.value);
  const overflow = sw > cw ? `  OVERFLOW +${sw - cw}px` : "";

  const { data } = await send(ws, ++id, "Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: Number(WIDTH), height: Math.min(h, 2400), scale: 1 },
  });
  await writeFile(path.join(OUT, `${name}-${LABEL}.png`), Buffer.from(data, "base64"));
  console.log(`${name.padEnd(22)} ${LABEL.padEnd(8)} ${sw}w x ${h}h${overflow}`);
}

ws.close();
chrome.kill();
