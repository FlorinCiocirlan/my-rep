import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  blobUrl: text("blob_url").notNull(),
  fileName: text("file_name").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).defaultNow().notNull()
});
