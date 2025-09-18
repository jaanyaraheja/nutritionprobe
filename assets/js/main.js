(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Simple carousel
  function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.children);
    const dots = root.querySelector('.carousel-dots');
    let index = slides.findIndex((s) => s.classList.contains('active'));
    if (index < 0) index = 0;

    function renderDots() {
      if (!dots) return;
      dots.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === index) b.setAttribute('aria-current', 'true');
        b.addEventListener('click', () => goTo(i, true));
        dots.appendChild(b);
      });
    }

    function goTo(i, user = false) {
      slides[index]?.classList.remove('active');
      index = (i + slides.length) % slides.length;
      slides[index]?.classList.add('active');
      if (dots) {
        dots.querySelectorAll('button').forEach((d, di) => {
          if (di === index) d.setAttribute('aria-current', 'true');
          else d.removeAttribute('aria-current');
        });
      }
      if (user) resetTimer();
    }

    let timerId = null;
    function startTimer() {
      timerId = window.setInterval(() => goTo(index + 1), 4500);
    }
    function resetTimer() {
      if (timerId) window.clearInterval(timerId);
      startTimer();
    }

    renderDots();
    startTimer();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();


