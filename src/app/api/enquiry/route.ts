import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { enquirySchema } from "@/lib/enquiry-schema";

/**
 * Local enquiry handler. Validates with the same schema as the form and
 * appends to .data/enquiries.ndjson (gitignored). To go live, replace the
 * `store` call with your CRM or email provider; the contract stays the same.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

async function store(record: object) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(path.join(DATA_DIR, "enquiries.ndjson"), JSON.stringify(record) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const reference = `FRT-${randomBytes(3).toString("hex").toUpperCase()}`;

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) return Response.json({ ok: true, reference });

  const { website: _honeypot, ...enquiry } = parsed.data;
  void _honeypot;
  try {
    await store({ reference, receivedAt: new Date().toISOString(), ...enquiry });
  } catch {
    return Response.json({ ok: false, error: "We could not save your enquiry." }, { status: 500 });
  }

  return Response.json({ ok: true, reference });
}
