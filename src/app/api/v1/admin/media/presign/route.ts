import { presignMediaSchema } from "@/contracts/media";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { presignMediaAsset } from "@/server/modules/media/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = presignMediaSchema.parse(body);

    const presign = await presignMediaAsset(input, admin.id, requestId);
    return apiSuccess({ presign }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
