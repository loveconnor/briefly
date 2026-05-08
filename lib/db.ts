import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set")
}

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool
}

export const db =
  globalForPg.pgPool ??
  new Pool({
    connectionString: databaseUrl,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = db
}
