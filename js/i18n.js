/*
 * Textos del sitio.
 * - El español vive directamente en index.html (elementos con data-i18n).
 * - Acá solo va la traducción al inglés de esos elementos (I18N.en)
 *   y los textos que genera el JavaScript en ambos idiomas (I18N.ui).
 */
const I18N = {
    ui: {
        es: {
            roles: [
                'Desarrollador Full Stack',
                'Cofundador de CTRL-IA',
                'Estudiante de Ingeniería en Informática',
                'Resolviendo problemas con código'
            ],
            filtros: {
                todos: 'Todos',
                clientes: 'Clientes',
                productos: 'Productos propios',
                academicos: 'Académicos',
                personales: 'Personales'
            },
            categorias: {
                clientes: 'Cliente · CTRL-IA',
                productos: 'Producto propio',
                academicos: 'Académico',
                personales: 'Personal'
            },
            estados: {
                produccion: 'En producción',
                desarrollo: 'En desarrollo',
                finalizado: 'Finalizado',
                pausa: 'En pausa'
            },
            detalles: 'Ver detalles',
            demo: 'Ver sitio',
            repo: 'Código',
            verCapturas: 'Ver capturas',
            sinCapturas: 'Capturas próximamente',
            enCurso: 'en curso',
            copiado: '¡Email copiado! ✓',
            errorCopiar: 'No se pudo copiar el email',
            skills: {
                frontend: ['Frontend', 'Interfaces rápidas, responsive y accesibles.'],
                backend: ['Backend & Datos', 'APIs, autenticación y bases de datos relacionales.'],
                infra: ['Infra & Herramientas', 'Versionado, deploy y entornos de trabajo.'],
                base: ['Base académica', 'Lenguajes vistos en la carrera.'],
                soporte: ['Soporte & Seguridad', 'Años resolviendo problemas reales de hardware.']
            },
            soporte: ['Diagnóstico de hardware', 'Ensamblaje de PC', 'BIOS/UEFI y RAID', 'Redes básicas', 'Ciberseguridad (Google)'],
            apis: 'APIs REST · OAuth'
        },
        en: {
            roles: [
                'Full Stack Developer',
                'Co-founder of CTRL-IA',
                'Computer Engineering Student',
                'Solving problems with code'
            ],
            filtros: {
                todos: 'All',
                clientes: 'Clients',
                productos: 'Own products',
                academicos: 'Academic',
                personales: 'Personal'
            },
            categorias: {
                clientes: 'Client · CTRL-IA',
                productos: 'Own product',
                academicos: 'Academic',
                personales: 'Personal'
            },
            estados: {
                produccion: 'In production',
                desarrollo: 'In development',
                finalizado: 'Completed',
                pausa: 'On hold'
            },
            detalles: 'View details',
            demo: 'Live site',
            repo: 'Code',
            verCapturas: 'View screenshots',
            sinCapturas: 'Screenshots coming soon',
            enCurso: 'in progress',
            copiado: 'Email copied! ✓',
            errorCopiar: 'Could not copy the email',
            skills: {
                frontend: ['Frontend', 'Fast, responsive and accessible interfaces.'],
                backend: ['Backend & Data', 'APIs, authentication and relational databases.'],
                infra: ['Infra & Tools', 'Version control, deployment and dev environments.'],
                base: ['Academic background', 'Languages learned at university.'],
                soporte: ['Support & Security', 'Years solving real-world hardware problems.']
            },
            soporte: ['Hardware diagnostics', 'PC building', 'BIOS/UEFI & RAID', 'Basic networking', 'Cybersecurity (Google)'],
            apis: 'REST APIs · OAuth'
        }
    },

    en: {
        'nav.sobre': 'About',
        'nav.proyectos': 'Projects',
        'nav.stack': 'Stack',
        'nav.trayectoria': 'Journey',
        'nav.contacto': 'Contact',

        'hero.disponible': 'Open to new projects and opportunities',
        'hero.hola': "Hi, I'm",
        'hero.pitch': 'Full Stack Developer and co-founder of <a href="https://ctrl-ia.com.ar" target="_blank" rel="noopener">CTRL-IA</a>. I build web products end to end: from gathering requirements with the client to shipping to production.',
        'hero.verProyectos': 'View projects',
        'hero.hablemos': "Let's talk",

        'stats.anio': 'year of Computer Engineering',
        'stats.proyectos': 'projects built',
        'stats.empresa': 'the software company I co-founded',
        'stats.ingles': 'certified English',

        'sobre.eyebrow': '01 / About me',
        'sobre.titulo': 'Engineering, code and <span class="gradient-text">real clients</span>.',
        'sobre.p1': "I'm an advanced <strong>Computer Engineering</strong> student (4th year, USAL) and a Full Stack Developer with a strong entrepreneurial mindset. As a co-founder of <strong>CTRL-IA</strong>, I manage the full lifecycle of custom software solutions: requirements gathering, design, development and deployment.",
        'sobre.p2': 'I work with <strong>React, Next.js, Node.js, PostgreSQL and Supabase</strong>, and I have a solid background in databases, cybersecurity fundamentals (Google certificate) and advanced hardware skills from years of freelance tech support.',
        'sobre.p3': "I stand out for explaining complex technical concepts clearly, working directly with clients, and constantly learning. Outside of code I'm a big gamer — so much that I ended up building my own video game wiki, <strong>Wikey</strong>.",
        'sobre.codigo': '<span class="c-kw">const</span> <span class="c-var">nicolas</span> = {\n  <span class="c-key">role</span>: <span class="c-str">"Full Stack Developer"</span>,\n  <span class="c-key">company</span>: <span class="c-str">"CTRL-IA"</span>,\n  <span class="c-key">studies</span>: <span class="c-str">"Computer Engineering · USAL"</span>,\n  <span class="c-key">stack</span>: [<span class="c-str">"React"</span>, <span class="c-str">"Next.js"</span>, <span class="c-str">"Node.js"</span>, <span class="c-str">"PostgreSQL"</span>],\n  <span class="c-key">languages</span>: [<span class="c-str">"Spanish"</span>, <span class="c-str">"English B2"</span>],\n  <span class="c-key">hobbies</span>: [<span class="c-str">"video games"</span>, <span class="c-str">"building PCs"</span>],\n  <span class="c-key">available</span>: <span class="c-bool">true</span>,\n};\n\n<span class="c-var">nicolas</span>.<span class="c-fn">build</span>(<span class="c-str">"your next project"</span>); <span class="c-com">// 🚀</span>',

        'soft.problemas': 'Problem solving',
        'soft.autonomia': 'Autonomy',
        'soft.equipo': 'Teamwork',
        'soft.clientes': 'Client-facing',
        'soft.adaptabilidad': 'Adaptability',
        'soft.aprendizaje': 'Continuous learning',

        'proyectos.eyebrow': '02 / Projects',
        'proyectos.titulo': 'Things I\'ve <span class="gradient-text">built</span>.',
        'proyectos.lead': 'From systems for real clients to my own products and passion projects.',
        'proyectos.horno': '// in the oven',
        'proyectos.horno1': 'Technical Minecraft and Redstone inside Wikey',
        'proyectos.horno2': 'My own video game',
        'proyectos.horno3': 'New projects with CTRL-IA',

        'stack.eyebrow': '03 / Stack',
        'stack.titulo': 'My <span class="gradient-text">toolbox</span>.',

        'tray.eyebrow': '04 / Journey',
        'tray.titulo': 'Experience and <span class="gradient-text">education</span>.',
        'tray.experiencia': 'Experience',
        'tray.formacion': 'Education',

        'exp.ctrl.fecha': 'May 2026 — Present',
        'exp.ctrl.rol': 'Co-founder &amp; Full Stack Developer',
        'exp.ctrl.1': 'End-to-end management of custom software, from requirements gathering to technical and commercial delivery.',
        'exp.ctrl.2': 'Full stack development and deployment of web solutions (websites, booking systems).',
        'exp.ctrl.3': 'First client in production: the website, digital menu and admin panel for <strong>Perci</strong> restaurant.',
        'exp.hw.fecha': '2022 — Present',
        'exp.hw.rol': 'Hardware Technician',
        'exp.hw.org': 'Freelance · Self-employed',
        'exp.hw.1': 'Assembly, maintenance and troubleshooting of hardware and software (Windows/Linux) for end users.',
        'exp.hw.2': 'Advice on IT security, best practices and basic network setup.',

        'edu.usal.fecha': '2023 — 2027 · currently in 4th year',
        'edu.usal.titulo': 'Computer Engineering',
        'edu.coder.fecha': 'September 2025 — Present',
        'edu.coder.titulo': 'Full Stack Development',
        'edu.coder.m1': 'Web Development',
        'edu.coder.m4': 'Backend I · Advanced development',
        'edu.coder.m5': 'Backend II · Design &amp; architecture',
        'edu.coder.m6': 'Backend III · Testing &amp; scalability',
        'edu.google.fecha': 'August 2024 — April 2025',
        'edu.google.titulo': 'Google Cybersecurity Professional Certificate',
        'edu.google.ver': 'View certificate',
        'edu.ingles.fecha': 'Certified',
        'edu.ingles.titulo': 'English B2',

        'contacto.eyebrow': '05 / Contact',
        'contacto.titulo': 'Got a project or an open position? <span class="gradient-text">Let\'s talk.</span>',
        'contacto.lead': 'I reply fast. Reach out through whichever channel suits you best.',
        'contacto.cv': 'Download CV',

        'footer.hecho': 'Designed and built with HTML, CSS and JavaScript.',
        'footer.arriba': 'back to top ↑'
    }
};
