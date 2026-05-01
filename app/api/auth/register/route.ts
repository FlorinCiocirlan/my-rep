import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { createSession, hashPassword, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = form.get("email")?.toString().trim().toLowerCase();
  const password = form.get("password")?.toString();
  if (!email || !password) return NextResponse.redirect(new URL("/register", request.url));

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) return NextResponse.redirect(new URL("/login", request.url));

  const [created] = await db.insert(users).values({ email, passwordHash: hashPassword(password) }).returning();
  setSessionCookie(createSession(created.id));
  return NextResponse.redirect(new URL("/", request.url));
}
