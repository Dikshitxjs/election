// lib/apiFetch.ts

// Detect whether code is running in the browser
const IS_BROWSER = typeof window !== "undefined";

// Determine API base URL
const envBase = IS_BROWSER
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const RAW_BASE = envBase || "http://localhost:5000";
const BASE_ROOT = RAW_BASE.replace(/\/+$/, "").replace(/\/api$/i, "");


export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // --- 1) Normalize endpoint and ensure trailing slash ---
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let apiPath = path.startsWith("/api") ? path : `/api${path}`;
  if (!apiPath.endsWith("/")) apiPath += "/"; // Add trailing slash

  const url = `${BASE_ROOT}${apiPath}`;

  // --- 2) Prepare headers ---
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // --- 3) Prepare body ---
  let body = options.body as any;
  if (body && typeof body !== "string" && headers["Content-Type"]?.includes("application/json")) {
    body = JSON.stringify(body);
  }

  // --- 4) Assemble fetch options ---
  const fetchOpts: RequestInit = {
    ...options,
    headers,
    body,
  };
// lets make a git repo test
  // --- 5) Browser-specific settings ---
  if (IS_BROWSER) {
    fetchOpts.mode = "cors";

    // Public endpoints (no credentials to avoid CORS/preflight)
    const publicEndpoints = ["/candidates/", "/chhetras/", "/stats/"];
    const isPublic = publicEndpoints.some((e) => apiPath.startsWith(e));
    fetchOpts.credentials = isPublic ? "omit" : (options.credentials as RequestCredentials) ?? "include";
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("apiFetch ->", url, { method: fetchOpts.method ?? "GET", credentials: fetchOpts.credentials });
  }

  // --- 6) Perform fetch ---
  let response: Response;
  try {
    response = await fetch(url, fetchOpts);
  } catch (err: any) {
    if (process.env.NODE_ENV !== "production") console.error("apiFetch network error", err?.message ?? err);

    // Retry for credentialed requests
    const usedCredentials = IS_BROWSER && (fetchOpts.credentials ?? "include") !== "omit";
    if (usedCredentials) {
      try {
        if (process.env.NODE_ENV !== "production")
          console.warn("apiFetch: retrying without credentials for CORS check", url);

        const retryOpts: RequestInit = { ...fetchOpts, credentials: "omit" };
        const retryRes = await fetch(url, retryOpts);

        if (retryRes.ok && process.env.NODE_ENV !== "production") {
          console.info("apiFetch retry without credentials succeeded — server may block credentialed requests");
        }
      } catch {}
    }

    throw err;
  }

  // --- 7) Handle non-OK responses ---
  if (!response.ok) {
    let errorBody: any = null;
    try {
      const ct = response.headers.get("content-type") || "";
      errorBody = ct.includes("application/json") ? await response.json() : await response.text();
    } catch (e) {
      errorBody = String(e);
    }

    if (process.env.NODE_ENV !== "production")
      console.error("apiFetch: server error", response.status, errorBody);

    throw new Error(typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody));
  }

  // --- 8) Return JSON if possible ---
  const ctype = response.headers.get("content-type") || "";
  if (ctype.includes("application/json")) return response.json();
  return (await response.text()) as unknown as T;
}
