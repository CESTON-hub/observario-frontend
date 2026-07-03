"use client";

import { useAuth } from "@/lib/auth";
import { AuthScreen } from "./AuthScreen";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { listo, usuario } = useAuth();

  if (!listo) {
    return <div className="min-h-screen bg-[#f6f7f9]" />;
  }

  if (!usuario) {
    return <AuthScreen />;
  }

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
