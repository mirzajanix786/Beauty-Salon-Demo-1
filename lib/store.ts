import { promises as fs } from "fs";
import path from "path";

/**
 * Minimal file-backed store for local development / demos.
 *
 * IMPORTANT — production note: this writes to a JSON file on disk, which
 * works with `npm run dev` / `npm run start` on a normal server or
 * self-hosted container. It will NOT persist reliably on serverless /
 * edge platforms (e.g. Vercel's default runtime has a read-only
 * filesystem outside /tmp, and /tmp is wiped between invocations). Before
 * deploying there, swap `readAll`/`writeAll` below for a real database
 * (Postgres, Supabase, PlanetScale, etc.) — the API routes that call this
 * module don't need to change, only this file.
 */

const DATA_DIR = path.join(process.cwd(), ".data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readAll<T>(file: string): Promise<T[]> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function appendOne<T>(file: string, record: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  const existing = await readAll<T>(file);
  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}
