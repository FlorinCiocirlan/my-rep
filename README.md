# Dosar contabil lunar (Next.js + shadcn + Neon + Vercel)

Aplicație pentru încărcarea documentelor lunare necesare contabilei: bonuri, facturi, extrase de cont și alte fișiere.

## Stack
- Next.js 14 (App Router)
- shadcn/ui (componente UI de bază)
- Neon Postgres + Drizzle ORM (metadate fișiere)
- Vercel Blob (stocare fișiere)

## Configurare
1. Instalează dependențele:
   ```bash
   npm install
   ```
2. Copiază variabilele de mediu:
   ```bash
   cp .env.example .env.local
   ```
3. Completează `DATABASE_URL` (Neon) și `BLOB_READ_WRITE_TOKEN` (Vercel Blob).
4. Creează tabela în Neon rulând SQL-ul din `drizzle/0000_init.sql`.
5. Rulează local:
   ```bash
   npm run dev
   ```

## Deploy pe Vercel
1. Importă repo-ul în Vercel.
2. Setează variabilele `DATABASE_URL` și `BLOB_READ_WRITE_TOKEN` în Project Settings → Environment Variables.
3. Deploy.
