import { Toaster } from "@/components/ui/sonner";
import { Header } from "./Header";
import { useAuthStore } from "@/stores/auth";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isIdeasPage = useLocation().pathname === "/";

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <main
        className={
          !isAuthenticated
            ? "px-4"
            : isIdeasPage
              ? "px-7"
              : "mx-auto px-16 py-4"
        }
      >
        {children}
      </main>
      <Toaster />
    </div>
  );
}
