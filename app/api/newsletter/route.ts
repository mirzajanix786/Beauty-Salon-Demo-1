import { NextRequest, NextResponse } from "next/server";
import { appendOne, readAll } from "@/lib/store";

type Subscriber = { id: string; email: string; createdAt: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (body as { email?: unknown })?.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const existing = await readAll<Subscriber>("subscribers.json");
  if (existing.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ message: "Already subscribed." }, { status: 200 });
  }

  const subscriber: Subscriber = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };
  await appendOne<Subscriber>("subscribers.json", subscriber);

  return NextResponse.json({ subscriber }, { status: 201 });
}
