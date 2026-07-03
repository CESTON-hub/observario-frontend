// Directorio de demo del ecosistema (organizaciones, capacidades, convocatorias,
// experiencias, boletines) + motor de búsqueda por intención (CU-01) y
// persistencia local de reclamos/registros/validación (CU-03, CU-11, CU-18).
// En producción esto proviene de la API definida en backend-spec.md.

export type TipoOrganizacion = "empresa" | "universidad" | "laboratorio" | "entidad_publica" | "emprendimiento";
export type Disponibilidad = "uso_propio" | "alquiler" | "servicio" | "investigacion";

export type CapacidadDir = {
  nombre: string;
  descripcion: string;
  disponibilidad: Disponibilidad;
};

export type ContactoDir = {
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  visibilidad: "publico" | "solo_registrados";
};

export type OrganizacionDir = {
  id: string;
  razonSocial: string;
  tipo: TipoOrganizacion;
  sector: string;
  descripcion: string;
  territorio: string;
  capacidades: CapacidadDir[];
  lineas: string[];
  proyectos: { nombre: string; territorio: string; estado: string }[];
  contacto: ContactoDir;
  estado: "activa" | "censada_sin_reclamar" | "pendiente_validacion";
  datosDe: string; // fecha de última actualización de los datos
};

export const etiquetaTipo: Record<TipoOrganizacion, string> = {
  empresa: "Empresa",
  universidad: "Universidad",
  laboratorio: "Laboratorio",
  entidad_publica: "Entidad pública",
  emprendimiento: "Emprendimiento",
};

export const etiquetaDisponibilidad: Record<Disponibilidad, string> = {
  uso_propio: "Uso propio",
  alquiler: "Alquiler",
  servicio: "Servicio",
  investigacion: "Investigación",
};

