// ============================================
// TOSHIRO WIKI — Interações
// ============================================

// ---- FAQ: abrir/fechar perguntas ----
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    // Fecha os outros itens abertos
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      }
    });

    item.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
});

// ---- Sidebar: destaca o link da seção visível ----
const sections = document.querySelectorAll(".doc-section");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

const linkBySection = new Map();
sidebarLinks.forEach((link) => {
  const id = link.getAttribute("href").replace("#", "");
  linkBySection.set(id, link);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linkBySection.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-20% 0px -70% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// ---- Busca: filtra comandos e seções por texto ----
const searchInput = document.getElementById("search-input");
const searchableEntries = document.querySelectorAll(".cmd-entry, .faq-item, .doc-section");

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

searchInput.addEventListener("input", () => {
  const query = normalize(searchInput.value.trim());

  if (!query) {
    document.querySelectorAll(".cmd-entry").forEach((el) => (el.style.display = ""));
    return;
  }

  document.querySelectorAll(".cmd-entry").forEach((entry) => {
    const text = normalize(entry.textContent);
    entry.style.display = text.includes(query) ? "" : "none";
  });
});

// Atalho de teclado "/" para focar a busca
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === "Escape" && document.activeElement === searchInput) {
    searchInput.blur();
    searchInput.value = "";
    document.querySelectorAll(".cmd-entry").forEach((el) => (el.style.display = ""));
  }
});
