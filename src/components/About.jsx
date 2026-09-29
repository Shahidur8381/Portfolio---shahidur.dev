"use client";

import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

/* ──────────────────────────────────────────────
   SVG Icons for capability cards
   ────────────────────────────────────────────── */

const FullStackIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Browser frame */}
    <rect x="6" y="8" width="36" height="28" rx="4" stroke="rgba(0,245,155,0.5)" strokeWidth="1.5" fill="none" />
    <line x1="6" y1="16" x2="42" y2="16" stroke="rgba(0,245,155,0.3)" strokeWidth="1" />
    <circle cx="11" cy="12" r="1.5" fill="rgba(0,245,155,0.4)" />
    <circle cx="16" cy="12" r="1.5" fill="rgba(0,245,155,0.25)" />
    <circle cx="21" cy="12" r="1.5" fill="rgba(0,245,155,0.15)" />
    {/* Code lines */}
    <line x1="12" y1="22" x2="24" y2="22" stroke="rgba(0,245,155,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="26" x2="30" y2="26" stroke="rgba(0,245,155,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="30" x2="20" y2="30" stroke="rgba(0,245,155,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Server below */}
    <rect x="14" y="40" width="20" height="4" rx="2" stroke="rgba(0,245,155,0.35)" strokeWidth="1" fill="none" />
    <line x1="24" y1="36" x2="24" y2="40" stroke="rgba(0,245,155,0.25)" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const AIIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Neural network nodes */}
    <circle cx="12" cy="14" r="3" stroke="rgba(0,245,155,0.45)" strokeWidth="1.2" fill="none" />
    <circle cx="12" cy="34" r="3" stroke="rgba(0,245,155,0.45)" strokeWidth="1.2" fill="none" />
    <circle cx="24" cy="10" r="3" stroke="rgba(0,245,155,0.55)" strokeWidth="1.2" fill="none" />
    <circle cx="24" cy="24" r="4" stroke="rgba(0,245,155,0.7)" strokeWidth="1.5" fill="rgba(0,245,155,0.08)" />
    <circle cx="24" cy="38" r="3" stroke="rgba(0,245,155,0.55)" strokeWidth="1.2" fill="none" />
    <circle cx="36" cy="18" r="3" stroke="rgba(0,245,155,0.45)" strokeWidth="1.2" fill="none" />
    <circle cx="36" cy="32" r="3" stroke="rgba(0,245,155,0.45)" strokeWidth="1.2" fill="none" />
    {/* Connections */}
    <line x1="15" y1="14" x2="21" y2="11" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="15" y1="15" x2="20" y2="23" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="15" y1="33" x2="21" y2="37" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="15" y1="33" x2="20" y2="25" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="27" y1="11" x2="33" y2="17" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="28" y1="24" x2="33" y2="19" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="28" y1="24" x2="33" y2="31" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
    <line x1="27" y1="37" x2="33" y2="33" stroke="rgba(0,245,155,0.2)" strokeWidth="1" />
  </svg>
);

const BlockchainIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central hexagon */}
    <polygon points="24,8 34,14 34,26 24,32 14,26 14,14" stroke="rgba(0,245,155,0.5)" strokeWidth="1.2" fill="rgba(0,245,155,0.05)" />
    {/* Outer nodes */}
    <circle cx="10" cy="38" r="3" stroke="rgba(0,245,155,0.4)" strokeWidth="1" fill="none" />
    <circle cx="38" cy="38" r="3" stroke="rgba(0,245,155,0.4)" strokeWidth="1" fill="none" />
    <circle cx="24" cy="42" r="3" stroke="rgba(0,245,155,0.4)" strokeWidth="1" fill="none" />
    {/* Connections to nodes */}
    <line x1="16" y1="28" x2="11" y2="35" stroke="rgba(0,245,155,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="32" y1="28" x2="37" y2="35" stroke="rgba(0,245,155,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="24" y1="32" x2="24" y2="39" stroke="rgba(0,245,155,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Inner block */}
    <rect x="20" y="16" width="8" height="8" rx="1.5" stroke="rgba(0,245,155,0.35)" strokeWidth="1" fill="none" />
  </svg>
);

import { what_i_built as fallbackWhatIBuilt } from "../data";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { resolveImageUrl } from "../utils/imageUrl";

const iconMap = {
  fullstack: FullStackIcon,
  ai: AIIcon,
  blockchain: BlockchainIcon,
};

/* ──────────────────────────────────────────────
   Capability Card Component
   ────────────────────────────────────────────── */

