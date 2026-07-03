import Link from "next/link";
import { experiencias } from "@/lib/directorio";

export const metadata = { title: "Banco de experiencias · Observatorio de Datos ACIEM" };

export default function ExperienciasPage() {
  return (
    <div className="mx-auto max-w-[1129px] px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">Banco de experiencias y buenas prácticas</h1>
      <p className="mt-1 text-sm text-navy/50">
        Iniciativas exitosas y lecciones aprendidas del ecosistema, replicables por otros actores.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {experiencias.map((e) => (
          <div key={e.id} className="rounded-2xl border border-black/6 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,61,0.05)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[11px] font-semibold text-navy/60">{e.fase}</span>
              <span className="rounded-full bg-up/10 px-2.5 py-0.5 text-[11px] font-semibold text-up">{e.impacto}</span>
            </div>
            <p className="mt-3 text-[15px] font-semibold text-navy">{e.titulo}</p>
            <p className="mt-0.5 text-xs text-navy/50">{e.organizacion}</p>
            <p className="mt-2 text-sm leading-6 text-navy/70">{e.resumen}</p>
          </div>
        ))}
      </div>

      {/* Saltos analíticos: conectan lo cualitativo con el dato */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/dashboard"
          className="rounded-2xl border border-aciem/20 bg-aciem/4 p-5 text-sm font-medium text-navy transition-colors hover:bg-aciem/8"
        >
          📊 Evalúa el avance de estos proyectos en el <span className="font-semibold text-aciem">Dashboard sectorial →</span>
        </Link>
        <Link
          href="/indicadores?categoria=renovables"
          className="rounded-2xl border border-aciem/20 bg-aciem/4 p-5 text-sm font-medium text-navy transition-colors hover:bg-aciem/8"
        >
          ⚡ Mira los indicadores de energías renovables detrás de estas experiencias <span className="font-semibold text-aciem">→</span>
        </Link>
      </div>
    </div>
  );
}
