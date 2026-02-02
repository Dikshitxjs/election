
const IS_BROWSER = typeof window !== "undefined";

//Base URL ---
const BASE_ROOT: string = (
  IS_BROWSER
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    : process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, ""); // remove trailing slash

//  Main fetch function ---
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit & { body?: Record<string, any> | string | null } = {}
): Promise<T> {
  // Normalize endpoint
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_ROOT}${path}`; 

  // Prepare headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Prepare body
  let body = options.body;
  if (body && typeof body !== "string" && headers["Content-Type"].includes("application/json")) {
    body = JSON.stringify(body);
  }

  const fetchOpts: RequestInit = { ...options, headers, body };

  // Browser-specific settings
 if (IS_BROWSER) {
  fetchOpts.mode = "cors";
}

  // Debug logging in development
  if (process.env.NODE_ENV !== "production") {
    console.debug("apiFetch ->", { url, method: fetchOpts.method ?? "GET", headers, body });
  }

  // Perform fetch
  let response: Response;
  try {
    response = await fetch(url, fetchOpts);
  } catch (err: any) {
    console.error("apiFetch network error:", err);
    throw err;
  }

  // Handle non-OK responses
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

  // Return JSON if possible
  const ctype = response.headers.get("content-type") || "";
  if (ctype.includes("application/json")) return response.json();
  return (await response.text()) as unknown as T;
}