const CapabilityCard = ({ number, title, description, tech, icon: Icon, isPrimary, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2 + 0.3, 0.8)}
    className={`group relative flex-1 w-full rounded-[24px] p-5 sm:p-7
      bg-white/[0.04] backdrop-blur-[24px] backdrop-saturate-[130%]
      border border-white/[0.08]
      shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/[0.14]
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(0,245,155,0.06)]
      transition-all duration-300 ease-out cursor-default
      ${isPrimary ? "border-[#10b981]/15" : ""}
    `}
  >
    {/* Subtle inner highlight */}
    <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-full" />

    {/* Number */}
    <span className="text-[#00f59b]/60 text-xs font-mono tracking-widest mb-4 sm:mb-5 block">
      {number}
    </span>

    {/* Icon */}
    <div className="mb-4 sm:mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-y-[-2px] transition-transform">
      <Icon />
    </div>

    {/* Title */}
    <h3 className="text-white text-base sm:text-lg font-bold tracking-wide mb-2 sm:mb-3 leading-snug">
      {title}
    </h3>

    {/* Description */}
    <p className="text-[#8b9bb4] text-[12.5px] sm:text-[13px] leading-relaxed mb-4 sm:mb-5">
      {description}
    </p>

    {/* Tech line */}
    <p className="text-[#5a6b7f] text-[10.5px] sm:text-[11px] font-medium tracking-wider uppercase group-hover:text-[#6b7f94] transition-colors duration-300">
      {tech}
    </p>

    {/* Primary card accent */}
    {isPrimary && (
      <div className="absolute -bottom-[1px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00f59b]/30 to-transparent" />
    )}
  </motion.div>
);

/* ──────────────────────────────────────────────
   About Section
   ────────────────────────────────────────────── */

const About = () => {
  const { personal, what_i_built: apiWhatIBuilt } = usePortfolioData();
  const rawCaps = (apiWhatIBuilt && apiWhatIBuilt.length > 0 ? apiWhatIBuilt : fallbackWhatIBuilt)
    .filter((cap) => cap.showOnHomepage !== false);

  const capabilities = rawCaps.map((cap) => ({
    ...cap,
    icon: iconMap[cap.iconType] || FullStackIcon,
  }));

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-14">

      {/* ── LEFT COLUMN: Content ── */}
      <div className="flex-1 w-full lg:w-[64%]">

        {/* Eyebrow */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={`${styles.sectionHeadText} mt-1`}>
            What I Build<span className="text-[#00f59b]">.</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("", "", 0.15, 1)}
          className="mt-4 sm:mt-5 text-[#8b9bb4] text-sm sm:text-base md:text-[17px] max-w-2xl leading-[1.8]"
        >
          {personal?.aboutIntro}
        </motion.p>

        {/* Capability Cards: Stack on mobile/tablet, 3 columns on desktop */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {capabilities.map((cap, index) => (
            <CapabilityCard key={cap.number} index={index} {...cap} />
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN: Portrait ── */}
      <motion.div
        variants={fadeIn("left", "spring", 0.5, 1)}
        className="w-full lg:w-[36%] flex justify-center lg:justify-end mt-4 lg:mt-0"
      >
        <div className="relative group w-[260px] xs:w-[280px] sm:w-[320px] lg:w-full max-w-full lg:max-w-[420px] aspect-[896/1200]">
          {/* Ambient glow behind portrait */}
          <div className="absolute -inset-2 sm:-inset-6 rounded-[32px] bg-gradient-to-br from-[#00f59b]/8 via-transparent to-[#10b981]/5 blur-xl sm:blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Portrait container */}
          <div
            className="relative w-full h-full rounded-[28px] overflow-hidden
              bg-white/[0.03] backdrop-blur-xl
              border border-white/[0.08]
              shadow-[0_16px_48px_rgba(0,0,0,0.5)]
              group-hover:border-white/[0.12] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              transition-all duration-500"
          >
            {/* Inner top highlight */}
            <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent z-10" />

            <img
              src={resolveImageUrl(personal?.portrait) || "/images/portrait.jpg"}
              alt={`${personal?.name || "Shahidur Rahman"} — Full-Stack Developer & Product Engineer`}
              className="w-full h-full object-cover object-center opacity-95 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
              onError={(e) => {
                // If photo doesn't exist or fails to load, fallback to local portrait
                if (!e.target.src.includes("/images/portrait.jpg")) {
                  e.target.src = "/images/portrait.jpg";
                  return;
                }
                // If even fallback doesn't exist, show elegant placeholder
                e.target.style.display = "none";
                e.target.parentElement.classList.add("flex", "items-center", "justify-center");
                const placeholder = document.createElement("div");
                placeholder.className = "text-center px-6";
                placeholder.innerHTML = `
                  <div class="text-[#00f59b]/40 text-6xl font-black mb-3">SR</div>
                  <p class="text-[#5a6b7f] text-xs tracking-wider uppercase">Portrait</p>
                `;
                e.target.parentElement.appendChild(placeholder);
              }}
            />

            {/* Subtle glass reflection & subtle bottom shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-[#050907]/40 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(About, "about");
