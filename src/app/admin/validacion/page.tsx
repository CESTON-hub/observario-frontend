import { ColaValidacion } from "./cola";

export const metadata = { title: "Cola de validación · Observatorio de Datos ACIEM" };

export default function ValidacionPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Cola de validación</h1>
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-[11px] font-semibold uppercase text-white">Rol: Analista</span>
      </div>
      <p className="mt-1 text-sm text-navy/50">
        Ningún dato llega al directorio público sin pasar por aquí (human-in-the-loop). Los ítems provienen del
        autoregistro, del ETL de fuentes públicas y de la extracción con IA — cada uno con su fuente original y
        puntaje de confianza.
      </p>
      <ColaValidacion />
    </div>
  );
}
