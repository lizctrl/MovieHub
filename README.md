# MovieHub · Code by Liz

Aplicación de descubrimiento de películas y series construida con Vite y TypeScript, sin frameworks de interfaz.

## Estado actual: etapa 2

Base visual responsive y navegación accesible. Integración con TMDB: tendencias semanales, películas populares y mejor valoradas, series populares y en tendencia. Hero con película real, tarjetas, skeletons, estados vacíos, errores con reintento e imágenes de respaldo. Búsqueda, filtros, detalles y favoritos persistentes corresponden a próximas etapas.

## Desarrollo local

```bash
npm install
npm run dev
```

Usa una versión de Node compatible con el Vite instalado. Abre la dirección que indica Vite.

```bash
npm run build
npm run preview
```

La compilación verifica TypeScript antes de generar `dist/`.

## Arquitectura

- `src/main.ts`: montaje de la aplicación.
- `src/router.ts`: rutas hash y títulos de página.
- `src/components/`: componentes DOM reutilizables.
- `src/pages/`: vistas.
- `src/styles/main.css`: tokens, estilos globales y responsive.
- `src/types/`: contratos TypeScript.
- `src/services/` y `src/utils/`: reservados para las próximas etapas.

Las rutas hash permiten recargar y usar Atrás/Adelante sin reglas de reescritura del servidor. Los componentes usan HTML estático interno; los datos externos deberán insertarse como texto seguro al conectar la API.

## Comprobación manual

1. Navega entre las cuatro secciones y comprueba el enlace activo.
2. Recarga `/#/movies` y usa Atrás/Adelante.
3. Reduce la ventana a 375 px, abre el menú y ciérralo con Escape.
4. Usa Tab y Enter, incluido el enlace «Saltar al contenido».
5. Visita `/#/desconocida` para comprobar la página 404.
6. Activa movimiento reducido en tu sistema para desactivar las animaciones.

## Configuración de TMDB

1. Crea una cuenta en [TMDB](https://www.themoviedb.org/).
2. Solicita acceso desde [Configuración → API](https://www.themoviedb.org/settings/api), aceptando sus condiciones.
3. Copia `.env.example` a `.env.local`.
4. Pega tu **API Read Access Token** (no la API key) como valor de `VITE_TMDB_READ_ACCESS_TOKEN`, sin el prefijo Bearer.
5. Reinicia `npm run dev`. Para producción, configura la variable antes de compilar.

Los archivos locales de entorno están excluidos de Git. No compartas tu token en el chat ni lo incluyas en capturas.

```dotenv
VITE_TMDB_READ_ACCESS_TOKEN=tu_token_de_lectura
```

Sin token aparece una guía de configuración. Un token inválido muestra un error con reintento; las peticiones tienen un límite de espera de 15 segundos y se cancelan al abandonar la vista. Cada sección falla de forma independiente.

El servicio usa `Authorization: Bearer`, `language=es-ES` y los endpoints `/trending/all/week`, `/movie/popular`, `/movie/top_rated`, `/tv/popular` y `/trending/tv/week`. Normaliza `title`/`name` y `release_date`/`first_air_date` en un modelo común. Las personas se excluyen de tendencias. Los textos remotos se escapan antes de insertarlos en HTML.

- [Autenticación oficial](https://developer.themoviedb.org/docs/authentication-application)
- [Tendencias](https://developer.themoviedb.org/reference/trending-all)
- [Atribución y términos de uso](https://developer.themoviedb.org/docs/faq)

La sección de créditos incluye el logo de TMDB y su aviso de atribución. La disponibilidad, límites y permisos de uso dependen de TMDB; el uso comercial puede requerir una licencia distinta.

### Verificación de la integración

Con token válido, comprueba el hero y las cuatro secciones de Inicio, después Películas y Series. Simula conexión sin red en DevTools y pulsa Reintentar tras restaurarla. Usa un token inválido para comprobar el error de autorización. Cambia rápidamente de ruta para comprobar que no aparecen resultados de la vista anterior. Las tarjetas aún son informativas; los detalles llegarán en la etapa 4.

**Las variables `VITE_` son públicas:** quedan dentro del JavaScript enviado al navegador. Para mantener una credencial privada se necesita una función serverless que centralice las peticiones y aplique límites de uso.

## Próximas etapas

3. Búsqueda, filtros y paginación.
4. Detalles.
5. Favoritos en localStorage.
6. Refinamiento visual y accesibilidad.
7. Pruebas, documentación y publicación.
