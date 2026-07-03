"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { agregarRegistroPendiente, etiquetaTipo, type TipoOrganizacion } from "@/lib/directorio";

// CU-03: registro por tipo de actor en pasos, termina en la cola de validación (CU-11).
const pasos = ["Tipo de actor", "Organización", "Capacidades", "Contacto", "Revisión"];

const tipos: { id: TipoOrganizacion; icono: string; ayuda: string }[] = [
  { id: "empresa", icono: "🏢", ayuda: "Servicios, productos y proyectos del sector privado" },
  { id: "entidad_publica", icono: "🏛️", ayuda: "Convocatorias, proyectos públicos y necesidades" },
  { id: "universidad", icono: "🎓", ayuda: "Líneas de investigación, grupos y equipos" },
  { id: "laboratorio", icono: "🔬", ayuda: "Ensayos, calibración y servicios especializados" },
  { id: "emprendimiento", icono: "🚀", ayuda: "Iniciativas de base tecnológica" },
];

const inputCls =
  "h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm text-navy outline-none placeholder:text-navy/30 focus:border-navy/30 focus:ring-2 focus:ring-navy/10";

export function WizardRegistro() {
  const { usuario } = useAuth();
  const [paso, setPaso] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tipo, setTipo] = useState<TipoOrganizacion>("empresa");
  const [razonSocial, setRazonSocial] = useState("");
  const [sector, setSector] = useState("Ingeniería Eléctrica");
  const [territorio, setTerritorio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidades, setCapacidades] = useState("");
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoEmail, setContactoEmail] = useState("");
  const [visibilidad, setVisibilidad] = useState<"publico" | "solo_registrados">("publico");

  const esAcademia = tipo === "universidad" || tipo === "laboratorio";

  const validarPaso = () => {
    setError(null);
    if (paso === 1 && (!razonSocial.trim() || !territorio.trim() || !descripcion.trim())) {
      setError("Completa razón social, ciudad y descripción.");
      return false;
    }
    if (paso === 2 && !capacidades.trim()) {
      setError(esAcademia ? "Describe al menos una línea de investigación, laboratorio o equipo." : "Describe al menos un producto, servicio o capacidad.");
      return false;
    }
    if (paso === 3 && (!contactoNombre.trim() || !contactoEmail.trim())) {
      setError("Completa el nombre y correo de contacto.");
      return false;
    }
    return true;
  };

  const enviar = () => {
    agregarRegistroPendiente({
      razonSocial: razonSocial.trim(),
      tipo,
      sector,
      territorio: territorio.trim(),
      descripcion: descripcion.trim(),
      capacidades: capacidades.trim(),
      contactoNombre: contactoNombre.trim(),
      contactoEmail: contactoEmail.trim(),
      visibilidad,
      enviadoPor: usuario?.email ?? "anónimo",
    });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="mt-8 rounded-2xl border border-up/25 bg-up/8 p-8 text-center">
        <p className="text-3xl">✅</p>
        <h2 className="mt-3 text-lg font-semibold text-navy">Registro enviado a validación</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-navy/60">
          <strong>{razonSocial}</strong> quedó en la cola de revisión. Un analista de ACIEM verificará la
          información y, al aprobarla, tu organización aparecerá en el buscador del observatorio.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/buscar" className="rounded-full bg-aciem px-5 py-2.5 text-sm font-semibold text-white hover:bg-aciem-dark">
            Ir al buscador
          </Link>
          <Link href="/admin/validacion" className="rounded-full border border-black/12 px-5 py-2.5 text-sm font-medium text-navy hover:bg-black/5">
            Ver cola de validación (analista)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Indicador de pasos */}
      <ol className="flex flex-wrap items-center gap-2 text-xs">
        {pasos.map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                i < paso ? "bg-up text-white" : i === paso ? "bg-navy text-white" : "bg-black/8 text-navy/50"
              }`}
            >
              {i < paso ? "✓" : i + 1}
            </span>
            <span className={i === paso ? "font-semibold text-navy" : "text-navy/50"}>{p}</span>
            {i < pasos.length - 1 && <span className="text-navy/25">—</span>}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-black/6 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,61,0.05)] sm:p-8">
        {paso === 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {tipos.map((t) => (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  tipo === t.id ? "border-navy bg-navy/5 ring-2 ring-navy/15" : "border-black/10 hover:bg-black/3"
                }`}
              >
                <p className="text-lg">{t.icono}</p>
                <p className="mt-1 text-sm font-semibold text-navy">{etiquetaTipo[t.id]}</p>
                <p className="mt-0.5 text-xs leading-4 text-navy/55">{t.ayuda}</p>
              </button>
            ))}
          </div>
        )}

        {paso === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/60">Razón social / nombre</label>
              <input value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} placeholder="Ej. Ingeniería XYZ S.A.S." className={inputCls} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Sector de ingeniería</label>
                <select value={sector} onChange={(e) => setSector(e.target.value)} className={inputCls}>
                  <option>Ingeniería Eléctrica</option>
                  <option>Ingeniería Electrónica</option>
                  <option>Ingeniería Civil</option>
                  <option>Ingeniería Mecánica</option>
                  <option>Energías Renovables</option>
                  <option>Agua y Saneamiento</option>
                  <option>Telecomunicaciones</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Ciudad / territorio</label>
                <input value={territorio} onChange={(e) => setTerritorio(e.target.value)} placeholder="Ej. Bogotá" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/60">¿A qué se dedica la organización?</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} placeholder="Actividad económica, productos y servicios principales..." className={`${inputCls} h-auto py-2.5`} />
            </div>
          </div>
        )}

        {paso === 2 && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-navy/60">
              {esAcademia
                ? "Líneas de investigación, laboratorios y equipos disponibles"
                : tipo === "entidad_publica"
                  ? "Programas, convocatorias y necesidades"
                  : "Capacidades, equipos y servicios que ofreces"}
            </label>
            <textarea
              value={capacidades}
              onChange={(e) => setCapacidades(e.target.value)}
              rows={6}
              placeholder={
                esAcademia
                  ? "Ej: Laboratorio de fluidos con banco de bombas; línea de investigación en automatización; osciloscopios de 4 GHz disponibles para servicio..."
                  : "Ej: Grúa telescópica de 90 t (alquiler); diseño de subestaciones; cuadrillas certificadas..."
              }
              className={`${inputCls} h-auto py-2.5`}
            />
            <p className="mt-2 text-xs text-navy/45">
              Esto es lo que el buscador usa para recomendarte cuando alguien necesita lo que tú tienes.
            </p>
          </div>
        )}

        {paso === 3 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Nombre de contacto</label>
                <input value={contactoNombre} onChange={(e) => setContactoNombre(e.target.value)} placeholder="Ej. Ana Gómez" className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/60">Correo de contacto</label>
                <input type="email" value={contactoEmail} onChange={(e) => setContactoEmail(e.target.value)} placeholder="contacto@organizacion.com" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/60">Visibilidad del contacto</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  onClick={() => setVisibilidad("publico")}
                  className={`rounded-xl border p-3 text-left text-sm ${visibilidad === "publico" ? "border-navy bg-navy/5 ring-2 ring-navy/15" : "border-black/10"}`}
                >
                  <p className="font-semibold text-navy">Público</p>
                  <p className="text-xs text-navy/55">Cualquier visitante ve el contacto</p>
                </button>
                <button
                  onClick={() => setVisibilidad("solo_registrados")}
                  className={`rounded-xl border p-3 text-left text-sm ${visibilidad === "solo_registrados" ? "border-navy bg-navy/5 ring-2 ring-navy/15" : "border-black/10"}`}
                >
                  <p className="font-semibold text-navy">Solo registrados</p>
                  <p className="text-xs text-navy/55">Visible únicamente con sesión iniciada</p>
                </button>
              </div>
            </div>
            <p className="rounded-lg bg-black/4 px-3 py-2 text-[11px] leading-4 text-navy/55">
              Al enviar aceptas la política de tratamiento de datos (Ley 1581 de 2012). El contacto se usa
              exclusivamente para conectar actores del ecosistema.
            </p>
          </div>
        )}

        {paso === 4 && (
          <div className="space-y-3 text-sm">
            {[
              ["Tipo de actor", etiquetaTipo[tipo]],
              ["Razón social", razonSocial],
              ["Sector", sector],
              ["Territorio", territorio],
              ["Descripción", descripcion],
              ["Capacidades", capacidades],
              ["Contacto", `${contactoNombre} · ${contactoEmail} (${visibilidad === "publico" ? "público" : "solo registrados"})`],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 border-b border-black/5 pb-2 sm:flex-row sm:gap-4">
                <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-navy/45">{k}</span>
                <span className="text-navy/80">{v}</span>
              </div>
            ))}
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
              El perfil quedará en estado <strong>pendiente de validación</strong> hasta que un analista de ACIEM lo apruebe.
            </p>
          </div>
        )}

        {error && <p className="mt-4 rounded-lg bg-down/8 px-3 py-2 text-xs font-medium text-down">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPaso((p) => Math.max(0, p - 1))}
            disabled={paso === 0}
            className="rounded-full border border-black/12 px-5 py-2 text-sm font-medium text-navy hover:bg-black/5 disabled:opacity-40"
          >
            ← Atrás
          </button>
          {paso < pasos.length - 1 ? (
            <button
              onClick={() => validarPaso() && setPaso((p) => p + 1)}
              className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Continuar →
            </button>
          ) : (
            <button onClick={enviar} className="rounded-full bg-aciem px-5 py-2 text-sm font-semibold text-white hover:bg-aciem-dark">
              Enviar a validación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
