"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  buscarOrganizaciones,
  etiquetaTipo,
  type Intencion,
} from "@/lib/directorio";

const etiquetaIntencion: Record<Intencion, string> = {
  contratar: "CONTRATAR un servicio o equipo",
  investigar: "INVESTIGAR / capacidad académica",
  financiacion: "FINANCIACIÓN / convocatorias",
  general: "búsqueda general",
};

const ejemplos = ["grúa de 200 toneladas", "proyectos en La Guajira", "IoT industrial", "convocatorias energías renovables", "ensayos de materiales"];

export function Buscador() {
  const params = useSearchParams();
  const [consulta, setConsulta] = useState(params.get("q") ?? "");
  const [enviada, setEnviada] = useState(params.get("q") ?? "");
  const [tipo, setTipo] = useState("");
  const [sector, setSector] = useState("");

  const { interpretacion, resultados, convocatorias } = useMemo(
    () => buscarOrganizaciones(enviada, { tipo: tipo || undefined, sector: sector || undefined }),
    [enviada, tipo, sector]
  );

  const hayBusqueda = enviada.trim().length > 0;

  return (
    <div className="mt-6">
      {/* Caja de búsqueda */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEnviada(consulta);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/35" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder='Ej: "grúa de 200 t para ingeniería civil", "proyectos en La Guajira"...'
            className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm text-navy shadow-[0_1px_2px_rgba(12,31,61,0.05)] outline-none placeholder:text-navy/30 focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
          />
        </div>
        <button type="submit" className="h-12 rounded-2xl bg-aciem px-6 text-sm font-semibold text-white hover:bg-aciem-dark">
          Buscar
        </button>
      </form>

      {/* Filtros */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="">Tipo de entidad: todas</option>
          <option value="empresa">Empresas</option>
          <option value="universidad">Universidades</option>
          <option value="laboratorio">Laboratorios</option>
          <option value="entidad_publica">Entidades públicas</option>
          <option value="emprendimiento">Emprendimientos</option>
        </select>
        <select value={sector} onChange={(e) => setSector(e.target.value)} className="h-9 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-navy/70 outline-none">
          <option value="">Sector: todos</option>
          <option>Ingeniería Civil</option>
          <option>Ingeniería Eléctrica</option>
          <option>Ingeniería Electrónica</option>
          <option>Ingeniería Mecánica</option>
          <option>Energías Renovables</option>
          <option>Agua y Saneamiento</option>
          <option>Energía</option>
        </select>
        {(tipo || sector) && (
          <button onClick={() => { setTipo(""); setSector(""); }} className="text-xs font-medium text-aciem hover:underline">
            Reiniciar selección
          </button>
        )}
      </div>

      {/* Interpretación */}
      {hayBusqueda && (
        <div className="mt-5 rounded-xl border border-navy/10 bg-navy/4 px-4 py-2.5 text-sm text-navy/70">
          Interpretamos tu búsqueda como: <span className="font-semibold text-navy">{etiquetaIntencion[interpretacion.intencion]}</span>
          {interpretacion.territorio && (
            <> · territorio: <span className="font-semibold capitalize text-navy">{interpretacion.territorio}</span></>
          )}
        </div>
      )}

      {/* Resultados */}
      {!hayBusqueda ? (
        <div className="mt-8 rounded-2xl border border-dashed border-black/12 bg-white p-10 text-center">
          <p className="text-sm text-navy/50">Prueba con una de estas búsquedas:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {ejemplos.map((e) => (
              <button key={e} onClick={() => { setConsulta(e); setEnviada(e); }} className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-navy/70 hover:border-aciem hover:text-aciem">
                {e}
              </button>
            ))}
          </div>
        </div>
      ) : resultados.length === 0 && convocatorias.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-black/12 bg-white p-10 text-center text-sm text-navy/50">
          Sin resultados. Intenta con otros términos o quita los filtros.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <p className="text-sm font-semibold text-navy">
            {resultados.length} {resultados.length === 1 ? "entidad recomendada" : "entidades recomendadas"}
            {convocatorias.length > 0 && ` · ${convocatorias.length} convocatoria${convocatorias.length > 1 ? "s" : ""}`}
          </p>

          {resultados.map(({ org, coincidencias, justificacion }, i) => (
            <div key={org.id} className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {i === 0 && <span aria-hidden>⭐</span>}
                    <Link href={`/organizaciones/${org.id}`} className="text-[15px] font-semibold text-navy hover:text-aciem hover:underline">
                      {org.razonSocial}
                    </Link>
                    <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{etiquetaTipo[org.tipo]}</span>
                    <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{org.sector}</span>
                    {org.estado === "censada_sin_reclamar" && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">Perfil censado · datos de {org.datosDe}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-navy/70">{justificacion}</p>
                  {coincidencias.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {coincidencias.slice(0, 3).map((c) => (
                        <li key={c} className="text-xs text-navy/55">
                          <span className="text-up">✓</span> {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-black/6 pt-3 text-xs text-navy/60">
                <span>📍 {org.territorio}</span>
                <span>✉️ {org.contacto.email}</span>
                <span>☎️ {org.contacto.telefono}</span>
                <Link href={`/organizaciones/${org.id}`} className="ml-auto font-semibold text-aciem hover:underline">
                  Ver perfil →
                </Link>
              </div>
            </div>
          ))}

          {convocatorias.map((c) => (
            <div key={c.id} className="rounded-2xl border border-aciem/20 bg-aciem/4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-aciem px-2.5 py-0.5 text-[11px] font-semibold uppercase text-white">Convocatoria</span>
                <p className="text-[15px] font-semibold text-navy">{c.titulo}</p>
              </div>
              <p className="mt-2 text-sm text-navy/70">{c.descripcion}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-navy/60">
                <span>{c.emisor}</span>
                <span>📍 {c.territorio}</span>
                <span>Cierra: {c.cierre}</span>
                <Link href="/convocatorias" className="ml-auto font-semibold text-aciem hover:underline">
                  Ver convocatorias →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
