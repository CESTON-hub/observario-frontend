import { Suspense } from "react";
import { PanelIndicadores } from "./panel-indicadores";

export const metadata = { title: "Indicadores de portafolio · Observatorio de Datos ACIEM" };

export default function IndicadoresPage() {
  return (
    <div className="mx-auto max-w-[1129px] px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">Indicadores de portafolio de proyectos</h1>
      <p className="mt-1 text-sm text-navy/50">
        Salud del portafolio: desviación presupuestaria, ejecución de hitos y carga del equipo, filtrables por sector
        y territorio. Umbrales de alerta configurables en <a href="/admin/reglas" className="font-medium text-aciem hover:underline">reglas heurísticas</a>.
      </p>
      <Suspense>
        <PanelIndicadores />
      </Suspense>
    </div>
  );
}
