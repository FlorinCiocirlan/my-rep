import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema";

export async function POST(request: Request) {
  const session = readSession();
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const category = formData.get("category")?.toString();
  const monthId = formData.get("monthId")?.toString();
  const file = formData.get("file") as File | null;

  if (!title || !category || !monthId || !file) return NextResponse.json({ error: "Date lipsă" }, { status: 400 });

  const blob = await put(`${Date.now()}-${file.name}`, file, { access: "public", token: process.env.BLOB_READ_WRITE_TOKEN });
  await db.insert(documents).values({ title, category, monthId, userId: session.userId, blobUrl: blob.url, fileName: file.name });

  revalidatePath("/months");
  return NextResponse.redirect(new URL("/months", request.url));
}
