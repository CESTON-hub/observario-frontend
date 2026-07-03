"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AciemLogo } from "./AciemLogo";
import { useAuth } from "@/lib/auth";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/indicadores", label: "Indicadores" },
  { href: "/dashboard", label: "Dashboard" },
];

function iniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase() || "?";
}

function MenuUsuario() {
  const { usuario, cerrarSesion } = useAuth();
  const [abierto, setAbierto] = useState(false);
  if (!usuario) return null;
  return (
    <div className="relative">
      <button
        onClick={() => setAbierto((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white hover:bg-navy-800"
        aria-label="Cuenta"
      >
        {iniciales(usuario.nombre)}
      </button>
      {abierto && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            aria-hidden
            onClick={() => setAbierto(false)}
            tabIndex={-1}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-black/8 bg-white p-1.5 shadow-lg">
            <div className="px-2.5 py-2">
              <p className="truncate text-sm font-semibold text-navy">{usuario.nombre}</p>
              <p className="truncate text-xs text-navy/50">{usuario.email}</p>
            </div>
            <div className="my-1 h-px bg-black/6" />
            <button
              onClick={() => {
                setAbierto(false);
                cerrarSesion();
              }}
              className="w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-down hover:bg-black/5"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1129px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <AciemLogo className="h-8 w-auto" />
          <span className="border-l border-black/15 pl-3 text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.14em] text-navy">
            Observatorio
            <br />
            de Datos
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const activo = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activo ? "bg-aciem text-white" : "text-navy/80 hover:bg-black/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Buscar" className="rounded-full p-2 text-navy/60 hover:bg-black/5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link
            href="/indicadores"
            className="flex items-center gap-2 rounded-full bg-aciem px-4 py-1.5 text-sm font-medium text-white hover:bg-aciem-dark"
          >
            Explorar datos
            <span aria-hidden>→</span>
          </Link>
          <MenuUsuario />
        </div>
      </div>
    </header>
  );
}