export const organizaciones: OrganizacionDir[] = [
  {
    id: "unal-estructuras",
    razonSocial: "Universidad Nacional — Laboratorio de Estructuras",
    tipo: "laboratorio",
    sector: "Ingeniería Civil",
    descripcion: "Laboratorio de ensayos estructurales y de materiales para investigación y servicios a la industria.",
    territorio: "Bogotá",
    capacidades: [
      { nombre: "Grúa torre de 220 t", descripcion: "Capacidad de izaje de 220 toneladas para ensayos a escala real", disponibilidad: "alquiler" },
      { nombre: "Máquina universal de ensayos 5000 kN", descripcion: "Ensayos de tracción, compresión y flexión de materiales", disponibilidad: "servicio" },
      { nombre: "Cámara climática", descripcion: "Envejecimiento acelerado de materiales", disponibilidad: "investigacion" },
    ],
    lineas: ["Comportamiento sísmico de estructuras", "Materiales de construcción sostenibles"],
    proyectos: [{ nombre: "Refuerzo sísmico de escuelas rurales", territorio: "Boyacá", estado: "en_proceso" }],
    contacto: { nombre: "Ing. Laura Peña", cargo: "Coordinadora de laboratorio", email: "lestructuras@unal.edu.co", telefono: "(601) 316 5000", visibilidad: "publico" },
    estado: "activa",
    datosDe: "2026-05-10",
  },
  {
    id: "udea-automatizacion",
    razonSocial: "Universidad de Antioquia — Grupo de Automatización",
    tipo: "universidad",
    sector: "Ingeniería Electrónica",
    descripcion: "Grupo de investigación en automatización industrial, IoT y sistemas embebidos.",
    territorio: "Medellín",
    capacidades: [
      { nombre: "Banco de pruebas IoT industrial", descripcion: "Red de sensores y gateways para validación de soluciones IoT en entornos industriales", disponibilidad: "investigacion" },
      { nombre: "Osciloscopios de alta frecuencia (4 GHz)", descripcion: "Instrumentación para diseño electrónico", disponibilidad: "servicio" },
    ],
    lineas: ["IoT industrial", "Sistemas embebidos", "Control automático"],
    proyectos: [{ nombre: "Monitoreo IoT de subestaciones", territorio: "Antioquia", estado: "en_proceso" }],
    contacto: { nombre: "PhD. Andrés Mejía", cargo: "Director de grupo", email: "automatizacion@udea.edu.co", telefono: "(604) 219 5555", visibilidad: "publico" },
    estado: "activa",
    datosDe: "2026-06-01",
  },
  {
    id: "hmv-ingenieros",
    razonSocial: "HMV Ingenieros Ltda.",
    tipo: "empresa",
    sector: "Ingeniería Eléctrica",
    descripcion: "Consultoría e interventoría en proyectos de generación y transmisión de energía.",
    territorio: "Medellín",
    capacidades: [
      { nombre: "Diseño de subestaciones de alta tensión", descripcion: "Ingeniería de detalle hasta 500 kV", disponibilidad: "servicio" },
      { nombre: "Estudios de conexión a red", descripcion: "Modelación eléctrica y estudios para la UPME", disponibilidad: "servicio" },
    ],
    lineas: [],
    proyectos: [
      { nombre: "Interventoría parque eólico Windpeshi", territorio: "La Guajira", estado: "en_proceso" },
      { nombre: "Subestación colectora 500 kV", territorio: "La Guajira", estado: "en_proceso" },
    ],
    contacto: { nombre: "Carolina Restrepo", cargo: "Gerente comercial", email: "comercial@h-mv.com", telefono: "(604) 320 1010", visibilidad: "solo_registrados" },
    estado: "activa",
    datosDe: "2026-04-18",
  },
  {
    id: "grupo-energia-guajira",
    razonSocial: "Guajira Eólica S.A.S. E.S.P.",
    tipo: "empresa",
    sector: "Energías Renovables",
    descripcion: "Desarrollo y operación de parques de generación eólica en el norte de Colombia.",
    territorio: "La Guajira",
    capacidades: [
      { nombre: "Torres de medición de viento (120 m)", descripcion: "Campañas de medición del recurso eólico", disponibilidad: "servicio" },
      { nombre: "Grúa de celosía 400 t", descripcion: "Montaje de aerogeneradores; disponible para terceros entre campañas", disponibilidad: "alquiler" },
    ],
    lineas: [],
    proyectos: [{ nombre: "Parque eólico Jouktai (100 MW)", territorio: "La Guajira", estado: "en_proceso" }],
    contacto: { nombre: "Jorge Iguarán", cargo: "Director de operaciones", email: "operaciones@guajiraeolica.co", telefono: "(605) 727 8080", visibilidad: "solo_registrados" },
    estado: "activa",
    datosDe: "2026-06-20",
  },
  {
    id: "upme",
    razonSocial: "UPME — Unidad de Planeación Minero Energética",
    tipo: "entidad_publica",
    sector: "Energía",
    descripcion: "Entidad adscrita a MinEnergía que planea el desarrollo minero-energético y publica convocatorias de transmisión y expansión.",
    territorio: "Bogotá",
    capacidades: [
      { nombre: "Convocatorias públicas de transmisión", descripcion: "Procesos de selección para proyectos del plan de expansión", disponibilidad: "servicio" },
    ],
    lineas: ["Planeación energética", "Cobertura eléctrica"],
    proyectos: [{ nombre: "Plan de expansión de transmisión 2026–2040", territorio: "Nacional", estado: "en_proceso" }],
    contacto: { nombre: "Atención al ciudadano", cargo: "Ventanilla única", email: "info@upme.gov.co", telefono: "(601) 222 0601", visibilidad: "publico" },
    estado: "activa",
    datosDe: "2026-06-30",
  },
  {
    id: "uninorte-hidraulica",
    razonSocial: "Universidad del Norte — Instituto de Hidráulica",
    tipo: "universidad",
    sector: "Ingeniería Civil",
    descripcion: "Investigación en recursos hídricos, hidráulica costera y saneamiento para el Caribe colombiano.",
    territorio: "Barranquilla",
    capacidades: [
      { nombre: "Canal de oleaje de 30 m", descripcion: "Modelación física de estructuras costeras", disponibilidad: "investigacion" },
      { nombre: "Laboratorio de calidad de aguas", descripcion: "Análisis fisicoquímico y microbiológico acreditado", disponibilidad: "servicio" },
    ],
    lineas: ["Hidráulica costera", "Gestión del recurso hídrico"],
    proyectos: [{ nombre: "Protección costera de Riohacha", territorio: "La Guajira", estado: "planeado" }],
    contacto: { nombre: "PhD. Marta Cervantes", cargo: "Directora", email: "hidraulica@uninorte.edu.co", telefono: "(605) 350 9509", visibilidad: "publico" },
    estado: "activa",
    datosDe: "2026-03-22",
  },
  {
    id: "sensortech",
    razonSocial: "SensorTech Colombia",
    tipo: "emprendimiento",
    sector: "Ingeniería Electrónica",
    descripcion: "Startup de sensórica y telemetría para agricultura e industria con hardware propio.",
    territorio: "Bogotá",
    capacidades: [
      { nombre: "Diseño de PCB y prototipado", descripcion: "Prototipos funcionales de electrónica en 2 semanas", disponibilidad: "servicio" },
      { nombre: "Nodos LoRaWAN propios", descripcion: "Telemetría de largo alcance y bajo consumo", disponibilidad: "servicio" },
    ],
    lineas: ["Sensórica de bajo costo"],
    proyectos: [{ nombre: "Telemetría de acueductos rurales", territorio: "Cundinamarca", estado: "en_proceso" }],
    contacto: { nombre: "Daniel Rojas", cargo: "CEO", email: "hola@sensortech.co", telefono: "310 456 7890", visibilidad: "publico" },
    estado: "censada_sin_reclamar",
    datosDe: "2025-11-02",
  },
  {
    id: "lab-metrologia-sic",
    razonSocial: "Laboratorio de Metrología Industrial LMI",
    tipo: "laboratorio",
    sector: "Ingeniería Mecánica",
    descripcion: "Calibración acreditada de equipos de medición dimensional, presión y temperatura.",
    territorio: "Cali",
    capacidades: [
      { nombre: "Calibración dimensional acreditada ONAC", descripcion: "Patrones trazables para industria manufacturera", disponibilidad: "servicio" },
    ],
    lineas: [],
    proyectos: [],
    contacto: { nombre: "Sandra Q.", cargo: "Directora técnica", email: "servicio@lmi.com.co", telefono: "(602) 555 0122", visibilidad: "publico" },
    estado: "censada_sin_reclamar",
    datosDe: "2025-08-15",
  },
];

