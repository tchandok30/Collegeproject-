import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

/* ================= AUTH ================= */
import Login from "./auth/login";
import Signup from "./auth/signup";
import OtpVerification from "./auth/OtpVerification";
import ProtectedRoute from "./auth/ProtectedRoute";

/* ================= STUDENT ================= */
import OutpassLayout from "./student/outpasses";

/* ================= ATTENDANT ================= */
import AdminLayout from "./attendant/AdminLayout";
import PendingPage from "./attendant/PendingPage";
import ApprovedPage from "./attendant/ApprovedPage";
import RejectedPage from "./attendant/RejectedPage";
import ComplaintsPage from "./attendant/ComplaintsPage";
import Admin from "./admin/admin";

/* ================= GUARD ================= */
import GuardLayout from "./guard/GuardLayout.jsx";
import Dashboard from "./guard/Dashboard.jsx";
import GateLogs from "./guard/GateLogs.jsx";
import DayScholar from "./guard/DayScholar.jsx";

/* ================= WARDEN / CHIEF WARDEN ================= */
import Warden from "./warden/warden";
import ChiefWardenAllocationPage from "./chief-warden/chief-warden.tsx";

/* ================= LOGS ================= */
import LogsPage from "./logs/LogsPage.jsx";

/* ================= ERROR PAGE ================= */
function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full border border-gray-200">
        <h1 className="text-6xl font-extrabold text-[#6d0f16]">404</h1>
        <p className="text-xl font-bold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-gray-500 text-sm mt-2">
          The page you are trying to access does not exist or has moved.
        </p>
        <button
          onClick={() => (window.location.href = "/signin")}
          className="mt-6 bg-[#6d0f16] hover:bg-[#530b11] text-white font-semibold px-6 py-3 rounded-2xl transition shadow-sm cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

/* ================= ROUTES ================= */
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" replace /> },

  // ── Public (no auth) ───────────────────────────────────────────
  { path: "/signin",     element: <Login />,           errorElement: <ErrorPage /> },
  { path: "/signup",     element: <Signup />,          errorElement: <ErrorPage /> },
  { path: "/verify-otp", element: <OtpVerification />, errorElement: <ErrorPage /> },

  // ── Student ────────────────────────────────────────────────────
  {
    path: "/student",
    errorElement: <ErrorPage />,
    element: <ProtectedRoute allowedRoles={["student"]}><OutpassLayout /></ProtectedRoute>,
  },

  // ── Attendant ──────────────────────────────────────────────────
  {
    path: "/attendant",
    errorElement: <ErrorPage />,
    element: <ProtectedRoute allowedRoles={["attendant"]}><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/attendant/pending" replace /> },
      { path: "pending",    element: <PendingPage /> },
      { path: "approved",   element: <ApprovedPage /> },
      { path: "rejected",   element: <RejectedPage /> },
      { path: "complaints", element: <ComplaintsPage /> },
    ],
  },

  // ── Admin ──────────────────────────────────────────────────────
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute allowedRoles={["admin", "warden", "chief-warden"]}>
        <Admin />
      </ProtectedRoute>
    ),
  },

  // ── Guard ──────────────────────────────────────────────────────
  {
    path: "/guard",
    errorElement: <ErrorPage />,
    element: <ProtectedRoute allowedRoles={["guard"]}><GuardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/guard/dashboard" replace /> },
      { path: "dashboard",  element: <Dashboard /> },
      { path: "logs",       element: <GateLogs /> },
      { path: "dayscholar", element: <DayScholar /> },
    ],
  },

  // ── Warden ─────────────────────────────────────────────────────
  {
    path: "/warden",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute allowedRoles={["warden", "chief-warden"]}>
        <Warden />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wardenhostel",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute allowedRoles={["warden", "chief-warden"]}>
        <Warden />
      </ProtectedRoute>
    ),
  },

  // ── Chief Warden ───────────────────────────────────────────────
  {
    path: "/chief-warden",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute allowedRoles={["chief-warden"]}>
        <ChiefWardenAllocationPage />
      </ProtectedRoute>
    ),
  },

  // ── Logs (warden+ only) ────────────────────────────────────────
  {
    path: "/logs",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute allowedRoles={["admin", "warden", "chief-warden"]}>
        <LogsPage />
      </ProtectedRoute>
    ),
  },

  { path: "*", element: <ErrorPage /> },
]);

/* ================= RENDER ================= */
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);