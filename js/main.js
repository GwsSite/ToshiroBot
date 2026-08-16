// ============================================
// TOSHIRO BOT — Interações da página
// ============================================

// Ano atual no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Revela as seções suavemente conforme entram na tela
const revealTargets = document.querySelectorAll(".kata-card, .command-list li");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

document.addEventListener(
  "transitionend",
  () => {},
  { once: true }
);

// Aplica o estado "in-view" via classe (CSS cuidaria disso caso preferir mover para o style.css)
const style = document.createElement("style");
style.textContent = `
  .kata-card.in-view, .command-list li.in-view {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