// ---------------------------------------------------------------------------
// Convocatorias e incentivos (CU-19)

export type Convocatoria = {
  id: string;
  titulo: string;
  emisor: string;
  tipo: "beca" | "financiacion" | "proyecto" | "incentivo";
  sector: string;
  territorio: string;
  cierre: string; // ISO
  descripcion: string;
  url: string;
};

export const convocatorias: Convocatoria[] = [
  { id: "c1", titulo: "Convocatoria de transmisión — Plan de expansión", emisor: "UPME", tipo: "proyecto", sector: "Energía", territorio: "Nacional", cierre: "2026-09-15", descripcion: "Selección de inversionista para nueva línea de transmisión 500 kV Caribe.", url: "#" },
  { id: "c2", titulo: "Becas de doctorado en ingeniería", emisor: "MinCiencias", tipo: "beca", sector: "Todos", territorio: "Nacional", cierre: "2026-08-01", descripcion: "Financiación completa de doctorados nacionales en áreas de ingeniería.", url: "#" },
  { id: "c3", titulo: "Fondo de energías comunitarias — La Guajira", emisor: "MinEnergía", tipo: "financiacion", sector: "Energías Renovables", territorio: "La Guajira", cierre: "2026-07-30", descripcion: "Cofinanciación de soluciones solares y eólicas para comunidades wayúu.", url: "#" },
  { id: "c4", titulo: "Incentivo tributario I+D+i (Ley 1715)", emisor: "DIAN — MinCiencias", tipo: "incentivo", sector: "Energías Renovables", territorio: "Nacional", cierre: "2026-12-31", descripcion: "Deducción del 50% de la inversión en proyectos de fuentes no convencionales.", url: "#" },
  { id: "c5", titulo: "Retos de innovación en agua y saneamiento", emisor: "MinVivienda", tipo: "proyecto", sector: "Agua y Saneamiento", territorio: "Nacional", cierre: "2026-06-15", descripcion: "Soluciones de potabilización de bajo costo para zonas rurales dispersas.", url: "#" },
];

