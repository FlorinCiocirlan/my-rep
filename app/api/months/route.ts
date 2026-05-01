import { NextResponse } from "next/server";

import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { months } from "@/lib/schema";

export async function POST(request: Request) {
  const session = readSession();
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  const form = await request.formData();
  const label = form.get("label")?.toString();
  if (!label) return NextResponse.redirect(new URL("/upload", request.url));
  await db.insert(months).values({ label, userId: session.userId });
  return NextResponse.redirect(new URL("/upload", request.url));
}
