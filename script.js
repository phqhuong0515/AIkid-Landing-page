/* ============================================
   AIkid.vn — Homepage JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- NAV: scroll effect & burger menu ----
  const nav = document.getElementById('nav');
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // ---- STICKY CTA (mobile) variables ----
  const stickyCTA = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');
  const ctaSection = document.getElementById('dang-ky');

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateStickyCTA();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burgerBtn.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  function updateStickyCTA() {
    if (!stickyCTA || !heroSection || !ctaSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const ctaTop = ctaSection.getBoundingClientRect().top;
    if (heroBottom < 0 && ctaTop > window.innerHeight) {
      stickyCTA.classList.add('visible');
      stickyCTA.setAttribute('aria-hidden', 'false');
    } else {
      stickyCTA.classList.remove('visible');
      stickyCTA.setAttribute('aria-hidden', 'true');
    }
  }

  // ---- FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const icon = item.querySelector('.faq__icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('faq__item--open');
      btn.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        answer.classList.remove('faq__answer--hidden');
        icon.style.transform = 'rotate(180deg)';
        icon.classList.add('faq__icon--up');
      } else {
        answer.classList.add('faq__answer--hidden');
        icon.style.transform = 'rotate(0deg)';
        icon.classList.remove('faq__icon--up');
      }

      // Close others
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('faq__item--open');
          const otherBtn = other.querySelector('.faq__question');
          const otherAnswer = other.querySelector('.faq__answer');
          const otherIcon = other.querySelector('.faq__icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.classList.add('faq__answer--hidden');
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
            otherIcon.classList.remove('faq__icon--up');
          }
        }
      });
    });
  });

  // ---- SCROLL REVEAL ----
  function addRevealClasses() {
    const targets = document.querySelectorAll(
      '.concern-card, .gallery-card, .testimonial-card, .roadmap__step, .lesson__step, .draft-card, .trust__item'
    );
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });
  }

  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowH = window.innerHeight;
    reveals.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < windowH - 60) {
        el.classList.add('revealed');
      }
    });
  }

  addRevealClasses();
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ---- FORM SUBMIT ----
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('parent-name').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name || !phone) {
        alert('Vui lòng điền đầy đủ tên và số điện thoại.');
        return;
      }

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.textContent = 'Đang gửi...';

      // Simulate submission (replace with real API call)
      setTimeout(function () {
        btn.textContent = '✓ Đã nhận! Chúng tôi sẽ liên hệ sớm';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
        form.querySelectorAll('.cta-form__input').forEach(function (inp) {
          inp.disabled = true;
        });
      }, 1000);
    });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- HERO animate in ----
  const heroContent = document.querySelector('.hero__content');
  const heroVisual = document.querySelector('.hero__visual');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(24px)';
    setTimeout(function () {
      heroContent.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'none';
    }, 80);
  }
  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateY(24px)';
    setTimeout(function () {
      heroVisual.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'none';
    }, 80);
  }

})();
