import Link from "next/link";

import { readSession } from "@/lib/auth";

export default function HomePage() {
  const session = readSession();

  if (session) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="mt-4 flex gap-4">
          <Link className="underline" href="/upload">Upload fișier</Link>
          <Link className="underline" href="/months">Fișiere pe lună</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Acces privat documente</h1>
      <p>Doar utilizatorii autentificați pot vedea și descărca fișierele.</p>
      <div className="flex gap-4">
        <Link href="/login" className="underline">Login</Link>
        <Link href="/register" className="underline">Create account</Link>
      </div>
    </main>
  );
}
