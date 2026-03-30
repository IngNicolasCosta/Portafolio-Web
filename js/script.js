let proyectosData = [];

const esIngles = window.location.href.includes('english.html');
const pathJSON = esIngles ? '../data/proyectos-en.json' : 'data/proyectos.json';

async function cargarProyectosDinamicos() {
    try {
        const response = await fetch(pathJSON);
        proyectosData = await response.json();

        const track = document.getElementById('track-proyectos-dinamico');
        if (!track) return;

        track.innerHTML = proyectosData.map((proy, index) => `
            <div class="project-card carousel-slide ${index === 0 ? 'active-slide' : ''} project-group" 
                 data-id="${proy.id}" 
                 style="display: ${index === 0 ? 'block' : 'none'}">
                <h3>${proy.titulo}</h3>
                <p>${proy.resumen}</p>
                <p class="click-mas">Click para ver más.</p>
            </div>
        `).join('');

        // ¡IMPORTANTE! Una vez creados, inicializamos la lógica de carruseles
        inicializarLogicaCarruseles();

    } catch (error) {
        console.error("Error cargando el JSON de proyectos:", error);
    }
}

function inicializarLogicaCarruseles() {
    const navButtons = document.querySelectorAll('.nav-btn');
    // Eliminamos listeners viejos para no duplicar clics
    navButtons.forEach(button => {
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);
    });

    // Agregamos la lógica a los nuevos botones
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel');
            const carouselContainer = document.getElementById(carouselId);
            if (!carouselContainer) return;

            const slides = carouselContainer.querySelectorAll('.carousel-slide');
            let currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active-slide'));
            if (currentSlideIndex === -1) currentSlideIndex = 0;

            const direction = button.classList.contains('next-btn') ? 1 : -1;
            let newSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

            slides.forEach(s => { s.classList.remove('active-slide'); s.style.display = 'none'; });
            slides[newSlideIndex].classList.add('active-slide');
            slides[newSlideIndex].style.display = 'block';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Cargamos los proyectos dinámicos ---
    cargarProyectosDinamicos();

    // --- 2. LÓGICA DE APERTURA DE MODALES ---
    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('.click-mas');
        if (!trigger) return;

        // A. Caso: Habilidades Técnicas (Carrusel de Skills)
        const skillContainer = trigger.closest('.skill-group');
        if (skillContainer && skillContainer.classList.contains('active-slide')) {
            const modalId = skillContainer.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'block';
            return;
        }

        // B. Caso: Acerca de Mí y Formación (Secciones estáticas)
        const isAboutTrigger = trigger.id === 'click-about';
        const isEducationTrigger = trigger.closest('.job-card[data-modal]'); // Para el modal de Full Stack

        if (isAboutTrigger || isEducationTrigger) {
            const modalId = isAboutTrigger
                ? trigger.closest('section').getAttribute('data-modal')
                : isEducationTrigger.getAttribute('data-modal');

            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'block';
            return;
        }

        // C. Caso: Proyectos Dinámicos (JSON)
        const projectContainer = trigger.closest('.project-card');
        if (projectContainer) {
            const idBuscado = projectContainer.getAttribute('data-id');
            const proyectoEncontrado = proyectosData.find(p => p.id === idBuscado);

            if (proyectoEncontrado) {
                rellenarYMostrarModal(proyectoEncontrado);
            }
        }
    });

    // --- 3. LÓGICA DE CIERRE GLOBAL (Modales y Lightbox) ---
    window.addEventListener('click', (event) => {
        // Cierre de modales normales
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
        // Cierre del Lightbox
        if (event.target.id === 'modal-lightbox') {
            event.target.style.display = 'none';
        }
    });

    const closeButtons = document.querySelectorAll('.close-btn, .close-lightbox');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    // --- 4. LÓGICA DEL LIGHTBOX (Zoom de imágenes) ---
    const lightbox = document.getElementById('modal-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    let activeCarouselId = ""; // Variable global para rastrear el carrusel activo

    // EXPORTAMOS LA FUNCIÓN AL WINDOW PARA QUE EL HTML LA VEA
    window.openLightbox = function (src, carouselId) {
        if (lightbox && lightboxImg) {
            activeCarouselId = carouselId; // Actualizamos el carrusel activo cada vez que se abre el lightbox
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
        }
    };

    // --- 5. INICIALIZACIÓN ---
    document.querySelectorAll('.carousel-container').forEach(container => {
        const slides = container.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
            if (index === 0) slide.classList.add('active-slide');
        });
    });

    // 6. LÓGICA DEL CAMBIO DE IDIOMA
    const languageSwitcher = document.getElementById('language-switcher');

    if (languageSwitcher) {
        // Obtenemos la URL base del directorio actual
        const currentUrl = window.location.href;

        // Intenta establecer el valor actual del selector basado en la URL
        if (currentUrl.includes('english.html')) {
            languageSwitcher.value = 'en';
        } else {
            languageSwitcher.value = 'es';
        }


        languageSwitcher.addEventListener('change', function () {
            const selectedLang = this.value;
            let newUrl;

            if (selectedLang === 'es') {
                // Si estamos en la carpeta 'pages', salimos con '../'
                if (currentUrl.includes('pages/')) {
                    window.location.href = '../index.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else if (selectedLang === 'en') {
                // Si estamos en el inicio, entramos a 'pages/'
                if (!currentUrl.includes('pages/')) {
                    window.location.href = 'pages/english.html';
                }
            }
        });
    }

    // 7. LÓGICA PARA COPIAR EMAIL AL PORTAPAPELES
    const emailBtn = document.getElementById('btn-email');

    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que se abra la app de correo (Outlook/Gmail)

            const email = "nicolascosta15112004@gmail.com";
            const spanElement = emailBtn.querySelector('span');
            const originalText = spanElement.innerText;

            // Usamos la API del portapapeles
            navigator.clipboard.writeText(email)
                .then(() => {
                    // Feedback Visual: Cambiamos el texto para avisar
                    // Detectamos si es inglés o español para el mensaje
                    const isEnglish = window.location.href.includes('english.html');
                    spanElement.innerText = isEnglish ? "✅ Copied!" : "✅ ¡Copiado!";

                    // Volvemos al texto original después de 2 segundos
                    setTimeout(() => {
                        spanElement.innerText = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar: ', err);
                    alert("No se pudo copiar el email automáticamente.");
                });
        });
    }
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- 8. FUNCIONES PARA NAVEGAR ENTRE IMÁGENES EN EL LIGHTBOX ---
    window.changeLightboxSlide = function (direction) {
        if (!activeCarouselId) return;

        const carousel = document.getElementById(activeCarouselId);
        if (!carousel) return;
        // Buscamos los botones que YA existen en ese carrusel específico
        const btnSelector = direction === 1 ? '.next-btn' : '.prev-btn';

        // Buscamos el botón que está afuera del track pero dentro del contenedor del carrusel
        const originalBtn = carousel.parentElement.querySelector(btnSelector);

        if (originalBtn) {
            originalBtn.click(); // Esto dispara tu lógica de carrusel principal

            // Sincronizamos la imagen del Lightbox
            setTimeout(() => {
                const activeSlideImg = carousel.querySelector('.active-slide img');
                if (activeSlideImg) {
                    lightboxImg.src = activeSlideImg.src;
                }
            }, 50);
        }
    };
});
function rellenarYMostrarModal(proy) {
    const modal = document.getElementById('modal-proyecto-dinamico');
    if (!modal) return;

    modal.querySelector('#modal-titulo').innerText = proy.titulo;
    modal.querySelector('.modal-descripcion-larga').innerHTML = proy.descripcion_larga;
    modal.querySelector('.tech-stack span').innerText = proy.tecnologias;

    const btnLink = modal.querySelector('.btn-proyecto-link');
    if (proy.link) {
        btnLink.href = proy.link;
        btnLink.style.display = 'inline-block';
    } else {
        btnLink.style.display = 'none';
    }

    const btnLink2 = modal.querySelector('.btn-proyecto-link2');
    if (proy.link2) {
        btnLink2.href = proy.link2;
        btnLink2.style.display = 'inline-block';
    } else {
        btnLink2.style.display = 'none';
    }

    // Inyectar imágenes en el carrusel del modal
    const trackFotos = document.getElementById('modal-track-fotos');
    const containerImg = modal.querySelector('.project-img');

    if (proy.imagenes && proy.imagenes.length > 0) {
        containerImg.style.display = 'block';
        trackFotos.innerHTML = proy.imagenes.map((img, i) => `
            <div class="carousel-slide ${i === 0 ? 'active-slide' : ''}" style="display: ${i === 0 ? 'block' : 'none'}">
                <img src="${img}" onclick="openLightbox(this.src, 'modalCarousel')" style="cursor: zoom-in;">
            </div>
        `).join('');
        inicializarLogicaCarruseles(); // Para que funcionen los botones del carrusel del modal
    } else {
        containerImg.style.display = 'none';
    }

    modal.style.display = 'block';
}