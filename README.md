# Ana Sofía Chávez Salas — Engineering Portfolio

Portfolio en inglés con Next.js App Router, TypeScript y Tailwind CSS. Identidad azul noche, rosa profundo y rosa luminoso; composiciones editoriales, órbitas CSS y espacio para fotografías reales. Las ilustraciones son conceptuales, no CAD ni representaciones de proyectos realizados.

## Ejecutar

Node.js 20.9 o posterior y npm:

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. Para comprobar y ejecutar producción:

```sh
npm run build
npm start
```

## Reemplazar la foto de portada

Coloca tu retrato en **`public/images/ana-sofia-portrait.webp`**. Es la misma imagen que aparece en Home y About. No necesitas editar componentes: el servidor detecta el archivo y sustituye el placeholder. Recarga en desarrollo; vuelve a ejecutar `npm run build` para producción. Recomendación: retrato vertical, al menos 800 × 1000 px, con el rostro en la zona central; WebP comprimido, preferentemente menor de 300 KB.

Si prefieres JPG, cambia únicamente `profile.portrait.src` a `/images/ana-sofia-portrait.jpg` en `src/data/portfolio.ts`. Allí también puedes editar `alt` y `caption`. No se incluye una cara generada ni una fotografía ajena.

## Archivos y contenido

Todo el contenido editable está en **`src/data/portfolio.ts`**. Los campos opcionales se omiten cuando falta material. Las colecciones vacías muestran espacios pendientes claramente identificados.

| Material                                | Carpeta de archivos                     | Campo de datos                           |
| --------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Retrato                                 | `public/images/ana-sofia-portrait.webp` | `profile.portrait`                       |
| Portadas y galerías de proyectos        | `public/images/projects/`               | `projects[].cover` y `projects[].photos` |
| Fotografías personales                  | `public/images/about/`                  | `photos`                                 |
| Fotos de premios                        | `public/images/awards/`                 | `awards[].photo` o `photos`              |
| Thumbnails de medios                    | `public/images/media/`                  | `media[].photo` o `video.poster`         |
| Fotos de competencias                   | `public/images/competitions/`           | `competitions[].photo` o `photos`        |
| Videos locales                          | `public/videos/`                        | `videos[].src` o `video.src`             |
| Subtítulos WebVTT                       | `public/captions/`                      | `video.captions`                         |
| Resume y technical binders              | `public/documents/`                     | `profile.resume`, `projects[].binder`    |
| Otros PDFs y transcripciones            | `public/documents/`                     | `documents[]`, `video.transcript`        |
| Artículos, entrevistas y notas externas | No requieren archivo local              | `media[].href`                           |

Crea las subcarpetas cuando las necesites. Una ruta pública **no lleva `public`**: `public/images/projects/foto.webp` se referencia como `/images/projects/foto.webp`. Usa nombres sin espacios ni acentos. Las imágenes se sirven con `next/image`; por defecto utiliza imágenes locales. Incluye un `alt` descriptivo y un pie de foto en `caption`.

## Agregar un proyecto

Agrega una entrada a `projects`, con un `slug` único y una categoría de `disciplines`. La ruta individual y los filtros se generan automáticamente; las primeras dos entradas aparecen en Home. Sustituye los textos entre corchetes por información verificada antes de publicar:

```ts
{
  slug: 'nombre-del-proyecto',
  title: '[Título confirmado]',
  category: 'Aerospace',
  summary: '[Resumen confirmado]',
  status: 'published',
  year: '[Año confirmado]',
  role: '[Mi rol confirmado]',
  cover: { src: '/images/projects/portada.webp', alt: '[Descripción]', caption: '[Pie]' },
  problem: '[Problema y contexto]',
  process: '[Proceso, herramientas y decisiones publicables]',
  contribution: '[Mi contribución individual]',
  results: '[Resultados documentados]',
  sections: [], // Secciones adicionales opcionales: { title, body }
  photos: [{ src: '/images/projects/detalle.webp', alt: '[Descripción]', caption: '[Pie]' }],
  videos: [{ title: '[Título]', src: '/videos/demostracion.mp4', captions: '/captions/demostracion.en.vtt', transcript: '/documents/transcripcion.txt' }],
  binder: '/documents/binder.pdf',
  documents: [{ title: '[Documento adicional]', src: '/documents/anexo.pdf' }],
}
```

`status: 'placeholder'` identifica contenido pendiente; **no oculta los datos ni protege archivos privados**. Los apartados sin datos se marcan como pendientes. Las secciones adicionales de la versión anterior se conservan y siguen funcionando.

## Agregar medios, entrevistas y artículos

Cada entrada permite tipo, fecha, medio (`organization`), descripción, thumbnail y enlace. Por ejemplo, agrega a `media`:

```ts
{
  kind: 'Article', // 'Video', 'Interview', 'Article' o 'Television'
  title: '[Título real de la publicación]',
  organization: '[Nombre del medio]',
  date: '[Fecha verificada]',
  description: '[Descripción verificada]',
  photo: { src: '/images/media/nota.webp', alt: '[Descripción]', caption: '[Crédito o pie]' },
  href: 'https://medio.example/enlace-original',
}
```

Para un video insertado, agrega `video` a la entrada:

