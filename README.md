# Dosar contabil lunar (Next.js + shadcn + Neon + Vercel)

Aplicație privată pentru încărcarea documentelor lunare necesare contabilei.

## Funcții
- Conturi utilizator (register/login) pentru acces privat.
- Pagină de upload fișiere (bonuri, facturi, extrase, etc.).
- Pagină cu toate fișierele grupate pe lună.
- Creare lună nouă (ex: `2026-05`).
- Generare ZIP per lună, prin URL, pentru contabilă.

## Init DB
Rulează SQL-ul din `drizzle/0000_init.sql` în Neon SQL Editor.

## Variabile de mediu
- `DATABASE_URL` sau `POSTGRES_URL`
- `BLOB_READ_WRITE_TOKEN`
- `AUTH_SECRET`
