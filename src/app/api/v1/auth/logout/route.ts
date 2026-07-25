import { cookies } from "next/headers";
import { logout } from "@/server/auth/service";
import { getAuthEnv } from "@/server/config/env";
import { getSessionCookieOptions } from "@/server/auth/session";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const { SESSION_COOKIE_NAME } = getAuthEnv();
    const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      await logout(token, requestId);
    }

    const response = apiSuccess({ loggedOut: true }, requestId, {
      headers: { "cache-control": "no-store" },
    });
    response.cookies.set({ ...getSessionCookieOptions(0), maxAge: 0 });
    return response;
  } catch (error) {
    return apiError(error, requestId);
  }
}
