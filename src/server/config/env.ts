import "server-only";
import { z } from "zod";
import { ConfigurationError } from "@/server/http/errors";

const runtimeEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>;

const authEnvSchema = runtimeEnvSchema.extend({
  APP_ORIGIN: z.string().url().optional().or(z.literal("")),
  SESSION_COOKIE_NAME: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/).default("rehaspor_session"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
});

export type AuthEnv = z.infer<typeof authEnvSchema>;

let cachedRuntimeEnv: RuntimeEnv | undefined;
let cachedAuthEnv: AuthEnv | undefined;

export function getRuntimeEnv(): RuntimeEnv {
  if (cachedRuntimeEnv) {
    return cachedRuntimeEnv;
  }

  const result = runtimeEnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new ConfigurationError("Server environment is not configured correctly.", {
      fields: result.error.flatten().fieldErrors,
    });
  }

  cachedRuntimeEnv = result.data;
  return cachedRuntimeEnv;
}

export function getAuthEnv(): AuthEnv {
  if (cachedAuthEnv) {
    return cachedAuthEnv;
  }

  const result = authEnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new ConfigurationError("Authentication environment is not configured correctly.", {
      fields: result.error.flatten().fieldErrors,
    });
  }

  cachedAuthEnv = result.data;
  return cachedAuthEnv;
}
