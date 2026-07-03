import Link from "next/link";
import { notFound } from "next/navigation";
import { organizaciones, etiquetaTipo, etiquetaDisponibilidad } from "@/lib/directorio";
import { PanelReclamo } from "./panel-reclamo";

export function generateStaticParams() {
  return organizaciones.map((o) => ({ id: o.id }));
}

export default async function OrganizacionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = organizaciones.find((o) => o.id === id);
  if (!org) notFound();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
      <Link href="/buscar" className="text-sm font-medium text-aciem hover:underline">
        ← Volver al buscador
      </Link>

      <div className="mt-4 rounded-2xl border border-black/6 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,61,0.05)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{etiquetaTipo[org.tipo]}</span>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">{org.sector}</span>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-navy/60">📍 {org.territorio}</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-navy">{org.razonSocial}</h1>
        <p className="mt-2 text-sm leading-6 text-navy/70">{org.descripcion}</p>

        <PanelReclamo orgId={org.id} estado={org.estado} datosDe={org.datosDe} />

        {/* Capacidades */}
        <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-navy/50">Capacidades y equipos</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {org.capacidades.map((c) => (
            <div key={c.nombre} className="rounded-xl border border-black/6 bg-background p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-navy">{c.nombre}</p>
                <span className="shrink-0 rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-semibold uppercase text-navy/60">
                  {etiquetaDisponibilidad[c.disponibilidad]}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-navy/60">{c.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Líneas de investigación */}
        {org.lineas.length > 0 && (
          <>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-navy/50">Líneas de investigación</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {org.lineas.map((l) => (
                <li key={l} className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-navy/70">{l}</li>
              ))}
            </ul>
          </>
        )}

        {/* Proyectos */}
        {org.proyectos.length > 0 && (
          <>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-navy/50">Proyectos</h2>
            <ul className="mt-3 space-y-2">
              {org.proyectos.map((p) => (
                <li key={p.nombre} className="flex flex-wrap items-center gap-2 rounded-xl border border-black/6 bg-background px-4 py-3 text-sm">
                  <span className={`h-2 w-2 rounded-full ${p.estado === "en_proceso" ? "bg-up" : "bg-navy/30"}`} />
                  <span className="font-medium text-navy">{p.nombre}</span>
                  <span className="text-xs text-navy/50">📍 {p.territorio}</span>
                  <span className="ml-auto text-xs text-navy/50">{p.estado === "en_proceso" ? "En proceso" : "Planeado"}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Contacto */}
        <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-navy/50">Contacto</h2>
        <div className="mt-3 rounded-xl border border-black/6 bg-background p-4 text-sm">
          <p className="font-semibold text-navy">{org.contacto.nombre}</p>
          <p className="text-xs text-navy/50">{org.contacto.cargo}</p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-navy/70">
            <a href={`mailto:${org.contacto.email}`} className="hover:text-aciem">✉️ {org.contacto.email}</a>
            <span>☎️ {org.contacto.telefono}</span>
          </div>
          {org.contacto.visibilidad === "solo_registrados" && (
            <p className="mt-2 text-[11px] text-navy/40">Contacto visible por ser usuario registrado del observatorio.</p>
          )}
        </div>
      </div>
    </div>
  );
}
