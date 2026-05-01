import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { months } from "@/lib/schema";

export default async function UploadPage() {
  const session = readSession();
  if (!session) redirect("/login");
  const allMonths = await db.select().from(months).where(eq(months.userId, session.userId));

  return <main className="p-6 max-w-xl mx-auto space-y-4"><form action="/api/months" method="post" className="flex gap-2"><input className="border p-2 flex-1" name="label" placeholder="Ex: 2026-05" required/><button className="border px-3">Create month</button></form><form action="/api/upload" method="post" encType="multipart/form-data" className="space-y-2"><input className="border p-2 w-full" name="title" placeholder="Titlu" required/><input className="border p-2 w-full" name="category" placeholder="Categorie" required/><select className="border p-2 w-full" name="monthId" required>{allMonths.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}</select><input className="border p-2 w-full" type="file" name="file" required/><button className="border px-4 py-2">Upload</button></form></main>;
}
