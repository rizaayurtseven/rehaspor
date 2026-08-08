import "server-only";
import { AppError } from "@/server/http/errors";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitRecord>();

// Clean up expired keys periodically
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    store.forEach((record, key) => {
      if (record.resetAt <= now) {
        store.delete(key);
      }
    });
  }, 60_000);
  if (timer && "unref" in timer && typeof timer.unref === "function") {
    timer.unref();
  }
}

export type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
  message?: string;
};

export function checkRateLimit(options: RateLimitOptions): void {
  const { key, limit, windowMs, message } = options;
  const now = Date.now();
  const record = store.get(key);

  if (!record || record.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (record.count >= limit) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    throw new AppError(
      message || `Çok fazla istek gönderildi. Lütfen ${retryAfterSec} saniye sonra tekrar deneyin.`,
      {
        code: "RATE_LIMIT_EXCEEDED",
        status: 429,
      },
    );
  }

  record.count += 1;
}

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp;

  return "127.0.0.1";
}
