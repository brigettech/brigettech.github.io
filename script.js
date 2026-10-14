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

/* =========================================================
9. AVISOS RECIENTES DESDE GOOGLE CALENDAR
========================================================= */

/*

IMPORTANTE:

Sustituye TU_API_KEY por tu clave de Google Calendar API.

No uses contraseñas ni claves privadas.
*/

const GOOGLE_CALENDAR_ID =
"509134d240721109ec1396c9de8da6c7cc44a3436d733deb6c9ba228614ca299@group.calendar.google.com";

const GOOGLE_CALENDAR_API_KEY = "AIzaSyB8VwQy33txA0_soQTR7yA0kAxwBUWdKpc";

async function cargarAvisosRecientes() {

const contenedor =
    document.getElementById("avisos-recientes");

if (!contenedor) {
    return;
}

contenedor.innerHTML =
    "<p>Cargando próximos avisos...</p>";

const ahora = new Date().toISOString();

const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events` +
    `?key=${encodeURIComponent(GOOGLE_CALENDAR_API_KEY)}` +
    `&singleEvents=true&orderBy=startTime` +
    `&timeMin=${encodeURIComponent(ahora)}` +
    `&maxResults=5`;

try {

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const eventos = (datos.items || [])
        .filter(evento => evento.status !== "cancelled");

    if (eventos.length === 0) {

        contenedor.innerHTML =
            "<p>No hay actividades próximas programadas.</p>";

        return;
    }

    contenedor.innerHTML = eventos.map(evento => {

        const esTodoElDia = Boolean(evento.start?.date);

        let fechaTexto = "";

        if (esTodoElDia) {

            const [anio, mes, dia] =
                evento.start.date.split("-").map(Number);

            fechaTexto = new Date(anio, mes - 1, dia)
                .toLocaleDateString("es-MX", {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                });

        } else {

            fechaTexto = new Date(evento.start.dateTime)
                .toLocaleString("es-MX", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Monterrey"
                });

        }

        return `
            <article class="notice-item">
                <div class="notice-icon">
                    <i class="fa-regular fa-calendar"></i>
                </div>

                <div class="notice-content">
                    <h4>${escaparTexto(evento.summary || "Actividad escolar")}</h4>
                    <p>${escaparTexto(fechaTexto)}</p>
                </div>
            </article>
        `;

    }).join("");

} catch (error) {

    console.error(
        "Error al cargar los eventos de Google Calendar:",
        error
    );

    contenedor.innerHTML =
        "<p>No fue posible cargar los avisos. Verifica la configuración de Google Calendar.</p>";

}

}

/* Evita insertar texto del calendario como HTML */

function escaparTexto(texto) {

const elemento = document.createElement("span");

elemento.textContent = texto;

return elemento.innerHTML;

}

/* Cargar al abrir la página y actualizar cada 15 minutos */

document.addEventListener("DOMContentLoaded", () => {

cargarAvisosRecientes();

setInterval(cargarAvisosRecientes, 15 * 60 * 1000);

});


const CALENDAR_ID =
  "509134d240721109ec1396c9de8da6c7cc44a3436d733deb6c9ba228614ca299@group.calendar.google.com";

const API_KEY = "AIzaSyB8VwQy33txA0_soQTR7yA0kAxwBUWdKpc";
const TIME_ZONE = "America/Monterrey";
const DAYS_AHEAD = 30;
const MAX_NOTICES = 5;

const noticeList = document.getElementById("notice-list");
const calendarStatus = document.getElementById("calendar-status");

function formatEventDate(event) {
  const isAllDay = Boolean(event.start?.date);
  const rawDate = isAllDay ? event.start.date : event.start?.dateTime;

  if (!rawDate) return "Fecha por confirmar";

  // Para eventos de día completo, evita que la zona horaria
  // cambie el día mostrado.
  const date = isAllDay
    ? new Date(`${rawDate}T12:00:00Z`)
    : new Date(rawDate);

  const options = {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  if (!isAllDay) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  return new Intl.DateTimeFormat("es-MX", options).format(date);
}

function addNotice(event) {
  const item = document.createElement("article");
  item.className = "notice-item";

  const date = document.createElement("div");
  date.className = "notice-date";
  date.textContent = formatEventDate(event);

  const content = document.createElement("div");
  content.className = "notice-content";

  const title = document.createElement("h3");
  title.textContent = event.summary || "Actividad programada";

  content.appendChild(title);

  if (event.description) {
    const description = document.createElement("p");
    // Limita el texto para que los avisos no sean demasiado largos.
    description.textContent = event.description.slice(0, 220);
    content.appendChild(description);
  }

  item.append(date, content);
  noticeList.appendChild(item);
}

async function loadCalendarNotices() {
  if (!noticeList) {
    console.error('No se encontró el elemento "#notice-list".');
    return;
  }

  if (!API_KEY || API_KEY === "PEGA_AQUI_TU_CLAVE_DE_API") {
    noticeList.textContent = "Falta configurar la clave de API.";
    return;
  }

  noticeList.replaceChildren();
  noticeList.textContent = "Cargando avisos...";

  if (calendarStatus) calendarStatus.textContent = "";

  try {
    const now = new Date();
    const end = new Date(
      now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000
    );

    const params = new URLSearchParams({
      key: API_KEY,
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "50",
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
      timeZone: TIME_ZONE
    });

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/` +
      `${encodeURIComponent(CALENDAR_ID)}/events?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Calendar respondió con ${response.status}`);
    }

    const data = await response.json();

    const events = (data.items || []).filter(event =>
      event.status !== "cancelled" &&
      (event.start?.dateTime || event.start?.date)
    );

    noticeList.replaceChildren();

    if (events.length === 0) {
      noticeList.textContent =
        "No hay eventos próximos en los siguientes 30 días.";
      return;
    }

    events.slice(0, MAX_NOTICES).forEach(addNotice);

    if (calendarStatus) {
      calendarStatus.textContent =
        `Actualizado: ${new Intl.DateTimeFormat("es-MX", {
          timeZone: TIME_ZONE,
          dateStyle: "short",
          timeStyle: "short"
        }).format(new Date())}`;
    }
  } catch (error) {
    console.error("Error al cargar Google Calendar:", error);
    noticeList.textContent =
      "No se pudieron cargar los avisos. Revisa la configuración de Google Calendar API.";
  }
}

// Cargar al abrir la página y actualizar cada 5 minutos.
loadCalendarNotices();
setInterval(loadCalendarNotices, 5 * 60 * 1000);
