# MAQUETA — TecnoStore (Evaluación Formativa 1 · DSY1104)

Tienda web de tecnología con sistema de registro/ingreso.
Stack: **HTML5 semántico + Tailwind CSS v4 (CLI) + JavaScript vanilla**. Sin frameworks, sin backend.

> Guía para codificar por partes. Cada sección del sitio tiene un código (`p0`–`p5`) que se usa
> también como prefijo de los commits de Git (ver sección 9).

---

## 1. Árbol de archivos final

```
prueba_formativa/
├── index.html                  → p1 · Home (hero, destacados, video, footer)
├── pages/
│   ├── productos.html          → p2 · Catálogo (grid de <article> con fotos)
│   ├── registro.html           → p3 · Formulario de registro (validado en JS)
│   ├── login.html              → p4 · Formulario de ingreso (validado en JS)
│   └── contacto.html           → p5 · Formulario de contacto (validado en JS)
├── assets/
│   ├── css/
│   │   └── style.css           → CSS externa ÚNICA (generada por Tailwind, no editar a mano)
│   ├── src/
│   │   └── code.css            → Entrada de Tailwind: @import "tailwindcss";
│   ├── js/
│   │   ├── registro.js         → validaciones de p3
│   │   ├── login.js            → validaciones de p4
│   │   └── contacto.js         → validaciones de p5
│   └── images/
│       ├── logo.svg            → logo simple hecho a mano
│       ├── hero.jpg            → banner del home
│       └── prod-*.jpg          → 8 fotos de productos (ver sección 8)
├── docs/                       → pauta PDF + este archivo
├── package.json                → scripts build/watch de Tailwind
└── README.md                   → descripción del proyecto y cómo compilar
```

**Ojo con las rutas relativas:** los archivos dentro de `pages/` referencian todo con `../`
(ej: `../assets/css/style.css`, `../index.html`). Entre páginas del mismo directorio, directo
(ej: `registro.html`).

---

## 2. Workflow Tailwind (p0)

Agregar a `package.json`:

```json
"scripts": {
  "build": "tailwindcss -i assets/src/code.css -o assets/css/style.css --minify",
  "watch": "tailwindcss -i assets/src/code.css -o assets/css/style.css --watch"
}
```

- Mientras se codifica: dejar corriendo `npm run watch` en una terminal.
- Antes de cada commit/entrega: `npm run build` (minificado final).
- **No usar CDN**: el criterio IE1.1.4 exige una hoja de estilos CSS externa, y `style.css`
  compilado cumple eso (todas las páginas linkean el mismo archivo).
- Clases utilitarias personalizadas reutilizables (botones, inputs) pueden definirse en
  `assets/src/code.css` con `@utility` o `@layer components` para no repetir tanto class.

Ejemplo para `assets/src/code.css`:

```css
@import "tailwindcss";

@layer components {
  .btn-primary {
    @apply bg-sky-600 text-white font-medium px-4 py-2 rounded-md hover:bg-sky-700 transition-colors;
  }
  .campo {
    @apply w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500;
  }
}
```

---

## 3. Plantilla base compartida (copiar en las 5 páginas)

Cumple IE1.1.1 (estructura semántica) e IE1.1.4 (misma CSS externa en todas).

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TecnoStore | Inicio</title>   <!-- cambiar por página -->
  <link rel="stylesheet" href="assets/css/style.css"> <!-- en pages/: ../assets/css/style.css -->
