import { useState } from "react";
import logo from "@/assets/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginMutate = await login({
        email,
        password,
      });

      if (loginMutate) {
        toast.success("Login realizado com sucesso!");
      }
    } catch {
      toast.error("Falha ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-[clamp(46px,4.48vw,74px)]">
      <img
        src={logo}
        alt="MindShare — Ideias colaborativas"
        className="mb-[clamp(17px,1.52vw,25px)] h-auto w-[clamp(162px,15.5vw,256px)]"
      />

      <Card className="w-[min(100%,clamp(295px,28.2vw,465px))] gap-0 rounded-xl py-0 ring-0 shadow-none">
        <CardHeader className="gap-1 px-[clamp(21px,2.05vw,34px)] pt-[clamp(21px,2.05vw,34px)]">
          <CardTitle className="text-[clamp(16px,1.45vw,24px)] leading-tight font-bold">
            Acesse a plataforma
          </CardTitle>

          <CardDescription className="text-[clamp(10px,0.91vw,15px)] leading-normal">
            Entre usando seu e-mail e senha cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-[clamp(24px,2.35vw,39px)] px-[clamp(21px,2.05vw,34px)] pb-[clamp(21px,2.05vw,34px)]">
          <form
            onSubmit={handleSubmit}
            className="space-y-[clamp(13px,1.15vw,19px)]"
          >
            <div className="space-y-[clamp(4px,0.35vw,6px)]">
              <Label
                htmlFor="email"
                className="text-[clamp(11px,1.03vw,17px)]"
              >
                E-mail
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="exemplo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[clamp(32px,3.1vw,51px)] rounded-[clamp(7px,0.65vw,11px)] px-[clamp(12px,1.15vw,19px)] text-[clamp(11px,1.03vw,17px)]"
              />
            </div>
            <div className="space-y-[clamp(4px,0.35vw,6px)]">
              <Label
                htmlFor="password"
                className="text-[clamp(11px,1.03vw,17px)]"
              >
                Senha
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[clamp(32px,3.1vw,51px)] rounded-[clamp(7px,0.65vw,11px)] px-[clamp(12px,1.15vw,19px)] text-[clamp(11px,1.03vw,17px)]"
              />
            </div>
            <Button
              type="submit"
              className="mt-px h-[clamp(32px,2.96vw,49px)] w-full text-[clamp(11px,1.03vw,17px)]"
              disabled={loading}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-[clamp(9px,0.85vw,14px)] w-[min(100%,clamp(295px,28.2vw,465px))] gap-0 rounded-xl py-0 ring-0 shadow-none">
        <CardHeader className="gap-1 px-[clamp(21px,2.05vw,34px)] pt-[clamp(21px,2.05vw,34px)]">
          <CardTitle className="text-[clamp(13px,1.2vw,20px)] font-medium">
            Ainda não tem uma conta?
          </CardTitle>

          <CardDescription className="text-[clamp(10px,0.91vw,15px)]">
            Cadastre agora mesmo
          </CardDescription>
        </CardHeader>

        <CardContent className="px-[clamp(21px,2.05vw,34px)] pt-[clamp(16px,1.55vw,26px)] pb-[clamp(21px,2.05vw,34px)]">
          <Button
            variant="outline"
            className="h-[clamp(32px,3.1vw,51px)] w-full text-[clamp(11px,1.03vw,17px)]"
            nativeButton={false}
            render={<Link to="/signup" />}
          >
            Criar conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
