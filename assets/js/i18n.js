/* ============================================================
   GBS — i18n.js
   Motor del selector de idioma. Depende de translations.js
   (LANGUAGES, DEFAULT_LANG, TRANSLATIONS) cargado antes que este archivo.
   ============================================================ */

const STORAGE_KEY = "gbs-lang";

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && TRANSLATIONS[stored]) return stored;
  } catch (e) { /* localStorage no disponible */ }
  return DEFAULT_LANG;
}

function setStoredLang(code) {
  try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* noop */ }
}

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

  // Texto plano
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // HTML enriquecido (p.ej. <em>, &nbsp;, <strong>)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.documentElement.setAttribute("lang", lang);
}

function buildLangSwitcher() {
  const mount = document.querySelector("[data-lang-switch]");
  if (!mount) return;

  const current = getStoredLang();

  const wrap = document.createElement("div");
  wrap.className = "lang-switch";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "lang-switch-btn";
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");

  const menu = document.createElement("div");
  menu.className = "lang-switch-menu";
  menu.setAttribute("role", "menu");

  function renderButton(code) {
    const l = LANGUAGES.find((x) => x.code === code) || LANGUAGES[0];
    btn.innerHTML =
      '<span class="flag">' + l.flag + '</span>' +
      '<span>' + l.code.toUpperCase() + '</span>' +
      '<span class="caret">▾</span>';
  }

  function renderMenu(code) {
    menu.innerHTML = "";
    LANGUAGES.forEach((l) => {
      const item = document.createElement("button");
      item.type = "button";
      item.setAttribute("role", "menuitem");
      if (l.code === code) item.classList.add("is-active");
      item.innerHTML = '<span class="flag">' + l.flag + '</span><span>' + l.label + '</span>';
      item.addEventListener("click", () => {
        setStoredLang(l.code);
        applyTranslations(l.code);
        renderButton(l.code);
        renderMenu(l.code);
        wrap.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(item);
    });
  }

  renderButton(current);
  renderMenu(current);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = wrap.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      wrap.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  wrap.appendChild(btn);
  wrap.appendChild(menu);
  mount.appendChild(wrap);
}

document.addEventListener("DOMContentLoaded", () => {
  buildLangSwitcher();
  applyTranslations(getStoredLang());
});