</head>
<body class="bg-gray-50 text-gray-800 min-h-screen flex flex-col">

  <header class="bg-slate-900 text-white shadow-md">
    <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
      <a href="index.html" class="flex items-center gap-2">   <!-- en pages/: ../index.html -->
        <img src="assets/images/logo.svg" alt="Logo de TecnoStore" class="h-8 w-8">
        <span class="text-xl font-bold">TecnoStore</span>
      </a>
      <nav aria-label="Navegación principal">
        <ul class="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="index.html"           class="hover:text-sky-400 transition-colors">Inicio</a></li>
          <li><a href="pages/productos.html" class="hover:text-sky-400 transition-colors">Productos</a></li>
          <li><a href="pages/registro.html"  class="hover:text-sky-400 transition-colors">Registro</a></li>
          <li><a href="pages/login.html"     class="hover:text-sky-400 transition-colors">Iniciar sesión</a></li>
          <li><a href="pages/contacto.html"  class="hover:text-sky-400 transition-colors">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="flex-1">
    <!-- SECCIONES DE CADA PÁGINA VAN AQUÍ -->
  </main>

  <footer class="bg-slate-900 text-gray-300 text-sm">
    <div class="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
      <section>
        <h3 class="text-white font-semibold mb-2">TecnoStore</h3>
        <p>Tecnología al mejor precio, con despacho a todo Chile.</p>
        <p>📍 Av. Siempre Viva 742, Santiago</p>
        <p>📞 +56 2 2345 6789</p>
        <p>✉️ contacto@tecnostore.cl</p>
      </section>
      <nav aria-label="Enlaces del pie de página">
        <h3 class="text-white font-semibold mb-2">Enlaces</h3>
        <ul class="space-y-1">
          <li><a href="index.html" class="hover:text-sky-400">Inicio</a></li>
          <li><a href="pages/productos.html" class="hover:text-sky-400">Productos</a></li>
          <li><a href="pages/registro.html" class="hover:text-sky-400">Registro</a></li>
          <li><a href="pages/login.html" class="hover:text-sky-400">Iniciar sesión</a></li>
          <li><a href="pages/contacto.html" class="hover:text-sky-400">Contacto</a></li>
        </ul>
      </nav>
      <section>
        <h3 class="text-white font-semibold mb-2">Síguenos</h3>
        <ul class="space-y-1">
          <li><a href="https://instagram.com" target="_blank" rel="noopener" class="hover:text-sky-400">Instagram</a></li>
          <li><a href="https://facebook.com" target="_blank" rel="noopener" class="hover:text-sky-400">Facebook</a></li>
          <li><a href="https://x.com" target="_blank" rel="noopener" class="hover:text-sky-400">X</a></li>
        </ul>
      </section>
    </div>
    <p class="text-center py-3 border-t border-slate-700">
      © 2026 TecnoStore — Todos los derechos reservados · Proyecto académico DSY1104
    </p>
  </footer>

</body>
</html>
```

- Link de la página actual en el nav: resaltar con `text-sky-400 font-semibold` (IE1.1.3: navegación coherente).
- En las páginas dentro de `pages/`, los href de nav/footer quedan: `../index.html`,
  `productos.html`, `registro.html`, `login.html`, `contacto.html`.
- El footer informativo cumple IE1.1.2 ("el footer contiene la información adecuada").

---

## 4. p1 · index.html (Home)

```
┌────────────────────────────────────────────────────┐
│ HEADER + NAV (plantilla base)                      │
├────────────────────────────────────────────────────┤
│ <section> HERO  (bg con hero.jpg o degradado)      │
│   h1: "Tecnología al mejor precio"                 │
│   p: bajada breve                                  │
│   [Ver productos] → pages/productos.html           │
│   [Regístrate]    → pages/registro.html            │
├────────────────────────────────────────────────────┤
│ <section> DESTACADOS  h2: "Productos destacados"   │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│   │ <article>│ │ <article>│ │ <article>│  (3 cards│
│   │ img h3 $ │ │ img h3 $ │ │ img h3 $ │   reutili│
│   │ [Comprar]│ │ [Comprar]│ │ [Comprar]│   zadas) │
│   └──────────┘ └──────────┘ └──────────┘          │
├────────────────────────────────────────────────────┤
│ <section> SOBRE NOSOTROS  h2 + texto               │
│   + <iframe> YouTube (VIDEO EMBEBIDO → IE1.1.2)    │
├────────────────────────────────────────────────────┤
│ FOOTER (plantilla base)                            │
└────────────────────────────────────────────────────┘
```

Video embebido (buscar un video real y reemplazar el ID):

```html
<iframe
  class="w-full aspect-video rounded-lg shadow"
  src="https://www.youtube.com/embed/ID_DEL_VIDEO"
  title="Video promocional de TecnoStore"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

