import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents, months } from "@/lib/schema";

export default async function MonthsPage() {
  const session = readSession();
  if (!session) redirect("/login");
  const allMonths = await db.select().from(months).where(eq(months.userId, session.userId)).orderBy(desc(months.createdAt));
  const monthsWithDocs = await Promise.all(
    allMonths.map(async (m) => ({
      month: m,
      docs: await db.select().from(documents).where(and(eq(documents.userId, session.userId), eq(documents.monthId, m.id)))
    }))
  );

  return <main className="p-6 max-w-3xl mx-auto space-y-4">{monthsWithDocs.map(({ month, docs }) => <section key={month.id} className="border rounded p-3"><div className="flex justify-between"><h2 className="font-semibold">{month.label}</h2><Link className="underline" href={`/api/months/${month.id}/zip`}>Generate ZIP URL</Link></div><ul>{docs.map((d) => <li key={d.id}><a className="underline" href={d.blobUrl}>{d.fileName}</a></li>)}</ul></section>)}</main>;
}
