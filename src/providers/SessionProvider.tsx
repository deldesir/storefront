"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function SessionProvider({ children }: { children: ReactNode }) {
  const basePath = (process.env.NEXT_PUBLIC_AUTH_BASEPATH ?? "") + "/api/auth";
  return <NextAuthSessionProvider basePath={basePath}>{children}</NextAuthSessionProvider>;
}
