document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DEL CARRUSEL ---
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel');
            const carouselContainer = document.getElementById(carouselId);
            if (!carouselContainer) return;

            const slides = carouselContainer.querySelectorAll('.carousel-slide');
            let currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active-slide'));
            
            if (currentSlideIndex === -1) currentSlideIndex = 0;

            const direction = button.classList.contains('next-btn') ? 1 : -1;
            let newSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

            slides[currentSlideIndex].classList.remove('active-slide');
            slides[currentSlideIndex].style.display = 'none';

            slides[newSlideIndex].classList.add('active-slide');
            slides[newSlideIndex].style.display = 'block';
        });
    });

    // --- 2. LÓGICA DE APERTURA DE MODALES ---
    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('.click-mas');
        if (trigger) {
            const isAboutTrigger = trigger.id === 'click-about'; 
            const isJobTrigger = trigger.closest('.job-card');
            let modalId, canOpen = false;

            if (isAboutTrigger) {
                modalId = trigger.closest('section').getAttribute('data-modal');
                canOpen = true;
            } else if (isJobTrigger) {
                modalId = isJobTrigger.getAttribute('data-modal');
                canOpen = true;
            } else {
                const slideContainer = trigger.closest('.carousel-slide');
                if (slideContainer && slideContainer.classList.contains('active-slide')) {
                    modalId = slideContainer.getAttribute('data-modal');
                    canOpen = true;
                }
            }

            if (canOpen && modalId) {
                const modal = document.getElementById(modalId);
                if (modal) modal.style.display = 'block';
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
    window.openLightbox = function(src, carouselId) {
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
    window.changeLightboxSlide = function(direction) {
        if (!activeCarouselId) return;

        const carousel = document.getElementById(activeCarouselId);
        if(!carousel) return;
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
