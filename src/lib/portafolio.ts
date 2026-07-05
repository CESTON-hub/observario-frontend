// Indicadores de salud del portafolio de proyectos (Dominio A del catálogo,
// ver docs-observatorio/docs/06-indicadores.md): TDP, IEH, CCE e Índice de
// Proyectos en Estado Crítico. Generado de forma determinística (sin
// Math.random) a partir de las taxonomías reales del observatorio, para que
// el resultado sea idéntico en servidor y cliente.

import { sectoresCiiu } from "./actores";

const territorios = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga"];

export type ProyectoPortafolio = {
  id: string;
  sector: string;
  territorio: string;
  tdp: number; // % — Tasa de Desviación Presupuestaria
  ieh: number; // 0–1 — Índice de Ejecución de Hitos
  cce: number; // % — Capacidad de Carga del Equipo
};

export const proyectosPortafolio: ProyectoPortafolio[] = sectoresCiiu.flatMap((s, si) =>
  [0, 1, 2].map((k) => {
    const idx = si * 3 + k;
    return {
      id: `pf-${idx}`,
      sector: s.sector,
      territorio: territorios[idx % territorios.length],
      tdp: Math.round((((idx * 7) % 25) - 8) * 10) / 10,
      ieh: Math.round((0.6 + ((idx * 13) % 35) / 100) * 100) / 100,
      cce: 50 + ((idx * 17) % 45),
    };
  })
);

export const formulaIndicador: Record<"TDP" | "IEH" | "CCE" | "CRITICO", string> = {
  TDP: "TDP = ((Costo Real Acumulado − Costo Presupuestado) / Costo Presupuestado) × 100",
  IEH: "IEH = Hitos Completados Efectivos / Hitos Planificados a la Fecha",
  CCE: "% de dedicación del equipo a tareas críticas frente a su capacidad teórica",
  CRITICO: "% de proyectos de la cartera con TDP > 10% o IEH < 0.8 (umbrales configurables en /admin/reglas)",
};

export function filtrarPortafolio(sector?: string, territorio?: string) {
  return proyectosPortafolio.filter((p) => (sector ? p.sector === sector : true) && (territorio ? p.territorio === territorio : true));
}

export function promedio(lista: ProyectoPortafolio[], campo: "tdp" | "ieh" | "cce") {
  if (lista.length === 0) return 0;
  return Math.round((lista.reduce((a, p) => a + p[campo], 0) / lista.length) * 100) / 100;
}

export function pctCriticos(lista: ProyectoPortafolio[]) {
  if (lista.length === 0) return 0;
  const criticos = lista.filter((p) => p.tdp > 10 || p.ieh < 0.8).length;
  return Math.round((criticos / lista.length) * 100);
}

export function porSector(lista: ProyectoPortafolio[], campo: "tdp" | "ieh" | "cce") {
  const sectores = [...new Set(lista.map((p) => p.sector))];
  return sectores
    .map((sector) => ({ sector, valor: promedio(lista.filter((p) => p.sector === sector), campo) }))
    .sort((a, b) => b.valor - a.valor);
}
