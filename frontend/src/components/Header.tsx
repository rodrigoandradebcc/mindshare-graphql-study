import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import logoIcon from "@/assets/logo-icon.svg";
import { Button } from "./ui/button";
import { Lightbulb, LogOut, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isIdeasPage = location.pathname === "/";
  const isMembersPage = location.pathname === "/members";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="relative flex h-[82px] w-full items-center justify-between px-4 sm:px-8">
      <img src={logoIcon} alt="MindShare" className="size-10" />

      <nav
        aria-label="Navegação principal"
        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
      >
        <Button
          size="sm"
          className="gap-2"
          variant={isIdeasPage ? "default" : "ghost"}
          nativeButton={false}
          render={<Link to="/" />}
        >
          <Lightbulb className="h-4 w-4" />
          Ideais
        </Button>
        <Button
          size="sm"
          className="gap-2"
          variant={isMembersPage ? "default" : "ghost"}
          nativeButton={false}
          render={<Link to="/members" />}
        >
          <Users className="h-4 w-4" />
          Usuários
        </Button>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2.5 sm:flex">
          <Avatar className="size-8">
            <AvatarFallback className="bg-zinc-950 text-primary-foreground">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{user?.name}</span>
            <span className="text-[10px] text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>
        <Button
          aria-label="Sair"
          variant="ghost"
          size="icon-sm"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
