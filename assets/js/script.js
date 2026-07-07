'use strict';

// Register GSAP Plugins
gsap.registerPlugin(Flip);

// (Redundant hero badge rotation & old custom cursor/tilt handlers removed as they are fully managed in motion.js)

// =========================================================================
// 1. SCROLL PROGRESS BAR
// =========================================================================
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  if (!scrollProgress) return;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});



// =========================================================================
// 5. SCROLL REVEAL WITH INTERSECTION OBSERVER
//    (does NOT override elements already marked active-reveal in HTML)
// =========================================================================
const revealElements = document.querySelectorAll(
  ".reveal, .metric-card, .hobby-card, .tech-badge, .skill-circle-card, .timeline-item, .service-item, .blog-post-item, .project-item, .testimonials-item"
);

// Mark all as reveal if not already active
revealElements.forEach(el => {
  if (!el.classList.contains("active-reveal")) {
    el.classList.add("reveal");
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active-reveal");

      // Trigger circular skill ring animations
      const rings = entry.target.querySelectorAll(".progress-ring-fill");
      rings.forEach(ring => {
        const pct = parseFloat(ring.getAttribute("data-pct") || 0);
        const r = parseFloat(ring.getAttribute("r") || 50);
        const circumference = 2 * Math.PI * r;
        const offset = circumference - (pct / 100) * circumference;
        ring.style.strokeDashoffset = offset;
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// Also trigger skill rings when skills section scrolls into view
const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rings = entry.target.querySelectorAll(".progress-ring-fill");
        rings.forEach(ring => {
          const pct = parseFloat(ring.getAttribute("data-pct") || 0);
          const r = parseFloat(ring.getAttribute("r") || 50);
          const circumference = 2 * Math.PI * r;
          const offset = circumference - (pct / 100) * circumference;
          ring.style.strokeDashoffset = offset;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(skillsSection);
}


// =========================================================================
// 6. SCROLL SPY — Highlight Navbar link for visible section
// =========================================================================
const navLinks = document.querySelectorAll(".navbar-link");
const pageSections = document.querySelectorAll("section[id], article[id]");

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  
  pageSections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");
    
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav(); // run once on load


// =========================================================================
// 7. SMOOTH SCROLL for hero CTA buttons
// =========================================================================
document.querySelectorAll(".scroll-link, .navbar-link").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});


// =========================================================================
// 8. TESTIMONIALS MODAL (Traits click-expand)
// =========================================================================
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

function toggleModal() {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

document.querySelectorAll("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]");
    const title = item.querySelector("[data-testimonials-title]");
    const text = item.querySelector("[data-testimonials-text]");
    
    if (modalImg && avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt; }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;
    
    toggleModal();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (overlay) overlay.addEventListener("click", toggleModal);


// =========================================================================
// 9. PORTFOLIO FILTER (All / Web / Applications / UI/UX)
// =========================================================================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

function filterPortfolio(value) {
  filterItems.forEach(item => {
    const cat = item.dataset.category;
    if (value === "all" || cat === value) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

if (select) {
  select.addEventListener("click", () => select.classList.toggle("active"));
}

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const val = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    select && select.classList.remove("active");
    filterPortfolio(val);
  });
});

let lastActiveBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterPortfolio(val);
    if (lastActiveBtn) lastActiveBtn.classList.remove("active");
    btn.classList.add("active");
    lastActiveBtn = btn;
  });
});


// =========================================================================
// 10. CONTACT FORM VALIDATION
// =========================================================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form && form.checkValidity()) {
      formBtn && formBtn.removeAttribute("disabled");
    } else {
      formBtn && formBtn.setAttribute("disabled", "");
    }
  });
});


// =========================================================================
// 11. MOBILE SIDEBAR TOGGLE
// =========================================================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => sidebar.classList.toggle("active"));
}


// =========================================================================
// 12. GSAP FLIP CAROUSEL FOR BLOGS SECTION
// =========================================================================
const blogContainer = document.querySelector(".blog-posts-list");
const blogPrevBtn = document.getElementById("blog-prev");
const blogNextBtn = document.getElementById("blog-next");
let isBlogAnimating = false;

