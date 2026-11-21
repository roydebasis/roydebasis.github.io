/* ============================================================
   Debasis Roy — Portfolio Interactions
   Vanilla JS · no dependencies
   ============================================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Navbar: scrolled state, progress, active link ---------- */
  const navbar = $('#navbar');
  const progress = $('#scroll-progress');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-link');

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (navbar) navbar.classList.toggle('scrolled', y > 20);

    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }

    // Active link based on section in view
    let current = '';
    const marker = y + window.innerHeight * 0.3;
    for (const section of sections) {
      if (marker >= section.offsetTop) current = section.id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = $('#menu-toggle');
  const navLinksContainer = $('#nav-links');

  function closeMenu() {
    if (!navLinksContainer || !menuToggle) return;
    navLinksContainer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      const open = navLinksContainer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    navLinksContainer.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* ---------- Back to top ---------- */
  const toTop = $('#to-top');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('visible', (window.scrollY || window.pageYOffset) > 500);
    }, { passive: true });

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Typed role animation ---------- */
  const typedRole = $('#typed-role');
  const roles = [
    'Senior Software Engineer',
    'Backend & API Specialist',
    'AI Automation Builder',
    'Problem Solver'
  ];

  function typeLoop() {
    if (!typedRole) return;
    if (prefersReducedMotion) {
      typedRole.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    typedRole.textContent = roles[0];

    function tick() {
      const current = roles[roleIndex];
      if (deleting) {
        charIndex--;
        typedRole.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      } else {
        charIndex++;
        typedRole.textContent = roles[roleIndex].slice(0, charIndex);
        if (charIndex === roles[roleIndex].length) {
          deleting = true;
          return window.setTimeout(tick, 1800);
        }
      }
      window.setTimeout(tick, deleting ? 45 : 90);
    }
    window.setTimeout(tick, 1800);
  }
  typeLoop();

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animated stat counters ---------- */
  const statNums = $$('.stat-num');
  function animateCount(el) {
    if (prefersReducedMotion) {
      el.textContent = el.dataset.count;
      return;
    }
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toString();
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach((el) => counterObserver.observe(el));
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------- Animated skill bars ---------- */
  const skillFills = $$('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillFills.forEach((el) => barObserver.observe(el));
  } else {
    skillFills.forEach((el) => el.classList.add('animated'));
  }

  /* ---------- Pipeline unlock sequence ---------- */
  const pipeNodes = $$('.pipe-node');
  const pipeArrows = $$('.pipe-arrow');
  const pipeStatus = $('#pipeline-status');
  const pipeFoot = $('#pipeline-foot');

  if (pipeNodes.length) {
    if (prefersReducedMotion) {
      // Show every stage already unlocked — no cycling animation.
      pipeNodes.forEach((n) => n.classList.add('is-unlocked'));
      pipeArrows.forEach((a) => a.classList.add('is-flowing'));
      if (pipeStatus) pipeStatus.textContent = 'complete';
      if (pipeFoot) pipeFoot.classList.add('is-complete');
    } else {
      const STAGE_MS = 900;
      const HOLD_MS = 900;
      const RESET_MS = 350;
      let index = 0;

      function showStage(i) {
        // Unlock this stage and keep every earlier stage unlocked.
        pipeNodes.forEach((n, ni) => {
          n.classList.toggle('is-unlocked', ni <= i);
          n.classList.toggle('is-current', ni === i);
        });
        pipeArrows.forEach((a, ai) => a.classList.toggle('is-flowing', ai < i));
        const last = i === pipeNodes.length - 1;
        if (pipeStatus) pipeStatus.textContent = last ? 'complete' : 'running';
        if (pipeFoot) pipeFoot.classList.toggle('is-complete', last);
      }

      function clearStage() {
        pipeNodes.forEach((n) => n.classList.remove('is-unlocked', 'is-current'));
        pipeArrows.forEach((a) => a.classList.remove('is-flowing'));
        if (pipeStatus) pipeStatus.textContent = 'running';
        if (pipeFoot) pipeFoot.classList.remove('is-complete');
      }

      function step() {
        showStage(index);
        if (index === pipeNodes.length - 1) {
          // Hold "complete" on the final stage, then reset and loop.
          window.setTimeout(() => {
            clearStage();
            index = 0;
            window.setTimeout(step, RESET_MS);
          }, HOLD_MS);
        } else {
          index += 1;
          window.setTimeout(step, STAGE_MS);
        }
      }

      window.setTimeout(step, 300);
    }
  }

  /* ---------- Copy email to clipboard ---------- */
  const copyBtn = $('#copy-email');
  if (copyBtn) {
    const label = copyBtn.querySelector('.copy-label');

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }

    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email || '';
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (e) {
          copied = fallbackCopy(email);
        }
      } else {
        copied = fallbackCopy(email);
      }

      if (copied) {
        copyBtn.classList.add('copied');
        if (label) label.textContent = 'Copied!';
        copyBtn.setAttribute('aria-label', 'Email copied to clipboard');
        window.setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (label) label.textContent = 'Copy';
          copyBtn.setAttribute('aria-label', 'Copy email address');
        }, 2000);
      }
    });
  }
})();
