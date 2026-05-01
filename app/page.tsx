import { desc } from "drizzle-orm";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema";

const categories = ["Bon", "Factură", "Extras cont", "Alt document"];

export default async function HomePage() {
  const docs = await db.select().from(documents).orderBy(desc(documents.uploadedAt));

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <section className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl font-semibold">Dosar pentru contabilă - luna curentă</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Încarcă bonuri, facturi, extrase de cont și alte documente necesare. Fișierele sunt stocate în Vercel Blob,
          iar metadatele rămân în Neon Postgres.
        </p>
      </section>

      <section className="rounded-xl border bg-card p-6">
        <form action="/api/upload" method="post" encType="multipart/form-data" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titlu document</Label>
            <Input id="title" name="title" placeholder="Ex: bon combustibil 24 aprilie" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categorie</Label>
            <select
              id="category"
              name="category"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Fișier</Label>
            <Input id="file" name="file" type="file" accept="image/*,.pdf" required />
          </div>
          <Button type="submit" className="w-full">
            <UploadCloud className="mr-2 h-4 w-4" /> Încarcă document
          </Button>
        </form>
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Documente încărcate</h2>
        <ul className="mt-4 space-y-3">
          {docs.length === 0 ? (
            <li className="text-sm text-muted-foreground">Nu ai încărcat încă documente luna aceasta.</li>
          ) : (
            docs.map((doc) => (
              <li key={doc.id} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">{doc.title}</p>
                <p className="text-muted-foreground">{doc.category}</p>
                <a className="text-blue-600 underline" href={doc.blobUrl} target="_blank">
                  {doc.fileName}
                </a>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
