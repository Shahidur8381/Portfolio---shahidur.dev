"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  About,
  Feedbacks,
  Navbar,
  Works,
  SocialIcons,
  CustomCursor,
  Footer,
} from "../src/components";

const Hero = dynamic(() => import("../src/components/Hero"), {
  ssr: false,
});

const Education = dynamic(() => import("../src/components/Education"), {
  ssr: false,
});

const Experience = dynamic(() => import("../src/components/Experience"), {
  ssr: false,
});

const SpaceBackground = dynamic(
  () => import("../src/components/SpaceBackground"),
  { ssr: false }
);

const TechStack = dynamic(
  () => import("../src/components/TechStack"),
  { ssr: false }
);

const Contact = dynamic(() => import("../src/components/Contact"), { ssr: false });
const StarsCanvas = dynamic(() => import("../src/components/canvas").then(mod => mod.StarsCanvas), { ssr: false });

export default function Home() {
  // SSR-safe: always false on server. Becomes true either after intro OR immediately if returning.
  const [websiteReady, setWebsiteReady] = useState(false);
  // Tracks whether this is a return visit (read only once client-side after mount)
  const isReturnVisitRef = useRef(false);

  // 1. On mount: check session, restore scroll, skip intro if returning
  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadySeen = sessionStorage.getItem("portfolio_intro_seen") === "true";
    isReturnVisitRef.current = alreadySeen;

    if (alreadySeen) {
      // Skip intro immediately — no opacity flash, no hiding
      setWebsiteReady(true);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }

      // Restore to hash anchor or last scroll position
      if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
          try {
            const target = document.querySelector(hash);
            if (target) {
              if (window.__lenis) {
                window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
              } else {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }
          } catch (e) {
            console.warn("Invalid hash selector:", e);
          }
        }, 120);
      } else {
        const savedScroll = sessionStorage.getItem("portfolio_scroll_pos");
        if (savedScroll) {
          const y = parseInt(savedScroll, 10);
          if (!isNaN(y) && y > 0) {
            setTimeout(() => {
              try {
                if (window.__lenis) {
                  window.__lenis.scrollTo(y, { immediate: true });
                } else {
                  window.scrollTo({ top: y, behavior: "instant" });
                }
              } catch (e) {
                console.warn("Scroll restore failed:", e);
              }
            }, 50);
          }
        }
      }
    } else {
      // First visit: lock scroll for intro sequence
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  // 2. Track scroll position continuously when website is ready
  useEffect(() => {
    if (typeof window === "undefined" || !websiteReady) return;
    const handleScroll = () => {
      if (window.scrollY > 0) {
        sessionStorage.setItem("portfolio_scroll_pos", window.scrollY.toString());
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [websiteReady]);

  // 3. Lock/unlock body scroll — only lock during actual fresh intro
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!websiteReady && !isReturnVisitRef.current) {
      document.body.style.overflow = "hidden";
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = "auto";
      if (window.__lenis) window.__lenis.start();
    }
  }, [websiteReady]);

  return (
    <div className='relative z-0 bg-[#070a08] min-h-screen selection:bg-[#00f59b] selection:text-black overflow-x-hidden w-full'>
      <CustomCursor />

      {/* Navbar / background: fade in after intro on first visit, instant on return */}
      <div
        suppressHydrationWarning
        className={`transition-opacity duration-700 ${
          websiteReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <SpaceBackground />
        <SocialIcons />
        <Navbar />
      </div>

      {/* Hero: manages the intro sequence on first visit, docks immediately on return */}
      <Hero
        websiteReady={websiteReady}
        onIntroComplete={() => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("portfolio_intro_seen", "true");
          }
          setWebsiteReady(true);
        }}
      />

      {/*
        Content sections:
        - First visit: hidden (opacity-0) while intro plays, then fade in
        - Return visit: websiteReady is set synchronously before first repaint → never hidden
      */}
      <div
        suppressHydrationWarning
        className={`transition-opacity duration-700 ${
          websiteReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <About />
        <Education />
        <Experience />
        <TechStack />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>
    </div>
  );
}
