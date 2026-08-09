import "dotenv/config";
import argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const args = process.argv.slice(2);
const email = args[args.indexOf("--email") + 1]?.trim().toLowerCase();
const password = args[args.indexOf("--password") + 1];
const displayName = args[args.indexOf("--name") + 1]?.trim() || "Reha Spor Yöneticisi";
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || !email || !password) {
  throw new Error("Usage: npm run admin:create -- --email admin@example.com --password <strong-password> [--name <display-name>]");
}

if (password.length < 6) {
  throw new Error("Initial admin password must be at least 6 characters.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("A user with this email already exists; refusing to overwrite it.");
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 19_456,
        timeCost: 2,
        parallelism: 1,
      }),
      displayName,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created: ${user.email}`);
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
