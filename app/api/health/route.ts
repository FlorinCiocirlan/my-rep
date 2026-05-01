import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.execute(sql`select 1`);

    return NextResponse.json({
      ok: true,
      database: "connected",
      checkedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