function updateBlogCarousel(forward) {
  if (isBlogAnimating || !blogContainer) return;
  isBlogAnimating = true;

  const cards = gsap.utils.toArray(".blog-post-item", blogContainer);
  const first = cards[0];
  const last = cards[cards.length - 1];

  // Capture current state of the elements
  const state = Flip.getState(cards);

  let clone;
  if (forward) {
    clone = first.cloneNode(true);
    clone.classList.remove("hide");
    clone.removeAttribute("data-flip-id");
    gsap.set(clone, { scale: 0, opacity: 0 });
    blogContainer.appendChild(clone);
    first.classList.add("hide");
  } else {
    clone = last.cloneNode(true);
    clone.classList.remove("hide");
    clone.removeAttribute("data-flip-id");
    gsap.set(clone, { scale: 0, opacity: 0 });
    blogContainer.insertBefore(clone, blogContainer.firstChild);
    last.classList.add("hide");
  }

  // Initialize interactive features on new elements
  initInteractiveCard(clone);

  // Flip transition
  Flip.from(state, {
    targets: ".blog-post-item",
    duration: 0.8,
    ease: "power2.inOut",
    fade: true,
    absoluteOnLeave: true,
    onEnter: (els) => {
      return gsap.to(els, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut"
      });
    },
    onLeave: (els) => {
      gsap.to(els, {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          els.forEach(el => el.remove());
        }
      });
    },
    onComplete: () => {
      isBlogAnimating = false;
    }
  });
}

if (blogPrevBtn && blogNextBtn && blogContainer) {
  blogNextBtn.addEventListener("click", () => updateBlogCarousel(true));
  blogPrevBtn.addEventListener("click", () => updateBlogCarousel(false));
}


// =========================================================================
// 13b. SEND MESSAGE BUTTON — ANIMATED TEXT REPLACEMENT
//      Inspired by https://demos.gsap.com/demo/animate-text-replacement
//      Slides text layers vertically (slot-machine style) on form submit.
// =========================================================================
(function initSendBtnAnimation() {
  const btn        = document.getElementById("send-msg-btn");
  const form       = btn ? btn.closest("form") : null;
  if (!btn || !form) return;

  const layerDefault = btn.querySelector(".btn-text-default");
  const layerSending = btn.querySelector(".btn-text-sending");
  const layerSent    = btn.querySelector(".btn-text-sent");
  const wrapEl       = btn.querySelector(".btn-text-wrap");
  const iconEl       = btn.querySelector("ion-icon");

  // Ease used for the vertical text slides
  const EASE = "power3.inOut";
  const DUR  = 0.45;

  /**
   * Slide layerOut UP and OFF, slide layerIn UP and IN (from below).
   */
  function slideText(layerOut, layerIn) {
    const tl = gsap.timeline();
    tl.to(layerOut, { y: "-110%", duration: DUR, ease: EASE }, 0)
      .fromTo(layerIn,
        { y: "110%" },
        { y: "0%",  duration: DUR, ease: EASE },
        0
      );
    return tl;
  }

  /** Reset all layers to their starting positions */
  function resetLayers() {
    gsap.set(layerDefault, { y: "0%" });
    gsap.set(layerSending, { y: "110%" });
    gsap.set(layerSent,    { y: "110%" });
  }

  // Intercept the form submit to play the animation sequence
  form.addEventListener("submit", function (e) {
    // CRITICAL: prevent page reload so the GSAP animation is visible
    e.preventDefault();

    const masterTl = gsap.timeline();

    // 1) "Send Message" → "Sending…"
    masterTl.add(slideText(layerDefault, layerSending));

    // 2) Subtle icon pulse during sending
    masterTl.to(iconEl, {
      rotation: 15, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1
    }, "<");

    // 3) After a realistic delay, "Sending…" → "✓ Sent!"
    masterTl.add(slideText(layerSending, layerSent), "+=1.6");

    // 4) Add a success class for the colour tint
    masterTl.call(() => btn.classList.add("state-sent"), [], "<");

    // 5) Hold the "Sent!" state, then quietly reset for the next use
    masterTl.call(() => {
      setTimeout(() => {
        btn.classList.remove("state-sent");
        btn.setAttribute("disabled", "");
        form.reset();
        resetLayers();
      }, 3000);
    });
  });
})();


