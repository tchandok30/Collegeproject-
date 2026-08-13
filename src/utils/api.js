const BASE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

/**
 * Authenticated API helper.
 *
 * Auth tokens are stored in httpOnly cookies set by the backend, so we never
 * read them from JS.  We pass `credentials: 'include'` so the browser sends
 * those cookies automatically with every request.
 *
 * The only non-sensitive data kept in localStorage is the display role string
 * (for routing to the correct dashboard page after a page refresh).
 * No tokens, no password hashes.
 */
export async function apiFetch(endpoint, options = {}) {
  // Merge caller-supplied headers but never override Content-Type or credentials
  const { headers: callerHeaders, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    credentials: "include",         // send httpOnly cookies with every request
    headers: {
      "Content-Type": "application/json",
      ...(callerHeaders || {}),
    },
  });

  /* ================= AUTO LOGOUT ================= */
  // Only treat 401/403 as session expiry if we're NOT on an auth endpoint.
  // A 401 on /api/auth/login just means wrong credentials — not an expired session.
  const isAuthEndpoint = endpoint.startsWith("/api/auth/");

  if (!isAuthEndpoint && (response.status === 401 || response.status === 403)) {
    // Clear display data (no sensitive tokens stored here)
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/signin";
    throw new Error("Unauthorized");
  }

  const text = await response.text();

  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    const err = new Error(data.message || data.error || "Request failed");
    err.data = data;
    throw err;
  }

  return data;
}