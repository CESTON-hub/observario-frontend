import { WizardRegistro } from "./wizard";

export const metadata = { title: "Registra tu organización · Observatorio de Datos ACIEM" };

export default function RegistroPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">Registra tu organización</h1>
      <p className="mt-1 text-sm text-navy/50">
        Declara quién eres y qué capacidades tienes. Un analista de ACIEM validará la información antes de
        publicarla en el directorio.
      </p>
      <WizardRegistro />
    </div>
  );
}
