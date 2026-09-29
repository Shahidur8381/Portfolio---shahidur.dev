import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaEnvelope,
  FaGlobe,
  FaLink,
} from "react-icons/fa6";
import {
  SiLeetcode,
  SiCodeforces,
  SiKaggle,
  SiMedium,
  SiStackoverflow,
} from "react-icons/si";

/**
 * Centralized mapping of platform/icon identifiers to React-Icons components.
 * Case-insensitive lookup with fallback to FaGlobe.
 */
export const SOCIAL_ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  email: FaEnvelope,
  mail: FaEnvelope,
  twitter: FaXTwitter,
  x: FaXTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  discord: FaDiscord,
  youtube: FaYoutube,
  kaggle: SiKaggle,
  medium: SiMedium,
  stackoverflow: SiStackoverflow,
  website: FaGlobe,
  globe: FaGlobe,
  link: FaLink,
};

/**
 * Safely resolves an icon component for any platform or icon string identifier.
 * Defaults to FaGlobe for unknown platforms so the UI never crashes.
 */
export function getSocialIcon(iconIdentifier) {
  if (!iconIdentifier || typeof iconIdentifier !== "string") {
    return FaGlobe;
  }
  const key = iconIdentifier.toLowerCase().trim();
  return SOCIAL_ICON_MAP[key] || FaGlobe;
}
