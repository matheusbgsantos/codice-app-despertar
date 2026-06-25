import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL || "./data/app.db";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url,
  },
});
