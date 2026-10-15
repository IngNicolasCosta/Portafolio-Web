# 🚀 Portfolio · Nicolás Costa

Portfolio personal de **Nicolás Costa**: Desarrollador Full Stack, cofundador de **CTRL-IA** y estudiante de 4to año de Ingeniería en Informática (USAL).

🔗 **[ingnicolascosta.github.io/Portafolio-Web](https://ingnicolascosta.github.io/Portafolio-Web/)**

## ✨ Qué tiene

* **Diseño oscuro con animaciones**: hero con efecto de tipeo, fondo animado, brillo que sigue al mouse en las tarjetas y animaciones al hacer scroll (se desactivan solas si el sistema pide "reducir movimiento").
* **Proyectos data-driven**: la grilla, los filtros por categoría, el modal y la galería de capturas se generan desde un único archivo `data/proyectos.json`.
* **Bilingüe sin recargar (ES / EN)**: el idioma se recuerda entre visitas y se puede forzar con `?lang=en`.
* **Galería + lightbox** con navegación por teclado (← → Esc).
* **Responsive**: menú hamburguesa, modal tipo "sheet" en celulares.
* **Sin frameworks ni build**: HTML, CSS y JavaScript vanilla. Se publica tal cual en GitHub Pages.

## 📂 Estructura

```
index.html                  → única página (el español vive acá)
pages/english.html          → redirige a index.html?lang=en (para no romper links viejos)
js/i18n.js                  → traducciones al inglés y textos que genera el JS
js/script.js                → lógica: proyectos, filtros, modal, galería, idioma, animaciones
styles/styles.css           → todo el diseño
data/proyectos.json         → la "base de datos" de proyectos (ES + EN)
assets/imagenes/perfil.jpg  → foto del hero
assets/imagenes/projects/   → una carpeta por proyecto con sus capturas
assets/docs/                → CVs descargables
```

## ➕ Cómo agregar un proyecto

1. **Creá una carpeta** en `assets/imagenes/projects/` con un nombre corto, por ejemplo `cauce/`.
2. **Poné adentro las capturas** (`.png`, `.jpg` o `.webp`). La **primera** de la lista va a ser la portada de la tarjeta. Si todavía no tenés capturas, se genera una portada automática con el nombre.
3. **Agregá una entrada** en `data/proyectos.json` (el orden del archivo es el orden en la página):

```json
{
    "id": "cauce",
    "categoria": "productos",
    "estado": "produccion",
    "carpeta": "cauce",
    "portada": "Cauce",
    "imagenes": ["inicio.png", "dashboard.png"],
    "tecnologias": ["Next.js", "PostgreSQL"],
    "demo": "https://...",
    "repo": "https://github.com/...",
    "es": { "titulo": "...", "resumen": "...", "descripcion": "..." },
    "en": { "titulo": "...", "resumen": "...", "descripcion": "..." }
}
```

| Campo | Para qué sirve |
| --- | --- |
| `id` | Identificador único (sin espacios). |
| `categoria` | `clientes`, `productos`, `academicos` o `personales`. Define el filtro y el color. |
| `estado` | `produccion`, `desarrollo`, `finalizado` o `pausa`. |
| `formato` | *(opcional)* `"movil"` si las capturas son verticales (app de celular): la portada las muestra como un teléfono. |
| `carpeta` | Nombre de la carpeta dentro de `assets/imagenes/projects/`. |
| `imagenes` | Solo los **nombres de archivo**, en el orden en que se muestran. Puede ir vacío `[]`. |
| `portada` | *(opcional)* Texto grande de la portada automática cuando no hay capturas. |
| `demo` / `repo` | *(opcionales)* Si están vacíos, el botón no aparece. |
| `descripcion` | Admite HTML simple (`<b>`, `<br>`) para resaltar palabras. |

El contador de proyectos del hero y los filtros se actualizan solos.

## 🧪 Probarlo localmente

Como los proyectos se cargan con `fetch`, hay que abrirlo con un servidor (no con doble click):

```bash
python -m http.server 5510
```

y entrar a `http://localhost:5510`.

---
*Proyecto en constante evolución, como mi aprendizaje.*
