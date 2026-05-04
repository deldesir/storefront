"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ReduxProvider } from "./ReduxProvider";
import { ToastProvider } from "./ToastProvider";
import { ApolloWrapper } from "./ApolloWrapper";

import { SessionProvider } from "./SessionProvider";

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
      <ReduxProvider>
        <ToastProvider>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </ToastProvider>
      </ReduxProvider>
    </ThemeProvider>
    </SessionProvider>
  );
}