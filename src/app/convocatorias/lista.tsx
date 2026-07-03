"use client";

import { useMemo, useState } from "react";
import { convocatorias } from "@/lib/directorio";

const HOY = "2026-07-02"; // fecha de referencia de la demo

const etiquetaTipo: Record<string, string> = {
  beca: "Beca",
  financiacion: "Financiación",
  proyecto: "Proyecto",
  incentivo: "Incentivo",
};

export function ListaConvocatorias() {
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("abierta");

  const visibles = useMemo(
    () =>
      convocatorias
        .filter((c) => (tipo ? c.tipo === tipo : true))
        .filter((c) => {
          const abierta = c.cierre >= HOY;
          return estado === "todas" ? true : estado === "abierta" ? abierta : !abierta;
        })
        .sort((a, b) => a.cierre.localeCompare(b.cierre)),
    [tipo, estado]
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="">Tipo: todos</option>
          <option value="beca">Becas</option>
          <option value="financiacion">Financiación</option>
          <option value="proyecto">Proyectos</option>
          <option value="incentivo">Incentivos</option>
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="abierta">Estado: abiertas</option>
          <option value="cerrada">Cerradas</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      <div className="mt-5 space-y-4">
        {visibles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/12 bg-white p-10 text-center text-sm text-navy/50">
            No hay convocatorias para esta selección.
          </div>
        )}
        {visibles.map((c) => {
          const abierta = c.cierre >= HOY;
          return (
            <div key={c.id} className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase ${abierta ? "bg-up/10 text-up" : "bg-black/8 text-navy/50"}`}>
                  {abierta ? "Abierta" : "Cerrada"}
                </span>
                <span className="rounded-full bg-aciem/10 px-2.5 py-0.5 text-[11px] font-semibold text-aciem">{etiquetaTipo[c.tipo]}</span>
                <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{c.sector}</span>
              </div>
              <p className="mt-2.5 text-[15px] font-semibold text-navy">{c.titulo}</p>
              <p className="mt-1.5 text-sm leading-6 text-navy/70">{c.descripcion}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-black/6 pt-3 text-xs text-navy/60">
                <span className="font-medium text-navy/80">{c.emisor}</span>
                <span>📍 {c.territorio}</span>
                <span className={abierta && c.cierre <= "2026-08-15" ? "font-semibold text-aciem" : ""}>Cierra: {c.cierre}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
