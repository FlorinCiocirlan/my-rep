import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { createSession, setSessionCookie, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = form.get("email")?.toString().trim().toLowerCase();
  const password = form.get("password")?.toString();
  if (!email || !password) return NextResponse.redirect(new URL("/login", request.url));
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user || !verifyPassword(password, user.passwordHash)) return NextResponse.redirect(new URL("/login", request.url));
  setSessionCookie(createSession(user.id));
  return NextResponse.redirect(new URL("/", request.url));
}
