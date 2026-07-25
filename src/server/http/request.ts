import "server-only";

const requestIdPattern = /^[a-zA-Z0-9._:-]{1,128}$/;

export function getRequestId(request: Request): string {
  const incomingRequestId = request.headers.get("x-request-id");

  if (incomingRequestId && requestIdPattern.test(incomingRequestId)) {
    return incomingRequestId;
  }

  return crypto.randomUUID();
}
