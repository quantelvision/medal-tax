/**
 * Basic in-memory rate limiting for the contact form's server action —
 * matches the shape Next's own backend-for-frontend guide documents
 * (node_modules/next/dist/docs/.../backend-for-frontend.md, "Rate
 * limiting"): a `checkRateLimit(key)` helper a route or action calls before
 * doing the expensive work (here, sending email via Resend).
 *
 * Deliberately not backed by Redis/Upstash or any external store — this is
 * the "basic" tier the brief asks for, appropriate for a low-traffic
 * marketing site's contact form, not a high-throughput API. Two limits this
 * approach genuinely has, stated plainly rather than left implicit:
 *
 *   - State lives in the Node process's memory, so it resets on every
 *     redeploy or restart.
 *   - On a multi-instance/serverless deployment (more than one function
 *     instance running concurrently), each instance keeps its own
 *     independent map — a determined sender could get a few extra attempts
 *     by hitting different instances. For this form's actual risk profile
 *     (spam volume, not a targeted attack), that's an acceptable trade for
 *     not standing up Redis just to gate a contact form. If traffic or
 *     abuse ever justifies it, swap this module's internals for an
 *     Upstash-backed limiter without changing its call sites.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 4;

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

/** Periodic sweep so the map doesn't grow unbounded on a long-lived process. */
let lastSweep = Date.now();
function sweep() {
  const now = Date.now();
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > WINDOW_MS) buckets.delete(key);
  }
}

export function checkRateLimit(key: string): { limited: boolean; retryAfterSeconds?: number } {
  sweep();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { limited: false };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  bucket.count += 1;
  return { limited: false };
}