// ---------------------------------------------------------------------------
// Publicaciones y experiencias (CU-09, CU-10)

export const boletines = [
  { id: "b1", titulo: "Boletín I-2026 · Tránsito efectivo de proyectos de transmisión", periodo: "Marzo 2026", resumen: "El 68% de los proyectos del plan de expansión avanzó de licenciamiento a construcción dentro del plazo." },
  { id: "b2", titulo: "Boletín II-2026 · Desviación de hitos en generación renovable", periodo: "Mayo 2026", resumen: "Los parques eólicos de La Guajira acumulan una desviación media de 8 meses por consultas previas." },
  { id: "b3", titulo: "Boletín III-2026 · Costos y escenarios de la matriz energética", periodo: "Julio 2026", resumen: "Escenarios de participación renovable al 2030 bajo tres supuestos de demanda." },
];

export type Experiencia = {
  id: string;
  titulo: string;
  organizacion: string;
  fase: string;
  impacto: string;
  resumen: string;
};

export const experiencias: Experiencia[] = [
  { id: "e1", titulo: "Monitoreo IoT de subestaciones", organizacion: "U. de Antioquia + ISA", fase: "Operación", impacto: "Reducción de fallas", resumen: "Sensórica de bajo costo redujo 34% las interrupciones no programadas en 12 subestaciones piloto." },
  { id: "e2", titulo: "Refuerzo sísmico de escuelas rurales", organizacion: "U. Nacional — Lab. Estructuras", fase: "Ejecución", impacto: "Infraestructura resiliente", resumen: "Metodología de refuerzo de bajo costo aplicada en 18 sedes educativas de Boyacá." },
  { id: "e3", titulo: "Telemetría de acueductos rurales", organizacion: "SensorTech Colombia", fase: "Piloto", impacto: "Cobertura de agua", resumen: "Nodos LoRaWAN permiten detectar pérdidas en acueductos veredales sin conectividad celular." },
  { id: "e4", titulo: "Energía comunitaria wayúu", organizacion: "Guajira Eólica + comunidades", fase: "Ejecución", impacto: "Transición justa", resumen: "Modelo de participación comunitaria en beneficios del parque Jouktai, replicable en otros proyectos." },
];

// ---------------------------------------------------------------------------
// Motor de búsqueda (CU-01, versión frontend de SEQ-01)

export type Intencion = "contratar" | "investigar" | "financiacion" | "general";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const territorios = ["la guajira", "bogota", "medellin", "antioquia", "boyaca", "barranquilla", "cali", "cundinamarca"];

export function interpretarConsulta(q: string): { intencion: Intencion; territorio: string | null } {
  const s = norm(q);
  let intencion: Intencion = "general";
  if (/(convocatoria|beca|financiaci|incentivo|fondo|subsidio)/.test(s)) intencion = "financiacion";
  else if (/(investigar|investigaci|laboratorio|ensayo|grupo de|linea de|doctorado|paper)/.test(s)) intencion = "investigar";
  else if (/(alquilar|alquiler|contratar|comprar|proveedor|servicio|cotizar|montaje)/.test(s)) intencion = "contratar";
  const territorio = territorios.find((t) => s.includes(t)) ?? null;
  return { intencion, territorio };
}

export type ResultadoBusqueda = {
  org: OrganizacionDir;
  score: number;
  coincidencias: string[];
  justificacion: string;
};

