"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { personal as fallbackPersonal } from "../data";
import { usePersonal } from "../hooks/usePersonal";

const ROLES = fallbackPersonal?.roles || [
  "An Engineer",
  "A Developer",
  "A Designer",
  "A Teacher",
  "A Tech Innovator",
];

const Hero = ({ onIntroComplete, websiteReady }) => {
  const { personal } = usePersonal();
  const currentRoles = personal?.roles?.length ? personal.roles : ROLES;

  // Intro Phases: "salam" | "clear_salam" | "typing_name" | "docked"
  const [phase, setPhase] = useState(() => {
    if (typeof window !== "undefined" && (sessionStorage.getItem("portfolio_intro_seen") === "true" || websiteReady)) {
      return "docked";
    }
    return "salam";
  });
  const [salamText, setSalamText] = useState("");
  const [showSalamSub, setShowSalamSub] = useState(false);
  const [nameText, setNameText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  // If already seen in this session, immediately notify parent that intro is complete
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("portfolio_intro_seen") === "true") {
      if (phase !== "docked") setPhase("docked");
      if (onIntroComplete && !websiteReady) {
        onIntroComplete();
      }
    }
  }, [onIntroComplete, websiteReady, phase]);

  // =========================================================
  // 1. INTRO TIMELINE SEQUENCE
  // =========================================================
  useEffect(() => {
    if (phase === "docked") return;
    let timer;

    // STEP 1: Type Salam in center
    if (phase === "salam") {
      const fullSalam = personal?.salam || "Assalamu Alaikum";
      if (salamText.length < fullSalam.length) {
        timer = setTimeout(() => {
          setSalamText(fullSalam.slice(0, salamText.length + 1));
        }, 50);
      } else {
        // Salam finished -> show "(peace be upon you)"
        setShowSalamSub(true);
        // Brief pause so visitor reads it
        timer = setTimeout(() => {
          setPhase("clear_salam");
        }, 800);
      }
    }

    // STEP 2: Clear Salam
    else if (phase === "clear_salam") {
      setShowSalamSub(false);
      timer = setTimeout(() => {
        setPhase("typing_name");
      }, 300);
    }

    // STEP 3: Type "I'm Shahidur Rahman" in DEAD CENTER in large font
    else if (phase === "typing_name") {
      const fullName = `I'm ${personal?.name || "Shahidur Rahman"}`;
      if (nameText.length < fullName.length) {
        timer = setTimeout(() => {
          setNameText(fullName.slice(0, nameText.length + 1));
        }, 45);
      } else {
        // Name finished -> pause 850ms, then smoothly glide up & shrink to hero section!
        timer = setTimeout(() => {
          setPhase("docked");
          if (typeof window !== "undefined") {
            sessionStorage.setItem("portfolio_intro_seen", "true");
          }
          if (onIntroComplete) {
            onIntroComplete();
          }
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, salamText, nameText, onIntroComplete, personal]);

  // Click anywhere to fast-forward into docked website view
  const handleSkip = () => {
    if (phase !== "docked") {
      setPhase("docked");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio_intro_seen", "true");
      }
      if (onIntroComplete) {
        onIntroComplete();
      }
    }
  };

  // =========================================================
  // 2. CYCLING ROLE TYPEWRITER (Starts after docked & website ready)
  // =========================================================
  useEffect(() => {
    if (phase !== "docked" || !websiteReady) return;

    const currentFullRole = currentRoles[roleIndex] || "A Developer";
    let roleTimer;

    if (!isDeletingRole) {
      if (roleText.length < currentFullRole.length) {
        roleTimer = setTimeout(() => {
          setRoleText(currentFullRole.slice(0, roleText.length + 1));
        }, 75);
      } else {
        roleTimer = setTimeout(() => {
          setIsDeletingRole(true);
        }, 1800);
      }
    } else {
      if (roleText.length > 0) {
        roleTimer = setTimeout(() => {
          setRoleText(roleText.slice(0, -1));
        }, 40);
      } else {
        setIsDeletingRole(false);
        setRoleIndex((prev) => (prev + 1) % currentRoles.length);
      }
    }

    return () => clearTimeout(roleTimer);
  }, [phase, websiteReady, roleText, isDeletingRole, roleIndex, currentRoles]);

  const isDocked = phase === "docked";

  return (
    <section
      className='relative w-full h-screen mx-auto overflow-hidden'
      onClick={handleSkip}
    >
      {/* Professional top-down gradient overlay: clean at top, blends into bg at bottom */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#050907] via-[#050907]/70 to-transparent pointer-events-none z-[1]' />

      {/* =========================================================
          PHASE 1 (Salam) & PHASE 2 (Clear Salam)
          ========================================================= */}
      <AnimatePresence>
        {(phase === "salam" || phase === "clear_salam") && (
          <motion.div
            key='salam-intro-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -25, filter: "blur(8px)", transition: { duration: 0.45 } }}
            className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a08] px-6 cursor-pointer pointer-events-auto'
          >
            <div className='flex flex-col items-center text-center'>
              <div
                role="heading"
                aria-level={2}
                className='text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-white'
              >
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] via-[#10b981] to-[#34d399] drop-shadow-[0_0_35px_rgba(0,245,155,0.45)]'>
                  {salamText}
                </span>
                <span className='text-[#00f59b] ml-0.5' style={{ fontWeight: 100, animation: 'blink 0.6s step-end infinite' }}>|</span>
              </div>

              {showSalamSub && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className='text-sm xs:text-base sm:text-2xl md:text-3xl text-[#a7f3d0] font-medium tracking-widest mt-4 sm:mt-5 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                >
                  (peace be upon you)
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          HERO NAME CONTAINER:
          Centered in viewport during typing, then smoothly glides
          to docked hero position and scales to hero size!
          ========================================================= */}
      <div
        className={`absolute inset-x-0 ${
          isDocked ? "top-[80px] xs:top-[90px] sm:top-[105px]" : "top-1/2 -translate-y-1/2"
        } max-w-7xl mx-auto ${styles.paddingX} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none`}
      >
        <div
          className={`flex flex-row items-start ${
            isDocked ? "justify-start lg:w-1/2 w-full" : "justify-center w-full"
          } gap-5 transition-all duration-1000`}
        >
          {/* Heading and Content */}
          <div className={`flex flex-col ${isDocked ? "text-left items-start" : "text-center items-center"}`}>
            
            {/* Pre-heading */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isDocked ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#00f59b] font-mono text-[11px] xs:text-xs sm:text-sm md:text-base mb-1 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,245,155,0.5)]"
            >
              I build. I break. I rebuild.
            </motion.p>

            {/* Main Name Heading */}
            <h1
              className={`font-black tracking-wide transition-all duration-1000 ${
                isDocked
                  ? "lg:text-[64px] sm:text-[48px] xs:text-[36px] text-[24px] min-[360px]:text-[27px] lg:leading-[72px] sm:leading-[54px] xs:leading-[44px] leading-[32px]"
                  : "text-2xl min-[360px]:text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-white text-center"
              }`}
            >
              {isDocked ? (
                <>
                  <span className='block text-base sm:text-xl md:text-2xl text-[#94a3b8] font-medium tracking-normal mb-0.5 sm:mb-1 whitespace-nowrap'>
                    Hi, I'm
                  </span>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] via-[#10b981] to-[#34d399] drop-shadow-[0_0_25px_rgba(0,245,155,0.4)] whitespace-nowrap inline-block'>
                    {personal?.name || "Shahidur Rahman"}
                  </span>
                </>
              ) : (
                <>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] via-[#10b981] to-[#34d399] drop-shadow-[0_0_35px_rgba(0,245,155,0.5)] whitespace-nowrap inline-block'>
                    {nameText}
                  </span>
                  <span className='text-[#00f59b] ml-0.5' style={{ fontWeight: 100, animation: 'blink 0.6s step-end infinite' }}>|</span>
                </>
              )}
            </h1>

            {/* Cycling Animated Subtitle Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                isDocked
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.6, delay: 0.45 }}
              className='mt-1 min-h-[28px] sm:min-h-[40px] flex items-center'
            >
              <p className='text-base xs:text-lg sm:text-xl md:text-2xl text-white font-medium tracking-wide'>
                I am{" "}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] to-[#34d399] drop-shadow-[0_0_14px_rgba(0,245,155,0.6)] font-bold'>
                  {roleText}
                </span>
                <span className='text-[#00f59b] ml-0.5' style={{ fontWeight: 100, animation: 'blink 0.6s step-end infinite' }}>|</span>
              </p>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isDocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className={`${styles.heroSubText} mt-2 text-[#94a3b8] max-w-xl text-xs sm:text-base leading-relaxed`}
            >
              I don't just build websites, I build products.
            </motion.p>

            {/* CTA Buttons - Hiring Friendly */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isDocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto"
            >
              <a
                href="#projects"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-[#00f59b]/40 text-[#00f59b] font-semibold text-xs sm:text-sm hover:bg-[#00f59b]/10 hover:border-[#00f59b]/70 hover:shadow-[0_0_20px_rgba(0,245,155,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 min-h-[42px] flex items-center justify-center"
              >
                Explore My Work
              </a>
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/20 text-[#e2e8f0] font-semibold text-xs sm:text-sm hover:border-[#00f59b]/60 hover:text-white hover:bg-white/[0.04] hover:shadow-[0_0_15px_rgba(0,245,155,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 min-h-[42px]"
              >
                <span>View Resume</span>
                <span className="text-[#00f59b] font-bold text-sm">↗</span>
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Ambient Background Orbs */}
      <div className={`transition-opacity duration-1000 ${websiteReady ? "opacity-100" : "opacity-0"}`}>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-noise" />
      </div>

      {/* =========================================================
          3D COMPUTERS CANVAS (Only revealed when website is ready)
          Positioned lower so it NEVER conflicts or overlaps with text
          ========================================================= */}
      <div
        className={`w-full h-full transition-opacity duration-1000 ${
          websiteReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ComputersCanvas />
      </div>

      {/* Scroll Down Indicator (Only revealed when website is ready) */}
      <div
        className={`absolute xs:bottom-8 bottom-14 w-full flex justify-center items-center z-20 pointer-events-auto transition-opacity duration-1000 ${
          websiteReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <a href='#about' aria-label="Scroll to About section">
          <div className='w-[32px] sm:w-[35px] h-[56px] sm:h-[64px] rounded-3xl border-2 border-[#00f59b]/50 shadow-[0_0_20px_rgba(0,245,155,0.25)] backdrop-blur-sm bg-[#070a08]/40 flex justify-center items-start p-1.5 sm:p-2 hover:border-[#00f59b] transition-colors'>
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#00f59b] shadow-[0_0_10px_#00f59b] mb-1'
            />
          </div>
        </a>
      </div>

      {/* Gradient blend from hero into overview section */}
      <div className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#050907] pointer-events-none z-10' />
    </section>

  );
};

export default Hero;
