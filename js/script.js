'use strict';

// --- CONFIGURACIÓN ---
const RUTA_PROYECTOS = 'data/proyectos.json';
const RUTA_IMAGENES = 'assets/imagenes/projects/';
const EMAIL = 'nicolascosta15112004@gmail.com';
const CV = {
    es: 'assets/docs/nicolas_costa_cv.pdf',
    en: 'assets/docs/ingles_nicolas_costa_cv.pdf'
};
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const CATEGORIAS = ['clientes', 'productos', 'academicos', 'personales'];

// [nombre, ícono de devicon, invertir colores (logos negros)]
const SKILLS = {
    frontend: [['JavaScript', 'javascript/javascript-original'], ['TypeScript', 'typescript/typescript-original'], ['React', 'react/react-original'], ['Next.js', 'nextjs/nextjs-original', true], ['Vite', 'vitejs/vitejs-original'], ['Tailwind CSS', 'tailwindcss/tailwindcss-original'], ['HTML5', 'html5/html5-original'], ['CSS3', 'css3/css3-original'], ['SASS', 'sass/sass-original'], ['Bootstrap', 'bootstrap/bootstrap-original']],
    backend: [['Node.js', 'nodejs/nodejs-original'], ['PostgreSQL', 'postgresql/postgresql-original'], ['Supabase', 'supabase/supabase-original'], ['SQL'], ['apis']],
    infra: [['Git', 'git/git-original'], ['GitHub', 'github/github-original', true], ['Vercel', 'vercel/vercel-original', true], ['Cloudflare', 'cloudflare/cloudflare-original'], ['Linux', 'linux/linux-original'], ['Windows', 'windows11/windows11-original']],
    base: [['Python', 'python/python-original'], ['Java', 'java/java-original'], ['C', 'c/c-original'], ['C#', 'csharp/csharp-original']],
    soporte: []
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let idioma = 'es';
let proyectos = [];
let filtroActivo = 'todos';
let proyectoAbierto = null;
let fotoActual = 0;
let ultimoFoco = null;

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const ui = () => I18N.ui[idioma];
const icono = (id, clase = 'icon') => `<svg class="${clase}"><use href="#i-${id}"/></svg>`;

function escapar(texto = '') {
    return String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// --- 1. IDIOMA ---
const textosES = new Map();

function idiomaInicial() {
    const param = new URLSearchParams(location.search).get('lang');
    if (param === 'en' || param === 'es') return param;
    try {
        const guardado = localStorage.getItem('idioma');
        if (guardado === 'en' || guardado === 'es') return guardado;
    } catch (e) { /* almacenamiento bloqueado: usamos el default */ }
    return 'es';
}

function aplicarIdioma(nuevo) {
    idioma = nuevo;
    document.documentElement.lang = idioma;
    try { localStorage.setItem('idioma', idioma); } catch (e) { /* sin persistencia */ }

    $$('[data-i18n]').forEach(el => {
        if (!textosES.has(el)) textosES.set(el, el.innerHTML);
        const clave = el.dataset.i18n;
        el.innerHTML = idioma === 'en' && I18N.en[clave] ? I18N.en[clave] : textosES.get(el);
    });

    document.title = idioma === 'en' ? 'Nicolás Costa · Full Stack Developer' : 'Nicolás Costa · Desarrollador Full Stack';
    $$('.js-cv').forEach(a => { a.href = CV[idioma]; });
    $$('.roadmap__steps li.current').forEach(li => { li.dataset.tag = ui().enCurso; });

    renderSkills();
    if (proyectos.length) {
        renderFiltros();
        renderProyectos();
        if (proyectoAbierto) renderModal();
    }
    reiniciarTipeo();
}

// --- 2. EFECTO DE TIPEO EN EL HERO ---
let timerTipeo = null;

function reiniciarTipeo() {
    const destino = $('#typed');
    clearTimeout(timerTipeo);
    const roles = ui().roles;

    if (reduceMotion) {
        destino.textContent = roles[0];
        return;
    }

    let rol = 0;
    let letra = 0;
    let borrando = false;
    destino.textContent = '';

    const paso = () => {
        const texto = roles[rol];
        letra += borrando ? -1 : 1;
        destino.textContent = texto.slice(0, letra);

        let espera = borrando ? 35 : 70;
        if (!borrando && letra === texto.length) {
            espera = 2000;
            borrando = true;
        } else if (borrando && letra === 0) {
            borrando = false;
            rol = (rol + 1) % roles.length;
            espera = 350;
        }
        timerTipeo = setTimeout(paso, espera);
    };
    paso();
}

// --- 3. HABILIDADES ---
function chipSkill([nombre, ruta, invertir]) {
    const etiqueta = nombre === 'apis' ? ui().apis : nombre;
    if (!ruta) return `<li class="skill skill--text">${escapar(etiqueta)}</li>`;
    return `<li class="skill"><img src="${DEVICON}${ruta}.svg" alt=""${invertir ? ' class="invert"' : ''}>${escapar(etiqueta)}</li>`;
}

function renderSkills() {
    const grilla = $('#skills');
    grilla.innerHTML = Object.keys(SKILLS).map(grupo => {
        const [titulo, bajada] = ui().skills[grupo];
        const items = grupo === 'soporte' ? ui().soporte.map(n => [n]) : SKILLS[grupo];
        return `
            <article class="skill-card spot reveal">
                <h3>${escapar(titulo)}</h3>
                <p>${escapar(bajada)}</p>
                <ul class="skill-list">${items.map(chipSkill).join('')}</ul>
            </article>`;
    }).join('');
    observarReveals(grilla);

    // La cinta se duplica para que el loop sea infinito sin saltos
    const conIcono = Object.values(SKILLS).flat().filter(s => s[1]);
    const cinta = conIcono.map(([nombre, ruta, invertir]) =>
        `<span class="marquee__item"><img src="${DEVICON}${ruta}.svg" alt=""${invertir ? ' class="invert"' : ''}>${nombre}</span>`
    ).join('');
    $('#marquee').innerHTML = cinta + cinta;
}

// --- 4. PROYECTOS ---
async function cargarProyectos() {
    try {
        const respuesta = await fetch(RUTA_PROYECTOS);
        proyectos = await respuesta.json();
    } catch (error) {
        console.error('Error cargando los proyectos:', error);
        $('#grilla-proyectos').innerHTML = '<p>No se pudieron cargar los proyectos.</p>';
        return;
    }
    const contador = $('#stat-proyectos');
    contador.dataset.count = proyectos.length;
    contador.textContent = proyectos.length;
    renderFiltros();
    renderProyectos();
}

const rutaImagen = (proy, archivo) => `${RUTA_IMAGENES}${proy.carpeta}/${archivo}`;
const texto = proy => proy[idioma] || proy.es;

// Texto grande de la portada generada: el campo "portada" del JSON o lo que va antes del "·" en el título
function textoPortada(proy) {
    return proy.portada || texto(proy).titulo.split('·')[0].trim();
}

function portada(proy) {
    return `
        <div class="cover">
            <span class="cover__initials">${escapar(textoPortada(proy))}</span>
            <span class="cover__note">${icono('image')}${escapar(ui().sinCapturas)}</span>
        </div>`;
}

function badges(proy) {
    const t = ui();
    return `
        <span class="badge badge--cat">${escapar(t.categorias[proy.categoria] || proy.categoria)}</span>
        ${proy.estado ? `<span class="badge badge--estado badge--${proy.estado}">${escapar(t.estados[proy.estado] || proy.estado)}</span>` : ''}`;
}

function renderFiltros() {
    const t = ui().filtros;
    const usadas = CATEGORIAS.filter(c => proyectos.some(p => p.categoria === c));
    const botones = ['todos', ...usadas].map(cat => {
        const cantidad = cat === 'todos' ? proyectos.length : proyectos.filter(p => p.categoria === cat).length;
        const activo = cat === filtroActivo;
        return `<button class="filter${activo ? ' is-active' : ''}" type="button" role="tab" aria-selected="${activo}" data-filtro="${cat}">
                    ${escapar(t[cat] || cat)}<span class="filter__count">${cantidad}</span>
                </button>`;
    });
    $('#filtros').innerHTML = botones.join('');
}

function renderProyectos() {
    const t = ui();
    const grilla = $('#grilla-proyectos');

    grilla.innerHTML = proyectos.map((proy, i) => {
        const txt = texto(proy);
        const tieneFotos = proy.imagenes && proy.imagenes.length > 0;
        const img = tieneFotos ? `<img src="${rutaImagen(proy, proy.imagenes[0])}" alt="${escapar(txt.titulo)}" loading="lazy">` : '';
        // Capturas verticales (apps mobile): se muestran como un teléfono sobre la portada degradada
        const media = !tieneFotos ? portada(proy)
            : proy.formato === 'movil' ? `<div class="cover cover--movil">${img}</div>`
            : img;
        const oculto = filtroActivo !== 'todos' && proy.categoria !== filtroActivo;

        return `
            <article class="project-card spot reveal${oculto ? ' is-hidden' : ''}" data-cat="${proy.categoria}" style="--delay:${(i % 3) * 0.08}s">
                <button class="project-card__media" type="button" data-abrir="${proy.id}" data-ver="${escapar(tieneFotos ? t.verCapturas : t.detalles)}" aria-label="${escapar(t.detalles)}: ${escapar(txt.titulo)}">
                    ${media}
                </button>
                <div class="project-card__body">
                    <div class="project-card__meta">${badges(proy)}</div>
                    <h3>${escapar(txt.titulo)}</h3>
                    <p>${escapar(txt.resumen)}</p>
                    ${proy.tecnologias?.length ? `<ul class="tags">${proy.tecnologias.map(tec => `<li>${escapar(tec)}</li>`).join('')}</ul>` : ''}
                    <div class="project-card__actions">
                        <button class="link-btn" type="button" data-abrir="${proy.id}">${escapar(t.detalles)}${icono('arrow')}</button>
                        ${proy.demo ? `<a class="icon-btn" href="${proy.demo}" target="_blank" rel="noopener" aria-label="${escapar(t.demo)}" title="${escapar(t.demo)}">${icono('external')}</a>` : ''}
                        ${proy.repo ? `<a class="icon-btn" href="${proy.repo}" target="_blank" rel="noopener" aria-label="${escapar(t.repo)}" title="${escapar(t.repo)}">${icono('github')}</a>` : ''}
                    </div>
                </div>
            </article>`;
    }).join('');

    observarReveals(grilla);
}

function filtrar(categoria) {
    filtroActivo = categoria;
    $$('.filter').forEach(btn => {
        const activo = btn.dataset.filtro === categoria;
        btn.classList.toggle('is-active', activo);
        btn.setAttribute('aria-selected', activo);
    });
    $$('.project-card').forEach(card => {
        const visible = categoria === 'todos' || card.dataset.cat === categoria;
        card.classList.toggle('is-hidden', !visible);
        if (visible) card.classList.add('is-visible');
    });
}

// --- 5. MODAL DE PROYECTO + GALERÍA ---
function abrirModal(id) {
    proyectoAbierto = proyectos.find(p => p.id === id);
    if (!proyectoAbierto) return;
    ultimoFoco = document.activeElement;
    fotoActual = 0;
    renderModal();
    $('#modal-proyecto').hidden = false;
    document.body.classList.add('no-scroll');
    $('.modal__close').focus();
}

function cerrarModal() {
    $('#modal-proyecto').hidden = true;
    document.body.classList.remove('no-scroll');
    proyectoAbierto = null;
    if (ultimoFoco) ultimoFoco.focus();
}

function renderModal() {
    const proy = proyectoAbierto;
    const txt = texto(proy);
    const t = ui();

    $('.modal__panel').dataset.cat = proy.categoria;
    $('#modal-meta').innerHTML = badges(proy);
    $('#modal-titulo').textContent = txt.titulo;
    $('#modal-desc').innerHTML = `<p>${txt.descripcion}</p>`;
    $('#modal-tags').innerHTML = (proy.tecnologias || []).map(tec => `<li>${escapar(tec)}</li>`).join('');
    $('#modal-acciones').innerHTML = `
        ${proy.demo ? `<a class="btn btn--primary" href="${proy.demo}" target="_blank" rel="noopener">${escapar(t.demo)}${icono('external')}</a>` : ''}
        ${proy.repo ? `<a class="btn btn--ghost" href="${proy.repo}" target="_blank" rel="noopener">${icono('github')}${escapar(t.repo)}</a>` : ''}`;
    renderGaleria();
}

function renderGaleria() {
    const proy = proyectoAbierto;
    const fotos = proy.imagenes || [];
    const galeria = $('#galeria');

    if (!fotos.length) {
        galeria.innerHTML = `<div class="gallery__main">${portada(proy)}</div>`;
        return;
    }

    const varias = fotos.length > 1;
    galeria.innerHTML = `
        <div class="gallery__main">
            <img src="${rutaImagen(proy, fotos[fotoActual])}" alt="${escapar(texto(proy).titulo)} — ${fotoActual + 1}/${fotos.length}" data-zoom>
            ${varias ? `
                <button class="gallery__nav gallery__nav--prev" type="button" data-foto="-1" aria-label="Anterior">${icono('chevron')}</button>
                <button class="gallery__nav gallery__nav--next" type="button" data-foto="1" aria-label="Siguiente">${icono('chevron')}</button>` : ''}
        </div>
        ${varias ? `<div class="gallery__thumbs">${fotos.map((f, i) => `
            <button type="button" class="${i === fotoActual ? 'is-active' : ''}" data-ir="${i}" aria-label="${i + 1}/${fotos.length}">
                <img src="${rutaImagen(proy, f)}" alt="" loading="lazy">
            </button>`).join('')}</div>` : ''}`;

    const activa = $('.gallery__thumbs .is-active', galeria);
    if (activa) activa.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function moverFoto(paso) {
    const total = proyectoAbierto?.imagenes?.length || 0;
    if (total < 2) return;
    fotoActual = (fotoActual + paso + total) % total;
    renderGaleria();
    if (!$('#lightbox').hidden) actualizarLightbox();
}

// --- 6. LIGHTBOX ---
function abrirLightbox() {
    $('#lightbox').hidden = false;
    actualizarLightbox();
}

function actualizarLightbox() {
    const fotos = proyectoAbierto.imagenes;
    $('#lightbox-img').src = rutaImagen(proyectoAbierto, fotos[fotoActual]);
    $('#lightbox-count').textContent = `${fotoActual + 1} / ${fotos.length}`;
    $$('.lightbox__nav').forEach(b => { b.hidden = fotos.length < 2; });
}

function cerrarLightbox() {
    $('#lightbox').hidden = true;
}

// --- 7. ANIMACIONES AL HACER SCROLL ---
const observadorReveal = 'IntersectionObserver' in window
    ? new IntersectionObserver(entradas => {
        entradas.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                observadorReveal.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;

function observarReveals(ctx = document) {
    $$('.reveal:not(.is-visible)', ctx).forEach(el => {
        if (observadorReveal) observadorReveal.observe(el);
        else el.classList.add('is-visible');
    });
}

function animarContadores() {
    const obs = new IntersectionObserver(entradas => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            obs.unobserve(e.target);
            const final = Number(e.target.dataset.count);
            if (reduceMotion || !final) return;
            const inicio = performance.now();
            const duracion = 1200;
            const tick = ahora => {
                const avance = Math.min((ahora - inicio) / duracion, 1);
                e.target.textContent = Math.round(final * (1 - Math.pow(1 - avance, 3)));
                if (avance < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(el => obs.observe(el));
}

// --- 8. NAVEGACIÓN ---
function iniciarNav() {
    const nav = $('#nav');
    const barra = $('#scroll-progress');
    const menu = $('#nav-menu');
    const burger = $('#menu-toggle');

    const alScrollear = () => {
        const y = window.scrollY;
        nav.classList.toggle('is-scrolled', y > 20);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    window.addEventListener('scroll', alScrollear, { passive: true });
    alScrollear();

    const cerrarMenu = () => {
        menu.classList.remove('is-open');
        nav.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
        const abierto = menu.classList.toggle('is-open');
        nav.classList.toggle('menu-open', abierto);
        burger.setAttribute('aria-expanded', abierto);
    });
    $$('a', menu).forEach(a => a.addEventListener('click', cerrarMenu));

    // Resalta el link de la sección visible
    const links = $$('.nav__menu a');
    const obs = new IntersectionObserver(entradas => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => obs.observe(s));
}

// --- 9. UTILIDADES ---
let timerToast = null;
function mostrarToast(mensaje) {
    const toast = $('#toast');
    toast.textContent = mensaje;
    toast.classList.add('is-visible');
    clearTimeout(timerToast);
    timerToast = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function copiarEmail() {
    navigator.clipboard.writeText(EMAIL)
        .then(() => mostrarToast(ui().copiado))
        .catch(() => {
            mostrarToast(ui().errorCopiar);
            location.href = `mailto:${EMAIL}`;
        });
}

// --- 10. EVENTOS GLOBALES ---
function iniciarEventos() {
    document.addEventListener('click', e => {
        const objetivo = e.target.closest('[data-abrir], [data-filtro], [data-cerrar], [data-cerrar-lb], [data-foto], [data-ir], [data-zoom], [data-lb], #copiar-email, #lang-toggle');
        if (!objetivo) {
            if (e.target.id === 'lightbox') cerrarLightbox();
            return;
        }
        const d = objetivo.dataset;

        if (d.abrir) abrirModal(d.abrir);
        else if (d.filtro) filtrar(d.filtro);
        else if ('cerrar' in d) cerrarModal();
        else if ('cerrarLb' in d) cerrarLightbox();
        else if (d.foto) moverFoto(Number(d.foto));
        else if (d.lb) moverFoto(Number(d.lb));
        else if (d.ir) { fotoActual = Number(d.ir); renderGaleria(); }
        else if ('zoom' in d) abrirLightbox();
        else if (objetivo.id === 'copiar-email') copiarEmail();
        else if (objetivo.id === 'lang-toggle') aplicarIdioma(idioma === 'es' ? 'en' : 'es');
    });

    document.addEventListener('keydown', e => {
        if (!proyectoAbierto) return;
        if (e.key === 'Escape') {
            if (!$('#lightbox').hidden) cerrarLightbox();
            else cerrarModal();
        } else if (e.key === 'ArrowRight') moverFoto(1);
        else if (e.key === 'ArrowLeft') moverFoto(-1);
    });

    // Brillo que sigue al mouse en las tarjetas
    document.addEventListener('pointermove', e => {
        const tarjeta = e.target.closest?.('.spot');
        if (!tarjeta) return;
        const r = tarjeta.getBoundingClientRect();
        tarjeta.style.setProperty('--mx', `${e.clientX - r.left}px`);
        tarjeta.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
}

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    $('#anio').textContent = new Date().getFullYear();
    iniciarNav();
    iniciarEventos();
    aplicarIdioma(idiomaInicial());
    observarReveals();
    animarContadores();
    cargarProyectos();
});
