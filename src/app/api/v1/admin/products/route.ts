import { createProductSchema } from "@/contracts/product";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { createAdminProduct, getAdminProducts } from "@/server/modules/products/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const status = searchParams.get("status") || undefined;
    const query = searchParams.get("query") || undefined;

    const products = await getAdminProducts({ categoryId, status, query });
    return apiSuccess({ products }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = createProductSchema.parse(body);
    const product = await createAdminProduct(input, admin.id, requestId);
    return apiSuccess({ product }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
