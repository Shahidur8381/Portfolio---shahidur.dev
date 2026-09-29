"use client";

import React, { useMemo } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { getSocialIcon } from "../utils/socialIcons";

const Footer = () => {
  const { socialLinks, personal } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  // Filter only active social links configured to display in footer
  const footerSocials = useMemo(() => {
    return (socialLinks || [])
      .filter((item) => {
        const isActive = item.isActive !== false && item.is_active !== false;
        const displayInFooter = Boolean(
          item.displayInFooter ?? item.display_in_footer
        );
        return isActive && displayInFooter;
      })
      .sort(
        (a, b) =>
          (a.sortOrder ?? a.sort_order ?? 0) - (b.sortOrder ?? b.sort_order ?? 0)
      );
  }, [socialLinks]);

  return (
    <footer
      className="relative z-10 w-full bg-primary py-5"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center gap-4">

        {/* Dynamic Social Icons Row */}
        {footerSocials.length > 0 && (
          <nav
            aria-label="Footer social links"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {footerSocials.map((social) => {
              const IconComponent = getSocialIcon(social.icon || social.platform);
              const label = social.label || social.platform || "Social Profile";
              const isEmail = social.url?.startsWith("mailto:");

              return (
                <a
                  key={social.id || social.platform || social.url}
                  href={social.url}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-secondary hover:text-tech-mint transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <span className="text-[17px]">
                    <IconComponent />
                  </span>
                  <span className="sr-only">{label}</span>
                </a>
              );
            })}
          </nav>
        )}

        {/* Minimal Copyright */}
        <p className="text-[11px] text-secondary/50 font-mono tracking-wide">
          &copy; {currentYear}{" "}
          {personal?.name || "Shahidur Rahman"}
        </p>

      </div>
    </footer>
  );
};

export default Footer;