export function buscarOrganizaciones(
  q: string,
  filtros: { tipo?: string; sector?: string } = {}
): { interpretacion: ReturnType<typeof interpretarConsulta>; resultados: ResultadoBusqueda[]; convocatorias: Convocatoria[] } {
  const interpretacion = interpretarConsulta(q);
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 2);

  const resultados: ResultadoBusqueda[] = organizaciones
    .filter((o) => o.estado !== "pendiente_validacion")
    .filter((o) => (filtros.tipo ? o.tipo === filtros.tipo : true))
    .filter((o) => (filtros.sector ? o.sector === filtros.sector : true))
    .map((org) => {
      let score = 0;
      const coincidencias: string[] = [];

      const campos: { texto: string; peso: number; etiqueta: string }[] = [
        { texto: org.razonSocial, peso: 3, etiqueta: "" },
        { texto: org.descripcion, peso: 1, etiqueta: "" },
        { texto: org.sector, peso: 2, etiqueta: "" },
        ...org.capacidades.map((c) => ({ texto: `${c.nombre} ${c.descripcion}`, peso: 4, etiqueta: `Capacidad: ${c.nombre} (${etiquetaDisponibilidad[c.disponibilidad].toLowerCase()})` })),
        ...org.lineas.map((l) => ({ texto: l, peso: 3, etiqueta: `Línea de investigación: ${l}` })),
        ...org.proyectos.map((p) => ({ texto: `${p.nombre} ${p.territorio}`, peso: 3, etiqueta: `Proyecto ${p.estado === "en_proceso" ? "activo" : "planeado"}: ${p.nombre} (${p.territorio})` })),
      ];

      for (const campo of campos) {
        const t = norm(campo.texto);
        const hits = terms.filter((term) => t.includes(term)).length;
        if (hits > 0) {
          score += hits * campo.peso;
          if (campo.etiqueta && !coincidencias.includes(campo.etiqueta)) coincidencias.push(campo.etiqueta);
        }
      }

      // Boost territorial: sede o proyectos en el territorio de la consulta
      if (interpretacion.territorio) {
        const enTerritorio =
          norm(org.territorio).includes(interpretacion.territorio) ||
          org.proyectos.some((p) => norm(p.territorio).includes(interpretacion.territorio!));
        if (enTerritorio) {
          score += 6;
          const proys = org.proyectos.filter((p) => norm(p.territorio).includes(interpretacion.territorio!));
          for (const p of proys) {
            const yaListado = coincidencias.some((c) => c.includes(p.nombre));
            if (!yaListado) coincidencias.push(`Proyecto activo en ${p.territorio}: ${p.nombre}`);
          }
        } else if (score === 0) {
          return { org, score: 0, coincidencias: [], justificacion: "" };
        }
      }

      // Boost por intención: investigar → academia; contratar → empresas con servicio/alquiler
      if (interpretacion.intencion === "investigar" && (org.tipo === "universidad" || org.tipo === "laboratorio")) score *= 1.5;
      if (interpretacion.intencion === "contratar" && (org.tipo === "empresa" || org.tipo === "emprendimiento")) score *= 1.4;
      if (interpretacion.intencion === "contratar" && org.capacidades.some((c) => c.disponibilidad === "alquiler" || c.disponibilidad === "servicio")) score += 2;

      const razones = [...new Set(coincidencias.map((c) => c.split(": ")[1] ?? c))];
      const justificacion =
        razones.length > 0
          ? `Recomendada porque registra ${razones.slice(0, 2).join(" y ")}.`
          : score > 0
            ? `Coincide con tu búsqueda en su perfil (${org.sector}).`
            : "";

      return { org, score, coincidencias, justificacion };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const convocatoriasMatch =
    interpretacion.intencion === "financiacion" || terms.some((t) => ["convocatoria", "beca", "fondo"].includes(t))
      ? convocatorias.filter((c) => {
          const t = norm(`${c.titulo} ${c.descripcion} ${c.sector} ${c.territorio}`);
          return terms.some((term) => t.includes(term)) || (interpretacion.territorio ? t.includes(interpretacion.territorio) : true);
        })
      : interpretacion.territorio
        ? convocatorias.filter((c) => norm(c.territorio).includes(interpretacion.territorio!))
        : [];

  return { interpretacion, resultados, convocatorias: convocatoriasMatch };
}

// ---------------------------------------------------------------------------
// Estado local (reclamos CU-18, registros CU-03, validación CU-11)
// Solo llamar desde componentes cliente.

const RECLAMOS_KEY = "aciem_reclamos"; // { [orgId]: { reclamadaPor: email, confirmadoEn: string | null } }
const REGISTROS_KEY = "aciem_registros_pendientes"; // organizaciones registradas por el wizard
const DECISIONES_KEY = "aciem_decisiones_validacion"; // { [id]: "aprobado" | "rechazado" }

export type Reclamo = { reclamadaPor: string; confirmadoEn: string | null };

export function leerReclamos(): Record<string, Reclamo> {
  try {
    return JSON.parse(localStorage.getItem(RECLAMOS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function reclamarOrganizacion(orgId: string, email: string) {
  const r = leerReclamos();
  r[orgId] = { reclamadaPor: email, confirmadoEn: null };
  localStorage.setItem(RECLAMOS_KEY, JSON.stringify(r));
}

export function confirmarDatos(orgId: string) {
  const r = leerReclamos();
  if (r[orgId]) {
    r[orgId].confirmadoEn = new Date().toISOString();
    localStorage.setItem(RECLAMOS_KEY, JSON.stringify(r));
  }
}

export type RegistroPendiente = {
  id: string;
  razonSocial: string;
  tipo: TipoOrganizacion;
  sector: string;
  territorio: string;
  descripcion: string;
  capacidades: string;
  contactoNombre: string;
  contactoEmail: string;
  visibilidad: "publico" | "solo_registrados";
  enviadoPor: string;
  enviadoEn: string;
  fuente: string;
};

export function leerRegistrosPendientes(): RegistroPendiente[] {
  try {
    return JSON.parse(localStorage.getItem(REGISTROS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function agregarRegistroPendiente(r: Omit<RegistroPendiente, "id" | "enviadoEn" | "fuente">) {
  const lista = leerRegistrosPendientes();
  lista.push({ ...r, id: `reg-${Date.now()}`, enviadoEn: new Date().toISOString(), fuente: "Autoregistro (formulario web)" });
  localStorage.setItem(REGISTROS_KEY, JSON.stringify(lista));
}

export function leerDecisiones(): Record<string, "aprobado" | "rechazado"> {
  try {
    return JSON.parse(localStorage.getItem(DECISIONES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function decidirValidacion(id: string, decision: "aprobado" | "rechazado") {
  const d = leerDecisiones();
  d[id] = decision;
  localStorage.setItem(DECISIONES_KEY, JSON.stringify(d));
}

// Ítems sembrados en la cola (simulan extracción ETL/IA pendiente, CU-17 → CU-11)
export const colaSembrada: (RegistroPendiente & { confianza: number })[] = [
  {
    id: "etl-001",
    razonSocial: "Electro Montajes del Caribe S.A.S.",
    tipo: "empresa",
    sector: "Ingeniería Eléctrica",
    territorio: "Barranquilla",
    descripcion: "Montajes electromecánicos y mantenimiento de subestaciones (extraído de registro de Cámara de Comercio, CIIU 4321).",
    capacidades: "Montaje de subestaciones hasta 115 kV; cuadrillas certificadas de trabajo en altura",
    contactoNombre: "—",
    contactoEmail: "gerencia@electromontajescaribe.co",
    visibilidad: "solo_registrados",
    enviadoPor: "ETL Cámara de Comercio",
    enviadoEn: "2026-07-01T09:00:00Z",
    fuente: "Cámara de Comercio de Barranquilla · fila 1.204 del CSV",
    confianza: 0.93,
  },
  {
    id: "etl-002",
    razonSocial: "Fundación Centro de Innovación Hídrica",
    tipo: "laboratorio",
    sector: "Agua y Saneamiento",
    territorio: "Cali",
    descripcion: "Extraído por OCR+LLM de informe PDF del gremio; verificar razón social exacta.",
    capacidades: "Planta piloto de potabilización modular; laboratorio de microbiología",
    contactoNombre: "—",
    contactoEmail: "—",
    visibilidad: "publico",
    enviadoPor: "Extracción LLM (PDF)",
    enviadoEn: "2026-07-02T14:30:00Z",
    fuente: "Informe sectorial 2025, página 34 (tabla 7)",
    confianza: 0.61,
  },
];
