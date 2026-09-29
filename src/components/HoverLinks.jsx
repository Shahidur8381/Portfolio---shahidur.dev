"use client";

import React from "react";
import "./styles/SocialIcons.css";

const HoverLinks = ({ text, cursor }) => {
  return (
    <span className="hover-link" data-cursor={!cursor ? "disable" : undefined}>
      <span className="hover-in">
        <span className="hover-text-primary">{text}</span>
        <span className="hover-text-clone">{text}</span>
      </span>
    </span>
  );
};

export default HoverLinks;
