"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { getSocialIcon } from "../utils/socialIcons";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  const containerRef = useRef(null);
  const { socialLinks } = usePortfolioData();

  // Filter only active social links configured to display in the contact box
  const contactSocials = useMemo(() => {
    return (socialLinks || [])
      .filter((item) => {
        const isActive = item.isActive !== false && item.is_active !== false;
        const displayInContact = Boolean(
          item.displayInContact ?? item.display_in_contact
        );
        return isActive && displayInContact;
      })
      .sort(
        (a, b) =>
          (a.sortOrder ?? a.sort_order ?? 0) - (b.sortOrder ?? b.sort_order ?? 0)
      );
  }, [socialLinks]);

  // Magnetic hover tracking effect on contact icons
  useEffect(() => {
    const social = containerRef.current || document.getElementById("social");
    if (!social) return;

    const items = social.querySelectorAll("span");
    const cleanupFns = [];

    items.forEach((item) => {
      const elem = item;
      const link = elem.querySelector("a");
      if (!link) return;

      let rect = elem.getBoundingClientRect();
      let targetX = rect.width / 2;
      let targetY = rect.height / 2;
      let currentX = targetX;
      let currentY = targetY;
      let isHovering = false;
      let animFrameId = null;

      const updatePosition = () => {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        // Keep loop running when moving or returning to center
        if (
          isHovering ||
          Math.abs(targetX - currentX) > 0.05 ||
          Math.abs(targetY - currentY) > 0.05
        ) {
          animFrameId = requestAnimationFrame(updatePosition);
        } else {
          currentX = targetX;
          currentY = targetY;
          link.style.setProperty("--siLeft", `${currentX}px`);
          link.style.setProperty("--siTop", `${currentY}px`);
          animFrameId = null;
        }
      };

      const startAnimation = () => {
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(updatePosition);
        }
      };

      const onMouseMove = (e) => {
        rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const attractionRadius = 55;

        if (dist < attractionRadius) {
          isHovering = true;
          // Smooth magnetic pull tracking cursor within bounds
          targetX = rect.width / 2 + (e.clientX - centerX) * 0.55;
          targetY = rect.height / 2 + (e.clientY - centerY) * 0.55;
          startAnimation();
        } else if (isHovering) {
          // Mouse left the attraction zone -> smoothly return to center
          isHovering = false;
          targetX = rect.width / 2;
          targetY = rect.height / 2;
          startAnimation();
        }
      };

      const onMouseLeave = () => {
        isHovering = false;
        targetX = rect.width / 2;
        targetY = rect.height / 2;
        startAnimation();
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      elem.addEventListener("mouseleave", onMouseLeave);

      // Initial center alignment
      link.style.setProperty("--siLeft", `${targetX}px`);
      link.style.setProperty("--siTop", `${targetY}px`);

      cleanupFns.push(() => {
        window.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
        }
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [contactSocials]);

  return (
    <div className="icons-section" aria-label="Social and action links">
      {/* Left Side: Magnetic Social Icons Column (filtered by displayInContact) */}
      {contactSocials.length > 0 && (
        <div
          className="social-icons"
          data-cursor="icons"
          id="social"
          ref={containerRef}
        >
          {contactSocials.map((social) => {
            const IconComponent = getSocialIcon(social.icon || social.platform);
            const label = social.label || social.platform || "Social Link";
            const isEmail = social.url?.startsWith("mailto:");

            return (
              <span key={social.id || social.platform || social.url}>
                <a
                  href={social.url}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                >
                  <IconComponent />
                </a>
              </span>
            );
          })}
        </div>
      )}

      {/* Right Side: Floating Action Button with Animated Flip-Text */}
      <a
        className="resume-button"
        href="/resume"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View or Download Resume"
      >
        <HoverLinks text="RESUME" />
        <span className="resume-icon">
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
