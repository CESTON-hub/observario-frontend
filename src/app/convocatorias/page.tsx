import { ListaConvocatorias } from "./lista";

export const metadata = { title: "Convocatorias e incentivos · Observatorio de Datos ACIEM" };

export default function ConvocatoriasPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">Convocatorias e incentivos</h1>
      <p className="mt-1 text-sm text-navy/50">
        Becas, financiación, proyectos e incentivos del gobierno y otras entidades para el ecosistema de ingeniería.
      </p>
      <ListaConvocatorias />
    </div>
  );
}
