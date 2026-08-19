import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

interface AuthRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: AuthRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export function PublicRoute({ children }: AuthRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
