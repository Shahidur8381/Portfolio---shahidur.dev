"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle]);

  return (
    <nav
      ref={navRef}
      className={`${
        styles.paddingX
      } w-full flex items-center py-3.5 sm:py-5 fixed top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a08]/85 backdrop-blur-xl border-b border-[#10b981]/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "max-md:bg-[#070a08]/80 max-md:backdrop-blur-xl max-md:border-b max-md:border-[#10b981]/20 max-md:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(0,245,155,0.06)] bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-full mx-auto relative'>
        
        {/* LEFT: Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 group z-10 shrink-0'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-white text-[17px] xs:text-[19px] sm:text-[22px] font-bold cursor-pointer flex items-center tracking-wider whitespace-nowrap'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] to-[#10b981] drop-shadow-[0_0_12px_rgba(0,245,155,0.4)]'>
              shahidur
            </span>
            <span className='text-[#94a3b8] font-light'>.dev</span>
          </p>
        </Link>

        {/* MIDDLE: Email Button (Centered on Desktop Only) */}
        <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10 pointer-events-auto'>
          <a 
            href="mailto:hello@shahidur.dev" 
            className="text-[13px] lg:text-[14px] font-medium text-[#94a3b8] hover:text-[#00f59b] transition-all duration-300 flex items-center gap-2 hover:drop-shadow-[0_0_10px_rgba(0,245,155,0.6)] whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors duration-300 text-[#00f59b]/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="tracking-normal">hello@shahidur.dev</span>
          </a>
        </div>

        {/* RIGHT: Navigation Options */}
        <div className="flex items-center gap-4 z-10">
          <ul className='list-none hidden md:flex flex-row gap-8'>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title
                    ? "text-[#00f59b] drop-shadow-[0_0_10px_rgba(0,245,155,0.6)] font-bold"
                    : "text-[#94a3b8]"
                } hover:text-[#00f59b] text-[13px] uppercase tracking-widest font-medium cursor-pointer transition-colors duration-300`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* Mobile Right Container (Email + Hamburger Menu Toggle) */}
          <div className='md:hidden flex items-center gap-2 relative'>
            {/* Mobile Email Button: Positioned next to hamburger button, hidden when hamburger is open */}
            {!toggle && (
              <a 
                href="mailto:hello@shahidur.dev" 
                className="text-[11px] xs:text-[12px] font-medium text-[#94a3b8] hover:text-[#00f59b] transition-all duration-300 flex items-center gap-1.5 hover:drop-shadow-[0_0_10px_rgba(0,245,155,0.6)] whitespace-nowrap px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-[#10b981]/20 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-colors duration-300 text-[#00f59b]/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="tracking-tight">hello@shahidur.dev</span>
              </a>
            )}

            {/* Hamburger Button (Glassmorphism Pill) */}
            <button
              type='button'
              aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={toggle}
              className='w-10 h-10 rounded-xl bg-white/[0.04] backdrop-blur-md border border-[#10b981]/30 flex items-center justify-center text-white hover:border-[#00f59b] hover:shadow-[0_0_15px_rgba(0,245,155,0.3)] active:scale-95 transition-all duration-200 cursor-pointer shrink-0'
              onClick={() => setToggle(!toggle)}
            >
              <img
                src={toggle ? close : menu}
                alt='menu'
                className='w-[20px] h-[20px] object-contain'
              />
            </button>

            {/* Mobile Glassmorphic Dropdown */}
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } flex-col p-5 bg-[#070d09]/95 backdrop-blur-2xl border border-[#10b981]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,245,155,0.15)] absolute top-14 right-0 min-w-[220px] max-w-[calc(100vw-32px)] z-50 rounded-2xl transition-all duration-300`}
            >
              {/* Subtle top edge glow */}
              <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f59b]/40 to-transparent rounded-full pointer-events-none" />

              <ul className='list-none flex flex-col gap-1 w-full'>
                {navLinks.map((nav) => {
                  const isActive = active === nav.title;
                  return (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[13px] uppercase tracking-wider rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-[#00f59b] bg-[#00f59b]/10 font-semibold"
                          : "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                    >
                      <a 
                        href={`#${nav.id}`} 
                        className="flex items-center justify-between w-full py-2.5 px-3 min-h-[44px]"
                      >
                        <span>{nav.title}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] shadow-[0_0_8px_#00f59b]" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile Quick Action inside drawer: Email only (Resume removed per requirement) */}
              <div className="mt-3 pt-3 border-t border-[#10b981]/20 flex flex-col gap-2">
                <a
                  href="mailto:hello@shahidur.dev"
                  onClick={() => setToggle(false)}
                  className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/[0.03] text-xs text-[#a7f3d0] hover:bg-[#00f59b]/10 hover:text-[#00f59b] transition-colors min-h-[40px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#00f59b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">hello@shahidur.dev</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
