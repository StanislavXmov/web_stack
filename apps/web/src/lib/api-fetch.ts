export class ApiError extends Error {
  status: number;
  info: unknown;

  constructor(message: string, status: number, info: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

function errorMessage(data: unknown, fallback: string): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as { message: unknown }).message === "string"
  ) {
    return (data as { message: string }).message;
  }

  return fallback;
}

export async function customFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);
  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data = body ? JSON.parse(body) : {};

  if (!res.ok) {
    throw new ApiError(errorMessage(data, res.statusText), res.status, data);
  }

  return { data, status: res.status, headers: res.headers } as T;
}
