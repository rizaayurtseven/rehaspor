import { updateReferenceSchema } from "@/contracts/reference";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { deleteAdminReference, updateAdminReference } from "@/server/modules/references/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    const body: unknown = await request.json();
    const input = updateReferenceSchema.parse(body);
    const reference = await updateAdminReference(id, input, admin.id, requestId);
    return apiSuccess({ reference }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    await deleteAdminReference(id, admin.id, requestId);
    return apiSuccess({ success: true }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
