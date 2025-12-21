/* app.js - UPDATED VERSION */
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* Typing Effect - UPDATED */
const textEl = document.getElementById("typed-text");
const texts = [
  "Hi, I'm Sachin",
  "Java Backend Developer",
  "Spring Boot Enthusiast", 
  "DSA Practitioner"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!deleting) {
    textEl.textContent = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    textEl.textContent = currentText.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

/* NAV SCROLL - Updated for new sections */
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

/* SKILLS ANIMATION - Updated data-progress attributes */
document.addEventListener('DOMContentLoaded', function() {
  // Animate skill progress bars
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 200);
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document.querySelectorAll('.skill-category, .project-card, .education-card, .experience-card').forEach(el => {
    observer.observe(el);
  });
});

/* Contact Form - EmailJS */
emailjs.init("zSVa5d1HwjhULiEcm");

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      alert('Message sent successfully!');
      this.reset();
    }, (error) => {
      alert('Failed to send message. Please try again.');
      console.error('EmailJS error:', error);
    });
});

/* Mobile menu toggle */
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
