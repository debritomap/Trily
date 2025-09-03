"use client";

import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { axiosClient } from "@/services/axios";

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

type LoginResponse = { auth_token?: string };

// Tipo mínimo do roteador que você realmente usa
type RouterLike = { push: (href: string) => void };

export default function makeLogin(
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

  const payload = emailOrUsername.includes("@")
    ? { email: emailOrUsername, password }
    : { username: emailOrUsername, password };

  axiosClient
    .post<LoginResponse>("/auth/token/login/", payload)
    .then(({ status, data }) => {
      if (status === 200 && data?.auth_token) {
        localStorage.setItem("auth_token", data.auth_token);
        axiosClient.defaults.headers.common["Authorization"] =
          `Token ${data.auth_token}`;
        notifyUser(MessageType.success);
        router.push("/dashboard");
        return;
      }
      notifyUser(MessageType.generic_error);
    })
    .catch((err: AxiosError<any>) => {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        err.message ||
        "Erro não identificado.";
      notifyUser(MessageType.error, message);
    })
    .finally(() => {
      setIsLoading(false);
    });
}
