/* ============================================================
   GBS — main.js
   Comportamiento compartido en todas las páginas.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initUptimeClock();
  initTopologyPulse();
  initContactForm();
  markActiveNavLink();
});

/* ---------- Menú móvil ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".navbar");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/* ---------- Reloj de uptime en la status bar ---------- */
function initUptimeClock() {
  const el = document.querySelector("[data-clock='lima']");
  if (!el) return;
  const render = () => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Lima",
    }).format(now);
    el.textContent = formatted + " PE";
  };
  render();
  setInterval(render, 1000);
}

/* ---------- Pulso animado sobre el diagrama de topología del hero ---------- */
function initTopologyPulse() {
  const svg = document.querySelector(".topology");
  if (!svg) return;
  const links = svg.querySelectorAll(".link");
  let i = 0;
  setInterval(() => {
    links.forEach((l) => l.classList.remove("active"));
    const link = links[i % links.length];
    if (link) link.classList.add("active");
    i++;
  }, 700);
}

/* ---------- Formulario de contacto (validación + confirmación simulada) ---------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const success = document.querySelector("#form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Simulación de envío: aquí se debe conectar a un backend / servicio real
    // (por ejemplo un endpoint propio, Formspree, o una función serverless).
    if (success) {
      success.classList.add("show");
      success.setAttribute("tabindex", "-1");
      success.focus();
    }
    form.reset();
  });
}

/* ---------- Resalta el link activo del navbar según el archivo actual ---------- */
function markActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.navbar a").forEach((a) => {
    const href = a.getAttribute("href").split("/").pop();
    if (href === path) a.classList.add("active");
  });
}
