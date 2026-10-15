import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { stackSchema } from "@/lib/stack-schema";

/**
 * Free stack rebuild requests. Appends to .data/stack-requests.ndjson (gitignored).
 * Before going live, also notify the directors here (email or Slack), because the
 * offer promises a reply within three hours.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = stackSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const reference = `STK-${randomBytes(3).toString("hex").toUpperCase()}`;
  if (parsed.data.website) return Response.json({ ok: true, reference });

  const { website: _honeypot, ...req } = parsed.data;
  void _honeypot;
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(
      path.join(DATA_DIR, "stack-requests.ndjson"),
      JSON.stringify({ reference, receivedAt: new Date().toISOString(), ...req }) + "\n",
      "utf8",
    );
  } catch {
    return Response.json({ ok: false, error: "We could not save your request." }, { status: 500 });
  }
  return Response.json({ ok: true, reference });
}
