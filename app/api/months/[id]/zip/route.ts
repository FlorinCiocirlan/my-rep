import { and, eq } from "drizzle-orm";
import JSZip from "jszip";
import { NextResponse } from "next/server";

import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents, months } from "@/lib/schema";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = readSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [month] = await db.select().from(months).where(and(eq(months.id, params.id), eq(months.userId, session.userId))).limit(1);
  if (!month) return NextResponse.json({ error: "Month not found" }, { status: 404 });

  const docs = await db.select().from(documents).where(and(eq(documents.monthId, month.id), eq(documents.userId, session.userId)));
  const zip = new JSZip();

  await Promise.all(docs.map(async (doc) => {
    const response = await fetch(doc.blobUrl);
    const content = await response.arrayBuffer();
    zip.file(doc.fileName, content);
  }));

  const zipped = await zip.generateAsync({ type: "arraybuffer" });
  const blob = new Blob([zipped], { type: "application/zip" });

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${month.label}.zip"`
    }
  });
}
