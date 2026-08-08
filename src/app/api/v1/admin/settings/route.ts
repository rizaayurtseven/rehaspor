import { updateSiteSettingsSchema } from "@/contracts/settings";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { getAdminSiteSettings, updateAdminSiteSettings } from "@/server/modules/settings/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const settings = await getAdminSiteSettings();
    return apiSuccess({ settings }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function PATCH(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = updateSiteSettingsSchema.parse(body);
    const settings = await updateAdminSiteSettings(input, admin.id, requestId);
    return apiSuccess({ settings }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
