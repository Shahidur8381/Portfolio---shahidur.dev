"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // On mobile and touch screens, use pure native hardware scrolling.
    // Virtual touch scroll hijacking causes scroll freezing and gesture conflicts on phones.
    const isTouch =
      "ontouchstart" in window ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) ||
      window.innerWidth < 768;

    if (isTouch) {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      return;
    }

    // Initialize Lenis with tuned momentum physics for desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    window.__lenis = lenis;

    // RAF loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor click handler for buttery smooth in-page navigation
    const handleAnchorClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Handle pure hashes ("#about") or root hashes ("/#about")
      let targetId = null;
      if (href.startsWith("#") && href.length > 1) {
        targetId = href;
      } else if (
        href.startsWith("/#") &&
        (window.location.pathname === "/" || window.location.pathname === "")
      ) {
        targetId = href.replace("/", "");
      }

      if (targetId) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: -30,
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          // Update URL hash without abrupt jump
          if (window.history.pushState) {
            window.history.pushState(null, "", targetId);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Handle dynamic DOM resize changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
