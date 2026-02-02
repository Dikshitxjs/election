const IS_BROWSER = typeof window !== "undefined";

// Base URL
const BASE_ROOT: string = (
  IS_BROWSER
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    : process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, ""); 


// Main fetch function
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit & { body?: Record<string, any> | string | null } = {}
): Promise<T> {
  // Normalize endpoint → always /path/
  const normalized = endpoint.replace(/^\/+|\/+$/g, "");
  const path = `/${normalized}/`;
  const url = `${BASE_ROOT}${path}`;

  // Headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Body
  let body = options.body;
  if (body && typeof body !== "string" && headers["Content-Type"].includes("application/json")) {
    body = JSON.stringify(body);
  }

  const fetchOpts: RequestInit = {
    ...options,
    headers,
    body,
  };

  // Debug (dev only)
  if (process.env.NODE_ENV !== "production") {
    console.debug("apiFetch ->", {
      url,
      method: fetchOpts.method ?? "GET",
      body,
    });
  }

  // Fetch
  const response = await fetch(url, fetchOpts);

  if (!response.ok) {
    const ct = response.headers.get("content-type") || "";
    const errorBody = ct.includes("application/json")
      ? await response.json()
      : await response.text();
    throw new Error(
      typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody)
    );
  }

  // Return
  const ctype = response.headers.get("content-type") || "";
  if (ctype.includes("application/json")) return response.json();
  return (await response.text()) as unknown as T;
}
