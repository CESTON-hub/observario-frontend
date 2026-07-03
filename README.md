# Observatorio de Datos ACIEM — Frontend

Frontend de demostración del Observatorio ACIEM, implementado a partir de la guía de diseño en Figma (3 pantallas: Home, Indicadores, Dashboard).

Documentación de arquitectura del proyecto: [CESTON-hub/docs-observatorio](https://github.com/CESTON-hub/docs-observatorio).

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **Recharts** para gráficos (sparklines, áreas, barras)
- **d3-geo + topojson-client** para el mapa de Colombia (proyección Mercator real sobre geometría oficial de departamentos)
- **DM Sans** (tipografía del diseño) vía `next/font`
- Datos de demostración en [`src/lib/data.ts`](src/lib/data.ts) — en producción provienen de la API GraphQL definida en el backend-spec

## Pantallas

| Ruta | Contenido |
|---|---|
| Pantalla inicial | Login / registro estilo Ramp (`src/components/AuthScreen.tsx`). Bloquea el acceso hasta iniciar sesión o crear cuenta. |
| `/` | Hero con buscador y búsquedas populares, barra de stats, categorías por sector, indicador destacado con gráfico |
| `/indicadores` | KPIs, filtros por categoría/período/región, grilla de indicadores con sparklines y búsqueda en vivo |
| `/dashboard` | Resumen ejecutivo: KPIs, energía y capital humano por región, mapa de cobertura por regiones, evolución de la matriz energética, lista de indicadores destacados |

## Autenticación (solo frontend)

`src/lib/auth.tsx` implementa un `AuthProvider` con cuentas y sesión persistidas en `localStorage` (sin backend todavía):

- **Primera vez**: el visitante ve el login y puede pulsar "Crea tu cuenta" → formulario con nombre, correo, contraseña y tipo de actor (empresa/gobierno/academia/emprendedor, alineado con el CU-03 de la documentación de arquitectura).
- **Visitas siguientes**: si hay sesión guardada, entra directo a la app (sin flash de login).
- El chip circular con las iniciales del usuario (arriba a la derecha del nav) abre un menú con "Cerrar sesión".
- Este mecanismo es una simulación para la demo — cuando exista el backend (ver `docs/arquitectura/backend-spec.md` del repo de documentación), se reemplaza por `POST /api/auth/registro` y `/api/auth/login` reales, manteniendo la misma interfaz de `useAuth()`.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
```

## Notas

- El logo en `src/components/AciemLogo.tsx` es una reconstrucción vectorial del logotipo oficial de ACIEM (dos triángulos rojos + wordmark) — reemplazar por el archivo de marca oficial (SVG/PNG en alta resolución) cuando esté disponible.
- El mapa de Colombia (`src/components/ColombiaMap.tsx`) usa la geometría oficial de los 33 departamentos (`public/data/colombia-departamentos.json`, TopoJSON simplificado desde el shapefile MGN del DANE) renderizada con `d3-geo` (proyección Mercator ajustada al viewport). Cada departamento se colorea según la cobertura de su región natural (`mapaDepartamentoARegion` en `src/lib/data.ts`); en producción el color vendría por departamento, no por región agregada.
- Colores de marca: azul `#0c1f3d`, rojo ACIEM `#E30613` (definidos en `src/app/globals.css`).
- `react-simple-maps` no soporta React 19 todavía (peer dep en 16/17/18) — por eso el mapa usa `d3-geo` + `topojson-client` directamente en vez de ese wrapper.
