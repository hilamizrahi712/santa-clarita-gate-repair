/* Santa Clarita Gate Repair — interactions */
(function () {
  "use strict";

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Lead form ----------
     READY FOR FORMSPREE: when you have your endpoint, set it as the form's
     action attribute in the HTML, e.g.
       <form ... action="https://formspree.io/f/XXXXXXXX" method="POST">
     With an action present, this handler POSTs via fetch (no page reload) and
     shows the success/error panels. With no action (current state), it just
     validates and shows the friendly success message. */
  var form = document.getElementById("leadForm");
  if (form) {
    var success = document.getElementById("formSuccess");
    var errorBox = document.getElementById("formError");
    var submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", function (e) {
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var ok = field.checkValidity();
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        form.querySelector(".is-invalid").focus();
        return;
      }

      e.preventDefault();
      if (errorBox) errorBox.hidden = true;

      var action = form.getAttribute("action");
      var showSuccess = function () {
        form.querySelectorAll("input, select, textarea, button").forEach(function (el) { el.disabled = true; });
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      // No endpoint yet, or no fetch support → friendly local success
      if (!action || !window.fetch) { showSuccess(); return; }

      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) { showSuccess(); }
          else { throw new Error("Bad response"); }
        })
        .catch(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
          if (errorBox) { errorBox.hidden = false; errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
        });
    });

    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("is-invalid") && e.target.checkValidity()) {
        e.target.classList.remove("is-invalid");
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
