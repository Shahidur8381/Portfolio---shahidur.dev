"use client";

import React from "react";
import { FaNetworkWired, FaBrain, FaBolt } from "react-icons/fa6";
import {
  ROW_1_WEB,
  ROW_2_AI_ML_DEVOPS,
  ROW_3_WEB3_TELEGRAM,
} from "../constants/techData";
import "./styles/TechStack.css";

// Minimal Production Tech Card
const TechCard = ({ tech, index }) => {
  return (
    <div
      className="tech-minimal-card"
      key={`${tech.name}-${index}`}
      style={{
        "--tech-color": tech.color,
        "--tech-glow": `${tech.color}35`,
      }}
    >
      <div className="card-icon-box">{tech.icon}</div>
      <div className="card-info">
        <span className="card-title">{tech.name}</span>
        <span className="card-category">{tech.categoryLabel}</span>
      </div>
    </div>
  );
};

const TechStack = () => {
  // Seamless infinite loop duplicates
  const row1Items = [...ROW_1_WEB, ...ROW_1_WEB];
  const row2Items = [...ROW_2_AI_ML_DEVOPS, ...ROW_2_AI_ML_DEVOPS];
  const row3Items = [...ROW_3_WEB3_TELEGRAM, ...ROW_3_WEB3_TELEGRAM];

  return (
    <section className="techstack-section" id="techstack">
      {/* Section Header */}
      <div className="techstack-header">
        <div className="tech-sub-badge">
          <span>Capabilities & Ecosystem</span>
        </div>
        <h2>My Tech Stack</h2>
        <p>
          A production-proven technology suite engineered for modern full-stack
          web applications, cloud architectures, machine learning models, and decentralized
          Telegram Mini Apps & Web3 protocols.
        </p>
      </div>

      {/* 3-Row Distinct Auto-Scrolling Marquee */}
      <div className="marquee-main-wrapper">
        {/* ==========================================
            ROW 1: Full-Stack Web, Databases & APIs
            ========================================== */}
        <div className="marquee-row-block">
          

          <div className="marquee-viewport">
            <div className="marquee-track scroll-right-1">
              {row1Items.map((tech, i) => (
                <TechCard key={`row1-${tech.name}-${i}`} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            ROW 2: Cloud, DevOps & Machine Learning / AI
            ========================================== */}
        <div className="marquee-row-block">
          

          <div className="marquee-viewport">
            <div className="marquee-track scroll-left-2">
              {row2Items.map((tech, i) => (
                <TechCard key={`row2-${tech.name}-${i}`} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            ROW 3: Telegram MiniApps, TON & Web3 Smart Contracts
            ========================================== */}
        <div className="marquee-row-block">
          

          <div className="marquee-viewport">
            <div className="marquee-track scroll-right-3">
              {row3Items.map((tech, i) => (
                <TechCard key={`row3-${tech.name}-${i}`} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Architecture Highlights */}
      <div className="tech-pillars">
        {/* Pillar 1 */}
        <div className="pillar-card">
          <div className="pillar-icon-box">
            <FaNetworkWired />
          </div>
          <h4>Full-Stack & Cloud / DevOps</h4>
          <p>
            Architecting reactive frontends with Next.js & TypeScript backed by
            scalable Node/Express microservices, multi-stage Docker containers,
            AWS cloud deployments, and resilient SQL/NoSQL databases with Redis caching.
          </p>
          <div className="pillar-tags">
            <span className="pillar-tag">Next.js 14</span>
            <span className="pillar-tag">Docker Compose</span>
            <span className="pillar-tag">AWS Cloud</span>
            <span className="pillar-tag">PostgreSQL</span>
            <span className="pillar-tag">Redis Cache</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="pillar-card">
          <div className="pillar-icon-box">
            <FaBrain />
          </div>
          <h4>Data Science & Machine Learning</h4>
          <p>
            Conducting exploratory data analysis, feature engineering, and predictive modeling
            utilizing Pandas, NumPy, and Scikit-Learn, with deep learning neural networks
            in PyTorch/TensorFlow and generative LLM API integrations.
          </p>
          <div className="pillar-tags">
            <span className="pillar-tag">Python Scripting</span>
            <span className="pillar-tag">PyTorch Tensors</span>
            <span className="pillar-tag">Scikit-Learn</span>
            <span className="pillar-tag">Pandas DataFrames</span>
            <span className="pillar-tag">LLM / OpenAI</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="pillar-card">
          <div className="pillar-icon-box">
            <FaBolt />
          </div>
          <h4>Telegram MiniApps & Web3</h4>
          <p>
            Building full-featured interactive Telegram Mini Apps (TMA) and Telegram bots,
            integrated with the TON blockchain and EVM smart contracts written in Solidity
            for decentralized applications and token ecosystems.
          </p>
          <div className="pillar-tags">
            <span className="pillar-tag">Telegram Bot API</span>
            <span className="pillar-tag">Telegram Mini Apps</span>
            <span className="pillar-tag">TON Connect</span>
            <span className="pillar-tag">Solidity (ERC-20/721)</span>
            <span className="pillar-tag">Ethers.js / Viem</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
