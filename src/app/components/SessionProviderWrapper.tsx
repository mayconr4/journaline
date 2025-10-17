// src/components/SessionProviderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";

// Este componente envolve todo o seu app com o SessionProvider
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
