import path from "path";
import { config } from "dotenv";
// Load .env.local for local dev; on Vercel env vars are injected directly so this is a no-op
config({ path: path.resolve(process.cwd(), ".env.local") });
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
