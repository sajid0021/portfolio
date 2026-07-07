/**
 * ================================================================
 * MOTION.JS  —  Premium Visual & Interactive Upgrade (Awwwards Nomination Spec)
 * Project  : res(3) / Shaik Mohammad Sajid Portfolio
 *
 * Implements high-end interactive visual logic:
 *  - Lenis Smooth Scroll momentum engine integration.
 *  - Storyblocks Spec: After Effects Volumetric "Clean Logo Reveal"
 *    Light Beams & Specular Glare reflection sweep VFX.
 *  - reference portfolio spec: Typewriter text cycling subtitles and 
 *    three-layer sliding staggered background button fills with offset shadows.
 *  - Interactive Blueprint Grid & Constellation Node Web: Scroll parallax
 *    grid lines and interactive particle connection mesh with gold mouse links.
 *  - Scroll-Linked Background VFX: Gradient blur, scale stretching,
 *    and wind particle offsets reacting dynamically to scroll velocity.
 *  - GSAP ScrollTrigger progressive scaling, reveals, and timeline lines.
 *  - Portfolio Filter Liquid sliding indicator pill.
 *  - Staggered Skills progress percentages increment count-up.
 *  - Testimonials carousel scrolling horizontal skew mechanics.
 *  - Particles background overlay and cursor trails.
 * ================================================================
 */

