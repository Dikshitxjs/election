// lib/apiFetch.ts
const IS_BROWSER = typeof window !== "undefined";

const envBase = IS_BROWSER
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

const RAW_BASE = envBase || "http://localhost:5000";
const BASE_ROOT = RAW_BASE.replace(/\/+$/, "").replace(/\/api$/i, "");

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit & { body?: Record<string, any> | string | null } = {}
): Promise<T> {
  // --- 1) Normalize endpoint and ensure trailing slash ---
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let apiPath = path.startsWith("/api") ? path : `/api${path}`;
  if (!apiPath.endsWith("/")) apiPath += "/";

  const url = `${BASE_ROOT}${apiPath}`;

  // --- 2) Prepare headers ---
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // --- 3) Prepare body ---
  let body = options.body;
  if (body && typeof body !== "string" && headers["Content-Type"]?.includes("application/json")) {
    body = JSON.stringify(body);
  }

  // --- 4) Assemble fetch options ---
  const fetchOpts: RequestInit = { ...options, headers, body };

  // --- 5) Browser-specific settings ---
  if (IS_BROWSER) {
    fetchOpts.mode = "cors";
    const publicEndpoints = ["/candidates/", "/chhetras/", "/stats/"];
    const isPublic = publicEndpoints.some((e) => apiPath.startsWith(e));
    fetchOpts.credentials = isPublic ? "omit" : (options.credentials as RequestCredentials) ?? "include";
  }

  // --- 6) Debug logging ---
  if (process.env.NODE_ENV !== "production") {
    console.debug("apiFetch ->", { url, method: fetchOpts.method ?? "GET", headers, body });
  }

  // --- 7) Perform fetch ---
  let response: Response;
  try {
    response = await fetch(url, fetchOpts);
  } catch (err: any) {
    console.error("apiFetch network error:", err);
    throw err;
  }

  // --- 8) Handle non-OK responses ---
  if (!response.ok) {
    let errorBody: any = null;
    try {
      const ct = response.headers.get("content-type") || "";
      errorBody = ct.includes("application/json") ? await response.json() : await response.text();
    } catch (e) {
      errorBody = String(e);
    }
    throw new Error(typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody));
  }

  // --- 9) Return JSON if possible ---
  const ctype = response.headers.get("content-type") || "";
  if (ctype.includes("application/json")) return response.json();
  return (await response.text()) as unknown as T;
}
