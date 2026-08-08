import { completeMediaSchema } from "@/contracts/media";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { completeMediaAsset } from "@/server/modules/media/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const { assetId } = completeMediaSchema.parse(body);

    const asset = await completeMediaAsset(assetId, admin.id, requestId);
    return apiSuccess({ asset }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
