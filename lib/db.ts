import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error(
    "Lipsește conexiunea la baza de date. Setează DATABASE_URL sau POSTGRES_URL din Vercel/Neon."
  );
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);
