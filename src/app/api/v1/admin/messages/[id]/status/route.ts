import { z } from "zod";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { deleteAdminMessage, updateAdminMessageStatus } from "@/server/modules/messages/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusBodySchema = z.object({
  status: z.enum(["UNREAD", "READ", "ARCHIVED"]),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    const body: unknown = await request.json();
    const { status } = statusBodySchema.parse(body);

    const message = await updateAdminMessageStatus(id, status, admin.id, requestId);
    return apiSuccess({ message }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;

    await deleteAdminMessage(id, admin.id, requestId);
    return apiSuccess({ success: true }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
