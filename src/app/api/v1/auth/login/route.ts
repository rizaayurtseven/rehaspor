import { loginInputSchema } from "@/contracts/auth";
import { login } from "@/server/auth/service";
import { getSessionCookieOptions } from "@/server/auth/session";
import { apiError, apiSuccess } from "@/server/http/response";
import { getRequestId } from "@/server/http/request";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { verifyOrigin } from "@/server/security/origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    verifyOrigin(request);

    const clientIp = getClientIp(request);
    checkRateLimit({
      key: `auth_login:${clientIp}`,
      limit: 5, // 5 attempts per 15 minutes
      windowMs: 15 * 60 * 1000,
      message: "Çok fazla hatalı giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.",
    });

    const body: unknown = await request.json();
    const input = loginInputSchema.parse(body);
    const result = await login(input, {
      requestId,
      userAgent: request.headers.get("user-agent")?.slice(0, 512),
    });
    const response = apiSuccess({ user: result.user }, requestId, {
      headers: { "cache-control": "no-store" },
    });

    response.cookies.set({
      ...getSessionCookieOptions(result.maxAge),
      value: result.token,
    });

    return response;
  } catch (error) {
    return apiError(error, requestId);
  }
}
