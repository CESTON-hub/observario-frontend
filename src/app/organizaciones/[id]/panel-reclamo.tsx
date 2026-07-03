"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { leerReclamos, reclamarOrganizacion, confirmarDatos, type Reclamo } from "@/lib/directorio";

// CU-18: reclamar un perfil censado y confirmar/actualizar sus datos.
export function PanelReclamo({ orgId, estado, datosDe }: { orgId: string; estado: string; datosDe: string }) {
  const { usuario } = useAuth();
  const [reclamo, setReclamo] = useState<Reclamo | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setReclamo(leerReclamos()[orgId] ?? null);
    setCargado(true);
  }, [orgId]);

  if (!cargado || !usuario) return null;

  const esMia = reclamo?.reclamadaPor === usuario.email;

  if (!reclamo && estado === "censada_sin_reclamar") {
    return (
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-amber-900">Perfil censado por el observatorio · datos de {datosDe}</p>
          <p className="text-xs text-amber-800/80">Esta organización aún no ha sido reclamada por sus representantes.</p>
        </div>
        <button
          onClick={() => {
            reclamarOrganizacion(orgId, usuario.email);
            setReclamo({ reclamadaPor: usuario.email, confirmadoEn: null });
          }}
          className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Esta es mi organización
        </button>
      </div>
    );
  }

  if (esMia && !reclamo?.confirmadoEn) {
    return (
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-navy/15 bg-navy/4 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-navy">Perfil reclamado — eres editor de esta organización</p>
          <p className="text-xs text-navy/60">Confirma que los datos siguen vigentes para mantener tu posición en el buscador.</p>
        </div>
        <button
          onClick={() => {
            confirmarDatos(orgId);
            setReclamo((r) => (r ? { ...r, confirmadoEn: new Date().toISOString() } : r));
          }}
          className="rounded-full bg-up px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          ✓ Confirmar datos vigentes
        </button>
      </div>
    );
  }

  if (esMia && reclamo?.confirmadoEn) {
    return (
      <div className="mt-5 rounded-xl border border-up/25 bg-up/8 px-4 py-3">
        <p className="text-sm font-semibold text-up">
          ✓ Datos confirmados el {new Date(reclamo.confirmadoEn).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p className="text-xs text-navy/60">Gracias por mantener actualizada la base del observatorio.</p>
      </div>
    );
  }

  return null;
}
