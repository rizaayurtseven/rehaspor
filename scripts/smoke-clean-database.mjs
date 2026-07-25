import "dotenv/config";
import { execFileSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

const databaseName = process.argv[2] ?? process.env.CLEAN_TEST_DATABASE_NAME ?? "rehaspor_clean_test";
const sourceUrl = process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;

if (!sourceUrl) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is required.");
}

if (!/^[a-z][a-z0-9_]*$/i.test(databaseName)) {
  throw new Error("CLEAN_TEST_DATABASE_NAME contains unsupported characters.");
}

const testUrl = new URL(sourceUrl);
testUrl.pathname = `/${databaseName}`;

const adminUrl = new URL(sourceUrl);
adminUrl.pathname = "/postgres";
adminUrl.search = "";

const adminClient = new Client({ connectionString: adminUrl.toString() });
const testClient = new Client({ connectionString: testUrl.toString() });

function runPrisma(args) {
  const prismaCli = fileURLToPath(
    new URL("../node_modules/prisma/build/index.js", import.meta.url),
  );

  execFileSync(process.execPath, [prismaCli, ...args], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: testUrl.toString(),
      DIRECT_DATABASE_URL: testUrl.toString(),
    },
    stdio: "inherit",
  });
}

async function main() {
  await adminClient.connect();
  const existing = await adminClient.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [databaseName],
  );

  if (existing.rowCount) {
    throw new Error(
      `Clean test database \"${databaseName}\" already exists. Set CLEAN_TEST_DATABASE_NAME to a new disposable name.`,
    );
  }

  await adminClient.query(`CREATE DATABASE "${databaseName}"`);
  await adminClient.end();

  runPrisma(["migrate", "deploy"]);
  runPrisma(["db", "seed"]);

  await testClient.connect();
  const { rows: categories } = await testClient.query(
    "SELECT count(*)::int AS count FROM categories",
  );
  const { rows: products } = await testClient.query(
    "SELECT count(*)::int AS count FROM products",
  );
  const { rows: references } = await testClient.query(
    "SELECT count(*)::int AS count FROM project_references",
  );
  const { rows: catalogs } = await testClient.query(
    "SELECT count(*)::int AS count FROM catalogs",
  );
  const { rows: settings } = await testClient.query(
    "SELECT count(*)::int AS count FROM site_settings",
  );
  const { rows: messages } = await testClient.query(
    "SELECT count(*)::int AS count FROM contact_messages",
  );

  const counts = {
    categories: categories[0].count,
    products: products[0].count,
    references: references[0].count,
    catalogs: catalogs[0].count,
    settings: settings[0].count,
    messages: messages[0].count,
  };

  const expected = {
    categories: 5,
    products: 18,
    references: 6,
    catalogs: 2,
    settings: 1,
    messages: 5,
  };

  if (JSON.stringify(counts) !== JSON.stringify(expected)) {
    throw new Error(`Unexpected clean seed counts: ${JSON.stringify(counts)}`);
  }

  console.log(`Clean migration and seed test passed for ${databaseName}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await Promise.allSettled([adminClient.end(), testClient.end()]);
  });
