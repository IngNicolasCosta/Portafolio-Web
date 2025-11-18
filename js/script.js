document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA DEL CARRUSEL (Navegación en la página principal)
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Identificar el carrusel afectado por el botón
            const carouselId = button.getAttribute('data-carousel');
            const carouselContainer = document.getElementById(carouselId);

            if (!carouselContainer) return;

            // 2. Obtener todos los slides dentro de ese carrusel
            const slides = carouselContainer.querySelectorAll('.carousel-slide');

            // 3. Encontrar el índice del slide actualmente visible
            let currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active-slide'));

            // Asegurarse de que haya un slide activo (si es -1, iniciar en 0)
            if (currentSlideIndex === -1) {
                currentSlideIndex = 0;
            }

            // 4. Determinar la dirección de la navegación
            const direction = button.classList.contains('next-btn') ? 1 : -1;

            // 5. Calcular el nuevo índice
            let newSlideIndex = currentSlideIndex + direction;

            // 6. Manejar el loop (Volver al inicio/final)
            if (newSlideIndex >= slides.length) {
                newSlideIndex = 0;
            } else if (newSlideIndex < 0) {
                newSlideIndex = slides.length - 1;
            }

            // 7. Aplicar el cambio:

            // Ocultar el slide actual
            slides[currentSlideIndex].classList.remove('active-slide');
            slides[currentSlideIndex].style.display = 'none';

            // Mostrar el nuevo slide
            slides[newSlideIndex].classList.add('active-slide');
            slides[newSlideIndex].style.display = 'block';
        });
    });

    // 2. LÓGICA DEL MODAL (Apertura)
    
    document.addEventListener('click', (event) => {
       
        const trigger = event.target.closest('.click-mas');

        if (trigger) {

            const isAboutTrigger = trigger.id === 'click-about'; 
           
            let modalId;
            let canOpen = false;
            let slideContainer;

            if (isAboutTrigger) {

                modalId = trigger.closest('section').getAttribute('data-modal');
                canOpen = true;
            } else {

                slideContainer = trigger.closest('.carousel-slide');
            }
             if (slideContainer && slideContainer.classList.contains('active-slide')) {
                modalId = slideContainer.getAttribute('data-modal');
                canOpen = true;
            }
            if (canOpen && modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        }

        }
    });

    // 3. LÓGICA DEL MODAL (Cierre)
    const closeButtons = document.querySelectorAll('.close-btn');

    // Cierre desde el botón 'X'
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Cierre al hacer clic fuera del modal
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // 4. Inicialización: Asegurar que solo el primer slide esté visible al cargar
    document.querySelectorAll('.carousel-container').forEach(container => {
        const slides = container.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active-slide');
                slide.style.display = 'block';
            } else {
                slide.classList.remove('active-slide');
                slide.style.display = 'none';
            }
        });
    });

    // 5. LÓGICA DEL CAMBIO DE IDIOMA
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

    // 6. LÓGICA PARA COPIAR EMAIL AL PORTAPAPELES
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
});
