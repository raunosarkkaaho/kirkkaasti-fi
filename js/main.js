// Kirkkaasti.fi — main.js

// Header scroll effect
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Stagger feature cards slightly
document.querySelectorAll('.feature-card.reveal, .step.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// News carousel
(function () {
  const track = document.getElementById('news-track');
  const dotsContainer = document.getElementById('news-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.news-card');
  let current = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'news-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Uutinen ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function getVisible() {
    return track.parentElement.offsetWidth < 600 ? 1 : 3;
  }

  function goTo(index) {
    const visible = getVisible();
    const max = Math.max(0, cards.length - visible);
    current = Math.max(0, Math.min(index, max));
    const cardW = cards[0].offsetWidth + 16;
    track.style.transform = `translateX(-${current * cardW}px)`;
    dotsContainer.querySelectorAll('.news-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.getElementById('news-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('news-next')?.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => goTo(current));
})();
