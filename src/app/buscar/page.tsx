import { Suspense } from "react";
import { Buscador } from "./buscador";

export const metadata = { title: "Buscador de capacidades · Observatorio de Datos ACIEM" };

export default function BuscarPage() {
  return (
    <div className="mx-auto max-w-[1129px] px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">Buscador de capacidades</h1>
      <p className="mt-1 text-sm text-navy/50">
        Escribe lo que necesitas — un equipo, un laboratorio, una línea de investigación, un territorio — y te
        recomendamos las entidades del ecosistema que pueden ayudarte, con su contacto.
      </p>
      <Suspense>
        <Buscador />
      </Suspense>
    </div>
  );
}
