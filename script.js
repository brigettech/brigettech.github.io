/* =========================================================
   PROFA. BRIGETTE Y JORGE
   JAVASCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   1. MENÚ PARA CELULAR
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (mainNav.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /*
     * Cerrar el menú cuando el usuario
     * selecciona una opción.
     */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   2. NAVEGACIÓN ACTIVA
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navigationLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}


window.addEventListener("scroll", updateActiveNavigation);





/* =========================================================
   4. ANIMACIÓN AL APARECER
   ========================================================= */


/*
 * Seleccionamos elementos que queremos
 * animar cuando aparecen en pantalla.
 */

const animatedElements = document.querySelectorAll(
    ".dashboard-card, .about-content, .about-image, .contact-info, .contact-form"
);


/*
 * IntersectionObserver detecta cuando
 * un elemento entra en pantalla.
 */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   5. BOTONES "VER MATERIA"
   ========================================================= */

const subjectButtons =
    document.querySelectorAll(".subject-btn");


subjectButtons.forEach(button => {

    button.addEventListener("click", event => {

        /*
         * Por ahora evitamos que el "#"
         * nos lleve arriba.
         */

        const link = button.getAttribute("href");


        if (!link || link === "#") {

            event.preventDefault();


            /*
             * Buscamos el nombre de la materia
             */

            const card = button.closest(".subject-card");

            if (!card) {
                return;
            }


            const subjectName =
                card.querySelector("h3");


            if (subjectName) {

                alert(
                    `Próximamente encontrarás aquí todo el contenido de ${subjectName.textContent}.`
                );

            }

        }

    });

});


/* =========================================================
   6. FORMULARIO DE CONTACTO
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            /*
             * Evitamos que el formulario
             * recargue la página.
             */

            event.preventDefault();


            /*
             * Obtener datos
             */

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            /*
             * Validación básica
             */

            if (!name || !email || !message) {

                alert(
                    "Por favor completa todos los campos."
                );

                return;

            }


            /*
             * Mensaje temporal.
             *
             * Más adelante podemos conectar
             * el formulario con un servicio real.
             */

            alert(
                `¡Gracias, ${name}!\n\nTu mensaje ha sido preparado correctamente.`
            );


            /*
             * Limpiar formulario
             */

            contactForm.reset();

        }
    );

}


/* =========================================================
   7. EFECTO SUAVE PARA ENLACES INTERNOS
   ========================================================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");


        if (
            targetId === "#" ||
            targetId === ""
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            const header =
                document.querySelector(".header");


            const headerHeight =
                header ? header.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                + window.scrollY
                - headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }

    });

});


/* =========================================================
   8. MENSAJE DE BIENVENIDA EN CONSOLA
   ========================================================= */

console.log(
    "🌟 Portal educativo de Profa. Brigette y Jorge cargado correctamente."
);
