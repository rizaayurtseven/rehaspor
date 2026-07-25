import "dotenv/config";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 3010;
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = process.platform === "win32"
  ? "node_modules/next/dist/bin/next"
  : "./node_modules/next/dist/bin/next";

const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
  windowsHide: true,
});

async function requestHealth(path) {
  let lastError;

  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}${path}`);
      return { response, body: await response.json() };
    } catch (error) {
      lastError = error;
      await delay(500);
    }
  }

  throw lastError ?? new Error("Health server did not start.");
}

try {
  const live = await requestHealth("/api/health/live");
  const ready = await requestHealth("/api/health/ready");

  if (!live.response.ok || !ready.response.ok || ready.body.data?.database !== "connected") {
    throw new Error("Health endpoints did not report a ready database connection.");
  }

  console.log(`Health checks passed (database latency: ${ready.body.data.latencyMs}ms).`);
} finally {
  server.kill();
}
