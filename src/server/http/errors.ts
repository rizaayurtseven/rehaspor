export type ErrorDetails = {
  fields?: Record<string, string[] | undefined>;
};

export class AppError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: ErrorDetails;
  readonly expose: boolean;

  constructor(
    message: string,
    options: {
      code: string;
      status: number;
      details?: ErrorDetails;
      expose?: boolean;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options.cause });
    this.name = new.target.name;
    this.code = options.code;
    this.status = options.status;
    this.details = options.details;
    this.expose = options.expose ?? true;
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, {
      code: "SERVER_MISCONFIGURED",
      status: 503,
      details,
      expose: false,
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service is temporarily unavailable.", cause?: unknown) {
    super(message, {
      code: "SERVICE_UNAVAILABLE",
      status: 503,
      expose: true,
      cause,
    });
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    const fields = error.flatten().fieldErrors;
    return new AppError("Gönderilen bilgiler geçersiz.", {
      code: "VALIDATION_ERROR",
      status: 400,
      details: { fields },
    });
  }

  return new AppError("An unexpected error occurred.", {
    code: "INTERNAL_SERVER_ERROR",
    status: 500,
    expose: false,
    cause: error,
  });
}
import { ZodError } from "zod";