// =========================================================================
// 13. TEXT SCRAMBLING ANIMATION (About Me paragraphs)
//     Custom vanilla JS implementation — no premium plugin required.
// =========================================================================
const SCRAMBLE_CHARS = "01#%@!?-+/\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Scrambles the text of a DOM element, then reveals the real text.
 * @param {HTMLElement} el      - Target element
 * @param {string}      text    - Final text to reveal
 * @param {number}      duration - Total animation duration in ms (default 2800)
 * @param {number}      revealDelay - Fraction [0–1] before reveal starts (default 0.2)
 */
function scrambleTextTo(el, text, duration = 2800, revealDelay = 0.2) {
  const chars = SCRAMBLE_CHARS;
  const totalFrames = Math.round((duration / 1000) * 60);
  const revealStart = Math.floor(totalFrames * revealDelay);
  let frame = 0;
  let rafId;

  el.textContent = "";

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function tick() {
    frame++;
    const progress = Math.max(0, (frame - revealStart) / (totalFrames - revealStart));
    // Ease-out: revealed chars grow faster over time
    const revealed = Math.floor(Math.pow(progress, 0.7) * text.length);

    let display = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        display += " ";
      } else if (i < revealed) {
        display += text[i];
      } else {
        // Scramble density reduces as we near the end
        const density = 1 - progress;
        display += Math.random() < density ? randomChar() : text[i];
      }
    }

    el.textContent = display;

    if (frame < totalFrames || revealed < text.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      el.textContent = text;  // ensure final text is pixel-perfect
    }
  }

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId); // return cancel fn
}

function initTextScramble() {
  const paragraphs = [
    document.getElementById("about-p1"),
    document.getElementById("about-p2")
  ].filter(Boolean);

  if (!paragraphs.length) return;

  // Store original texts before clearing
  const texts = paragraphs.map(p => p.innerText.trim());
  paragraphs.forEach(p => (p.textContent = ""));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const idx = paragraphs.indexOf(el);
      if (idx === -1) return;

      // Stagger: second paragraph starts 400ms after first
      const delay = idx * 400;
      setTimeout(() => scrambleTextTo(el, texts[idx], 3000, 0.15), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.2 });

  paragraphs.forEach(p => observer.observe(p));
}

// Run text scramble setup — handles both DOMContentLoaded and already-loaded states
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTextScramble);
} else {
  initTextScramble();
}


// =========================================================================
// 14. THANK-YOU TEXT — WORD-BY-WORD SLIDE-UP REVEAL
//     Inspired by https://demos.gsap.com/demo/ignore-nested-elements
//     Each word slides up from y:30px + opacity:0 with a staggered delay,
//     respecting nested HTML tags (no inner markup is broken).
// =========================================================================
function initThankyouReveal() {
  const para = document.querySelector(".contact-thankyou .thankyou-text");
  if (!para) return;

  // ── Step 1: Walk child nodes and split TEXT nodes into word spans ──────
  // This is the "ignore nested elements" technique — we only split raw
  // text nodes, so any <strong>, <em>, <a>, etc. stay intact.
  function splitWordsPreserveNested(node) {
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes = [];
    let current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    textNodes.forEach(textNode => {
      const words = textNode.textContent.split(/(\s+)/); // keep spaces
      const frag  = document.createDocumentFragment();

      words.forEach(part => {
        if (/^\s+$/.test(part)) {
          // Pure whitespace — keep as-is so natural wrapping is preserved
          frag.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          // Each word gets: outer clip span + inner transform span
          const clip = document.createElement("span");
          clip.className = "ty-word-clip";

          const inner = document.createElement("span");
          inner.className = "ty-word-inner";
          inner.textContent = part;

          clip.appendChild(inner);
          frag.appendChild(clip);
        }
      });

      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  splitWordsPreserveNested(para);

  // ── Step 2: Animate on scroll-into-view ──────────────────────────────
  const wordInners = para.querySelectorAll(".ty-word-inner");

  // Start all words invisible (below their clip)
  gsap.set(wordInners, { y: "100%", opacity: 0 });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      gsap.to(wordInners, {
        y: "0%",
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: {
          each: 0.045,    // 45ms between each word — feels natural, not robotic
          from: "start"
        }
      });

      revealObserver.unobserve(para);
    });
  }, { threshold: 0.25 });

  revealObserver.observe(para);
}

// Run after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThankyouReveal);
} else {
  initThankyouReveal();
}