/* ============================================
   AIkid.vn — Landing Page "Sáng tạo nhân vật"
   lp-nhan-vat.js · Campaign page JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- STICKY CTA (mobile) ----
  const stickyCTA = document.getElementById('lp-sticky-cta');
  const heroSection = document.getElementById('hero');
  const signupSection = document.getElementById('dang-ky');
  const header = document.getElementById('lp-header');

  function updateStickyCTA() {
    if (!stickyCTA || !heroSection || !signupSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const signupTop = signupSection.getBoundingClientRect().top;
    if (heroBottom < 0 && signupTop > window.innerHeight) {
      stickyCTA.classList.add('visible');
      stickyCTA.setAttribute('aria-hidden', 'false');
    } else {
      stickyCTA.classList.remove('visible');
      stickyCTA.setAttribute('aria-hidden', 'true');
    }
  }

  function onScroll() {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    updateStickyCTA();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.lp-faq__item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.lp-faq__question');
    const answer = item.querySelector('.lp-faq__answer');
    const icon = item.querySelector('.lp-faq__icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('lp-faq__item--open');
      btn.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        answer.classList.remove('lp-faq__answer--hidden');
        icon.style.transform = 'rotate(180deg)';
      } else {
        answer.classList.add('lp-faq__answer--hidden');
        icon.style.transform = 'rotate(0deg)';
      }

      // Close others
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('lp-faq__item--open');
          const otherBtn = other.querySelector('.lp-faq__question');
          const otherAnswer = other.querySelector('.lp-faq__answer');
          const otherIcon = other.querySelector('.lp-faq__icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.classList.add('lp-faq__answer--hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });
    });
  });

  // ---- FORM VALIDATION & SUBMIT ----
  const form = document.getElementById('signup-form');

  function showError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    if (el) el.textContent = msg;
    const input = form.querySelector(`[id="${fieldId.replace('error-', '')}"]`);
    if (input) input.classList.add('error');
  }

  function clearError(fieldId) {
    const el = document.getElementById(fieldId);
    if (el) el.textContent = '';
    const input = form.querySelector(`[id="${fieldId.replace('error-', '')}"]`);
    if (input) input.classList.remove('error');
  }

  function clearAllErrors() {
    ['error-name', 'error-phone', 'error-age', 'error-time', 'error-consent'].forEach(clearError);
  }

  function isValidPhone(phone) {
    return /^(0|\+84)[3-9]\d{8}$/.test(phone.replace(/\s/g, ''));
  }

  if (form) {
    // Real-time validation on blur
    const parentName = document.getElementById('parent-name');
    const phone = document.getElementById('phone');
    const childAge = document.getElementById('child-age');
    const consent = document.getElementById('consent');

    if (parentName) {
      parentName.addEventListener('blur', function () {
        if (!this.value.trim()) {
          showError('error-name', 'Anh/chị cho chúng tôi biết tên với ạ.');
        } else {
          clearError('error-name');
        }
      });
    }

    if (phone) {
      phone.addEventListener('blur', function () {
        const val = this.value.trim();
        if (!val) {
          showError('error-phone', 'Cần số điện thoại để chúng tôi gọi xếp lịch.');
        } else if (!isValidPhone(val)) {
          showError('error-phone', 'Số điện thoại chưa đúng. Ví dụ: 0912345678');
        } else {
          clearError('error-phone');
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();

      const nameVal = parentName ? parentName.value.trim() : '';
      const phoneVal = phone ? phone.value.trim() : '';
      const ageVal = childAge ? childAge.value : '';
      const timeVal = form.querySelector('input[name="time_slot"]:checked');
      const consentVal = consent ? consent.checked : false;

      let hasError = false;

      if (!nameVal) {
        showError('error-name', 'Anh/chị cho chúng tôi biết tên với ạ.');
        hasError = true;
      }

      if (!phoneVal) {
        showError('error-phone', 'Cần số điện thoại để chúng tôi gọi xếp lịch.');
        hasError = true;
      } else if (!isValidPhone(phoneVal)) {
        showError('error-phone', 'Số điện thoại chưa đúng. Ví dụ: 0912345678');
        hasError = true;
      }

      if (!ageVal) {
        showError('error-age', 'Anh/chị chọn tuổi của con giúp ạ.');
        hasError = true;
      }

      if (!timeVal) {
        showError('error-time', 'Anh/chị chọn một khung giờ tiện nhất.');
        hasError = true;
      }

      if (!consentVal) {
        showError('error-consent', 'Anh/chị vui lòng xác nhận ô này.');
        hasError = true;
      }

      if (hasError) {
        // scroll to first error
        const firstError = form.querySelector('.lp-form__error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const btn = document.getElementById('signup-btn');
      btn.disabled = true;
      btn.textContent = 'Đang gửi…';

      // Simulate API submission
      setTimeout(function () {
        btn.textContent = '✓ Đã nhận! Chúng tôi sẽ gọi lại trong 4 giờ làm việc';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
        btn.style.boxShadow = '0 4px 16px rgba(22, 163, 74, 0.35)';
        form.querySelectorAll('input, select, textarea').forEach(function (inp) {
          inp.disabled = true;
        });
        // Show success note
        const note = form.querySelector('.lp-form__note');
        if (note) {
          note.textContent = 'Cảm ơn anh/chị! Chúng tôi sẽ liên hệ sớm để xếp lịch cho con.';
          note.style.color = '#16a34a';
          note.style.fontWeight = '600';
        }
      }, 1200);
    });
  }

  // ---- SCROLL REVEAL ----
  function addRevealClasses() {
    const targets = document.querySelectorAll(
      '.lp-takeaway-card, .lp-session-card, .lp-char-card, .lp-draft-card, .lp-testimonial-card, .lp-info__item, .lp-faq__item'
    );
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 6) * 0.07 + 's';
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

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- HERO ANIMATE IN ----
  const heroContent = document.querySelector('.lp-hero__content');
  const heroVisual = document.querySelector('.lp-hero__visual');

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
