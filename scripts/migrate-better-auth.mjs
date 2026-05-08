import { getMigrations } from "better-auth/db/migration"
import nextEnv from "@next/env"
import { Pool } from "pg"

const { loadEnvConfig } = nextEnv

loadEnvConfig(process.cwd())

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set")
}

const pool = new Pool({
  connectionString: databaseUrl,
})

const migrations = await getMigrations({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
})

await migrations.runMigrations()
await pool.end()

console.log("Better Auth database tables are ready.")
