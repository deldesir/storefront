"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const NextAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const basePath = (process.env.NEXT_PUBLIC_AUTH_BASEPATH ?? "") + "/api/auth";
  return <SessionProvider basePath={basePath}>{children}</SessionProvider>;
}
