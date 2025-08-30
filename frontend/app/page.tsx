"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function Login() {
  const [action, setAction] = React.useState<"login" | "signup" | null>(null);

  return (
    <div className="max-w-sm mx-auto p-6">
      <Form
        className="space-y-4"
        onSubmit={(e) => {
          const data = Object.fromEntries(new FormData(e.currentTarget));
          console.log(data);
        }}>
        <Input name="username" label="Usuário" isRequired />
        <Input name="password" label="Senha" type="password" isRequired />
        <Button type="submit" fullWidth>
          Entrar
        </Button>
      </Form>
    </div>
  );
}
