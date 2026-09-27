/**
 * Sanullah Feroz — Portfolio
 * Vanilla JS only. No frameworks, no build step.
 */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------------ */
  const yearEl = $("#footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     Navbar: scroll style, mobile menu, active link
     ------------------------------------------------------------------------ */
  const header = $("#header");
  const navToggle = $("#nav-toggle");
  const navMenu = $("#nav-menu");
  const navLinks = $$(".nav__link");

  const updateHeaderOnScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMobileMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  };

  const openMobileMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });

    // Reset menu state when leaving the mobile breakpoint
    const desktopQuery = window.matchMedia("(min-width: 900px)");
    (desktopQuery.addEventListener
      ? desktopQuery.addEventListener.bind(desktopQuery, "change")
      : desktopQuery.addListener.bind(desktopQuery))((e) => {
      if (e.matches) closeMobileMenu();
    });
  }

  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  /* Active nav link via IntersectionObserver scroll-spy */
  const sections = $$("main section[id]");

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((sec) => spy.observe(sec));
  }

  /* ------------------------------------------------------------------------
     Typing / rotating text effect
     ------------------------------------------------------------------------ */
  const typingEl = $("#typing-text");
  const phrases = [
    "Full-Stack Applications",
    "AI Agents & Agentic AI",
    "AI Workflow Automation",
    "REST APIs & Backends",
    "Database-Driven Apps",
    "AI Chatbots & Smart Assistants",
  ];

  const startTyping = () => {
    if (!typingEl) return;
    if (prefersReducedMotion) {
      typingEl.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeSpeed = 65;
    const deleteSpeed = 35;
    const pauseEnd = 1700;
    const pauseStart = 420;

    const tick = () => {
      const current = phrases[phraseIndex];

      if (!deleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, pauseEnd);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, pauseStart);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    };

    tick();
  };

  startTyping();

  /* ------------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------------ */
  const revealEls = $$(".reveal");
  const timelineItems = $$(".timeline__item");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    timelineItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.35 }
    );
    timelineItems.forEach((el) => timelineObserver.observe(el));

    // Safety net: never leave content hidden if observers don't fire
    // (e.g. background tab, layout quirks). Reveal everything after a delay.
    window.setTimeout(() => {
      [...revealEls, ...timelineItems].forEach((el) => el.classList.add("is-visible"));
    }, 2500);
  }

  /* ------------------------------------------------------------------------
     Project filters
     ------------------------------------------------------------------------ */
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project-card");
  const projectsEmpty = $("#projects-empty");

  const applyFilter = (filter) => {
    let visible = 0;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    if (projectsEmpty) projectsEmpty.hidden = visible !== 0;
  };

  filterBtns.forEach((btn) => {
    btn.setAttribute(
      "aria-pressed",
      btn.classList.contains("active") ? "true" : "false"
    );

    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.dataset.filter || "all");
    });
  });

  /* ------------------------------------------------------------------------
     Back to top
     ------------------------------------------------------------------------ */
  const backToTop = $("#back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ------------------------------------------------------------------------
     Contact form validation (demo success — no real email send)
     ------------------------------------------------------------------------ */
  const form = $("#contact-form");
  const submitBtn = $("#form-submit");
  const formSuccess = $("#form-success");
  const fields = ["fullName", "email", "subject", "message"];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setError = (id, message) => {
    const input = $(`#${id}`);
    const errorEl = $(`#${id}-error`);
    if (input) input.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  };

  const clearError = (id) => {
    const input = $(`#${id}`);
    const errorEl = $(`#${id}-error`);
    if (input) input.classList.remove("is-invalid");
    if (errorEl) errorEl.textContent = "";
  };

  const validate = () => {
    fields.forEach(clearError);
    if (formSuccess) formSuccess.hidden = true;
    let valid = true;

    const val = (id) => ($(`#${id}`)?.value || "").trim();
    const name = val("fullName");
    const email = val("email");
    const subject = val("subject");
    const message = val("message");

    if (!name) {
      setError("fullName", "Please enter your full name.");
      valid = false;
    } else if (name.length < 2) {
      setError("fullName", "Name must be at least 2 characters.");
      valid = false;
    }

    if (!email) {
      setError("email", "Please enter your email.");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    }

    if (!subject) {
      setError("subject", "Please enter a subject.");
      valid = false;
    }

    if (!message) {
      setError("message", "Please enter a message.");
      valid = false;
    } else if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    }

    return valid;
  };

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstInvalid = form.querySelector(".is-invalid");
        firstInvalid?.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add("is-loading");
        submitBtn.disabled = true;
      }

      // Simulated latency for loading UX. Swap for EmailJS / a backend later.
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (submitBtn) {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
      }

      if (formSuccess) formSuccess.hidden = false;
      form.reset();
      formSuccess?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });

    fields.forEach((id) => {
      $(`#${id}`)?.addEventListener("input", () => clearError(id));
    });
  }
})();
