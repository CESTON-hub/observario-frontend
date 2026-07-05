import Link from "next/link";
import { actoresRegistrados, conteoPor, sectoresCiiu, ciudades } from "@/lib/actores";
import { organizaciones, convocatorias } from "@/lib/directorio";

const HOY = "2026-07-05";

const nEmpresas = actoresRegistrados.filter((a) => a.tipoActor === "empresa").length;
const nAcademia = actoresRegistrados.filter((a) => a.tipoActor === "institucion_educativa").length;
const nGobierno = actoresRegistrados.filter((a) => a.tipoActor === "gobierno").length;
const nConvocatorias = convocatorias.filter((c) => c.cierre >= HOY).length;

const stats = [
  { valor: String(nEmpresas), etiqueta: "empresas registradas" },
  { valor: String(nAcademia), etiqueta: "universidades y laboratorios" },
  { valor: String(sectoresCiiu.length), etiqueta: "sectores de ingeniería" },
  { valor: String(ciudades.length), etiqueta: "ciudades" },
  { valor: String(nConvocatorias), etiqueta: "convocatorias abiertas" },
];

const busquedasPopulares = ["Grúa de 200 t", "Laboratorio de estructuras", "IoT industrial", "Proyectos en La Guajira"];

const accesos = [
  {
    href: "/buscar",
    titulo: "Buscador de capacidades",
    descripcion: "Encuentra la universidad, empresa o laboratorio que tiene el equipo, la línea de investigación o la capacidad que necesitas.",
    icono: "🔎",
    color: "#c41414",
    cta: "Buscar en el ecosistema",
  },
  {
    href: "/dashboard",
    titulo: "Directorio de actores",
    descripcion: "Explora cuántas empresas, universidades y entidades hay por sector, actividad económica (CIIU) y territorio.",
    icono: "🗺️",
    color: "#2563eb",
    cta: "Ver el directorio",
  },
  {
    href: "/convocatorias",
    titulo: "Convocatorias e incentivos",
    descripcion: "Becas, financiación y proyectos del gobierno y otras entidades para el ecosistema de ingeniería.",
    icono: "📣",
    color: "#0e9f6e",
    cta: "Ver convocatorias",
  },
];

// Top sectores por número de empresas (dato real del directorio de actores)
const topSectores = conteoPor(
  actoresRegistrados.filter((a) => a.tipoActor === "empresa"),
  (a) => a.sector
).slice(0, 6);
const maxSector = topSectores[0]?.cantidad ?? 1;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[896px] px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Observatorio de Ingeniería · ACIEM
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-[42px] font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[52px]">
            El ecosistema de ingeniería de Colombia, en un solo lugar
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55">
            Empresas, universidades, laboratorios, equipos, líneas de investigación y proyectos: encuéntralos,
            conéctate y consulta las cifras del sector con datos actualizados.
          </p>
          <form action="/buscar" className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                name="q"
                placeholder='¿Qué necesitas? Ej: "grúa de 200 t", "proyectos en La Guajira"...'
                className="h-[50px] w-full rounded-2xl border border-white/20 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/40"
              />
            </div>
          </form>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <span className="text-xs text-white/30">Populares:</span>
            {busquedasPopulares.map((b) => (
              <Link key={b} href={`/buscar?q=${encodeURIComponent(b)}`} className="font-medium text-white/60 underline underline-offset-4 hover:text-white">
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Barra de stats del ecosistema */}
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1129px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-4">
          {stats.map((s) => (
            <p key={s.etiqueta} className="text-sm text-navy/50">
              <span className="mr-1.5 text-base font-bold text-navy">{s.valor}</span>
              {s.etiqueta}
            </p>
          ))}
          <span className="text-xs text-navy/35">· Datos actualizados a julio 2026</span>
        </div>
      </section>

      {/* Accesos principales */}
      <section className="mx-auto max-w-[1129px] px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-navy">¿Qué quieres hacer?</h2>
          <p className="mt-1 text-sm text-navy/50">El observatorio conecta a los actores del sector y difunde sus capacidades.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {accesos.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col rounded-2xl border border-black/6 bg-white p-6 shadow-[0_1px_2px_rgba(12,31,61,0.05)] transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: `${a.color}14` }}>
                {a.icono}
              </span>
              <p className="mt-4 text-lg font-semibold text-navy">{a.titulo}</p>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-navy/55">{a.descripcion}</p>
              <p className="mt-4 text-sm font-semibold text-aciem opacity-80 group-hover:opacity-100">{a.cta} →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* El ecosistema en cifras + registro */}
      <section className="border-t border-black/6 bg-white">
        <div className="mx-auto grid max-w-[1129px] items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-aciem/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-aciem">
              El ecosistema en cifras
            </span>
            <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-tight text-navy">
              Empresas registradas por sector de ingeniería
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy/60">
              El observatorio caracteriza la actividad económica del sector: cuántas organizaciones hay, a qué se
              dedican y dónde operan. Filtra y explora el detalle en el directorio.
            </p>
            <Link href="/dashboard" className="mt-5 inline-block rounded-full bg-aciem px-5 py-2.5 text-sm font-medium text-white hover:bg-aciem-dark">
              Ver el directorio completo
            </Link>
          </div>

          <div className="rounded-2xl border border-black/6 bg-white p-6 shadow-[0_2px_10px_rgba(12,31,61,0.06)]">
            <div className="space-y-3">
              {topSectores.map((s) => (
                <div key={s.nombre}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy/70">{s.nombre}</span>
                    <span className="font-semibold text-navy">{s.cantidad}</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full bg-black/6">
                    <div className="h-2.5 rounded-full bg-navy/70" style={{ width: `${Math.max(8, (s.cantidad / maxSector) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-black/6 pt-3 text-xs">
              <span className="text-navy/45">{organizaciones.length} perfiles detallados en el directorio</span>
              <Link href="/registro" className="font-semibold text-aciem hover:underline">
                Registrar mi organización →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
