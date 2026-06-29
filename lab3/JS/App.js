// Modal Popup
const showModal = (title, data) => {
  const modal = document.createElement("div");
  modal.className = "modal active";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${title}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <button class="btn primary close-modal">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal
    .querySelector(".close-modal")
    .addEventListener("click", () => modal.remove());
};

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

// Name validation for registration and contact forms
const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
document.querySelectorAll("#registrationName, #cname").forEach((input) => {
  const hint = input.nextElementSibling;
  input.addEventListener("focus", () => {
    hint.style.display = "block";
  });
  input.addEventListener("blur", () => {
    hint.style.display = "none";
  });
});

// Form Validation
document.getElementById("registerPanel").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("registrationName");
  const email = document.getElementById("registrationEmail").value.trim();
  const pass = document.getElementById("registrationPassword").value.trim();
  const confirm = document
    .getElementById("registrationConfirmPassword")
    .value.trim();
  nameInput.classList.remove("error");
  if (!isNameValid(nameInput.value.trim())) {
    nameInput.classList.add("error");
    return alert("Name should only contain letters and spaces.");
  }
  if (pass !== confirm) {
    return alert("Password do not match");
  }
  const data = { name: nameInput.value.trim(), email, pass };
  localStorage.setItem("userData", JSON.stringify(data));

  showModal("Registered Data", data);
});

document.getElementById("loginPanel").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passInput = document.getElementById("loginPass");
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  const data = { email, pass };
  localStorage.setItem("loginData", JSON.stringify(data));
  showModal("Login Data", data);
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("cname");
  const emailInput = document.getElementById("cemail");
  const messageInput = document.getElementById("cmessage");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  nameInput.classList.remove("error");
  if (!isNameValid(nameInput.value.trim())) {
    nameInput.classList.add("error");
    return alert("Name should only contain letters and spaces.");
  }
  const data = { name, email, message };
  showModal("Contact data", data);
});

// Mobile Navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const mobileNavLinks = document.querySelector(".nav-links");
console.log(navToggle, mobileNavLinks);
navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});
mobileNavLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});
