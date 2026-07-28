export type ApiMeta = {
  requestId: string;
};

export type ApiSuccess<T> = {
  data: T;
  meta: ApiMeta;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
    requestId: string;
  };
};

export type HealthStatus = {
  status: "ok";
  service: "reha-spor";
  timestamp: string;
};

export type ReadinessStatus = HealthStatus & {
  database: "connected";
  latencyMs: number;
};
