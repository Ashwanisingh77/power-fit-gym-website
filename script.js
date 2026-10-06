/* ================================================================
   POWERFIT GYM — SCRIPT.JS
   Motion, 3D effects, and interactivity
   Uses GSAP + ScrollTrigger (loaded from CDN)
   ================================================================ */

;(function () {
  'use strict';

  /* ---------------------------------------------------------------
     REDUCED MOTION CHECK
     --------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------------------------------------------------------------
     LOADING SCREEN
     --------------------------------------------------------------- */
  const loader      = document.getElementById('loader');
  const loaderBar   = document.getElementById('loader-bar');

  if (loader && loaderBar) {
    /* Animate the progress bar */
    requestAnimationFrame(() => {
      loaderBar.style.width = '100%';
    });

    /* Hide loader after bar fills */
    const hideLoader = () => {
      loader.classList.add('loader--hidden');
      /* Start hero entrance after loader fades */
      setTimeout(() => {
        loader.style.display = 'none';
        initHeroEntrance();
        initScrollIndicator();
      }, 600);
    };

    /* Wait for bar transition to end OR fallback timeout */
    loaderBar.addEventListener('transitionend', hideLoader, { once: true });
    setTimeout(hideLoader, 2500); // safety fallback
  } else {
    initHeroEntrance();
    initScrollIndicator();
  }

  /* ---------------------------------------------------------------
     HERO — STAGGERED HEADLINE REVEAL
     --------------------------------------------------------------- */
  function initHeroEntrance() {
    const headlineEl = document.getElementById('hero-headline');
    if (!headlineEl) return;

    const text = 'Train Like a Beast';
    headlineEl.innerHTML = ''; // clear

    /* Split into individual letter spans */
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'hero__letter' + (char === ' ' ? ' hero__letter--space' : '');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 0.04 + 0.3}s`;
      headlineEl.appendChild(span);
    });

    /* Mark hero as loaded (scales bg image) */
    const hero = document.getElementById('home');
    if (hero) hero.classList.add('loaded');

    if (prefersReducedMotion) {
      /* Show letters immediately */
      headlineEl.querySelectorAll('.hero__letter').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    /* Trigger letter reveal with a small delay */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        headlineEl.querySelectorAll('.hero__letter').forEach((el) => {
          el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) rotateX(0deg)';
        });
      });
    });
  }

  /* ---------------------------------------------------------------
     HERO — SCROLL INDICATOR
     --------------------------------------------------------------- */
  function initScrollIndicator() {
    const scrollEl = document.getElementById('hero-scroll');
    if (!scrollEl) return;

    setTimeout(() => {
      scrollEl.style.opacity = '1';
    }, 2000);

    scrollEl.addEventListener('click', () => {
      const target = document.getElementById('stats');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------
     HERO — 3D PARALLAX FLOATING ELEMENTS (mouse movement)
     --------------------------------------------------------------- */
  const parallaxLayer = document.getElementById('parallax-layer');

  if (parallaxLayer && !prefersReducedMotion) {
    const floatingEls = parallaxLayer.querySelectorAll('.floating-el');
    /* Depth values (translateZ) for each element */
    const depths = [40, 80, 30, 60, 50, 70];

    document.addEventListener('mousemove', (e) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      parallaxLayer.style.transform =
        `perspective(1000px) rotateY(${cx * 2}deg) rotateX(${-cy * 2}deg)`;

      floatingEls.forEach((el, i) => {
        const d = depths[i] || 40;
        el.style.transform =
          `translateZ(${d}px) translateX(${cx * d * 0.3}px) translateY(${cy * d * 0.3}px)`;
      });
    });
  }

  /* ---------------------------------------------------------------
     HERO — SLOW PARALLAX BG IMAGE (scroll-based)
     --------------------------------------------------------------- */
  const heroBgEl = document.getElementById('hero-bg');

  if (heroBgEl && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBgEl.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------
     NAVBAR — SCROLL STATE + ACTIVE SECTION
     --------------------------------------------------------------- */
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.navbar__link');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const sections  = [
    'home', 'about', 'services', 'trainers',
    'membership', 'gallery', 'contact'
  ];

  function updateNav() {
    /* Scrolled class */
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }

    /* Active section detection */
    let current = 'home';
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          current = sections[i];
          break;
        }
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });

    mobileLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------------------------------------------------------------
     NAVBAR — SMOOTH SCROLL FOR ALL ANCHOR LINKS
     --------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu(); // close mobile menu if open
      }
    });
  });

  /* ---------------------------------------------------------------
     NAVBAR — MOBILE MENU
     --------------------------------------------------------------- */
  const navToggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let   mobileBackdrop = null;

  function openMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    /* Create backdrop */
    if (!mobileBackdrop) {
      mobileBackdrop = document.createElement('div');
      mobileBackdrop.className = 'navbar__mobile-backdrop';
      mobileBackdrop.addEventListener('click', closeMobileMenu);
      document.body.appendChild(mobileBackdrop);
    }
    requestAnimationFrame(() => {
      mobileBackdrop.classList.add('visible');
    });
  }

  function closeMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('visible');
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  /* ---------------------------------------------------------------
     3D TILT CARDS (rotateX/rotateY following cursor)
     Cards: services, trainers, membership plans
     --------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        /* Rotation: max ±8 degrees */
        const rotateY = ((x - cx) / cx) * 8;
        const rotateX = ((cy - y) / cy) * 8;

        card.style.transform =
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

        /* Move glow highlight */
        card.style.boxShadow =
          `${rotateY * 1.5}px ${-rotateX * 1.5}px 40px rgba(204,255,0,0.06)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  /* ---------------------------------------------------------------
     MAGNETIC BUTTON HOVER
     Button moves subtly toward the cursor on hover
     --------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });

      /* 3D press on mousedown */
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.96) translateY(2px)';
      });

      btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------------
     GSAP + SCROLLTRIGGER — SCROLL REVEALS
     Wait for GSAP to be available (loaded with defer)
     --------------------------------------------------------------- */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      /* Retry until GSAP loads */
      return setTimeout(initGSAP, 100);
    }

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      /* Immediately show all hidden elements */
      gsap.set('.reveal, .reveal-left, .reveal-right', {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
      });
      return;
    }

    /* --- Standard reveals (fade + translateY + slight rotateX) --- */
    document.querySelectorAll('.reveal').forEach((el) => {
      const delay = parseFloat(el.dataset.delay) || 0;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    /* --- Left reveals --- */
    document.querySelectorAll('.reveal-left').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    /* --- Right reveals --- */
    document.querySelectorAll('.reveal-right').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    /* --- Stat counter animation --- */
    document.querySelectorAll('.stats__number').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          animateCounter(el, target, suffix);
        },
      });
    });
  }

  /* Counter animation helper */
  function animateCounter(el, target, suffix) {
    const duration = 2000; // ms
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out quad */
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  /* Kick off GSAP init */
  initGSAP();

  /* ---------------------------------------------------------------
     GALLERY — LIGHTBOX
     --------------------------------------------------------------- */
  const lightbox       = document.getElementById('lightbox');
  const lightboxImg    = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose  = document.getElementById('lightbox-close');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  document.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery__caption');
      if (!img || !lightbox || !lightboxImg) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose)    lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  /* ---------------------------------------------------------------
     CONTACT FORM — SUBMIT HANDLER
     --------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('contact-submit');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      /* Show success state */
      submitBtn.classList.add('btn--sent');

      /* Reset form */
      contactForm.reset();

      /* Revert button after 4 seconds */
      setTimeout(() => {
        submitBtn.classList.remove('btn--sent');
      }, 4000);
    });
  }

  /* ---------------------------------------------------------------
     BACK TO TOP
     --------------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------
     3D SCROLL-DEPTH BACKGROUND
     Injects weight-plates, diagonal streaks, and a glowing orb.
     Each layer parallaxes at a different scroll speed.
     --------------------------------------------------------------- */
  (function initScrollDepthBg() {
    /* Bail on mobile or reduced-motion */
    if (prefersReducedMotion) return;
    if (window.innerWidth < 768) return;

    /* Build DOM */
    const bg = document.createElement('div');
    bg.className = 'scroll-depth-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML =
      /* 3 weight plates */
      '<div class="sd-plate sd-plate--1"></div>' +
      '<div class="sd-plate sd-plate--2"></div>' +
      '<div class="sd-plate sd-plate--3"></div>' +
      /* 4 diagonal streaks */
      '<div class="sd-streak sd-streak--1"></div>' +
      '<div class="sd-streak sd-streak--2"></div>' +
      '<div class="sd-streak sd-streak--3"></div>' +
      '<div class="sd-streak sd-streak--4"></div>' +
      /* Glowing orb */
      '<div class="sd-orb"></div>';
    document.body.prepend(bg);

    /* Grab layer refs */
    const plate1  = bg.querySelector('.sd-plate--1');
    const plate2  = bg.querySelector('.sd-plate--2');
    const plate3  = bg.querySelector('.sd-plate--3');
    const streak1 = bg.querySelector('.sd-streak--1');
    const streak2 = bg.querySelector('.sd-streak--2');
    const streak3 = bg.querySelector('.sd-streak--3');
    const streak4 = bg.querySelector('.sd-streak--4');
    const orb     = bg.querySelector('.sd-orb');

    let ticking = false;

    /* Parallax update driven by scroll */
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateLayers);
    }

    function updateLayers() {
      const sy = window.scrollY;

      /* Plates — rotate on scroll + slight translateZ for depth */
      plate1.style.transform =
        'translate3d(0,' + (sy * 0.08) + 'px, -200px) rotateZ(' + (sy * 0.04) + 'deg) rotateX(8deg)';
      plate2.style.transform =
        'translate3d(0,' + (sy * -0.05) + 'px, -350px) rotateZ(' + (sy * -0.06) + 'deg) rotateX(5deg)';
      plate3.style.transform =
        'translate3d(0,' + (sy * 0.12) + 'px, -150px) rotateZ(' + (sy * 0.09) + 'deg) rotateX(4deg)';

      /* Streaks — slide at different speeds */
      streak1.style.transform =
        'rotate(25deg) translate3d(0,' + (sy * -0.15) + 'px, -100px)';
      streak2.style.transform =
        'rotate(-30deg) translate3d(0,' + (sy * -0.22) + 'px, -250px)';
      streak3.style.transform =
        'rotate(18deg) translate3d(0,' + (sy * -0.10) + 'px, -180px)';
      streak4.style.transform =
        'rotate(-22deg) translate3d(0,' + (sy * -0.28) + 'px, -300px)';

      /* Orb — drifts upward + scales slightly */
      const orbScale = 1 + sy * 0.00015;
      orb.style.transform =
        'translate3d(0,' + (sy * -0.18) + 'px, -120px) scale(' + orbScale + ')';

      ticking = false;
    }

    /* Passive scroll listener */
    window.addEventListener('scroll', onScroll, { passive: true });
    /* Initial render */
    updateLayers();
  })();

})();