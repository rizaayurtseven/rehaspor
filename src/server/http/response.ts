import "server-only";
import { NextResponse } from "next/server";
import type { ApiErrorBody, ApiSuccess } from "@/contracts/api";
import { toAppError } from "@/server/http/errors";

export function apiSuccess<T>(
  data: T,
  requestId: string,
  init?: ResponseInit,
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      data,
      meta: { requestId },
    },
    {
      ...init,
      headers: {
        ...init?.headers,
        "x-request-id": requestId,
      },
    },
  );
}

export function apiError(error: unknown, requestId: string): NextResponse<ApiErrorBody> {
  const appError = toAppError(error);
  const fields = appError.expose
    ? normalizeFields(appError.details?.fields)
    : undefined;

  return NextResponse.json(
    {
      error: {
        code: appError.code,
        message: appError.expose ? appError.message : "Sunucu isteği tamamlayamadı.",
        ...(fields ? { fields } : {}),
        requestId,
      },
    },
    {
      status: appError.status,
      headers: {
        "cache-control": "no-store",
        "x-request-id": requestId,
      },
    },
  );
}

function normalizeFields(
  fields: Record<string, string[] | undefined> | undefined,
): Record<string, string[]> | undefined {
  if (!fields) {
    return undefined;
  }

  const entries = Object.entries(fields).filter(
    (entry): entry is [string, string[]] => Array.isArray(entry[1]),
  );

  return entries.length ? Object.fromEntries(entries) : undefined;
}
