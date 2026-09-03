(() => {
  const STORAGE_KEY = "site-language";
  const DEFAULT_LANG = "pt";
  const SUPPORTED_LANGS = ["pt", "en"];

  const imageSources = {
    "demonstração": {
      pt: "img/demonstração.svg",
    },
    "Radiação Solar": {
      pt: "img/Radiação Solar.svg",
      en: "imgEN/Radiação Solar.svg",
    },
    "Variação de temperatura sob à Terra": {
      pt: "img/Variação de temperatura sob à Terra.svg",
      en: "imgEN/Variação de temperatura sob à Terra.svg",
    },
    "Pressão atmosférica": {
      pt: "img/Pressão atmosférica.svg",
      en: "imgEN/Pressão atmosférica.svg",
    },
    "Variação de pressão": {
      pt: "img/Variação de pressão.svg",
      en: "imgEN/Variação de pressão.svg",
    },
    Relação1: {
      pt: "img/Relação1.svg",
      en: "imgEN/Relação1.svg",
    },
    Desfecho: {
      pt: "img/Desfecho.svg",
      en: "imgEN/Desfecho.svg",
    },
    "monções 1": {
      pt: "img/monções 1.svg",
      en: "imgEN/monções 1.svg",
    },
    "monções 2": {
      pt: "img/monções 2.svg",
      en: "imgEN/monções 2.svg",
    },
  };

  const translations = {
    pt: {
      pageTitle: "Ventos",
      currentLabel: "Português",
      currentFlag: "",
      toggleAria: "Abrir seleção de idioma",
      header: { title: "Ventos" },
      nav: {
        home: "Início",
        radiation: "Radiação Solar",
        pressure: "Pressão atmosférica",
        relations: "Relações",
        extra: "Curiosidade extra",
      },
      index: {
        title: "Ventos",
        text: "Aqui você aprenderá sucintamente sobre os fundamentos dos <b>ventos!</b>",
      },
      radiation: {
        title: "Radiação Solar",
        text: "Antes de começar a de fato falar dos ventos, importa falar do seu principal aspecto causador (Radiação Solar).",
      },
      pressure: {
        title: "Pressão atmosférica",
        text: "Aprofundando-se mais um pouco, veremos brevemente a chamada <b>pressão atmosférica</b>, que importa, antes de falarmos propriamente sobre estes, comentarmos sobre as áreas de alta e baixa pressão.",
      },
      relations: {
        title: "Relações entre Radiação Solar e Pressão atmosférica",
        text: "A partir do que já foi analisado, convém falar de suas Relações",
      },
      extra: {
        title: "Curiosidade",
        text: "Abaixo, veja em específico um dos muitos tipos de ventos que ocorrem na atmosfera.",
      },
      footer: { copy: "© 2025 ventos. Todos os direitos reservados." },
    },
    en: {
      pageTitle: "Winds",
      currentLabel: "English",
      currentFlag: "",
      toggleAria: "Open language selection",
      header: { title: "Winds" },
      nav: {
        home: "Home",
        radiation: "Solar Radiation",
        pressure: "Atmospheric Pressure",
        relations: "Relationships",
        extra: "Extra Curiosity",
      },
      index: {
        title: "Winds",
        text: "Here you will briefly learn about the fundamentals of <b>winds!</b>",
      },
      radiation: {
        title: "Solar Radiation",
        text: "Before effectively talking about winds, it is important to discuss their main driving factor (Solar Radiation).",
      },
      pressure: {
        title: "Atmospheric Pressure",
        text: "Going a bit deeper, we will briefly look at <b>atmospheric pressure</b>. Before talking directly about winds, it is important to comment on high- and low-pressure areas.",
      },
      relations: {
        title: "Relationship Between Solar Radiation and Atmospheric Pressure",
        text: "From what has already been analyzed, it is worth discussing their relationships.",
      },
      extra: {
        title: "Curiosity",
        text: "Below, see one of the many wind types that occur in the atmosphere.",
      },
      footer: { copy: "© 2025 winds. All rights reserved." },
    },
  };

  function pageKey() {
    const p = window.location.pathname.toLowerCase();
    if (p.includes("radia")) return "radiation";
    if (p.includes("press")) return "pressure";
    if (p.includes("rela")) return "relations";
    if (p.includes("extra")) return "extra";
    return "index";
  }

  function applyLanguage(lang) {
    const t = translations[lang] || translations[DEFAULT_LANG];
    document.documentElement.lang = lang === "pt" ? "pt-br" : "en";
    document.title = t.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n");
      const value = keyPath.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), t);
      if (typeof value === "string") {
        if (value.includes("<b>")) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    const currentFlag = document.getElementById("language-current-flag");
    const currentLabel = document.getElementById("language-current-label");
    if (currentFlag) currentFlag.textContent = t.currentFlag;
    if (currentLabel) currentLabel.textContent = t.currentLabel;

    const key = pageKey();
    const footer = document.querySelector("footer p");
    if (footer) footer.textContent = t.footer.copy;

    if (key !== "index") {
      const homeLink = document.querySelector('nav a[href="index.html"]');
      if (homeLink) homeLink.textContent = t.nav.home;
    }

    document.querySelectorAll("img").forEach((img) => {
      const currentSrc = img.getAttribute("src") || "";
      const imageKey = Object.keys(imageSources).find((key) => currentSrc.includes(key));
      if (!imageKey) return;

      const source = imageSources[imageKey][lang] || imageSources[imageKey][DEFAULT_LANG];
      if (source) img.src = source;
    });
  }

  function getInitialLanguage() {
    const persisted = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(persisted) ? persisted : DEFAULT_LANG;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.querySelector(".language-switcher");
    const menuToggle = document.getElementById("language-menu-toggle");
    const altOption = document.getElementById("language-alt-option");
    const altFlag = document.getElementById("language-alt-flag");
    const altLabel = document.getElementById("language-alt-label");
    if (!switcher || !menuToggle || !altOption || !altFlag || !altLabel) return;

    function closeMenu() {
      switcher.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function updateMenu(lang) {
      const altLang = lang === "pt" ? "en" : "pt";
      const current = translations[lang];
      const alt = translations[altLang];
      menuToggle.setAttribute("aria-label", current.toggleAria);
      altFlag.textContent = alt.currentFlag;
      altLabel.textContent = alt.currentLabel;
      altOption.dataset.lang = altLang;
    }

    const initialLang = getInitialLanguage();
    applyLanguage(initialLang);
    updateMenu(initialLang);

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = switcher.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    altOption.addEventListener("click", () => {
      const selected = altOption.dataset.lang;
      if (!SUPPORTED_LANGS.includes(selected)) return;
      localStorage.setItem(STORAGE_KEY, selected);
      applyLanguage(selected);
      updateMenu(selected);
      closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) closeMenu();
    });
  });
})();
