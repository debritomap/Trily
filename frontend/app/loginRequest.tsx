"use client";

import { addToast } from "@heroui/toast";
import axios, { AxiosError } from "axios";

// Se você criou rewrite/proxy no Next, troque para "/api"
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export enum MessageType {
  success,
  error,
  generic_error,
  required_fields,
}
function notifyUser(messageType: MessageType, message = "") {
  switch (messageType) {
    case MessageType.success:
      addToast({
        title: "Login realizado!",
        description: "Redirecionando...",
        color: "success",
      });
      return;
    case MessageType.error:
      addToast({
        title: "Ocorreu um erro",
        description: String(message || "Tente novamente."),
        color: "danger",
      });
      return;
    case MessageType.generic_error:
      addToast({
        title: "Falha no login",
        description: "Resposta inesperada do servidor.",
        color: "danger",
      });
      return;
    case MessageType.required_fields:
      addToast({
        title: "Campos obrigatórios",
        description: "Preencha e-mail e senha.",
        color: "danger",
      });
      return;
  }
}

// Instância de axios
const http = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

type LoginResponse = { auth_token?: string };

// Tipo mínimo do roteador que você realmente usa
type RouterLike = { push: (href: string) => void };

export default async function makeLogin(
  emailOrUsername: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: RouterLike
) {
  if (!emailOrUsername || !password) {
    notifyUser(MessageType.required_fields);
    return;
  }

  setIsLoading(true);
  try {
    // Se o backend usa username (padrão Djoser), envia { username, password }.
    // Se você adaptou para e-mail, { email, password }.
    const payload = emailOrUsername.includes("@")
      ? { email: emailOrUsername, password }
      : { username: emailOrUsername, password };

    const { status, data } = await http.post<LoginResponse>(
      "/auth/token/login/",
      payload
    );

    if (status === 200 && data?.auth_token) {
      localStorage.setItem("auth_token", data.auth_token);
      http.defaults.headers.common["Authorization"] =
        `Token ${data.auth_token}`;
      notifyUser(MessageType.success);
      router.push("/dashboard");
      return;
    }

    notifyUser(MessageType.generic_error);
  } catch (err) {
    const error = err as AxiosError<any>;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.non_field_errors?.[0] ||
      error.message ||
      "Erro não identificado.";
    notifyUser(MessageType.error, message);
  } finally {
    setIsLoading(false);
  }
}
