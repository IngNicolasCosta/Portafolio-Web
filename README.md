# 🚀 Portafolio Profesional - Nicolás Costa

Este proyecto es una plataforma web personal diseñada para centralizar mi trayectoria académica como **estudiante de 4to año de Ingeniería en Informática** y mis desarrollos como **Full Stack Developer**. Concebido como un proyecto evolutivo, aplica conceptos de arquitectura de software para separar la lógica de los datos.

## 🏗️ Arquitectura Técnica: Data-Driven

A diferencia de un portafolio estático, este sitio utiliza un sistema de **hidratación dinámica**:
* **Carga Asíncrona:** Uso de `Fetch API` para consumir el catálogo de proyectos desde archivos `.json` locales.
* **Componente Único de Modal:** Se implementó un único modal "maestro" en el HTML que se rellena dinámicamente según el ID del proyecto seleccionado, optimizando el rendimiento y el mantenimiento.
* **Internacionalización (i18n):** Soporte completo para Español e Inglés mediante la carga selectiva de archivos de datos (`proyectos.json` / `proyectos-en.json`) según el contexto de la URL.

## 🌟 Funcionalidades Principales

* **Galería Dinámica:** Generación automática de tarjetas de proyectos en el carrusel principal desde la base de datos JSON.
* **Carruseles Inteligentes:** Cada proyecto dentro de su modal cuenta con su propio carrusel de imágenes autogenerado.
* **Renderizado Condicional:** Los botones de "Página Web" y "Repositorio" solo se muestran si el proyecto cuenta con dichos enlaces en el JSON.
* **Descripciones Enriquecidas:** Soporte para etiquetas HTML dentro de los datos para resaltar palabras clave y mejorar la legibilidad.
* **Navegación Fluida:** Sistema de `Lightbox` para la visualización ampliada de capturas de pantalla de los proyectos.

## 🛠️ Tecnologías Utilizadas

* **HTML5** & **CSS3** (Flexbox, Custom Properties).
* **JavaScript Vanilla** (ES6+, Programación Asíncrona).
* **JSON** (Estructura de datos para persistencia de contenido).
* **Google Fonts** (Recursos visuales).

## 📂 Estructura del Proyecto

* `/index.html`: Estructura principal en español.
* `/pages/english.html`: Versión del portafolio en inglés.
* `/js/script.js`: Lógica de renderizado dinámico, carruseles y manejo de idiomas.
* `/data/proyectos.json`: Base de datos de proyectos en español.
* `/data/proyectos-en.json`: Base de datos de proyectos en inglés.
* `/styles/styles.css`: Diseño responsive y animaciones de interfaz.

## 👤 Autor

* **Nicolás Costa** - *Estudiante de 4to año de Ingeniería en Informática*.

---
*Este portafolio es un proyecto en constante evolución, reflejando mi aprendizaje continuo en el desarrollo de software.*