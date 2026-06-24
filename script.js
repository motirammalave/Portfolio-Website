// Hero entrance animation using GSAP
if (window.gsap) {
  gsap.from(".hero-text", { y: 40, opacity: 0, duration: 1, ease: "power3.out" });
  gsap.from(".hero-image", { y: 40, opacity: 0, duration: 1, delay: 0.12, ease: "power3.out" });
}

// Theming
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const storedTheme = localStorage.getItem("portfolioTheme");

if (storedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Mobile menu
const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.getElementById("navMenu");
mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Scroll reveal
const revealItems = document.querySelectorAll("[data-reveal]");
const revealOptions = { threshold: 0.15 };

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealItems.forEach((item) => revealObserver.observe(item));

// Typing text for hero subtitle
const typingTexts = [
  "BCA Student",
  "Aspiring Software Developer",
  "Web Developer"
];
const typingTextElement = document.getElementById("typing-text");
const typingCursor = document.getElementById("typing-cursor");
let typingIndex = 0;
let charIndex = 0;
let deleting = false;

const typeSubtitle = () => {
  const currentText = typingTexts[typingIndex];
  const displayedText = currentText.slice(0, charIndex);
  typingTextElement.textContent = displayedText;

  if (!deleting) {
    if (charIndex < currentText.length) {
      charIndex += 1;
      setTimeout(typeSubtitle, 100);
    } else {
      deleting = true;
      setTimeout(typeSubtitle, 1500);
    }
  } else {
    if (charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeSubtitle, 50);
    } else {
      deleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(typeSubtitle, 300);
    }
  }
};

typeSubtitle();

// Skill progress values from data-percent attributes
const skillProgresses = document.querySelectorAll(".skill-card .progress");
skillProgresses.forEach((progress) => {
  const percentage = parseInt(progress.dataset.percent, 10) || 0;
  progress.querySelector("span").style.width = `${percentage}%`;
  progress.closest(".skill-card").querySelector(".skill-percentage").textContent = `${percentage}%`;
});

// Navbar link active state
const navLinks = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section[id]");

const updateActiveNav = () => {
  let activeSectionId = sections[0]?.id || "";
  let smallestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const distance = Math.abs(sectionTop - 96);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
window.addEventListener("hashchange", updateActiveNav);

// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form mock submit
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();

  if (!name || !email || !message) {
    formSuccess.textContent = "Please fill out all fields before submitting.";
    formSuccess.style.color = "#dc2626";
    return;
  }

  formSuccess.textContent = "Message sent successfully! Thank you for reaching out.";
  formSuccess.style.color = "#16a34a";
  contactForm.reset();
  setTimeout(() => { formSuccess.textContent = ""; }, 4500);
});

// Certificate Lightbox Modal
const certModal = document.getElementById("certModal");
const certModalImg = document.getElementById("certModalImg");
const certModalClose = document.querySelector(".cert-modal-close");
const certificateCards = document.querySelectorAll(".certificate-card");

certificateCards.forEach((card) => {
  card.addEventListener("click", () => {
    const certImage = card.getAttribute("data-cert");
    certModalImg.src = certImage;
    certModal.classList.add("show");
  });
});

certModalClose.addEventListener("click", () => {
  certModal.classList.remove("show");
});

certModal.addEventListener("click", (e) => {
  if (e.target === certModal) {
    certModal.classList.remove("show");
  }
});