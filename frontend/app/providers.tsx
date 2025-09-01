"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextThemesProvider {...themeProps}>
      <HeroUIProvider navigate={router.push}>
        {children}
        {/* ✅ sem children aqui */}
        <ToastProvider placement="bottom-right" duration={4000} />
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
