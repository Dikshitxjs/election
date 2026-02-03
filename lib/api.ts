const BASE_ROOT = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_ROOT) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit & { body?: Record<string, any> | string | null } = {}
): Promise<T> {
  const normalized = endpoint.replace(/^\/+|\/+$/g, "");
  const url = `${BASE_ROOT}/${normalized}/`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  let body = options.body;
  if (body && typeof body !== "string") {
    body = JSON.stringify(body);
  }

  const response = await fetch(url, { ...options, headers, body });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.headers.get("content-type")?.includes("application/json")
    ? response.json()
    : (response.text() as unknown as T);
}
