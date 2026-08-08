import { contactMessageSchema } from "@/contracts/message";
import { createContactMessage } from "@/server/modules/messages/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body: unknown = await request.json();
    const input = contactMessageSchema.parse(body);

    const clientIp = getClientIp(request);
    checkRateLimit({
      key: `contact_form:${clientIp}`,
      limit: 10, // 10 valid submissions per 15 minutes
      windowMs: 15 * 60 * 1000,
      message: "Kısa sürede çok fazla mesaj gönderildi. Lütfen 15 dakika sonra tekrar deneyin.",
    });

    const message = await createContactMessage(input);
    return apiSuccess({ message, success: true }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
