import "server-only";
import { z } from "zod";
import { ConfigurationError } from "@/server/http/errors";

const runtimeEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>;

let cachedRuntimeEnv: RuntimeEnv | undefined;

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
