# GBS_WEB

Sitio web corporativo de **GBS**, empresa de TI (infraestructura y cloud,
ciberseguridad, desarrollo de software, mesa de soporte, consultoría IT y
data & analytics), con sede en Lima, Perú.

## Estructura del proyecto

```
GBS_WEB/
├── index.html              → Página de inicio
├── pages/
│   ├── nosotros.html        → Historia, misión/visión, equipo, certificaciones
│   ├── servicios.html       → Catálogo detallado de los 6 servicios
│   ├── soluciones.html      → Soluciones por industria y por necesidad
│   ├── clientes.html        → Casos de éxito, métricas y testimonios
│   ├── blog.html            → Grid de artículos + newsletter
│   └── contacto.html        → Formulario de contacto + FAQ
├── components/               → Fragmentos HTML de referencia (ver nota abajo)
├── assets/
│   ├── css/styles.css        → Sistema de diseño completo (un solo archivo)
│   ├── js/main.js            → Menú móvil, reloj, animación del hero, formulario
│   ├── img/ icons/ fonts/ videos/  → Vacías, listas para tus archivos
└── docs/                     → manual.pdf y documentacion.docx (placeholders)
```

## Identidad visual

- **Paleta:** tinta `#111826` (fondo oscuro), papel `#EFEEE9`, grafito `#1D2430`
  (texto), ámbar `#E8A33D` (acento principal / CTA), teal `#2BA6A4` (acento
  secundario), verde `#3FB871` (solo para indicadores de estado "operativo").
- **Tipografía:** Space Grotesk (títulos), IBM Plex Sans (cuerpo), IBM Plex
  Mono (datos, SLA, estados — cargadas desde Google Fonts, requieren internet
  la primera vez que se abre el sitio).
- **Elemento de marca:** una barra de estado tipo dashboard de monitoreo en la
  parte superior de cada página (uptime, SLA, hora en Lima) y un diagrama de
  topología de red animado en el hero de inicio.

## Cómo verlo

Simplemente abre `index.html` en tu navegador — no necesita servidor ni
build. Para mejor experiencia (y para poder inyectar componentes vía
`fetch()` en el futuro) puedes servirlo con un servidor local:

```bash
npx serve GBS_WEB
```

## Sobre la carpeta `components/`

Cada página ya trae su propio header, navbar y footer embebidos directamente
en el HTML (así funciona bien abriendo el archivo con doble clic, sin
servidor). Los archivos en `components/` son la **versión de referencia** de
esos mismos bloques: úsalos como fuente única si más adelante migras a un
framework (Astro, 11ty, Next, etc.) o si montas un servidor y quieres
inyectarlos con JavaScript.

## Selector de idioma

El header incluye un selector de idioma (🇪🇸 🇺🇸 🇧🇷 🇫🇷 🇩🇪 🇮🇹) que cambia el
texto sin recargar la página, con **español como idioma por defecto**, y
recuerda la elección del visitante (`localStorage`) entre páginas.

- `assets/js/translations.js` — diccionario con el texto en los 6 idiomas.
- `assets/js/i18n.js` — motor que construye el selector y aplica la traducción
  a cualquier elemento con `data-i18n="clave"` (texto plano) o
  `data-i18n-html="clave"` (cuando el texto trae `<em>`, `<strong>`, etc.).

**Alcance de la traducción actual:** header, navegación, footer y barra de
estado (presentes en las 7 páginas) están 100% traducidos, igual que **todo**
el contenido de `index.html`. En las 6 páginas internas se tradujo el bloque
principal (encabezado de la página), pero el resto del cuerpo (tarjetas,
timeline, formulario, FAQ, artículos del blog) sigue solo en español — quedó
preparado el mismo mecanismo (`data-i18n`) para extenderlo, es cuestión de
etiquetar esos textos y agregar sus claves en `translations.js`. Puedo
completarlo si quieres que todo el sitio quede 100% traducido.

## Contenido pendiente de reemplazar

Todo el copy (textos, cifras de "empresas atendidas", nombres de clientes,
integrantes del equipo, artículos del blog) es contenido de ejemplo para que
el sitio se vea completo desde el día uno. Antes de publicar, reemplaza:

- [ ] Datos de contacto reales (dirección, teléfonos, correos)
- [ ] Nombres y logos reales de clientes en `clientes.html` e `index.html`
- [ ] Equipo directivo en `nosotros.html`
- [ ] Artículos del blog (actualmente son títulos de ejemplo)
- [ ] `docs/manual.pdf` y `docs/documentacion.docx` (están vacíos)
- [ ] Conectar `#contact-form` en `contacto.html` a un backend real (ahora
      solo simula el envío en `assets/js/main.js`)

## Próximos pasos sugeridos

- Agregar imágenes reales en `assets/img/` (logo, fotos de equipo, oficinas).
- Conectar el formulario de contacto a un servicio real de envío de correos.
- Añadir favicon en `assets/icons/`.
