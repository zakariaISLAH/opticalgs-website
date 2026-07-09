// Mobile navigation
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  const links = nav.querySelectorAll('a');

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && !toggle.contains(event.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Header border on scroll
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = function () {
    header.style.borderColor = window.scrollY > 20 ? 'rgba(201, 169, 98, 0.3)' : 'rgba(201, 169, 98, 0.15)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Initialize Vanilla Tilt on service cards + brand blocks
(function () {
  if (typeof VanillaTilt === 'undefined') return;

  // Service cards
  VanillaTilt.init(document.querySelectorAll('.service-card'), {
    max: 12,
    speed: 400,
    scale: 1.02,
    glare: true,
    'max-glare': 0.25,
    perspective: 1000,
    gyroscope: false
  });

  // Brand feature blocks
  VanillaTilt.init(document.querySelectorAll('.brands-featured'), {
    max: 8,
    speed: 500,
    scale: 1.01,
    glare: false,
    perspective: 1200,
    gyroscope: false
  });

  // About image
  VanillaTilt.init(document.querySelectorAll('.about-media'), {
    max: 6,
    speed: 500,
    glare: true,
    'max-glare': 0.15,
    perspective: 1200,
    gyroscope: false
  });

  // Contact card
  VanillaTilt.init(document.querySelectorAll('.contact-card'), {
    max: 8,
    speed: 400,
    scale: 1.01,
    glare: false,
    perspective: 1200,
    gyroscope: false
  });
})();

// IntersectionObserver reveal
(function () {
  const items = document.querySelectorAll('.service-card, .brands-featured, .about-media, .about-list li, .contact-card, .map-static');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    items.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  items.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(function (el) { observer.observe(el); });

  window.addEventListener('load', function () {
    setTimeout(function () {
      items.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 2500);
  });
})();

// Current year
(function () {
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// Video fallback: if video fails to load, show poster / solid background
(function () {
  const video = document.querySelector('.hero-video video');
  if (!video) return;

  video.addEventListener('error', function () {
    document.querySelector('.hero-video').style.background =
      'radial-gradient(ellipse at 50% 50%, #1c1c1c 0%, #0a0a0a 100%)';
    video.style.display = 'none';
  });
})();

// Mouse parallax on 3D rings (subtle)
(function () {
  const rings = document.querySelectorAll('.depth-ring');
  if (!rings.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    rings.forEach(function (ring, index) {
      const depth = (index + 1) * 8;
      ring.style.transform =
        'translate(-50%, -50%) ' +
        'translate(' + (currentX * depth) + 'px, ' + (currentY * depth) + 'px) ' +
        'scale(' + (1 + index * 0.02) + ') ' +
        'rotateX(70deg)';
    });

    requestAnimationFrame(animate);
  }
  animate();
})();
