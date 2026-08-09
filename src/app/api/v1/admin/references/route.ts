import { createReferenceSchema } from "@/contracts/reference";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { createAdminReference, getAdminReferences } from "@/server/modules/references/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const references = await getAdminReferences();
    return apiSuccess({ references }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = createReferenceSchema.parse(body);
    const reference = await createAdminReference(input, admin.id, requestId);
    return apiSuccess({ reference }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