(function () {
  'use strict';

  /* ── Guards ── */
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;

  /* ── Utilities ── */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ── Unified Animation Engine & State ── */
  const AppState = {
    // Client Mouse Coords
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    targetMouseX: window.innerWidth / 2,
    targetMouseY: window.innerHeight / 2,
    
    // Normalized Mouse Coords (-0.5 to 0.5)
    normalX: 0,
    normalY: 0,
    targetNormalX: 0,
    targetNormalY: 0,

    // Scroll Coordinates and Velocities
    scroll: 0,
    scrollVelocity: 0,
    targetScrollVelocity: 0,
    scrollDirection: 1,

    // Screen Dimensions
    width: window.innerWidth,
    height: window.innerHeight,

    // Custom Cursor Interactive State
    isHovered: false,
    hoverType: '', // 'link' | 'text' | 'image'
    snapTarget: null,
    snapActive: false,

    // Consolidated Tick Listeners
    ticks: {}
  };

  // Helper to register modular render loops
  function addTick(id, fn) {
    AppState.ticks[id] = fn;
  }

  // Single Global Tick Loop running on GSAP Ticker
  gsap.ticker.add((time, deltaTime, frame) => {
    // 1. Lerp mouse positions for spring animations
    AppState.mouseX = lerp(AppState.mouseX, AppState.targetMouseX, 0.1);
    AppState.mouseY = lerp(AppState.mouseY, AppState.targetMouseY, 0.1);
    AppState.normalX = lerp(AppState.normalX, AppState.targetNormalX, 0.08);
    AppState.normalY = lerp(AppState.normalY, AppState.targetNormalY, 0.08);

    // 2. Update Lenis Raf if initialized
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
      AppState.scroll = lenisInstance.scroll;
      AppState.scrollVelocity = lerp(AppState.scrollVelocity, AppState.targetScrollVelocity, 0.08);
      AppState.targetScrollVelocity = lerp(AppState.targetScrollVelocity, 0, 0.08);
    }

    // 3. Execute all registered modular render steps
    for (const key in AppState.ticks) {
      AppState.ticks[key](time, frame);
    }
  });

  gsap.ticker.lagSmoothing(0);

  // Global mouse coordinates listener
  window.addEventListener('mousemove', (e) => {
    AppState.targetMouseX = e.clientX;
    AppState.targetMouseY = e.clientY;
    AppState.targetNormalX = (e.clientX / AppState.width) - 0.5;
    AppState.targetNormalY = (e.clientY / AppState.height) - 0.5;
  }, { passive: true });

  window.addEventListener('resize', () => {
    AppState.width = window.innerWidth;
    AppState.height = window.innerHeight;
  }, { passive: true });


  /* ==============================================================
     1. LENIS SMOOTH SCROLL INITIALIZATION & VELOCITY CAPTURE
     ============================================================== */
  let lenisInstance = null;
  function initLenis() {
    if (REDUCED || typeof Lenis === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothWheel: true
    });

    lenisInstance.on('scroll', (e) => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }

      AppState.targetScrollVelocity = Math.abs(e.velocity || 0);
      if (e.velocity !== 0) {
        AppState.scrollDirection = Math.sign(e.velocity);
      }
    });

    addTick('backgroundVFX', () => {
      updateBackgroundVFX();
    });
  }


  /* ==============================================================
     2. BACKGROUND - MESH, AURORA & AMBIENTS
     ============================================================== */
  function initMeshAndAurora() {
    if (!document.getElementById('motion-mesh')) {
      const mesh = document.createElement('div');
      mesh.id = 'motion-mesh';
      mesh.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(mesh, document.body.firstChild);
    }

    if (!document.getElementById('motion-aurora')) {
      const auroraWrap = document.createElement('div');
      auroraWrap.id = 'motion-aurora';
      auroraWrap.setAttribute('aria-hidden', 'true');
      auroraWrap.innerHTML = `
        <div class="m-aurora m-aurora--1"></div>
        <div class="m-aurora m-aurora--2"></div>
      `;
      document.body.insertBefore(auroraWrap, document.body.firstChild);
    }
  }

  function initAmbientLights() {
    if (document.getElementById('motion-ambients')) return;

    const wrap = document.createElement('div');
    wrap.id = 'motion-ambients';
    wrap.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(wrap, document.body.firstChild);

    const orbs = [
      { x: '8%',   y: '25%', w: 300, h: 300, dur: 16, delay: 0,   color: 'rgba(108,186,231,0.12)' },
      { x: '88%',  y: '18%', w: 260, h: 260, dur: 20, delay: 3,   color: 'rgba(42,91,169,0.10)'   },
      { x: '45%',  y: '60%', w: 320, h: 320, dur: 24, delay: 7,   color: 'rgba(108,186,231,0.08)' },
      { x: '18%',  y: '78%', w: 200, h: 200, dur: 18, delay: 1,   color: 'rgba(42,91,169,0.09)'   },
      { x: '72%',  y: '52%', w: 240, h: 240, dur: 22, delay: 11,  color: 'rgba(108,186,231,0.10)' },
      { x: '35%',  y: '12%', w: 220, h: 220, dur: 14, delay: 5,   color: 'rgba(42,91,169,0.08)'   },
    ];

    orbs.forEach(o => {
      const el = document.createElement('div');
      el.className = 'm-ambient';
      el.style.cssText = `
        left: ${o.x};
        top: ${o.y};
        width: ${o.w}px;
        height: ${o.h}px;
        background: radial-gradient(circle, ${o.color} 0%, transparent 70%);
        animation: ambientBreathe ${o.dur}s ${o.delay}s ease-in-out infinite alternate;
      `;
      wrap.appendChild(el);
    });
  }

  function initMouseLight() {
    if (REDUCED || IS_MOBILE) return;
    if (document.getElementById('motion-mouse-light')) return;

    const light = document.createElement('div');
    light.id = 'motion-mouse-light';
    light.setAttribute('aria-hidden', 'true');
    document.body.appendChild(light);

    let currentX = AppState.mouseX;
    let currentY = AppState.mouseY;
    let revealed = false;

    addTick('mouseLight', () => {
      if (!revealed && (AppState.targetMouseX !== window.innerWidth / 2)) {
        revealed = true;
        light.classList.add('visible');
      }
      if (revealed) {
        currentX = lerp(currentX, AppState.mouseX, 0.055);
        currentY = lerp(currentY, AppState.mouseY, 0.055);
        // Translate3d is center aligned using the element width/height (480px / 2 = 240px offset)
        light.style.transform = `translate3d(${currentX - 240}px, ${currentY - 240}px, 0)`;
      }
    });
  }


  /* ==============================================================
     2b. VELOCITY-LINKED BACKGROUND DISTORTION VFX
     ============================================================== */
  function updateBackgroundVFX() {
    if (REDUCED) return;

    const mesh = document.getElementById('motion-mesh');
    const aurora1 = document.querySelector('.m-aurora--1');
    const aurora2 = document.querySelector('.m-aurora--2');
    const core = document.querySelector('.m-vfx-core');
    const beams = document.querySelectorAll('.m-vfx-beam');

    const vel = AppState.scrollVelocity;
    const dir = AppState.scrollDirection;

    const orbsContainer = document.getElementById('glass-orbs');
    if (orbsContainer) {
      const orbsScale = 1 + clamp(vel * 0.012, 0, 0.1);
      const orbsShift = vel * 8 * -dir;
      orbsContainer.style.transform = `scale(${orbsScale}) translateY(${orbsShift}px) translateZ(0)`;
    }

    if (mesh) {
      const meshScale = 1 + clamp(vel * 0.015, 0, 0.12);
      const meshBlur  = clamp(vel * 0.6, 0, 18);
      mesh.style.transform = `scale(${meshScale}) translateZ(0)`;
      mesh.style.filter    = meshBlur > 0.5 ? `blur(${meshBlur}px)` : '';
    }

    if (aurora1 && aurora2) {
      const stretch = 1 + clamp(vel * 0.06, 0, 0.55);
      const shiftY  = vel * 10 * -dir;
      const opacity = clamp(1 - vel * 0.04, 0.4, 1.0);

      aurora1.style.transform = `scaleY(${stretch}) translateY(${shiftY}px) translateZ(0)`;
      aurora1.style.opacity   = opacity;

      aurora2.style.transform = `scaleY(${stretch}) translateY(${shiftY * 0.8}px) translateZ(0)`;
      aurora2.style.opacity   = opacity;
    }

    if (core && beams.length) {
      const coreScale = 1.35 + clamp(vel * 0.08, 0, 0.5);
      const coreOpacity = 0.22 + clamp(vel * 0.04, 0, 0.35);
      core.style.transform = `scale(${coreScale}) translateZ(0)`;
      core.style.opacity   = coreOpacity;

      beams.forEach((beam) => {
        const currentScaleX = 1 + clamp(vel * 0.08, 0, 0.6);
        const currentOpacity = 0.35 + clamp(vel * 0.06, 0, 0.4);
        beam.style.opacity = currentOpacity;
        gsap.set(beam, {
          scaleX: currentScaleX,
          rotate: `+=${vel * 0.25 * dir}`
        });
      });
    }
  }


  /* ==============================================================
     3. BACKGROUND NOISE OVERLAY (GRAIN ONLY)
     ============================================================== */
  function initNoiseOverlay() {
    if (REDUCED) return;
    if (document.getElementById('motion-noise')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'motion-noise';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let frame = 0;

    function resize() {
      canvas.width  = Math.ceil(window.innerWidth  / 4);
      canvas.height = Math.ceil(window.innerHeight / 4);
    }

    function drawNoise() {
      const w = canvas.width, h = canvas.height;
      const img = ctx.createImageData(w, h);
      const d   = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i+1] = d[i+2] = v;
        d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    addTick('noiseOverlay', () => {
      if (++frame % 5 === 0) {
        drawNoise();
      }
    });
  }


  /* ==============================================================
     3b. INTERACTIVE PARALLAX BLUEPRINT GRID & CONSTELLATION WEB
     Calculates dynamic grid spacing and responsive pointer lines.
     ============================================================== */
  function initGridAndConstellation() {
    if (REDUCED) return;
    if (document.getElementById('motion-ambient-canvas')) return;

    // Create a unified high-fidelity rendering canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'motion-ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    // Ensure the canvas is positioned behind everything
    canvas.style.cssText = 'position:fixed; inset:0; z-index:-20; width:100vw; height:100vh; pointer-events:none;';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];

    // Define three slow-moving fluid gradient light blobs (colored using brand identity)
    const blobs = [
      {
        baseX: window.innerWidth * 0.18,
        baseY: window.innerHeight * 0.28,
        x: 0, y: 0,
        radius: IS_MOBILE ? 220 : 420,
        colorStart: 'rgba(108, 186, 231, 0.07)', // brand sky blue
        colorMid: 'rgba(108, 186, 231, 0.02)',
        phaseX: Math.random() * 10,
        phaseY: Math.random() * 10,
        speedX: 0.0006,
        speedY: 0.0009
      },
      {
        baseX: window.innerWidth * 0.82,
        baseY: window.innerHeight * 0.38,
        x: 0, y: 0,
        radius: IS_MOBILE ? 250 : 480,
        colorStart: 'rgba(42, 91, 169, 0.06)', // brand deep blue
        colorMid: 'rgba(42, 91, 169, 0.015)',
        phaseX: Math.random() * 10,
        phaseY: Math.random() * 10,
        speedX: 0.0005,
        speedY: 0.0007
      },
      {
        baseX: window.innerWidth * 0.45,
        baseY: window.innerHeight * 0.72,
        x: 0, y: 0,
        radius: IS_MOBILE ? 180 : 340,
        colorStart: 'rgba(212, 175, 55, 0.035)', // brand gold tone
        colorMid: 'rgba(212, 175, 55, 0.008)',
        phaseX: Math.random() * 10,
        phaseY: Math.random() * 10,
        speedX: 0.0008,
        speedY: 0.0006
      }
    ];

    // Throttled canvas resizing
    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      spawnParticles();
      // recalculate bases for floating blobs
      blobs[0].baseX = canvas.width * 0.18;
      blobs[0].baseY = canvas.height * 0.28;
      blobs[1].baseX = canvas.width * 0.82;
      blobs[1].baseY = canvas.height * 0.38;
      blobs[2].baseX = canvas.width * 0.45;
      blobs[2].baseY = canvas.height * 0.72;
    }

    function spawnParticles() {
      particles = [];
      const numParticles = IS_MOBILE ? 15 : 42;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.4 + 0.6,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28 - 0.08,
          opacity: Math.random() * 0.3 + 0.12
        });
      }
    }

    // Single drawing routine
    function draw(time) {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* 1) RENDER ATMOSPHERIC LIGHT BLOBS (Desktop & Laptop only for performance) */
      if (!IS_MOBILE) {
        blobs.forEach(b => {
          b.phaseX += b.speedX;
          b.phaseY += b.speedY;

          // Harmonic movement math
          const dx = Math.sin(b.phaseX) * 75;
          const dy = Math.cos(b.phaseY) * 60;

          // Parallax coordinate updates (reactive to normal coords)
          const mx = AppState.normalX * 65;
          const my = AppState.normalY * 65;

          b.x = b.baseX + dx + mx;
          b.y = b.baseY + dy + my;

          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, b.colorStart);
          grad.addColorStop(0.4, b.colorMid);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      /* 2) Draw parallax geometric grid lines */
      ctx.strokeStyle = 'rgba(108, 186, 231, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      const scrollOffset = AppState.scroll * 0.22;
      
      // Vertical grid lines
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontal grid lines (scroll-linked translation)
      const startY = -(scrollOffset % gridSize);
      for (let y = startY; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      /* 3) Draw particles and connecting webs */
      const maxConnectDistance = 110;
      const velocityOffset = AppState.scrollVelocity * 0.5 * -AppState.scrollDirection;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy + velocityOffset;

        /* Wrap boundaries */
        if (p1.x < 0) p1.x = w;
        if (p1.x > w) p1.x = 0;
        if (p1.y < 0) p1.y = h;
        if (p1.y > h) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 186, 231, ${p1.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108, 186, 231, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        /* Golden pointer interactive connections */
        const mdx = p1.x - AppState.mouseX;
        const mdy = p1.y - AppState.mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const alpha = (1 - mdist / 140) * 0.16;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(AppState.mouseX, AppState.mouseY);
          ctx.strokeStyle = `rgba(255, 220, 100, ${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }

    resize();
    
    // Throttled window resizing listener
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    addTick('ambientCanvas', (time) => {
      draw(time);
    });
  }


  /* ==============================================================
     4. BUTTON RIPPLES AND MAGNETIC SNAPS
     ============================================================== */
  function initButtonMagnetismAndRipples() {
    if (REDUCED) return;

    const hoverTargets = document.querySelectorAll(
      'a, button, .tech-badge, [data-filter-btn], [data-select], .form-btn'
    );

    hoverTargets.forEach(el => {
      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'm-btn-ripple';
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        el.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    if (IS_MOBILE) return;
    const magneticBtns = document.querySelectorAll(
      '.hero-buttons .btn, .form-btn, .blog-nav-btn, .info_more-btn'
    );

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.35,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.4)'
        });
      });
    });
  }


  /* ==============================================================
     5. GLASSMORPHISM & TILT/SHADOW/GLARE FOR CARDS
     ============================================================== */
  function registerSingleCard(card) {
    if (!card) return;
    const pos = getComputedStyle(card).position;
    if (pos === 'static') card.style.position = 'relative';

    if (!card.querySelector('.m-glass-sheen')) {
      const sheen = document.createElement('span');
      sheen.className = 'm-glass-sheen';
      sheen.setAttribute('aria-hidden', 'true');
      card.appendChild(sheen);
    }

    if (!card.querySelector('.m-card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'm-card-glare';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    card.addEventListener('mouseenter', () => document.body.classList.add('hover-link'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('hover-link'));

    card.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hover-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hover-link'));
    });

    if (IS_MOBILE || REDUCED) return;

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--glare-x', `${x}px`);
      card.style.setProperty('--glare-y', `${y}px`);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((cy - y) / cy) * 7.5;
      const rotY = ((x - cx) / cx) * 7.5;

      const shadowX = -rotY * 2.5;
      const shadowY = rotX * 2.5;

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        y: -5,
        transformPerspective: 1000,
        boxShadow: `${shadowX}px ${shadowY}px 32px rgba(0, 0, 0, 0.14)`,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    card.addEventListener('mouseleave', function () {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        boxShadow: 'var(--shadow-2)',
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  }

  window.initInteractiveCard = registerSingleCard;

  function initGlassAndCardTilt() {
    const cardSelectors = [
      '.interactive-card',
      '.service-item',
      '.timeline-item',
      '.content-card',
      '.metric-card'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));
    cards.forEach(card => {
      registerSingleCard(card);
    });
  }


  /* ==============================================================
     6. CUSTOM CURSOR UPGRADE
     ============================================================== */
  function initCursorUpgrades() {
    const ring = document.getElementById('custom-cursor');
    const dot  = document.getElementById('custom-cursor-dot');
    if (!ring || !dot || IS_MOBILE || REDUCED) return;

    ring.style.transition = 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s';

    let ringX = AppState.mouseX;
    let ringY = AppState.mouseY;
    let lastMouseX = AppState.mouseX;
    let lastMouseY = AppState.mouseY;

    let snapTarget = null;
    let snapActive = false;

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-clicking'));

    const textNodes = document.querySelectorAll(
      'p, span, h1, h2, h3, h4, h5, li:not(.navbar-item):not(.social-item) span, address, time'
    );
    textNodes.forEach(node => {
      if (node.closest('a, button, .interactive-card, .navbar')) return;
      node.addEventListener('mouseenter', () => document.body.classList.add('hover-text'));
      node.addEventListener('mouseleave', () => document.body.classList.remove('hover-text'));
    });

    const imageNodes = document.querySelectorAll('figure.project-img, figure.blog-banner-box');
    imageNodes.forEach(node => {
      node.addEventListener('mouseenter', () => document.body.classList.add('hover-image'));
      node.addEventListener('mouseleave', () => document.body.classList.remove('hover-image'));
    });

    const magnetics = document.querySelectorAll('.hero-buttons .btn, .form-btn, .blog-nav-btn');
    magnetics.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        snapTarget = btn;
        snapActive = true;
      });
      btn.addEventListener('mouseleave', () => {
        snapTarget = null;
        snapActive = false;
      });
    });

    addTick('customCursor', () => {
      const curX = AppState.mouseX;
      const curY = AppState.mouseY;
      const dx = curX - lastMouseX;
      const dy = curY - lastMouseY;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      lastMouseX = curX;
      lastMouseY = curY;

      if (snapActive && snapTarget) {
        const rect = snapTarget.getBoundingClientRect();
        const tx = rect.left + rect.width / 2;
        const ty = rect.top + rect.height / 2;

        ringX = lerp(ringX, tx, 0.16);
        ringY = lerp(ringY, ty, 0.16);

        gsap.set(ring, {
          x: ringX,
          y: ringY,
          left: 0,
          top: 0,
          width: rect.width + 12,
          height: rect.height + 12,
          borderRadius: getComputedStyle(snapTarget).borderRadius || '12px',
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          transform: 'translate(-50%, -50%)',
          borderColor: 'var(--orange-yellow-crayola)'
        });

        gsap.set(dot, {
          x: curX,
          y: curY,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        });

      } else {
        ringX = lerp(ringX, curX, 0.13);
        ringY = lerp(ringY, curY, 0.13);

        const stretch = 1 + clamp(velocity * 0.0075, 0, 0.45);
        const squash  = 1 - clamp(velocity * 0.0075, 0, 0.35);

        const isHovered = document.body.classList.contains('hover-link') ||
                          document.body.classList.contains('hover-image') ||
                          document.body.classList.contains('hover-text');

        gsap.set(ring, {
          x: ringX,
          y: ringY,
          left: 0,
          top: 0,
          width: isHovered ? (document.body.classList.contains('hover-text') ? 4 : (document.body.classList.contains('hover-image') ? 65 : 50)) : 32,
          height: isHovered ? (document.body.classList.contains('hover-text') ? 24 : (document.body.classList.contains('hover-image') ? 65 : 50)) : 32,
          borderRadius: document.body.classList.contains('hover-text') ? '2px' : '50%',
          scaleX: document.body.classList.contains('hover-text') ? 1 : stretch,
          scaleY: document.body.classList.contains('hover-text') ? 1 : squash,
          rotate: document.body.classList.contains('hover-text') ? 0 : angle,
          transform: 'translate(-50%, -50%)',
          borderColor: ''
        });

        gsap.set(dot, {
          x: curX,
          y: curY,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        });
      }
    });
  }


  /* ==============================================================
     7. HERO PARALLAX & INJECTED SCROLL INDICATOR
     ============================================================== */
  function initHeroParallaxAndScroll() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    if (!hero.querySelector('.m-hero-scroll')) {
      const scrollInd = document.createElement('div');
      scrollInd.className = 'm-hero-scroll';
      scrollInd.setAttribute('aria-hidden', 'true');
      scrollInd.innerHTML = `
        <span>Scroll</span>
        <div class="m-hero-scroll-mouse">
          <div class="m-hero-scroll-wheel"></div>
        </div>
      `;
      hero.appendChild(scrollInd);
    }

    if (IS_MOBILE || REDUCED) return;

    const shapes = hero.querySelectorAll('.floating-shape');
    const badges = hero.querySelectorAll('.tech-badge');

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 32;
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(shape, {
          x: x * factor * dir,
          y: y * factor * dir,
          rotate: x * 15 * dir,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      badges.forEach((badge, i) => {
        const factor = (i + 1) * 12;
        gsap.to(badge, {
          x: x * factor,
          y: y * factor,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });

    hero.addEventListener('mouseleave', () => {
      shapes.forEach(shape => {
        gsap.to(shape, { x: 0, y: 0, rotate: 0, duration: 1.2, ease: 'power3.out' });
      });
      badges.forEach(badge => {
        gsap.to(badge, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
      });
    });
  }


  /* ==============================================================
     8. TEXT STAGGERING AND BLUR REVEALS
     ============================================================== */
  function initTextStaggers() {
    if (REDUCED) {
      // If prefers-reduced-motion, immediately fade out loader and start Lenis
      const loader = document.getElementById('intro-loader');
      if (loader) {
        loader.classList.add('fade-out');
      }
      return;
    }

    const nameEl = document.querySelector('.hero-name');
    const descEl = document.querySelector('.hero-desc');

    function splitIntoWords(element) {
      if (!element) return;
      const originalText = element.innerText.trim();
      const words = originalText.split(/\s+/);
      element.innerHTML = '';

      words.forEach(word => {
        const mask = document.createElement('span');
        mask.className = 'm-word-mask';
        const inner = document.createElement('span');
        inner.className = 'm-word-inner';
        inner.textContent = word;
        mask.appendChild(inner);
        element.appendChild(document.createTextNode(' '));
      });
    }

    splitIntoWords(nameEl);
    splitIntoWords(descEl);

    // Get DOM nodes
    const loader = document.getElementById('intro-loader');
    const progressFill = document.querySelector('.loader-progress-bar');
    const statusText = document.querySelector('.loader-status');
    const chars = document.querySelectorAll('.logo-char');
    const subtitle = document.querySelector('.hero-subtitle');
    const buttons = document.querySelector('.hero-buttons');
    const graphics = document.querySelector('.hero-graphics');
    const sidebar = document.querySelector('.sidebar');
    const navbar = document.querySelector('.navbar');
    const nameWords = document.querySelectorAll('.hero-name .m-word-inner');
    const descWords = document.querySelectorAll('.hero-desc .m-word-inner');

    if (!loader || !progressFill) return;

    // Lock scrolling on Lenis during load
    if (lenisInstance) {
      lenisInstance.stop();
    }

    // Set initial layout states
    gsap.set(subtitle, { opacity: 0, y: 15 });
    gsap.set(buttons, { opacity: 0, y: 20 });
    gsap.set(graphics, { opacity: 0, scale: 0.95 });
    gsap.set(sidebar, { opacity: 0, x: -30 });
    gsap.set(navbar, { opacity: 0, y: -20 });

    // Initialize Preloader Particles Canvas
    const loaderCanvas = document.getElementById('loader-particles');
    let runLoaderParticles = true;
    if (loaderCanvas) {
      const lCtx = loaderCanvas.getContext('2d');
      let lParticles = [];
      
      const resizeLoader = () => {
        loaderCanvas.width = window.innerWidth;
        loaderCanvas.height = window.innerHeight;
      };
      resizeLoader();
      window.addEventListener('resize', resizeLoader, { passive: true });

      // Spawn drifting glow embers
      for (let i = 0; i < 35; i++) {
        lParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.5 + 0.8,
          vy: -Math.random() * 0.4 - 0.15,
          vx: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.4 + 0.1
        });
      }

      addTick('loaderParticles', () => {
        if (!runLoaderParticles) return;
        lCtx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
        for (let i = 0; i < lParticles.length; i++) {
          const p = lParticles[i];
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < 0) {
            p.y = loaderCanvas.height;
            p.x = Math.random() * loaderCanvas.width;
          }
          lCtx.beginPath();
          lCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          lCtx.fillStyle = `rgba(108, 186, 231, ${p.opacity})`;
          lCtx.fill();
        }
      });
    }

    const loaderTl = gsap.timeline();

    // 1. Logo characters fade, slide up, and blur-in
    loaderTl.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.0,
      stagger: 0.18,
      ease: 'power3.out'
    });

    // 2. Progress fill simulation (weighty speed curve)
    loaderTl.to(progressFill, {
      width: '100%',
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (statusText) {
          statusText.innerText = progress < 100 ? `Loading Assets... ${progress}%` : `System Loaded!`;
        }
      }
    }, '-=0.2');

    // 3. Ambient lights expand on finish
    loaderTl.to('.loader-glow', {
      scale: 1.4,
      opacity: 0.35,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.2');

    // 4. Loader fadeout & scroll enable
    loaderTl.to(loader, {
      opacity: 0,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        loader.classList.add('fade-out');
        runLoaderParticles = false;
        // delete preloader tick task to save memory
        delete AppState.ticks['loaderParticles'];
        if (lenisInstance) {
          lenisInstance.start();
        }
      }
    });

    // 5. Stagger entrance of sidebar, navbar, and hero subtitles
    loaderTl.to(sidebar, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }, '-=0.3')
            .to(navbar, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
            .to(subtitle, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.7');

    // 5. Text blur-reveals staggers
    if (nameWords.length) {
      loaderTl.to(nameWords, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.05,
        ease: 'power4.out'
      }, '-=0.6');
    }

    if (descWords.length) {
      loaderTl.to(descWords, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out'
      }, '-=0.5');
    }

    // 6. Buttons slide up and graphics bounce in
    loaderTl.to(buttons, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
            .to(graphics, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.15)' }, '-=0.6');

    // Section title intersections
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('title--visible');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.article-title').forEach(t => titleObserver.observe(t));
  }


  /* ==============================================================
     9. SCROLL EXPERIENCE - TRIGGERS & TIMELINES
     ============================================================== */
  function initScrollLinkedAnimations() {
    if (REDUCED || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sections = document.querySelectorAll('section[id], article[id]');
    
    sections.forEach(sec => {
      if (sec.id === 'hero') return;

      gsap.fromTo(sec, 
        { opacity: 0.65, scale: 0.98, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const timelines = document.querySelectorAll('.timeline-list');
    timelines.forEach(list => {
      if (!list.querySelector('.m-timeline-progress')) {
        const prog = document.createElement('div');
        prog.className = 'm-timeline-progress';
        list.insertBefore(prog, list.firstChild);
      }

      const progressLine = list.querySelector('.m-timeline-progress');

      gsap.fromTo(progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: true
          }
        }
      );
    });
  }

  function initHeroDepth() {
    if (REDUCED || IS_MOBILE) return;

    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    let cX = 0.5, cY = 0.5;

    addTick('heroDepth', () => {
      // Map normalized coordinates (-0.5 to 0.5) to (0 to 1) range
      const tX = AppState.targetNormalX + 0.5;
      const tY = AppState.targetNormalY + 0.5;

      cX = lerp(cX, tX, 0.06);
      cY = lerp(cY, tY, 0.06);
      hero.style.setProperty('--mouse-x', (cX * 100).toFixed(1) + '%');
      hero.style.setProperty('--mouse-y', (cY * 100).toFixed(1) + '%');
    });
  }


  /* ==============================================================
     10. IMAGES PARALLAX SHIFTS
     ============================================================== */
  function initImageParallax() {
    if (IS_MOBILE || REDUCED) return;

    const images = document.querySelectorAll(
      '.project-item figure img, .blog-post-item figure img'
    );

    images.forEach(img => {
      const container = img.parentElement;
      if (!container) return;

      container.addEventListener('mousemove', function (e) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        gsap.to(img, {
          x: x * -12,
          y: y * -12,
          scale: 1.08,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      container.addEventListener('mouseleave', function () {
        gsap.to(img, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });
    });
  }


  /* ==============================================================
     11. GSAP TIMELINES & SKILLS LABELS COUNT-UP
     ============================================================== */
  function initGSAPTimelines() {
    if (REDUCED || typeof gsap === 'undefined') return;

    const metricObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const cards = e.target.querySelectorAll('.metric-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.12, ease: 'back.out(1.15)' }
        );
        metricObs.unobserve(e.target);
      });
    }, { threshold: 0.20 });

    const metricsGrid = document.querySelector('.metrics-grid');
    if (metricsGrid) metricObs.observe(metricsGrid);

    const skillCards = document.querySelectorAll('.skill-circle-card');
    skillCards.forEach(card => {
      const label = card.querySelector('.percentage-label');
      const fill  = card.querySelector('.progress-ring-fill');
      if (!label || !fill) return;

      const targetPct = parseFloat(fill.getAttribute('data-pct') || 0);

      const numObj = { val: 0 };
      gsap.to(numObj, {
        val: targetPct,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          label.innerText = Math.floor(numObj.val) + '%';
        }
      });
    });

    const timelineObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const items = e.target.querySelectorAll('.timeline-item');
        gsap.fromTo(items,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.85, stagger: 0.10, ease: 'power2.out' }
        );
        timelineObs.unobserve(e.target);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.timeline-list').forEach(list => timelineObs.observe(list));

    const serviceObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const items = e.target.querySelectorAll('.service-item');
        gsap.fromTo(items,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.80, stagger: 0.12, ease: 'power2.out' }
        );
        serviceObs.unobserve(e.target);
      });
    }, { threshold: 0.15 });

    const serviceList = document.querySelector('.service-list');
    if (serviceList) serviceObs.observe(serviceList);
  }


  /* ==============================================================
     12. PORTFOLIO FILTER SLIDING LIQUID PILL
     ============================================================== */
  function initFilterSlidingPill() {
    const filterList = document.querySelector('.filter-list');
    if (!filterList) return;

    let pill = filterList.querySelector('.m-filter-pill');
    if (!pill) {
      pill = document.createElement('div');
      pill.className = 'm-filter-pill';
      filterList.insertBefore(pill, filterList.firstChild);
    }

    function alignPill(btn, animate = true) {
      if (!btn || !pill) return;
      const rect = btn.getBoundingClientRect();
      const parentRect = filterList.getBoundingClientRect();

      const left = rect.left - parentRect.left;
      const width = rect.width;
      const height = rect.height;
      const top = rect.top - parentRect.top;

      gsap.to(pill, {
        left: left,
        width: width,
        height: height,
        top: top,
        duration: animate ? 0.45 : 0,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }

    const filterBtns = filterList.querySelectorAll('[data-filter-btn]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        alignPill(btn, true);
      });
    });

    setTimeout(() => {
      const activeBtn = filterList.querySelector('[data-filter-btn].active');
      if (activeBtn) alignPill(activeBtn, false);
    }, 150);

    window.addEventListener('resize', () => {
      const activeBtn = filterList.querySelector('[data-filter-btn].active');
      if (activeBtn) alignPill(activeBtn, false);
    }, { passive: true });
  }


  /* ==============================================================
     13. TESTIMONIALS SCROLL KINETIC SKEW
     ============================================================== */
  function initTestimonialsSkew() {
    if (REDUCED) return;
    const tList = document.querySelector('.testimonials-list');
    if (!tList) return;

    let lastScrollLeft = tList.scrollLeft;
    let tListTicker = null;

    function checkTestimonialsSkew() {
      const currentScroll = tList.scrollLeft;
      const delta = currentScroll - lastScrollLeft;
      lastScrollLeft = currentScroll;

      const skew = clamp(delta * 0.08, -8, 8);

      tList.querySelectorAll('.testimonials-item').forEach(item => {
        gsap.to(item, {
          skewX: skew,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });
      tListTicker = requestAnimationFrame(checkTestimonialsSkew);
    }

    tList.addEventListener('scroll', () => {
      if (!tListTicker) checkTestimonialsSkew();
    }, { passive: true });
  }


  /* ==============================================================
     14. INTERACTIVE SIDEBAR STAGGER REVEALS
     ============================================================== */
  function initSidebarStagger() {
    const sidebar = document.querySelector('[data-sidebar]');
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    if (!sidebar || !sidebarBtn) return;

    sidebarBtn.addEventListener('click', () => {
      if (sidebar.classList.contains('active')) {
        const items = sidebar.querySelectorAll('.contacts-list .contact-item, .social-list .social-item');
        gsap.fromTo(items,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        );
      }
    });
  }


  /* ==============================================================
     15. AFTER EFFECTS VOLUMETRIC REVEAL VFX
     ============================================================== */
  function initVFXReveal() {
    if (REDUCED) return;

    if (!document.getElementById('motion-vfx-reveal')) {
      const vfx = document.createElement('div');
      vfx.id = 'motion-vfx-reveal';
      vfx.setAttribute('aria-hidden', 'true');
      vfx.innerHTML = `
        <div class="m-vfx-core"></div>
        <div class="m-vfx-beam m-vfx-beam--1"></div>
        <div class="m-vfx-beam m-vfx-beam--2"></div>
        <div class="m-vfx-beam m-vfx-beam--3"></div>
        <div class="m-vfx-beam m-vfx-beam--4"></div>
        <div class="m-vfx-sweep"></div>
      `;
      document.body.insertBefore(vfx, document.body.firstChild);
    }

    const core = document.querySelector('.m-vfx-core');
    const beams = document.querySelectorAll('.m-vfx-beam');
    const sweep = document.querySelector('.m-vfx-sweep');

    const tl = gsap.timeline();

    tl.fromTo(core,
      { scale: 0.1, opacity: 0 },
      { scale: 2.2, opacity: 0.95, duration: 0.75, ease: 'power4.out' }
    );

    tl.fromTo(beams,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1.2, opacity: 0.9, duration: 0.9, stagger: 0.1, ease: 'expo.out' },
      '-=0.5'
    );

    tl.to(beams, {
      opacity: 0.35,
      scaleX: 1.0,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=0.2');

    tl.to(core, {
      scale: 1.5,
      opacity: 0.28,
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=1.5');

    tl.fromTo(sweep,
      { x: '-100%' },
      { x: '100%', duration: 2.2, ease: 'power2.inOut' },
      '0.3'
    );

    tl.add(() => {
      beams.forEach((beam, idx) => {
        gsap.to(beam, {
          rotate: `+=${360 * (idx % 2 === 0 ? 1 : -1)}deg`,
          duration: 35 + idx * 5,
          repeat: -1,
          ease: 'none'
        });
        gsap.to(beam, {
          opacity: 0.45,
          duration: 3 + idx,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      });

      gsap.to(core, {
        scale: 1.7,
        opacity: 0.38,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      gsap.to(sweep, {
        x: '100%',
        duration: 2.0,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 10
      });
    });

    window.addEventListener('click', () => {
      gsap.fromTo(sweep,
        { x: '-100%' },
        { x: '100%', duration: 1.5, ease: 'power2.inOut', overwrite: 'auto' }
      );
      gsap.fromTo(core,
        { opacity: 0.28, scale: 1.5 },
        { opacity: 0.55, scale: 1.9, duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.out', overwrite: 'auto' }
      );
    });
  }


  /* ==============================================================
     16. RETRO REFERENCE PORTFOLIO EFFECTS
     ============================================================== */
  function initTypewriter() {
    const target = document.querySelector('.m-typewriter-target');
    if (!target) return;

    const words = [
      "Full-Stack Developer",
      "UI/UX Designer",
      "MCA Postgraduate",
      "Creative Frontend Engineer"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentWord = words[wordIdx];
      
      if (isDeleting) {
        target.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        target.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 300;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
  }

  function initButtonSlideLayers() {
    if (REDUCED) return;

    const btns = document.querySelectorAll('.btn, .form-btn');
    btns.forEach(btn => {
      const children = Array.from(btn.childNodes);
      const textWrapper = document.createElement('span');
      textWrapper.style.position = 'relative';
      textWrapper.style.zIndex = '3';
      textWrapper.style.display = 'inline-flex';
      textWrapper.style.alignItems = 'center';
      textWrapper.style.gap = '8px';
      
      children.forEach(child => {
        textWrapper.appendChild(child);
      });
      btn.appendChild(textWrapper);

      for (let i = 0; i < 3; i++) {
        const layer = document.createElement('span');
        layer.className = `m-btn-slide-layer m-btn-slide-layer--${i + 1}`;
        btn.appendChild(layer);
      }
    });
  }


  /* ==============================================================
     17. DYNAMIC CONTENT LAZY LOAD ENABLER
     ============================================================== */
  function enableImageLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }


  /* ==============================================================
     17. PREMIUM PRODUCT CASE STUDY GENERATOR & CONTROLLER
     Transforms portfolio grid items into full case studies on-click.
     ============================================================== */
  function generateCaseStudyHTML(data) {
    if (!data) return '';

    let techBadges = data.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');
    
    let problemTimeline = data.problemStatement.timeline.map(t => `
      <div class="cs-timeline-item">
        <div class="cs-timeline-node"></div>
        <span class="cs-timeline-date">${t.date}</span>
        <h4 class="cs-timeline-title">${t.title}</h4>
        <p class="cs-timeline-desc">${t.desc}</p>
      </div>
    `).join('');

    let painCards = data.painPoints.map(p => `
      <div class="cs-pain-card interactive-card">
        <div class="cs-pain-header">
          <div class="cs-pain-icon"><ion-icon name="${p.icon}"></ion-icon></div>
          <span class="cs-pain-severity cs-severity-${p.severity.toLowerCase()}">${p.severity}</span>
        </div>
        <h4 class="cs-pain-title">${p.title}</h4>
        <p class="cs-pain-desc">${p.desc}</p>
        <div class="cs-pain-impacts">
          <div class="cs-impact-row">
            <span class="cs-impact-label">User Impact:</span>
            <span class="cs-impact-val">${p.userImpact}</span>
          </div>
          <div class="cs-impact-row">
            <span class="cs-impact-label">Business:</span>
            <span class="cs-impact-val">${p.bizImpact}</span>
          </div>
        </div>
      </div>
    `).join('');

    let researchBlock = `
      <div class="cs-research-grid">
        <div class="cs-research-card interactive-card">
          <h4>Target Users</h4>
          <p class="cs-research-val">${data.research.users}</p>
        </div>
        <div class="cs-research-card interactive-card">
          <h4>Findings</h4>
          <p class="cs-research-val">${data.research.findings}</p>
        </div>
        <div class="cs-research-card interactive-card">
          <h4>Competitors</h4>
          <p class="cs-research-val">${data.research.competitors}</p>
        </div>
        <div class="cs-research-card interactive-card">
          <h4>Challenges</h4>
          <p class="cs-research-val">${data.research.challenges}</p>
        </div>
        <div class="cs-research-card interactive-card">
          <h4>Insights</h4>
          <p class="cs-research-val">${data.research.insights}</p>
        </div>
      </div>
    `;

    let solutionBlock = `
      <div class="cs-sol-grid">
        <div class="cs-sol-card interactive-card">
          <h4 class="cs-timeline-title">Solution Overview</h4>
          <p class="cs-timeline-desc">${data.solution.overview}</p>
        </div>
        <div class="cs-sol-card interactive-card">
          <h4 class="cs-timeline-title">Why Architecture</h4>
          <p class="cs-timeline-desc">${data.solution.whyArchitecture}</p>
        </div>
        <div class="cs-sol-card interactive-card">
          <h4 class="cs-timeline-title">Key Benefits</h4>
          <p class="cs-timeline-desc">${data.solution.benefits}</p>
        </div>
        <div class="cs-sol-card interactive-card">
          <h4 class="cs-timeline-title">Business Value</h4>
          <p class="cs-timeline-desc">${data.solution.value}</p>
        </div>
      </div>
    `;

    let featuresBlock = data.features.map(f => `
      <div class="cs-feat-card interactive-card">
        <div class="cs-pain-icon" style="margin-bottom:14px;"><ion-icon name="${f.icon}"></ion-icon></div>
        <h4 class="cs-pain-title">${f.title}</h4>
        <p class="cs-pain-desc" style="margin-bottom:14px;">${f.desc}</p>
        <div class="cs-pain-impacts">
          <div class="cs-impact-row"><span class="cs-impact-label">User Value:</span><span class="cs-impact-val">${f.userBenefit}</span></div>
          <div class="cs-impact-row"><span class="cs-impact-label">Business:</span><span class="cs-impact-val">${f.bizBenefit}</span></div>
        </div>
      </div>
    `).join('');

    let archBlock = data.architecture.map(a => `
      <div class="cs-arch-card interactive-card">
        <h4>${a.layer}</h4>
        <p class="cs-timeline-desc">${a.detail}</p>
      </div>
    `).join('');

    let workflowBlock = data.workflow.map(w => `
      <div class="cs-flow-item interactive-card">
        <div class="cs-flow-number">${w.step.split('.')[0]}</div>
        <div>
          <h4 class="cs-pain-title" style="margin-bottom:6px;">${w.step.split('.')[1].trim()}</h4>
          <p class="cs-timeline-desc">${w.desc}</p>
        </div>
      </div>
    `).join('');

    let mockupHTML = '';
    if (data.mockupType === 'mobile') {
      mockupHTML = `
        <div class="mobile-mockup">
          <div class="mobile-screen">
            <img src="${data.showcaseImage}" alt="${data.name}" loading="lazy">
          </div>
        </div>
      `;
    } else if (data.mockupType === 'desktop') {
      mockupHTML = `
        <div class="desktop-mockup">
          <div class="desktop-screen">
            <img src="${data.showcaseImage}" alt="${data.name}" loading="lazy">
          </div>
        </div>
      `;
    } else {
      mockupHTML = `
        <div class="laptop-mockup">
          <div class="laptop-screen">
            <img src="${data.showcaseImage}" alt="${data.name}" loading="lazy">
          </div>
        </div>
      `;
    }

    let techStackCards = data.stackDetails.map(s => `
      <div class="cs-tech-card interactive-card">
        <h4>${s.name}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');

    let challengesBlock = `
      <div class="cs-challenges-grid">
        <div class="cs-challenge-card interactive-card">
          <h4>Technical Challenge</h4>
          <p class="cs-timeline-desc">${data.challenges.tech}</p>
        </div>
        <div class="cs-challenge-card interactive-card">
          <h4>Performance Impact</h4>
          <p class="cs-timeline-desc">${data.challenges.performance}</p>
        </div>
        <div class="cs-challenge-card interactive-card">
          <h4>Interface / UI</h4>
          <p class="cs-timeline-desc">${data.challenges.ui}</p>
        </div>
        <div class="cs-challenge-card interactive-card">
          <h4>Engineering Mitigation</h4>
          <p class="cs-timeline-desc">${data.challenges.solutions}</p>
        </div>
      </div>
    `;

    let resultsBlock = `
      <div class="cs-results-grid">
        <div class="cs-result-card interactive-card">
          <span class="cs-result-val">${data.results.performance}</span>
          <p class="cs-meta-label">Performance Gain</p>
        </div>
        <div class="cs-result-card interactive-card">
          <span class="cs-result-val">${data.results.userExp}</span>
          <p class="cs-meta-label">User Experience</p>
        </div>
        <div class="cs-result-card interactive-card">
          <span class="cs-result-val">${data.results.business}</span>
          <p class="cs-meta-label">Business Metric</p>
        </div>
        <div class="cs-result-card interactive-card">
          <span class="cs-result-val">${data.results.scalability}</span>
          <p class="cs-meta-label">Future Scalability</p>
        </div>
      </div>
    `;

    let linksBlock = `
      <div class="cs-hero-links" style="margin-top:0; justify-content:center; flex-wrap: wrap;">
        <a href="${data.links.git}" target="_blank" class="btn btn-primary" style="padding:12px 24px;">
          <ion-icon name="logo-github"></ion-icon> GitHub Code
        </a>
        <a href="${data.links.demo}" target="_blank" class="btn btn-secondary" style="padding:12px 24px;">
          <ion-icon name="open-outline"></ion-icon> Live Demo
        </a>
        <a href="${data.links.docs}" target="_blank" class="btn btn-secondary" style="padding:12px 24px; opacity: 0.7;">
          <ion-icon name="document-text-outline"></ion-icon> Documentation
        </a>
        <a href="${data.links.casePdf}" target="_blank" class="btn btn-secondary" style="padding:12px 24px; opacity: 0.7;">
          <ion-icon name="download-outline"></ion-icon> Case Study PDF
        </a>
      </div>
    `;

    return `
      <!-- SECTION 1: HERO -->
      <section class="cs-section cs-hero-card interactive-card">
        <div class="cs-hero-header">
          <span class="cs-hero-category">${data.category}</span>
          <h2 class="cs-hero-name">${data.name}</h2>
          <p class="cs-hero-summary">${data.summary}</p>
        </div>
        <div class="cs-hero-meta-grid">
          <div class="cs-meta-item">
            <span class="cs-meta-label">Role</span>
            <span class="cs-meta-val">${data.role}</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Development Duration</span>
            <span class="cs-meta-val">${data.duration}</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Status</span>
            <span class="cs-meta-val">${data.status}</span>
          </div>
        </div>
        <div class="cs-hero-links">
          <a href="${data.links.git}" target="_blank" class="btn btn-primary">
            <ion-icon name="logo-github"></ion-icon> Repository
          </a>
          <a href="${data.links.demo}" target="_blank" class="btn btn-secondary">
            <ion-icon name="open-outline"></ion-icon> Live Demo
          </a>
        </div>
      </section>

      <!-- SECTION 2: PROBLEM STATEMENT -->
      <section class="cs-section">
        <h3 class="cs-section-title">Problem Statement</h3>
        <p class="cs-timeline-desc" style="margin-bottom:24px; font-size:15px;">${data.problemStatement.background}</p>
        <div class="cs-problem-timeline">
          ${problemTimeline}
        </div>
      </section>

      <!-- SECTION 3: PAIN POINTS -->
      <section class="cs-section">
        <h3 class="cs-section-title">Critical Pain Points</h3>
        <div class="cs-pain-grid">
          ${painCards}
        </div>
      </section>

      <!-- SECTION 4: USER & MARKET RESEARCH -->
      <section class="cs-section">
        <h3 class="cs-section-title">User & Market Research</h3>
        ${researchBlock}
      </section>

      <!-- SECTION 5: PROPOSED SOLUTION -->
      <section class="cs-section">
        <h3 class="cs-section-title">Proposed Solution & Benefits</h3>
        ${solutionBlock}
      </section>

      <!-- SECTION 6: PRODUCT FEATURES -->
      <section class="cs-section">
        <h3 class="cs-section-title">Interactive Feature Grid</h3>
        <div class="cs-feat-grid">
          ${featuresBlock}
        </div>
      </section>

      <!-- SECTION 7: SYSTEM ARCHITECTURE -->
      <section class="cs-section">
        <h3 class="cs-section-title">System Architecture</h3>
        <div class="cs-arch-grid">
          ${archBlock}
        </div>
      </section>

      <!-- SECTION 8: PROCESS WORKFLOW -->
      <section class="cs-section">
        <h3 class="cs-section-title">Process Workflow</h3>
        <div class="cs-flow-list">
          ${workflowBlock}
        </div>
      </section>

      <!-- SECTION 9: PRODUCT SHOWCASE MOCKUPS -->
      <section class="cs-section">
        <h3 class="cs-section-title">Interface Showcase</h3>
        <div class="cs-showcase-center">
          ${mockupHTML}
        </div>
      </section>

      <!-- SECTION 10: DETAILED TECH STACK -->
      <section class="cs-section">
        <h3 class="cs-section-title">Technology Stack</h3>
        <div class="cs-tech-grid">
          ${techStackCards}
        </div>
      </section>

      <!-- SECTION 11: TECHNICAL CHALLENGES -->
      <section class="cs-section">
        <h3 class="cs-section-title">Technical Challenges & Mitigation</h3>
        ${challengesBlock}
      </section>

      <!-- SECTION 12: SCALE & PERFORMANCE RESULTS -->
      <section class="cs-section">
        <h3 class="cs-section-title">Project Performance & Results</h3>
        ${resultsBlock}
      </section>

      <!-- SECTION 13: PROJECT LINKS FOOTER -->
      <section class="cs-section" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top:40px; margin-bottom:0;">
        ${linksBlock}
      </section>
    `;
  }

  function initCaseStudyInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    const overlay = document.getElementById('project-case-study');
    const content = document.getElementById('case-study-content');
    const closeBtn = document.querySelector('[data-case-study-close]');
    const scrollWrapper = document.querySelector('.case-study-scroll-wrapper');
    
    if (!overlay || !content || !closeBtn || !scrollWrapper) return;

    let caseStudyLenis = null;

    projectItems.forEach(card => {
      const anchor = card.querySelector('a');
      if (!anchor) return;

      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Resolve key
        const titleText = card.querySelector('.project-title').innerText.trim().toLowerCase();
        let key = '';
        if (titleText.includes('nutrition')) key = 'nutrition-app';
        else if (titleText.includes('textile')) key = 'textile-management';
        else if (titleText.includes('gas')) key = 'gas-agency-system';

        const data = window.PROJECTS_DATA ? window.PROJECTS_DATA[key] : null;
        if (!data) return;

        // 2. Render Template
        content.innerHTML = generateCaseStudyHTML(data);

        // 3. Register Card hover effects dynamically inside the container
        const csCards = content.querySelectorAll('.interactive-card');
        csCards.forEach(c => {
          if (window.initInteractiveCard) {
            window.initInteractiveCard(c);
          }
        });

        // 4. GSAP Transition Timeline
        if (lenisInstance) {
          lenisInstance.stop();
        }

        const mainEl = document.querySelector('main');
        if (mainEl) {
          mainEl.classList.add('case-study-open-blur');
          gsap.to(mainEl, { filter: 'blur(16px) saturate(40%)', duration: 0.55 });
        }

        overlay.classList.add('active');

        const csTl = gsap.timeline();
        csTl.fromTo(overlay, 
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' }
        );

        const sections = content.querySelectorAll('.cs-section');
        csTl.fromTo(sections,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power2.out' },
          '-=0.45'
        );

        // Enable smooth Lenis targeting for Case study body scroll
        if (typeof Lenis !== 'undefined' && !REDUCED) {
          caseStudyLenis = new Lenis({
            wrapper: scrollWrapper,
            content: scrollWrapper.firstElementChild,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothWheel: true
          });

          addTick('caseStudyScroll', (time) => {
            if (caseStudyLenis) {
              caseStudyLenis.raf(time * 1000);
            }
          });
        }
      });
    });

    function closeCaseStudy() {
      if (!overlay.classList.contains('active')) return;

      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.classList.remove('case-study-open-blur');
        gsap.to(mainEl, { filter: 'blur(0px) saturate(100%)', duration: 0.45 });
      }

      gsap.to(overlay, {
        opacity: 0,
        scale: 0.97,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          overlay.classList.remove('active');
          content.innerHTML = ''; // free DOM memory

          delete AppState.ticks['caseStudyScroll'];
          if (caseStudyLenis) {
            caseStudyLenis.destroy();
            caseStudyLenis = null;
          }

          if (lenisInstance) {
            lenisInstance.start();
          }
        }
      });
    }

    closeBtn.addEventListener('click', closeCaseStudy);
    
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCaseStudy();
      }
    });
  }


  /* ==============================================================
     INITIALIZATION
     ============================================================== */
  function init() {
    initLenis();                     /* smooth scroll */
    initMeshAndAurora();             /* static background mesh */
    initAmbientLights();             /* floating blurs */
    initMouseLight();                /* dynamic spotlight */
    initNoiseOverlay();              /* procedural film grain texture overlay */
    initGridAndConstellation();      /* dynamic blueprint grid & connecting network web */
    initButtonSlideLayers();         /* reference retro sliding button layers wrapper */
    initButtonMagnetismAndRipples(); /* clicks ripple + magnetism snap */
    initGlassAndCardTilt();          /* card perspective glare tilts */
    initHeroParallaxAndScroll();     /* hero scroll indicator injection */
    initTextStaggers();              /* typography masks blur reveals */
    initScrollLinkedAnimations();    /* progressive ScrollTrigger scaling */
    initHeroDepth();                 /* hero custom property */
    initImageParallax();             /* internal zoom offset */
    initGSAPTimelines();             /* numbers increments and spring card entry */
    initFilterSlidingPill();         /* liquid selectors portfolio */
    initTestimonialsSkew();          /* carousel skews */
    initSidebarStagger();            /* contact list stagger reveals on toggle */
    initVFXReveal();                 /* clean logo reveal volumetric lighting visual overlay */
    initTypewriter();                /* reference retro typewriter subtitles loop */
    initCursorUpgrades();            /* cursor physics tracking */
    initCaseStudyInteractions();     /* fullscreen product case studies */
    enableImageLazyLoading();        /* lazy loading enhancements */

    // Tab Inactivity CPU Safety - Freeze all render loops when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gsap.ticker.sleep();
      } else {
        gsap.ticker.wake();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
