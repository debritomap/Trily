"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";
import makeLogin from "./loginRequest";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // você pode passar e-mail OU usuário no primeiro campo
    makeLogin(email, password, setIsLoading, { push: router.push });
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Input
            name="email"
            label="E-mail ou usuário"
            type="text"
            value={email}
            onValueChange={setEmail}
            isRequired
            autoComplete="username"
            isDisabled={isLoading}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            value={password}
            onValueChange={setPassword}
            isRequired
            autoComplete="current-password"
            isDisabled={isLoading}
          />
          <Button type="submit" isDisabled={isLoading} isLoading={isLoading}>
            Entrar
          </Button>
        </Form>
      )}
    </div>
  );
}
