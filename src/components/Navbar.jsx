"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a08]/85 backdrop-blur-xl border-b border-[#10b981]/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-full mx-auto relative'>
        
        {/* LEFT: Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 group z-10'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-white text-[22px] font-bold cursor-pointer flex items-center tracking-wider'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] to-[#10b981] drop-shadow-[0_0_12px_rgba(0,245,155,0.4)]'>
              shahidur
            </span>
            <span className='text-[#94a3b8] font-light'>.dev</span>
          </p>
        </Link>

        {/* MIDDLE: Email Button (Centered) */}
        <div className='absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-10'>
          <a 
            href="mailto:hello@shahidur.dev" 
            className="text-[14px] font-medium text-[#94a3b8] hover:text-[#00f59b] transition-all duration-300 flex items-center gap-2 hover:drop-shadow-[0_0_10px_rgba(0,245,155,0.6)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello@shahidur.dev
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

          {/* Mobile Menu Toggle */}
          <div className='md:hidden flex flex-1 justify-end items-center'>
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-[#0b140f]/95 backdrop-blur-2xl border border-[#10b981]/30 shadow-[0_0_30px_rgba(0,245,155,0.15)] absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-2xl`}
            >
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[14px] uppercase tracking-wider ${
                      active === nav.title
                        ? "text-[#00f59b] drop-shadow-[0_0_8px_rgba(0,245,155,0.8)] font-semibold"
                        : "text-[#94a3b8]"
                    } hover:text-[#00f59b] transition-colors`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
