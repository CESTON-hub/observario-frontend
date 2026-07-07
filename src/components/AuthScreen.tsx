"use client";

import { useState } from "react";
import { AciemLogo } from "./AciemLogo";
import { useAuth, tiposActor, type TipoActor } from "@/lib/auth";

export function AuthScreen() {
  const { registrar, iniciarSesion } = useAuth();
  const [modo, setModo] = useState<"login" | "signup">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoActor, setTipoActor] = useState<TipoActor>("empresa");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const cambiarModo = (m: "login" | "signup") => {
    setModo(m);
    setError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    setTimeout(() => {
      if (modo === "signup") {
        if (!nombre.trim() || !email.trim() || password.length < 4) {
          setError("Completa nombre, correo y una contraseña de al menos 4 caracteres.");
          setEnviando(false);
          return;
        }
        const res = registrar({ nombre: nombre.trim(), email, password, tipoActor });
        if (!res.ok) {
          setError(res.error);
          setEnviando(false);
        }
      } else {
        const res = iniciarSesion(email, password);
        if (!res.ok) {
          setError(res.error);
          setEnviando(false);
        }
      }
    }, 300);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f7f9] px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px circle at 18% 14%, rgba(12,31,61,0.08), transparent 60%), radial-gradient(560px circle at 84% 82%, rgba(227,6,19,0.06), transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-3">
          <AciemLogo className="h-20 w-auto" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/50">
            Observatorio de Datos
          </span>
        </div>

        <div className="rounded-3xl border border-black/6 bg-white p-8 shadow-[0_20px_50px_-20px_rgba(12,31,61,0.25)]">
          <h1 className="text-center text-[22px] font-semibold tracking-tight text-navy">
            {modo === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </h1>
          <p className="mt-1.5 text-center text-sm text-navy/50">
            {modo === "login"
              ? "Inicia sesión para explorar los indicadores del sector."
              : "Regístrate para acceder al observatorio de ACIEM."}
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-3.5">
            {modo === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Nombre completo</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. María Torres"
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/60">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                required
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/60">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
                autoComplete={modo === "login" ? "current-password" : "new-password"}
              />
            </div>

            {modo === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Tipo de actor</label>
                <div className="grid grid-cols-2 gap-2">
                  {tiposActor.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTipoActor(t.id)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                        tipoActor === t.id
                          ? "border-navy bg-navy text-white"
                          : "border-black/10 bg-white text-navy/70 hover:bg-black/5"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-down/8 px-3 py-2 text-xs font-medium text-down">{error}</p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="mt-1 flex h-11 w-full items-center justify-center rounded-xl bg-navy text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
            >
              {enviando ? "Un momento…" : modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-navy/50">
          {modo === "login" ? (
            <>
              ¿Primera vez aquí?{" "}
              <button onClick={() => cambiarModo("signup")} className="font-semibold text-aciem hover:underline">
                Crea tu cuenta
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => cambiarModo("login")} className="font-semibold text-aciem hover:underline">
                Inicia sesión
              </button>
            </>
          )}
        </p>
        <p className="mt-6 text-center text-[11px] text-navy/30">Elaborado por Ceston</p>
      </div>
    </div>
  );
}
