import { contactSchema } from "@/lib/contact-schema";
import { flattenError } from "zod/mini";

/**
 * Project inquiry endpoint.
 *
 * Sends email through Resend (https://resend.com) when these env vars are set:
 *   RESEND_API_KEY      – API key
 *   CONTACT_TO_EMAIL    – where inquiries are delivered
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *
 * Without them the route answers 503 `not_configured`, and the form tells the
 * visitor to use email / WhatsApp instead — it never fakes a success.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance limiter. Use a shared store (e.g. Upstash) for
// stronger guarantees on multi-instance/serverless hosting.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { ok: false, error: "validation", issues: flattenError(result.error).fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, projectType, budget, details, website } = result.data;

  // Honeypot filled → silently drop (bots only; the field is hidden from people).
  if (website) return Response.json({ ok: true }, { status: 200 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Budget: ${budget || "Not specified"}`,
    "",
    "Project details:",
    details,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: oneLine(`New project inquiry: ${projectType} — ${name}`),
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