```ts
video: {
  title: '[Título del video]',
  embedUrl: 'https://www.youtube-nocookie.com/embed/ID_REAL',
  poster: { src: '/images/media/video.webp', alt: '[Descripción]', caption: '[Pie]' },
  description: '[Descripción]',
  transcript: '/documents/transcripcion.txt',
}
```

Usa la URL de inserción, no la URL `watch`. Se aceptan YouTube (`youtube.com/embed/ID` o `youtube-nocookie.com/embed/ID`) y Vimeo (`player.vimeo.com/video/ID`). El reproductor externo se carga **solo al pulsar** el botón; YouTube se normaliza al dominio sin cookies y Vimeo usa `dnt=1`. No hay autoplay. Para otros proveedores, usa `href` para enlazar al original.

Para video local, usa `src: '/videos/nombre.mp4'` (H.264/AAC recomendado) en lugar de `embedUrl`. Puedes añadir `poster`, `captions` (WebVTT), `captionLanguage: 'en'` y `transcript`. Agrega subtítulos o una transcripción cuando haya voz. Para clips largos, prefiere un proveedor externo para no cargar el repositorio con videos pesados.

## Premios, experiencia, liderazgo y competencias

Agrega entradas a `awards`, `experiences`, `leadership` o `competitions`:

```ts
{
  title: '[Nombre del reconocimiento o rol]',
  organization: '[Organización confirmada]',
  year: '[Año confirmado]',
  date: '[Fecha o intervalo confirmado]',
  description: '[Descripción verificada]',
  photo: { src: '/images/awards/reconocimiento.webp', alt: '[Descripción]', caption: '[Pie]' },
  href: 'https://fuente.example/enlace',
}
```

`year`, `date`, `photo` y `href` son opcionales. También puedes agregar `photos`, `video` y `documents`. Ordena las entradas en el archivo para controlar la cronología. Awards destaca el año; Experience y Leadership usan una línea de tiempo; Media tiene composición editorial; Competitions admite imágenes y galerías.

FIRST Robotics, NASA Space Apps y futuras competencias tienen espacios reservados. Eso **no afirma participación, premios ni resultados**. Sustituye los espacios con entradas confirmadas cuando esté disponible el resume.

## Resume y contacto

- Coloca el resume autorizado en `public/documents/resume.pdf` y configura `profile.resume: '/documents/resume.pdf'`.
- Completa `profile.email` y `profile.linkedin` para activar sus enlaces.
- El visor permite abrir/cerrar el PDF, descargarlo y abrir el original. El enlace alternativo sigue disponible en móviles sin visor PDF integrado.
- No hay formulario que finja enviar mensajes ni descargas de documentos inexistentes.

## Componentes y diseño

- `src/components/assets.tsx`: `MediaImage`, `Gallery`, `VideoPlayer`, `PdfViewer`.
- `src/components/portrait.tsx`: retrato automático con fallback al placeholder.
- `src/components/collection.tsx`: presentaciones de premios, medios, experiencia, liderazgo y competencias.
- `src/components/project-grid.tsx`: proyectos destacados, catálogo y filtros.
- `src/components/site-shell.tsx`: navegación, transiciones de entrada y footer.
- `src/app/globals.css`: paleta, anchos máximos compartidos, tipografía y responsive.
- `src/app/projects/[slug]/page.tsx`: case studies con índice por capítulos.

Galerías: click/touch para ampliar, botones o flechas del teclado para navegar, swipe horizontal en móvil y Escape para cerrar. El diálogo atrapa el foco y lo devuelve al disparador. Las imágenes rotas muestran un fallback. Las animaciones se limitan a entradas e interacciones y respetan `prefers-reduced-motion`, incluso si cambia mientras se navega. No hay animaciones infinitas ni librerías pesadas para los efectos orbitales.

## Comprobar

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

Las pruebas Playwright usan Google Chrome instalado (`channel: 'chrome'`). Si no está instalado, ejecuta `npx playwright install chromium` y elimina `channel` en `playwright.config.ts`. El servidor se inicia automáticamente si no está activo.

Se comprueban rutas, navegación principal/secundaria, filtros, teclado, movimiento reducido, 404, auditorías axe WCAG A/AA, ausencia de desbordamientos, galería, PDF, reproducción de video local y carga de video externo bajo demanda. Las capturas se guardan en `artifacts/`, ignorado por Git.

Los tests de medios usan archivos sintéticos y respuestas de red interceptadas; no agregan información a tu portfolio. Durante `npm test`, se monta una página temporal de componentes que se elimina al terminar y devuelve 404 en producción. Si una interrupción deja `src/app/media-component-test/page.tsx`, elimina ese archivo temporal antes de repetir los tests. Las pruebas automáticas no sustituyen la revisión manual ni la validación de tus documentos finales.

## Fuentes y publicación

Se conserva todo el contenido confirmado de la primera versión. El resume no estuvo disponible: los datos biográficos proceden del mensaje inicial (nombre, universidad, carrera, minor y áreas de interés). No se inventaron experiencias, premios, fechas, entrevistas, resultados o contenido técnico.

No hay fotos de otras personas, rostros generados, CAD, material interno ni detalles de Idaho National Laboratory. Todo lo colocado en `public/` es público aunque no tenga enlace: añade únicamente archivos aprobados para publicación. El material de INL requiere tu aprobación explícita.

El sitio queda ejecutándose localmente; no se ha desplegado públicamente.
