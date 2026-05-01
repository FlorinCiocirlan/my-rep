import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dosar contabil lunar",
  description: "Încarcă și organizează documentele pentru contabilă"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
