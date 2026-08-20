import { useState } from "react";
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
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signup = useAuthStore((state) => state.signup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const signupMutate = await signup({
        name,

        email,

        password,
      });

      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch {
      toast.error("Erro ao realizar o cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-[clamp(24px,4.4vw,46px)]">
      <img
        src={logo}
        alt="MindShare — Ideias colaborativas"
        className="mb-[clamp(14px,1.6vw,17px)] h-auto w-[clamp(162px,15.5vw,256px)]"
      />
      <Card className="w-[min(100%,clamp(295px,28.2vw,465px))] gap-0 rounded-lg py-0 ring-0 shadow-none">
        <CardHeader className="gap-0.5 px-[clamp(21px,2.05vw,34px)] pt-[clamp(21px,2.05vw,34px)]">
          <CardTitle className="text-[clamp(16px,1.45vw,24px)] leading-tight font-bold">
            Crie sua conta
          </CardTitle>
          <CardDescription className="text-[clamp(9px,0.7vw,12px)] leading-normal">
            Informe seu nome, e-mail e senha de acesso
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-[clamp(22px,2.1vw,35px)] px-[clamp(21px,2.05vw,34px)] pb-[clamp(21px,2.05vw,34px)]">
          <form
            onSubmit={handleSubmit}
            className="space-y-[clamp(13px,1.15vw,19px)]"
          >
            <div className="space-y-[clamp(4px,0.35vw,6px)]">
              <Label
                htmlFor="name"
                className="text-[clamp(10px,0.92vw,15px)]"
              >
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-[clamp(32px,3.1vw,51px)] rounded-[clamp(7px,0.65vw,11px)] px-[clamp(12px,1.15vw,19px)] text-[clamp(10px,0.92vw,15px)]"
              />
            </div>
            <div className="space-y-[clamp(4px,0.35vw,6px)]">
              <Label
                htmlFor="email"
                className="text-[clamp(10px,0.92vw,15px)]"
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
                className="h-[clamp(32px,3.1vw,51px)] rounded-[clamp(7px,0.65vw,11px)] px-[clamp(12px,1.15vw,19px)] text-[clamp(10px,0.92vw,15px)]"
              />
            </div>
            <div className="space-y-[clamp(4px,0.35vw,6px)]">
              <Label
                htmlFor="password"
                className="text-[clamp(10px,0.92vw,15px)]"
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
                className="h-[clamp(32px,3.1vw,51px)] rounded-[clamp(7px,0.65vw,11px)] px-[clamp(12px,1.15vw,19px)] text-[clamp(10px,0.92vw,15px)]"
              />
            </div>
            <Button
              type="submit"
              className="mt-px h-[clamp(32px,2.96vw,49px)] w-full text-[clamp(10px,0.92vw,15px)]"
              disabled={loading}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-[clamp(9px,0.85vw,14px)] w-[min(100%,clamp(295px,28.2vw,465px))] gap-0 rounded-lg py-0 ring-0 shadow-none">
        <CardHeader className="gap-0.5 px-[clamp(21px,2.05vw,34px)] pt-[clamp(21px,2.05vw,34px)]">
          <CardTitle className="text-[clamp(13px,1.2vw,20px)] font-medium">
            Já tem uma conta?
          </CardTitle>
          <CardDescription className="text-[clamp(9px,0.7vw,12px)]">
            Entre agora mesmo
          </CardDescription>
        </CardHeader>
        <CardContent className="px-[clamp(21px,2.05vw,34px)] pt-[clamp(16px,1.55vw,26px)] pb-[clamp(21px,2.05vw,34px)]">
          <Button
            variant="outline"
            className="h-[clamp(32px,3.1vw,51px)] w-full text-[clamp(10px,0.92vw,15px)]"
            nativeButton={false}
            render={<Link to="/login" />}
          >
            Acessar conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
