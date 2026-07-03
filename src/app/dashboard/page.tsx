import { PanelActores } from "./panel-actores";

export const metadata = { title: "Dashboard · Observatorio de Datos ACIEM" };

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1129px] px-6 py-8">
      {/* Encabezado */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy">Dashboard de Actores</h1>
          <p className="mt-1 text-sm text-navy/50">
            Caracterización de las organizaciones registradas en el observatorio · Julio 2026
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-black/12 bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-black/5">
            ⬇ Exportar PDF
          </button>
          <button className="rounded-full bg-aciem px-4 py-2 text-sm font-medium text-white hover:bg-aciem-dark">
            ↗ Compartir
          </button>
        </div>
      </div>

      <PanelActores />
    </div>
  );
}
