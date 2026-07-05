"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sectoresCiiu } from "@/lib/actores";
import {
  proyectosPortafolio,
  filtrarPortafolio,
  promedio,
  pctCriticos,
  porSector,
  formulaIndicador,
} from "@/lib/portafolio";

const territorios = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga"];

function KpiCard({ etiqueta, valor, unidad, formula }: { etiqueta: string; valor: string; unidad: string; formula: string }) {
  return (
    <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/45">{etiqueta}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-navy">
        {valor} <span className="text-sm font-normal text-navy/45">{unidad}</span>
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-[11px] font-medium text-aciem">Ficha metodológica</summary>
        <p className="mt-1 text-[11px] leading-4 text-navy/50">{formula}</p>
      </details>
    </div>
  );
}

function Barra({ nombre, valor, unidad, invertido }: { nombre: string; valor: number; unidad: string; invertido?: boolean }) {
  const max = unidad === "%" && !invertido ? 100 : unidad === "" ? 1 : 25;
  const pct = Math.max(4, Math.min(100, (Math.abs(valor) / max) * 100));
  const alerta = invertido ? valor < 0.8 : valor > 10;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="truncate text-navy/70">{nombre}</span>
        <span className={`ml-2 shrink-0 font-semibold ${alerta ? "text-down" : "text-navy"}`}>
          {valor}{unidad}
        </span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-black/6">
        <div className={`h-2 rounded-full ${alerta ? "bg-down" : "bg-navy/70"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function PanelIndicadores() {
  const params = useSearchParams();
  const [sector, setSector] = useState(params.get("categoria") ?? "");
  const [territorio, setTerritorio] = useState("");

  const lista = useMemo(() => filtrarPortafolio(sector || undefined, territorio || undefined), [sector, territorio]);

  const tdp = promedio(lista, "tdp");
  const ieh = promedio(lista, "ieh");
  const cce = promedio(lista, "cce");
  const critico = pctCriticos(lista);

  const tdpPorSector = porSector(lista, "tdp");
  const iehPorSector = porSector(lista, "ieh");

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <select value={sector} onChange={(e) => setSector(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="">Sector: todos</option>
          {sectoresCiiu.map((s) => (
            <option key={s.sector} value={s.sector}>{s.sector}</option>
          ))}
        </select>
        <select value={territorio} onChange={(e) => setTerritorio(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="">Territorio: todos</option>
          {territorios.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {(sector || territorio) && (
          <button onClick={() => { setSector(""); setTerritorio(""); }} className="text-xs font-semibold text-aciem hover:underline">
            Reiniciar selección
          </button>
        )}
        <button
          onClick={() => descargarCSV(lista)}
          disabled={lista.length === 0}
          className="ml-auto h-9 rounded-full border border-black/8 bg-white px-4 text-sm font-medium text-navy hover:bg-black/5 disabled:opacity-40"
        >
          ⬇ CSV
        </button>
      </div>

      <p className="mt-3 text-xs text-navy/45">{lista.length} proyectos en la selección</p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard etiqueta="Desviación presupuestaria (TDP)" valor={`${tdp > 0 ? "+" : ""}${tdp}`} unidad="%" formula={formulaIndicador.TDP} />
        <KpiCard etiqueta="Ejecución de hitos (IEH)" valor={`${ieh}`} unidad="" formula={formulaIndicador.IEH} />
        <KpiCard etiqueta="Carga del equipo (CCE)" valor={`${cce}`} unidad="%" formula={formulaIndicador.CCE} />
        <KpiCard etiqueta="Proyectos en estado crítico" valor={`${critico}`} unidad="%" formula={formulaIndicador.CRITICO} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy/50">TDP promedio por sector</p>
          <div className="mt-3 space-y-2.5">
            {tdpPorSector.length === 0 && <p className="text-xs text-navy/40">Sin datos para esta selección.</p>}
            {tdpPorSector.map((s) => (
              <Barra key={s.sector} nombre={s.sector} valor={s.valor} unidad="%" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy/50">IEH promedio por sector</p>
          <div className="mt-3 space-y-2.5">
            {iehPorSector.length === 0 && <p className="text-xs text-navy/40">Sin datos para esta selección.</p>}
            {iehPorSector.map((s) => (
              <Barra key={s.sector} nombre={s.sector} valor={s.valor} unidad="" invertido />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function descargarCSV(lista: typeof proyectosPortafolio) {
  const filas = [["id", "sector", "territorio", "tdp_pct", "ieh", "cce_pct"], ...lista.map((p) => [p.id, p.sector, p.territorio, String(p.tdp), String(p.ieh), String(p.cce)])];
  const csv = filas.map((f) => f.map((c) => `"${c.replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portafolio-observatorio-aciem.csv";
  a.click();
  URL.revokeObjectURL(url);
}
