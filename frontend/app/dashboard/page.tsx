"use client";
import React from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const dashRouter = useRouter();

  function logout() {
    dashRouter.push("/");
  }

  return (
    <div className="w-full h-full">
      Dashboard
      <Button
        className="top-10"
        onClickCapture={(e) => {
          e.defaultPrevented;
          logout();
        }}>
        Sair
      </Button>
    </div>
  );
}
