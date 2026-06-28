// Page navigation
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll('nav a, .btn[href^="#"]');

function showPage(id) {
  pages.forEach((p) => p.classList.remove("active"));
  const target = document.querySelector(id);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
showPage("#home");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      showPage(href);
    }
  });
});

// Authentication Tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    document
      .querySelectorAll(".tab-panel")
      .forEach((panel) => panel.classList.remove("active"));
    document
      .getElementById(tab === "login" ? "loginPanel" : "registerPanel")
      .classList.add("active");
  });
});
