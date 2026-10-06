/**
 * THOUSIF HAKKIM — LUXURY EDITORIAL PORTFOLIO
 * Advanced Interaction Design & Animation Engine
 * Incorporating Reference-Borrowed Techniques:
 *   - Staged Cinematic Hero Entrance & Typography Mask Reveals
 *   - Damped Cursor Spotlight & Parallax Depth
 *   - Interactive 3D Card Tilt & Specular Sheen
 *   - Case Study Inspector Modal with Flash Transitions
 *   - Interactive Process Timeline Rail & Step Scrubbing
 *   - Magnetic Tactile Micro-Interactions
 *   - Reduced-Motion Accessibility & Viewport-Aware RAF Parking
 */

(function () {
  'use strict';

  const docEl = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  /* ==========================================================================
     01 · DOM HANDLES
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navItems = Array.from(document.querySelectorAll('.editorial-nav .nav-item'));
  const drawerLinks = Array.from(document.querySelectorAll('.drawer-links .d-link, .drawer-links .d-cta'));
  const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
  const heroSection = document.getElementById('hero');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const portraitImg = document.querySelector('.hero-portrait-img');
  const atmoGlow = document.querySelector('.portrait-ambient-glow');
  const cinematicFlash = document.getElementById('cinematicFlash');

  /* ==========================================================================
     02 · CINEMATIC ENTRANCE STAGING
     ========================================================================== */
  const SETTLE_DELAY_MS = 2200;

  const startEntranceSequence = () => {
    docEl.classList.add('is-ready');

    const delay = reduceMotion.matches ? 0 : SETTLE_DELAY_MS;
    window.setTimeout(() => {
      docEl.classList.add('is-settled');
      enableHeroInteractions();
    }, delay);
  };

  // Wait for portrait image and typography fonts to paint
  const imgReady = portraitImg && portraitImg.decode
    ? portraitImg.decode().catch(() => {})
    : Promise.resolve();
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const maxWait = new Promise((resolve) => window.setTimeout(resolve, 1500));

  Promise.race([Promise.all([imgReady, fontsReady]), maxWait]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(startEntranceSequence));
  });

  /* ==========================================================================
     03 · DAMPED CURSOR SPOTLIGHT & PARALLAX TRACKING
     ========================================================================== */
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  let lightTX = window.innerWidth / 2, lightTY = window.innerHeight * 0.42;
  let lightX = lightTX, lightY = lightTY;
  let heroRaf = null;
  let heroInteractionsActive = false;

  const tickHero = () => {
    // Exponential damping for silky movement
    curX += (targetX - curX) * 0.055;
    curY += (targetY - curY) * 0.055;
    lightX += (lightTX - lightX) * 0.045;
    lightY += (lightTY - lightY) * 0.045;

    if (portraitImg && !reduceMotion.matches) {
      portraitImg.style.transform = `translate3d(${(curX * 12).toFixed(2)}px, ${(curY * 8).toFixed(2)}px, 0)`;
    }
    if (atmoGlow && !reduceMotion.matches) {
      atmoGlow.style.transform = `translateX(calc(-50% + ${(curX * -18).toFixed(2)}px)) translateY(${(curY * -10).toFixed(2)}px)`;
    }
    if (cursorSpotlight && !reduceMotion.matches) {
      cursorSpotlight.style.transform = `translate3d(${lightX.toFixed(1)}px, ${lightY.toFixed(1)}px, 0)`;
    }

    const isStill =
      Math.abs(targetX - curX) < 0.001 &&
      Math.abs(targetY - curY) < 0.001 &&
      Math.abs(lightTX - lightX) < 0.1 &&
      Math.abs(lightTY - lightY) < 0.1;

    heroRaf = isStill ? null : requestAnimationFrame(tickHero);
  };

  const onPointerMove = (e) => {
    if (docEl.classList.contains('beyond-hero')) return;
    targetX = e.clientX / window.innerWidth - 0.5;
    targetY = e.clientY / window.innerHeight - 0.5;
    lightTX = e.clientX;
    lightTY = e.clientY;
    if (heroInteractionsActive && heroRaf === null) {
      heroRaf = requestAnimationFrame(tickHero);
    }
  };

  const enableHeroInteractions = () => {
    if (reduceMotion.matches || !finePointer.matches) return;
    heroInteractionsActive = true;
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  };

  const disableHeroInteractions = () => {
    heroInteractionsActive = false;
    window.removeEventListener('pointermove', onPointerMove);
    if (heroRaf !== null) {
      cancelAnimationFrame(heroRaf);
      heroRaf = null;
    }
    if (portraitImg) portraitImg.style.transform = '';
    if (atmoGlow) atmoGlow.style.transform = '';
  };

  // Viewport observer: Pause hero animation when scrolled past hero
  if (heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.isIntersecting;
        docEl.classList.toggle('beyond-hero', !isVisible);
        if (!isVisible && heroRaf !== null) {
          cancelAnimationFrame(heroRaf);
          heroRaf = null;
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroSection);
  }

  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) disableHeroInteractions();
    else if (docEl.classList.contains('is-settled')) enableHeroInteractions();
  });

  /* ==========================================================================
     04 · 3D PROJECT CARD TILT & SPECULAR SHEEN
     ========================================================================== */
  const projectCards = Array.from(document.querySelectorAll('[data-project-tilt="true"]'));

  if (!reduceMotion.matches && finePointer.matches) {
    projectCards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized offsets from -0.5 to 0.5
        const normX = mouseX / rect.width - 0.5;
        const normY = mouseY / rect.height - 0.5;

        // Subtle 3D perspective pitch and roll
        const rotX = (-normY * 10).toFixed(2);
        const rotY = (normX * 10).toFixed(2);

        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     05 · INTERACTIVE CASE STUDY INSPECTOR MODAL & FLASH TRANSITIONS
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const pmCloseBtn = document.getElementById('pmCloseBtn');
  const pmTag = document.getElementById('pmTag');
  const pmId = document.getElementById('pmId');
  const pmImg = document.getElementById('pmImg');
  const pmBadge = document.getElementById('pmBadge');
  const pmTitle = document.getElementById('pmTitle');
  const pmSubtitle = document.getElementById('pmSubtitle');
  const pmChallenge = document.getElementById('pmChallenge');
  const pmExecution = document.getElementById('pmExecution');
  const pmMetricsGrid = document.getElementById('pmMetricsGrid');
  const pmToolsTags = document.getElementById('pmToolsTags');

  // Thousif's Verified Project Database
  const projectData = {
    c99: {
      id: '01 / 03',
      tag: 'QA & SOFTWARE TESTING',
      badge: '65+ TEST CASES',
      img: 'project_qa.jpg',
      title: 'Velvet Studio // C99 Platform',
      subtitle: 'Rigorous Functional, Regression & Edge QA Engineering',
      challenge: 'The client needed comprehensive verification of their multi-vendor booking ecosystem prior to release. The challenge was catching form edge cases, booking conflict anomalies, and session drops without slowing down the development sprint.',
      execution: 'Structured and executed 65+ manual test cases covering user/vendor onboarding, booking & cancellation state machines, search/filter algorithms, and cross-browser validation. Logged reproduction steps, severity rankings, and verified patch deployments.',
      metrics: [
        { val: '65+', label: 'Structured Test Cases' },
        { val: '100%', label: 'Critical Defects Caught' },
        { val: 'Excel', label: 'Reproduction Log Matrix' },
        { val: 'Signoff', label: 'Pre-Rollout Approval' }
      ],
      tools: ['Manual QA Testing', 'Regression Suites', 'Excel Test Sheet', 'Bug Lifecycle Tracking', 'Validation Matrix']
    },
    'actif-export': {
      id: '02 / 03',
      tag: 'MARKETPLACE RESEARCH',
      badge: 'EUROPE & GLOBAL',
      img: 'project_export.jpg',
      title: 'Aurora Shop // ACTIF Export',
      subtitle: 'International E-Commerce Market Research & Expansion Feasibility',
      challenge: 'ACTIF required high-conviction research on cross-border textile sales across European and global channels to determine seller suitability, fee structures, compliance requirements, and customer demand profiles.',
      execution: 'Conducted in-depth marketplace analysis comparing B2B and B2C channels across Germany, France, and international platforms. Structured comparative evaluation dossiers detailing buyer demographics, margin feasibility, and logistics expectations.',
      metrics: [
        { val: 'EU / Global', label: 'Market Scope Analyzed' },
        { val: 'B2B/B2C', label: 'Suitability Matrix' },
        { val: '3+', label: 'Expansion Dossiers' },
        { val: 'Ready', label: 'Go-to-Market Blueprint' }
      ],
      tools: ['Market Research', 'Competitive Benchmarking', 'E-Commerce Strategy', 'B2B Expansion', 'Dossier Reports']
    },
    'actif-catalogue': {
      id: '03 / 03',
      tag: 'PRODUCT DATA & PIM',
      badge: 'AI-ASSISTED PIM',
      img: 'project_catalogue.jpg',
      title: 'Mindspace // ACTIF Catalogue System',
      subtitle: 'Wholesale & Retail Product Architecture & High-Density SKU Data',
      challenge: 'Managing high-density apparel SKUs across wholesale buyer sheets and retail marketplaces was prone to duplicate attributes, fragmented descriptions, and non-standardized specification formats.',
      execution: 'Architected structured product hierarchies and used AI workflows to generate clean, consistent taxonomy, commercial spec sheets, and de-duplicated records. Produced verified datasets ready for direct marketplace upload.',
      metrics: [
        { val: 'High-Density', label: 'SKU Attribute Taxonomy' },
        { val: 'Dual', label: 'Wholesale & Retail Formats' },
        { val: 'PIM', label: 'AI-Assisted Enrichment' },
        { val: 'Clean', label: 'Commercial Ready Spec Sheets' }
      ],
      tools: ['Product Catalogues', 'Data Standardization', 'AI Workflows', 'Specification Sheets', 'Taxonomy Design']
    }
  };

  // Cinematic Flash Transition Helper (borrowed from reference flashTo)
  const flashTransition = (middleFn, doneFn) => {
    if (!cinematicFlash || reduceMotion.matches) {
      middleFn();
      if (doneFn) doneFn();
      return;
    }
    cinematicFlash.classList.add('is-on');
    window.setTimeout(() => {
      middleFn();
      window.setTimeout(() => {
        cinematicFlash.classList.remove('is-on');
        if (doneFn) doneFn();
      }, 180);
    }, 220);
  };

  let lastActiveElement = null;

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    lastActiveElement = document.activeElement;

    flashTransition(() => {
      pmTag.textContent = data.tag;
      pmId.textContent = data.id;
      pmImg.src = data.img;
      pmImg.alt = data.title;
      pmBadge.textContent = data.badge;
      pmTitle.textContent = data.title;
      pmSubtitle.textContent = data.subtitle;
      pmChallenge.textContent = data.challenge;
      pmExecution.textContent = data.execution;

      // Populate metrics
      pmMetricsGrid.innerHTML = data.metrics.map(m => `
        <div class="pm-metric-pill">
          <span class="pm-m-val">${m.val}</span>
          <span class="pm-m-label">${m.label}</span>
        </div>
      `).join('');

      // Populate tools
      pmToolsTags.innerHTML = data.tools.map(t => `
        <span class="pm-tool-tag">${t}</span>
      `).join('');

      projectModal.classList.add('is-open');
      projectModal.setAttribute('aria-hidden', 'false');
      docEl.style.overflow = 'hidden';
    }, () => {
      if (pmCloseBtn) pmCloseBtn.focus({ preventScroll: true });
    });
  };

  const closeProjectModal = () => {
    if (!projectModal || !projectModal.classList.contains('is-open')) return;

    flashTransition(() => {
      projectModal.classList.remove('is-open');
      projectModal.setAttribute('aria-hidden', 'true');
      docEl.style.overflow = '';
    }, () => {
      if (lastActiveElement && lastActiveElement.focus) {
        lastActiveElement.focus({ preventScroll: true });
      }
    });
  };

  // Inspect Button Listeners
  document.querySelectorAll('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-open-project');
      openProjectModal(pId);
    });
  });

  // Clicking on project cards also triggers inspection
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const pId = card.getAttribute('data-project');
      if (pId) openProjectModal(pId);
    });
  });

  if (pmCloseBtn) pmCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal || e.target.classList.contains('project-modal-container')) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     06 · INTERACTIVE PROCESS TIMELINE & SCROLL SCRUBBING
     ========================================================================== */
  const procProgressBar = document.getElementById('procProgressBar');
  const procStepItems = Array.from(document.querySelectorAll('.proc-step-item'));
  const processSection = document.getElementById('process');

  const updateActiveStep = (stepNumber) => {
    procStepItems.forEach((item) => {
      const itemStep = parseInt(item.getAttribute('data-step'), 10);
      item.classList.toggle('is-active', itemStep === stepNumber);
    });

    if (procProgressBar) {
      const percentage = (stepNumber / procStepItems.length) * 100;
      procProgressBar.style.height = `${percentage}%`;
    }
  };

  // Click on step items to jump active indicator
  procStepItems.forEach((item) => {
    item.addEventListener('click', () => {
      const stepNum = parseInt(item.getAttribute('data-step'), 10);
      if (!isNaN(stepNum)) updateActiveStep(stepNum);
    });
  });

  // Scroll listener for Process Section
  if (processSection && !reduceMotion.matches) {
    window.addEventListener('scroll', () => {
      const rect = processSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if process section is within viewing window
      if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.2) {
        const totalHeight = rect.height;
        const progress = Math.min(1, Math.max(0, (viewportHeight * 0.6 - rect.top) / totalHeight));
        const activeIdx = Math.min(procStepItems.length, Math.max(1, Math.ceil(progress * procStepItems.length)));
        updateActiveStep(activeIdx);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     07 · MAGNETIC BUTTONS MICRO-INTERACTIONS
     ========================================================================== */
  const magneticButtons = Array.from(document.querySelectorAll('.magnetic-btn'));

  if (!reduceMotion.matches && finePointer.matches) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate3d(${(x * 0.2).toFixed(2)}px, ${(y * 0.25).toFixed(2)}px, 0)`;
      });

      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     08 · MOBILE DRAWER TOGGLE & NAVIGATION SPY (PRESERVED)
     ========================================================================== */
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ScrollSpy: Highlight active navigation link
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navItems.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

})();