---

## 5. p2 · pages/productos.html (Catálogo)

```
┌────────────────────────────────────────────────────┐
│ HEADER + NAV                                       │
├────────────────────────────────────────────────────┤
│ <section> h1: "Nuestros productos"                 │
│   Buscador (solo HTML, sugerencias con datalist):  │
│   <input list="categorias" placeholder="Buscar...">│
│   <datalist id="categorias"> Smartphones, Notebooks│
│     Audio, Wearables, Tablets, Accesorios          │
│   </datalist>                                      │
├────────────────────────────────────────────────────┤
│   grid md:grid-cols-2 lg:grid-cols-4 gap-4         │
│   8 × <article> (tarjeta de producto)              │
├────────────────────────────────────────────────────┤
│ FOOTER                                             │
└────────────────────────────────────────────────────┘
```

Estructura de cada tarjeta (repetir ×8, también se reutiliza en "destacados" del index):

```html
<article class="bg-white rounded-lg shadow p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow">
  <img src="../assets/images/prod-smartphone.jpg" alt="Smartphone Galaxy X"
       class="w-full h-48 object-cover rounded">
  <h3 class="font-semibold text-lg">Smartphone Galaxy X</h3>
  <p class="text-sm text-gray-600">Pantalla 6.4", 128 GB, cámara triple 50 MP.</p>
  <p class="text-sky-600 font-bold text-xl">$299.990</p>
  <a href="login.html" class="btn-primary text-center mt-auto"
     title="Debes iniciar sesión para comprar">Comprar</a>
</article>
```

Catálogo (nombre / archivo / precio):

| # | Producto | Imagen | Precio |
|---|----------|--------|--------|
| 1 | Smartphone Galaxy X | prod-smartphone.jpg | $299.990 |
| 2 | Notebook Pro 14" | prod-notebook.jpg | $549.990 |
| 3 | Audífonos BT Air | prod-audifonos.jpg | $79.990 |
| 4 | Smartwatch Fit 2 | prod-smartwatch.jpg | $129.990 |
| 5 | Tablet 10" Lite | prod-tablet.jpg | $199.990 |
| 6 | Parlante Bass+ | prod-parlante.jpg | $49.990 |
| 7 | Teclado Gamer RGB | prod-teclado.jpg | $59.990 |
| 8 | Mouse Inalámbrico Ergo | prod-mouse.jpg | $24.990 |

---

## 6. Formularios: p3 registro · p4 login · p5 contacto

Estructura común de cada campo (label + input + mensaje de error oculto):

```html
<div>
  <label for="nombre" class="block font-medium mb-1">Nombre completo</label>
  <input type="text" id="nombre" name="nombre" class="campo"
         placeholder="Ej: María Pérez" autocomplete="name">
  <small id="nombre-error" class="text-red-600 text-xs hidden"></small>
</div>
```

Botón de envío `<button type="submit" class="btn-primary w-full">Registrarme</button>` +
div de éxito oculto:

```html
<div id="exito" class="hidden bg-green-100 border border-green-500 text-green-800 rounded-md p-3">
  ¡Registro exitoso! Redirigiendo al inicio de sesión...
</div>
```

### p3 · registro.html (`form-registro` + `registro.js`)

