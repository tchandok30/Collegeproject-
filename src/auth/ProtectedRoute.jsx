import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiFetch } from "../utils/api";

/**
 * ProtectedRoute
 *
 * Wraps a route and ensures the user:
 *  1. Is authenticated (has a valid httpOnly session cookie — verified via /api/auth/me)
 *  2. Has one of the allowed roles
 *
 * If unauthenticated → redirects to /signin
 * If wrong role      → redirects to the user's own dashboard
 *
 * @param {string[]} allowedRoles  - e.g. ["student"] or ["warden", "chief-warden"]
 * @param {JSX.Element} children   - the protected page component
 */

const ROLE_HOME = {
  student: "/student",
  attendant: "/attendant",
  guard: "/guard",
  warden: "/wardenhostel",
  "chief-warden": "/chief-warden",
  admin: "/admin",
};

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "unauth" | "forbidden"
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const data = await apiFetch("/api/auth/me");
        if (cancelled) return;

        // Role comes from JWT payload, never client-supplied headers
        const role = data?.role;
        setUserRole(role);

        if (!role) {
          setStatus("unauth");
          return;
        }

        if (allowedRoles && !allowedRoles.includes(role)) {
          setStatus("forbidden");
        } else {
          setStatus("ok");
        }
      } catch {
        if (!cancelled) setStatus("unauth");
      }
    }

    checkAuth();
    return () => { cancelled = true; };
  }, [location.pathname, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#5b0e0e] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (status === "unauth") {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (status === "forbidden") {
    // Redirect to their correct dashboard
    const home = ROLE_HOME[userRole] || "/signin";
    return <Navigate to={home} replace />;
  }

  return children;
}
