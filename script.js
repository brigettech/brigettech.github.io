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


/* =========================================================
   AVISOS RECIENTES DESDE GOOGLE CALENDAR
   Agrupados por mes, con fecha, hora, comunicado y lugar.
========================================================= */

const CALENDAR_ID =
  "509134d240721109ec1396c9de8da6c7cc44a3436d733deb6c9ba228614ca299@group.calendar.google.com";

// Pega aquí tu clave nueva o la que hayas restringido.
const API_KEY = "AIzaSyB8VwQy33txA0_soQTR7yA0kAxwBUWdKpc";

const TIME_ZONE = "America/Monterrey";
const DAYS_AHEAD = 365;
const MAX_NOTICES = 5;

const noticeList = document.getElementById("notice-list");
const calendarStatus = document.getElementById("calendar-status");

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "short"
});

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});

const monthFormatter = new Intl.DateTimeFormat("es-MX", {
  timeZone: TIME_ZONE,
  month: "long",
  year: "numeric"
});

function getEventDate(event) {
  if (event.start?.dateTime) {
    return new Date(event.start.dateTime);
  }

  if (event.start?.date) {
    // Mediodía UTC para evitar cambios accidentales de día.
    return new Date(`${event.start.date}T12:00:00Z`);
  }

  return null;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createNotice(event) {
  const date = getEventDate(event);
  const allDay = Boolean(event.start?.date);

  const item = createElement("article", "notice-item");

  const dateBox = createElement("div", "notice-date");
  dateBox.appendChild(
    createElement("span", "notice-day", dateFormatter.format(date))
  );

  if (!allDay) {
    dateBox.appendChild(
      createElement("span", "notice-time", timeFormatter.format(date))
    );
  } else {
    dateBox.appendChild(
      createElement("span", "notice-time", "Todo el día")
    );
  }

  const content = createElement("div", "notice-content");

  content.appendChild(
    createElement(
      "h3",
      "notice-title",
      event.summary || "Actividad escolar"
    )
  );

  if (event.description?.trim()) {
    content.appendChild(
      createElement(
        "p",
        "notice-description",
        event.description.trim()
      )
    );
  }

  if (event.location?.trim()) {
    const place = createElement("p", "notice-location");
    place.appendChild(createElement("span", "location-label", "Lugar: "));
    place.appendChild(document.createTextNode(event.location.trim()));
    content.appendChild(place);
  } else {
    content.appendChild(
      createElement(
        "p",
        "notice-location notice-location-missing",
        "Lugar por confirmar"
      )
    );
  }

  item.append(dateBox, content);
  return item;
}

async function loadCalendarNotices() {
  if (!noticeList) {
    console.error('No se encontró el elemento "#notice-list".');
    return;
  }

  noticeList.replaceChildren();
  noticeList.appendChild(
    createElement("p", "calendar-loading", "Cargando avisos...")
  );

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
      maxResults: String(MAX_NOTICES),
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
      timeZone: TIME_ZONE
    });

    const url =
      `https://www.googleapis.com/calendar/v3/calendars/` +
      `${encodeURIComponent(CALENDAR_ID)}/events?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      const detail = await response.text();
      console.error("Error de Google Calendar:", response.status, detail);
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();

    const events = (data.items || [])
      .filter(event =>
        event.status !== "cancelled" &&
        (event.start?.dateTime || event.start?.date)
      )
      .sort((a, b) => getEventDate(a) - getEventDate(b));

    noticeList.replaceChildren();

    if (events.length === 0) {
      noticeList.appendChild(
        createElement(
          "p",
          "calendar-empty",
          "No hay actividades próximas programadas."
        )
      );
      return;
    }

    // Agrupar eventos por mes y año.
    const groups = new Map();

    events.forEach(event => {
      const date = getEventDate(event);
      const monthKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit"
      }).format(date);

      if (!groups.has(monthKey)) {
        groups.set(monthKey, {
          title: monthFormatter.format(date),
          events: []
        });
      }

      groups.get(monthKey).events.push(event);
    });

    groups.forEach(group => {
      const section = createElement("section", "notice-month");
      section.appendChild(
        createElement("h3", "notice-month-title", group.title)
      );

      const monthItems = createElement("div", "notice-month-list");

      group.events.forEach(event => {
        monthItems.appendChild(createNotice(event));
      });

      section.appendChild(monthItems);
      noticeList.appendChild(section);
    });

    if (calendarStatus) {
      calendarStatus.textContent =
        "Última actualización: " +
        new Intl.DateTimeFormat("es-MX", {
          timeZone: TIME_ZONE,
          hour: "2-digit",
          minute: "2-digit"
        }).format(new Date());
    }
  } catch (error) {
    console.error("Error al cargar Google Calendar:", error);
    noticeList.replaceChildren();
    noticeList.appendChild(
      createElement(
        "p",
        "calendar-error",
        "No se pudieron cargar los avisos. Revisa la configuración de Google Calendar API."
      )
    );
  }
}

document.addEventListener("DOMContentLoaded", loadCalendarNotices);
setInterval(loadCalendarNotices, 5 * 60 * 1000);