| Campo | Tipo | Validación JS | Mensaje de error exacto | Sugerencias (IE1.2.2) |
|---|---|---|---|---|
| Nombre completo | `text` | no vacío; mín. 3 caracteres; solo letras/espacios `^[A-Za-zÁÉÍÓÚÑáéíóñü\s]{3,}$` | "Ingresa tu nombre completo (mínimo 3 caracteres, solo letras)." | `autocomplete="name"`, placeholder |
| Correo | `email` | no vacío; regex email | "El correo no es válido. Formato esperado: nombre@correo.com" | `autocomplete="email"`, `type=email` |
| Teléfono | `tel` | no vacío; 9 dígitos comenzando con 9 `^9\d{8}$` | "Teléfono no válido. Debe tener 9 dígitos y empezar con 9. Ej: 912345678" | `autocomplete="tel"`, placeholder |
| Contraseña | `password` | mín. 8 caracteres, al menos 1 letra y 1 número | "La contraseña debe tener al menos 8 caracteres, una letra y un número." | `autocomplete="new-password"`, botón `<button type="button">` mostrar/ocultar |
| Confirmar contraseña | `password` | coincide con contraseña | "Las contraseñas no coinciden." | `autocomplete="new-password"` |
| Fecha de nacimiento | `date` | no vacía; mayor de 18 años; no futura | "Debes ser mayor de 18 años para registrarte." | `autocomplete="bday"`, `max` = hoy |
| Región | `select` | opción seleccionada ≠ "" | "Selecciona tu región." | `<option value="">Selecciona...</option>` + 4-5 regiones |
| Comuna | `text` | no vacía | "Ingresa tu comuna." | `<datalist>` con comunas (sugerencias al escribir) |
| Términos | `checkbox` | debe estar marcado | "Debes aceptar los términos y condiciones." | enlace "ver términos" (`href="#"`) |

**Éxito:** mostrar `#exito` con el nombre ("¡Registro exitoso, María!") y
`setTimeout(() => location.href = "login.html", 2000)`.

### p4 · login.html (`form-login` + `login.js`)

| Campo | Tipo | Validación | Mensaje | Sugerencias |
|---|---|---|---|---|
| Correo | `email` | no vacío; regex email | "Ingresa un correo válido para continuar." | `autocomplete="username"` |
| Contraseña | `password` | no vacía; mín. 8 caracteres | "La contraseña debe tener al menos 8 caracteres." | `autocomplete="current-password"`, botón mostrar/ocultar |
| Recordarme | `checkbox` | sin validación | — | `autocomplete="off"` |

**Éxito:** "¡Bienvenido/a de nuevo!" + redirigir a `../index.html` a los 2 s.
Link extra: "¿No tienes cuenta? <a href="registro.html">Regístrate aquí</a>" (interconexión).

### p5 · contacto.html (`form-contacto` + `contacto.js`)

| Campo | Tipo | Validación | Mensaje | Sugerencias |
|---|---|---|---|---|
| Nombre | `text` | igual a registro | "Ingresa tu nombre (mínimo 3 caracteres, solo letras)." | `autocomplete="name"` |
| Correo | `email` | igual a registro | "El correo no es válido. Formato esperado: nombre@correo.com" | `autocomplete="email"` |
| Asunto | `text` | no vacío; mín. 5 caracteres | "Indica el asunto de tu mensaje (mínimo 5 caracteres)." | `<datalist>`: Consulta, Reclamo, Sugerencia, Soporte técnico |
| Mensaje | `textarea` | no vacío; entre 10 y 500 caracteres | "El mensaje debe tener entre 10 y 500 caracteres." | contador en vivo "x/500" actualizado con JS |

**Éxito:** "Mensaje enviado. Te responderemos a {correo} dentro de 24 h."

---

## 7. Estructura del JS de validación (mismo patrón en los 3 archivos)

```js
// registro.js — patrón simple, sin librerías
const form = document.getElementById("form-registro");

form.addEventListener("submit", function (e) {
  e.preventDefault();                    // SIEMPRE bloquear envío (IE1.2.1)
  let valid = true;
  if (!validarNombre())     valid = false;
  if (!validarEmail())      valid = false;
  if (!validarTelefono())   valid = false;
  if (!validarPassword())   valid = false;
  if (!validarConfirmar())  valid = false;
  if (!validarNacimiento()) valid = false;
  if (!validarRegion())     valid = false;
  if (!validarComuna())     valid = false;
  if (!validarTerminos())   valid = false;
  if (valid) mostrarExito();             // mensaje verde + redirección
});

// --- helpers ---
function setError(campo, mensaje) {
  const input = document.getElementById(campo);
  const error = document.getElementById(campo + "-error");
  error.textContent = mensaje;
  error.classList.remove("hidden");
  input.classList.add("border-red-500");
  input.classList.remove("border-green-500");
}

function setOk(campo) {
  const input = document.getElementById(campo);
  const error = document.getElementById(campo + "-error");
  error.classList.add("hidden");
  input.classList.remove("border-red-500");
  input.classList.add("border-green-500");
}

function esEmailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function esTelefonoValido(v) { return /^9\d{8}$/.test(v); }
function tieneLetraYNumero(v) { return /[A-Za-z]/.test(v) && /\d/.test(v); }

function validarEmail() {
  const v = document.getElementById("email").value.trim();
  if (v === "")              { setError("email", "El correo es obligatorio."); return false; }
  if (!esEmailValido(v))     { setError("email", "El correo no es válido. Formato esperado: nombre@correo.com"); return false; }
  setOk("email"); return true;
}
// ...misma forma para cada campo...

// validación en tiempo real: al salir del campo (blur) se revalida
document.getElementById("email").addEventListener("blur", validarEmail);
```

