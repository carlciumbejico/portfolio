// ----- Mobile nav toggle -----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ----- Active nav link on scroll -----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`[data-nav][href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(section => navObserver.observe(section));

// ----- Scroll reveal animations -----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ----- Back to top button -----
const toTopBtn = document.getElementById('toTop');
toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----- Footer year -----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----- Hero terminal typewriter (signature moment) -----
const terminalEl = document.getElementById('terminalLine');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const terminalMessage = 'currently building: profit_radar.system';

if (terminalEl) {
  if (prefersReducedMotion) {
    terminalEl.textContent = terminalMessage;
  } else {
    let i = 0;
    const type = () => {
      if (i <= terminalMessage.length) {
        terminalEl.textContent = terminalMessage.slice(0, i);
        i++;
        setTimeout(type, 38);
      }
    };
    setTimeout(type, 500);
  }
}