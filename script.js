/* ============================================================
   MUNYAI KHUTHADZO — PORTFOLIO JAVASCRIPT
   File: script.js
   Description: Interactions and animations for portfolio site
   ============================================================ */


/* ── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────── */
/* When a nav link is clicked, smoothly scroll to that section */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ── ACTIVE NAV LINK ON SCROLL ───────────────────────────── */
/* Highlights the correct nav link as user scrolls through sections */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#FFFFFF';
    }
  });
});


/* ── NAV BACKGROUND ON SCROLL ────────────────────────────── */
/* Adds a stronger shadow to nav when user scrolls down */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  }
});


/* ── SCROLL REVEAL ANIMATION ─────────────────────────────── */
/* Cards and sections fade in as user scrolls to them */

// Add hidden class to all cards and steps initially
const revealElements = document.querySelectorAll(
  '.portfolio-card, .cert-card, .workflow-step, .skill-category'
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation — each card appears slightly after the previous
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ── STAT COUNTER ANIMATION ──────────────────────────────── */
/* Numbers in the hero section count up when page loads */

function animateCounter(element, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target === Math.floor(target)
        ? target
        : target.toFixed(1);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Run counter animation when hero stats come into view
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.dataset.target);
      if (target) animateCounter(entry.target, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));


/* ── MOBILE NAV TOGGLE ───────────────────────────────────── */
/* On mobile, add a hamburger menu button */

const navLinksContainer = document.querySelector('.nav-links');

// Create hamburger button
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.style.cssText = `
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
`;
hamburger.setAttribute('aria-label', 'Toggle navigation');

nav.appendChild(hamburger);

// Show hamburger on mobile
function checkMobile() {
  if (window.innerWidth <= 768) {
    hamburger.style.display = 'block';
  } else {
    hamburger.style.display = 'none';
    navLinksContainer.style.display = 'flex';
  }
}

checkMobile();
window.addEventListener('resize', checkMobile);

// Toggle nav on hamburger click
let navOpen = false;

hamburger.addEventListener('click', () => {
  navOpen = !navOpen;
  if (navOpen) {
    navLinksContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 64px;
      left: 0; right: 0;
      background: #1B3A6B;
      padding: 20px 40px;
      gap: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    `;
    hamburger.innerHTML = '✕';
  } else {
    navLinksContainer.style.display = 'none';
    hamburger.innerHTML = '☰';
  }
});

// Close nav when a link is clicked on mobile
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navOpen = false;
      navLinksContainer.style.display = 'none';
      hamburger.innerHTML = '☰';
    }
  });
});


/* ── PORTFOLIO CARD KEYBOARD ACCESSIBILITY ───────────────── */
/* Make cards accessible via keyboard navigation */
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const link = card.querySelector('a');
      if (link) link.click();
    }
  });
});


/* ── CONSOLE MESSAGE ─────────────────────────────────────── */
/* A little message for developers who inspect the console */
console.log('%c👋 Hi there!', 'font-size:20px; font-weight:bold; color:#2E6FD9;');
console.log('%cThis site was hand-coded by Munyai Khuthadzo.', 'font-size:14px; color:#555;');
console.log('%cCheck out the GitHub: github.com/Munyai-Khuthadzo', 'font-size:14px; color:#1A7A4A;');
