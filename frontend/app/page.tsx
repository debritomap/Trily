"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const makeLogin = async () => {
    setIsLoading(true);

    // Djoser padrão aceita username+password; se seu backend aceitar email, troque para { email, password }
    const payload = { username: email, password };

    Axios.post(`${API_BASE}/auth/token/login/`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data?.auth_token) {
          // Armazene o token (ajuste conforme sua estratégia; cookies httpOnly são mais seguros no prod)
          localStorage.setItem("auth_token", response.data?.auth_token);
          // Opcional: configurar header global (apenas no client)
          Axios.defaults.headers.common["Authorization"] =
            `Token ${response.data?.auth_token}`;
          addToast({
            title: "Login realizado!",
            description: "Redirecionando...",
          });
          router.push("/dashboard");
        } else {
          addToast({
            title: "Falha no login",
            description: "Resposta inesperada do servidor.",
          });
        }
      })
      .catch((err) => {
        const error = err as AxiosError<any>;
        const serverMsg =
          (error.response?.data as any)?.detail ||
          (error.response?.data as any)?.non_field_errors?.[0] ||
          error.message;
        addToast({ title: "Ocorreu um erro", description: String(serverMsg) });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <Form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault(); // <- precisa invocar
          if (!email || !password) {
            addToast({
              title: "Campos obrigatórios",
              description: "Preencha e-mail e senha.",
            });
            return;
          }
          void makeLogin();
        }}>
        <Input
          name="email"
          label="E-mail"
          type="email"
          value={email}
          // HeroUI costuma usar onValueChange; se preferir, pode usar onChange={(e)=>setEmail(e.target.value)}
          onValueChange={setEmail}
          isRequired
          autoComplete="username"
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          value={password}
          onValueChange={setPassword}
          isRequired
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth isDisabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : "Entrar"}
        </Button>
      </Form>
    </div>
  );
}
