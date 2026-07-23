import { NextRequest, NextResponse } from "next/server";
import { appendOne, readAll } from "@/lib/store";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { ARTISTS } from "@/lib/artists-data";

const SERVICES = SERVICE_CATEGORIES.map((s) => s.title);
const ARTIST_NAMES = ARTISTS.map((a) => a.name);

type Booking = {
  id: string;
  service: string;
  artist: string;
  date: string;
  time: string;
  createdAt: string;
};

function isValidBookingPayload(body: unknown): body is {
  service: string;
  artist: string;
  date: string;
  time: string;
} {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.service === "string" &&
    SERVICES.includes(b.service) &&
    typeof b.artist === "string" &&
    ARTIST_NAMES.includes(b.artist) &&
    typeof b.date === "string" &&
    !Number.isNaN(Date.parse(b.date)) &&
    typeof b.time === "string" &&
    b.time.length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidBookingPayload(body)) {
    return NextResponse.json(
      { error: "Missing or invalid service, artist, date, or time." },
      { status: 400 }
    );
  }

  const booking: Booking = {
    id: crypto.randomUUID(),
    service: body.service,
    artist: body.artist,
    date: body.date,
    time: body.time,
    createdAt: new Date().toISOString(),
  };

  await appendOne<Booking>("bookings.json", booking);

  return NextResponse.json({ booking }, { status: 201 });
}

export async function GET() {
  const bookings = await readAll<Booking>("bookings.json");
  return NextResponse.json({ bookings });
}
