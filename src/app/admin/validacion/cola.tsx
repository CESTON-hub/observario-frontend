"use client";

import { useEffect, useState } from "react";
import {
  colaSembrada,
  leerRegistrosPendientes,
  leerDecisiones,
  decidirValidacion,
  etiquetaTipo,
  type RegistroPendiente,
} from "@/lib/directorio";

type Item = RegistroPendiente & { confianza?: number };

export function ColaValidacion() {
  const [items, setItems] = useState<Item[]>([]);
  const [decisiones, setDecisiones] = useState<Record<string, "aprobado" | "rechazado">>({});

  useEffect(() => {
    const registros = leerRegistrosPendientes();
    // Prioriza por confianza ascendente (los dudosos primero) y luego autoregistros
    const todos: Item[] = [...colaSembrada, ...registros];
    setItems(todos);
    setDecisiones(leerDecisiones());
  }, []);

  const decidir = (id: string, decision: "aprobado" | "rechazado") => {
    decidirValidacion(id, decision);
    setDecisiones((d) => ({ ...d, [id]: decision }));
  };

  const pendientes = items.filter((i) => !decisiones[i.id]);
  const resueltos = items.filter((i) => decisiones[i.id]);

  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm font-semibold text-navy">
        {pendientes.length} pendiente{pendientes.length !== 1 && "s"} · {resueltos.length} resuelto{resueltos.length !== 1 && "s"}
      </p>

      {pendientes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-black/12 bg-white p-10 text-center text-sm text-navy/50">
          🎉 Cola vacía. Los nuevos autoregistros (desde <span className="font-medium">Registra tu organización</span>) y
          las extracciones del ETL aparecerán aquí.
        </div>
      )}

      {pendientes.map((item) => (
        <div key={item.id} className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[15px] font-semibold text-navy">{item.razonSocial}</p>
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{etiquetaTipo[item.tipo]}</span>
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{item.sector}</span>
            {item.confianza !== undefined ? (
              <span
                className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  item.confianza >= 0.85 ? "bg-up/10 text-up" : "bg-amber-100 text-amber-800"
                }`}
              >
                Confianza {(item.confianza * 100).toFixed(0)}%
              </span>
            ) : (
              <span className="ml-auto rounded-full bg-navy/8 px-2.5 py-0.5 text-[11px] font-semibold text-navy/60">Autoregistro</span>
            )}
          </div>

          <p className="mt-2 text-sm leading-6 text-navy/70">{item.descripcion}</p>
          <p className="mt-1 text-sm text-navy/70"><span className="font-medium text-navy">Capacidades:</span> {item.capacidades}</p>

          <div className="mt-3 grid gap-1 rounded-xl bg-background p-3 text-xs text-navy/60 sm:grid-cols-2">
            <span>📍 {item.territorio}</span>
            <span>✉️ {item.contactoEmail} ({item.visibilidad === "publico" ? "público" : "solo registrados"})</span>
            <span>Enviado por: {item.enviadoPor}</span>
            <span className="font-medium text-navy/70">Fuente original: {item.fuente}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => decidir(item.id, "aprobado")}
              className="rounded-full bg-up px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              ✓ Aprobar y publicar
            </button>
            <button
              onClick={() => decidir(item.id, "rechazado")}
              className="rounded-full border border-down/30 px-4 py-2 text-sm font-semibold text-down hover:bg-down/5"
            >
              ✕ Rechazar
            </button>
          </div>
        </div>
      ))}

      {resueltos.length > 0 && (
        <>
          <p className="pt-2 text-xs font-semibold uppercase tracking-[0.1em] text-navy/40">Resueltos en esta sesión</p>
          {resueltos.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-black/6 bg-white px-4 py-3 opacity-70">
              <span className={decisiones[item.id] === "aprobado" ? "text-up" : "text-down"}>
                {decisiones[item.id] === "aprobado" ? "✓" : "✕"}
              </span>
              <p className="text-sm font-medium text-navy">{item.razonSocial}</p>
              <span className="ml-auto text-xs text-navy/50">
                {decisiones[item.id] === "aprobado" ? "Aprobado — publicado en el directorio" : "Rechazado — devuelto con observaciones"}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
