"use client";

import { useState } from "react";
import { organizaciones, convocatorias } from "@/lib/directorio";
import { actoresRegistrados, conteoPor } from "@/lib/actores";
import { filtrarPortafolio, promedio, pctCriticos } from "@/lib/portafolio";

// CU-08: generador de perfil territorial descargable, construido en el cliente
// desde los datos del observatorio (en producción: DW + redacción IA verificada).
const territoriosDisponibles = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "La Guajira"];

function construirHTML(territorio: string) {
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const t = norm(territorio);
  const orgs = organizaciones.filter(
    (o) => norm(o.territorio).includes(t) || o.proyectos.some((p) => norm(p.territorio).includes(t))
  );
  const convs = convocatorias.filter((c) => norm(c.territorio).includes(t));
  const proyectos = orgs.flatMap((o) => o.proyectos.filter((p) => norm(p.territorio).includes(t)).map((p) => ({ ...p, org: o.razonSocial })));

  const actoresTerr = actoresRegistrados.filter((a) => norm(a.ciudad) === t);
  const empresas = actoresTerr.filter((a) => a.tipoActor === "empresa").length;
  const academia = actoresTerr.filter((a) => a.tipoActor === "institucion_educativa").length;
  const porSectorActores = conteoPor(actoresTerr, (a) => a.sector);
  const pf = filtrarPortafolio(undefined, territorio);

  const filas = (arr: string[][]) =>
    arr.map((r) => `<tr>${r.map((c) => `<td style="padding:6px 10px;border-bottom:1px solid #e8eaee">${c}</td>`).join("")}</tr>`).join("");

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<title>Perfil territorial — ${territorio}</title>
<style>body{font-family:'DM Sans',Arial,sans-serif;color:#0f1728;max-width:760px;margin:40px auto;padding:0 24px}
h1{color:#0c1f3d;border-bottom:3px solid #e30613;padding-bottom:8px}h2{color:#0c1f3d;margin-top:28px}
table{border-collapse:collapse;width:100%;font-size:14px}.meta{color:#667085;font-size:12px}</style></head><body>
<h1>Observatorio de Ingeniería ACIEM — Perfil territorial: ${territorio}</h1>
<p class="meta">Generado el ${new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })} · Datos de demostración</p>
<h2>Resumen del ecosistema</h2>
<table>${filas([
    ["Empresas registradas en el territorio", String(empresas)],
    ["Universidades y laboratorios", String(academia)],
    ["Perfiles detallados en el directorio", String(orgs.length)],
    ["Proyectos activos o planeados", String(proyectos.length)],
    ["Convocatorias vigentes aplicables", String(convs.length)],
  ])}</table>
<h2>Empresas por sector de ingeniería</h2>
<table>${filas(porSectorActores.length ? porSectorActores.map((s) => [s.nombre, String(s.cantidad)]) : [["Sin actores censados en el territorio", ""]])}</table>
<h2>Entidades del directorio</h2>
<table><tr><th style="text-align:left;padding:6px 10px">Entidad</th><th style="text-align:left;padding:6px 10px">Sector</th></tr>
${filas(orgs.length ? orgs.map((o) => [o.razonSocial, o.sector]) : [["Sin entidades detalladas", ""]])}</table>
<h2>Proyectos en el territorio</h2>
<table>${filas(proyectos.length ? proyectos.map((p) => [p.nombre, p.org]) : [["Sin proyectos registrados", ""]])}</table>
<h2>Convocatorias aplicables</h2>
<table>${filas(convs.length ? convs.map((c) => [c.titulo, `${c.emisor} · cierra ${c.cierre}`]) : [["Sin convocatorias específicas; aplican las nacionales", ""]])}</table>
<h2>Salud del portafolio en el territorio</h2>
<table>${filas(pf.length ? [
    ["Desviación presupuestaria promedio (TDP)", `${promedio(pf, "tdp") > 0 ? "+" : ""}${promedio(pf, "tdp")}%`],
    ["Ejecución de hitos promedio (IEH)", String(promedio(pf, "ieh"))],
    ["Proyectos en estado crítico", `${pctCriticos(pf)}%`],
  ] : [["Sin proyectos de portafolio en el territorio", ""]])}</table>
<p class="meta">Fuente: Observatorio de Ingeniería ACIEM. Este perfil se genera automáticamente desde la base de evidencias; las cifras se verifican contra los datos fuente antes de su publicación.</p>
</body></html>`;
}

export function GeneradorPerfil() {
  const [territorio, setTerritorio] = useState("La Guajira");
  const [generando, setGenerando] = useState(false);

  const generar = () => {
    setGenerando(true);
    setTimeout(() => {
      const html = construirHTML(territorio);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `perfil-${territorio.toLowerCase().replace(/\s+/g, "-")}.html`;
      a.click();
      URL.revokeObjectURL(url);
      setGenerando(false);
    }, 600);
  };

  return (
    <div className="mt-6 rounded-2xl border border-black/6 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
      <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-navy/50">Generador de perfiles territoriales</h2>
      <p className="mt-2 text-sm text-navy/60">
        Selecciona un territorio y descarga un diagnóstico con las entidades, proyectos, convocatorias e
        indicadores asociados. Se genera al momento desde la base del observatorio.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={territorio}
          onChange={(e) => setTerritorio(e.target.value)}
          className="h-11 rounded-xl border border-black/10 bg-white px-3.5 text-sm text-navy outline-none"
        >
          {territoriosDisponibles.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button
          onClick={generar}
          disabled={generando}
          className="rounded-full bg-aciem px-5 py-2.5 text-sm font-semibold text-white hover:bg-aciem-dark disabled:opacity-60"
        >
          {generando ? "Generando…" : "⬇ Generar y descargar perfil"}
        </button>
      </div>
    </div>
  );
}
