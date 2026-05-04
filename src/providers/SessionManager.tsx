"use client";

import { SessionProvider } from "./SessionProvider";
import { SessionSync } from "./SessionSync";
import { ReactNode } from "react";

export function SessionManager({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync />
      {children}
    </SessionProvider>
  );
}