Reglas del patrón:
1. `preventDefault()` siempre → nada se envía con datos incorrectos (IE1.2.1).
2. Un `<small id="X-error">` por campo, con texto **específico** (IE1.2.2).
3. Borde rojo/verde en el input como apoyo visual.
4. Revalidar en `blur` (y contador de caracteres en `input` para el textarea).
5. `mostrarExito()` quita `hidden` del div verde y redirige con `setTimeout`.

Botón mostrar/ocultar contraseña (es un `<button type="button">`, cumple "botones operan
como se espera"):

```js
const btn = document.getElementById("btn-ver-pass");
btn.addEventListener("click", function () {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
  btn.textContent = pass.type === "password" ? "Mostrar" : "Ocultar";
});
```

---

## 8. Imágenes (assets/images/)

Fotos reales ligeras de Unsplash/Pexels (~600 px, 40–90 KB c/u). Comando plantilla:

```bash
curl -L "URL_DIRECTA_DE_LA_FOTO?w=600&q=60&fm=jpg&fit=crop" -o assets/images/prod-notebook.jpg
```

| Archivo | Contenido | Se usa en |
|---|---|---|
| logo.svg | logo simple (SVG hecho a mano: monitor/rayo + "TS") | header de todas |
| hero.jpg | banner tecnología/escritorio | sección hero del index |
| prod-smartphone.jpg | smartphone | card 1 |
| prod-notebook.jpg | notebook | card 2 |
| prod-audifonos.jpg | audífonos | card 3 |
| prod-smartwatch.jpg | smartwatch | card 4 |
| prod-tablet.jpg | tablet | card 5 |
| prod-parlante.jpg | parlante bluetooth | card 6 |
| prod-teclado.jpg | teclado gamer | card 7 |
| prod-mouse.jpg | mouse | card 8 |

Todas con `alt` descriptivo ("Las imágenes están correctamente insertadas", IE1.1.2).

---

## 9. Plan Git — commits recomendados (IE1.3.1)

Prefijos por página/proceso: **p0**=config · **p1**=home · **p2**=productos ·
**p3**=registro · **p4**=login · **p5**=contacto · **doc**=documentación.

Regla: después de cada página (con `npm run watch` corriendo) se incluye también
`assets/css/style.css` en el commit, porque Tailwind lo regenera con las clases nuevas.

```bash
# ── C0 · configuración del proyecto ────────────────────────────────
git add docs/MAQUETA.md package.json
git commit -m "p0: agrega maqueta del proyecto y scripts build/watch de Tailwind"

# ── C1 · home ───────────────────────────────────────────────────────
git add index.html assets/images/logo.svg assets/images/hero.jpg assets/css/style.css
git commit -m "p1: crea home semántico (header, nav, main, sections, articles, footer) con hero y video embebido"

# ── C2 · catálogo de productos ──────────────────────────────────────
git add pages/productos.html "assets/images/prod-*.jpg" assets/css/style.css
git commit -m "p2: agrega catálogo con 8 tarjetas article, imágenes con alt y buscador con datalist"

# ── C3 · registro ───────────────────────────────────────────────────
git add pages/registro.html assets/js/registro.js assets/css/style.css
git commit -m "p3: implementa formulario de registro con validaciones JS, errores específicos y autocompletado"

# ── C4 · login ──────────────────────────────────────────────────────
git add pages/login.html assets/js/login.js assets/css/style.css
git commit -m "p4: implementa formulario de login con validaciones JS y enlace a registro"

# ── C5 · contacto ───────────────────────────────────────────────────
git add pages/contacto.html assets/js/contacto.js assets/css/style.css
git commit -m "p5: implementa formulario de contacto con validaciones JS y contador de caracteres"

# ── C6 · pulido final de estilos ────────────────────────────────────
git add assets/src/code.css assets/css/style.css
git commit -m "p1-p5: recompila style.css minificado y ajusta detalles responsive"

# ── C7 · README ─────────────────────────────────────────────────────
git add README.md
git commit -m "doc: actualiza README con descripción, páginas del sitio y comandos de build"

# ── Publicar en GitHub (repositorio público) ────────────────────────
git push origin main
```

**IE1.3.2 (integración de cambios):** la evaluación es individual, pero como evidencia de
"integración efectiva" se puede trabajar cada página en una rama y fusionarla:

```bash
git checkout -b p3-registro     # trabajar la página
git add ... && git commit -m "p3: ..."
git checkout main
git merge p3-registro           # integrar el cambio al proyecto
```

(Opcional — si el tiempo aprieta, commits directos en `main` con los prefijos ya cumplen IE1.3.1.)

---

## 10. Matriz de trazabilidad — pauta ↔ dónde se cumple

| Criterio | Dónde se cumple |
|---|---|
| IE1.1.1 estructura semántica | `header/nav/main/section/article/footer` en las 5 páginas (plantilla base, secc. 3) |
| IE1.1.2 links funcionales | nav + footer + CTAs del hero + "Comprar"→login + "Regístrate aquí" |
| IE1.1.2 imágenes | logo.svg, hero.jpg, 8 fotos de productos con `alt` |
| IE1.1.2 botones | submit de formularios, mostrar/ocultar contraseña, botones-CTA del hero |
| IE1.1.2 video embebido | `<iframe>` YouTube en sección "Sobre nosotros" del index |
| IE1.1.2 formularios interactivos | registro (p3), login (p4), contacto (p5) + buscador con datalist (p2) |
| IE1.1.2 footer adecuado | datos de contacto, enlaces, redes, copyright (plantilla base) |
| IE1.1.3 páginas interconectadas | mismo nav en las 5 páginas + enlaces de footer + CTAs cruzados |
| IE1.1.4 CSS externa única | `assets/css/style.css` linkeado en el `<head>` de las 5 páginas |
| IE1.2.1 validaciones efectivas | `preventDefault()` + validación campo por campo en los 3 JS |
| IE1.2.2 errores claros + sugerencias | `<small id="X-error">` con texto específico; `label for`, `placeholder`, `autocomplete`, `datalist` |
| IE1.3.1 commits descriptivos | secuencia C0–C7 con prefijos p0–p5/doc (secc. 9) |
| IE1.3.2 integración | ramas por página con merge a main (opcional) |

---

## 11. Checklist de implementación (orden sugerido)

- [ ] **p0** — scripts `build`/`watch` en package.json · probar `npm run build` · logo.svg
- [ ] **p1** — index.html: plantilla base + hero + destacados + video + footer · compilar
- [ ] **p2** — descargar 8 fotos + hero.jpg · productos.html: grid de articles + datalist · compilar
- [ ] **p3** — registro.html + registro.js (9 validaciones + éxito con redirección) · probar en navegador
- [ ] **p4** — login.html + login.js · probar
- [ ] **p5** — contacto.html + contacto.js + contador · probar
- [ ] **p1–p5** — repasar responsive (móvil: nav se apila, grid 1 col) · `npm run build` final
- [ ] **doc** — README.md completo
- [ ] **Verificación final contra la pauta** (secc. 10) → commits y `git push origin main`

**Cómo probar:** abrir `index.html` directo en el navegador basta (no hay backend). Para
verificar IE1.2.1: enviar cada formulario vacío y con datos malos → no debe recargarse la
página y deben aparecer los errores en rojo; con datos buenos → mensaje verde y redirección.
