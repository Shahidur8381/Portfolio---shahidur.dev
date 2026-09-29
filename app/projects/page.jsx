"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { github } from "../../src/assets";
import { resolveImageUrl, DEFAULT_PROJECT_PLACEHOLDER } from "../../src/utils/imageUrl";
import SpaceBackground from "../../src/components/SpaceBackground";
import CustomCursor from "../../src/components/CustomCursor";
import Footer from "../../src/components/Footer";
import fallbackData from "../../src/data/portfolioData.json";

// Helper to get or infer category
function getProjectCategory(project) {
  if (project.category && typeof project.category === "string" && project.category.trim()) {
    return project.category.trim();
  }
  // Graceful fallback inference until backend adds category column
  const tagsStr = (project.tags || [])
    .map((t) => (typeof t === "string" ? t : t?.name || ""))
    .join(" ")
    .toLowerCase();
  const text = `${project.name || ""} ${project.description || ""} ${tagsStr}`.toLowerCase();

  if (
    text.includes("blockchain") ||
    text.includes("web3") ||
    text.includes("dapp") ||
    text.includes("smart contract") ||
    text.includes("solidity")
  ) {
    return "Web3 & Blockchain";
  }
  if (
    text.includes("ai") ||
    text.includes("machine learning") ||
    text.includes("ml") ||
    text.includes("python")
  ) {
    return "AI & ML";
  }
  if (
    text.includes("mobile") ||
    text.includes("react native") ||
    text.includes("flutter") ||
    text.includes("android")
  ) {
    return "Mobile";
  }
  if (
    text.includes("mongo") ||
    text.includes("node") ||
    text.includes("backend") ||
    text.includes("full-stack") ||
    text.includes("fullstack") ||
    text.includes("database") ||
    text.includes("sql") ||
    text.includes("restapi")
  ) {
    return "Full-Stack";
  }
  return "Frontend";
}

function ProjectCard({ project, index }) {
  const {
    name,
    title,
    description,
    tags = [],
    image,
    source_code_link,
    sourceCodeLink,
    githubRepo,
    github_link,
    github: githubProp,
    repoLink,
    live_demo_link,
    liveDemoLink,
    liveURL,
    liveUrl,
    live_url,
    demoUrl,
    demo_url,
    demoLink: demoLinkProp,
  } = project;

  const projectName = name || title || "Project";
  const category = getProjectCategory(project);

  const codeLink =
    sourceCodeLink ||
    source_code_link ||
    githubRepo ||
    github_link ||
    githubProp ||
    repoLink;
  const demoLink =
    liveDemoLink ||
    live_demo_link ||
    liveURL ||
    liveUrl ||
    live_url ||
    demoUrl ||
    demo_url ||
    demoLinkProp;

  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(image, DEFAULT_PROJECT_PLACEHOLDER)
  );

  useEffect(() => {
    setImgSrc(resolveImageUrl(image, DEFAULT_PROJECT_PLACEHOLDER));
  }, [image]);

  const handleImageError = () => {
    if (imgSrc !== DEFAULT_PROJECT_PLACEHOLDER) {
      setImgSrc(DEFAULT_PROJECT_PLACEHOLDER);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Tilt
        options={{
          max: 20,
          scale: 1.01,
          speed: 400,
        }}
        className="h-full bg-[#0b140f]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#10b981]/20 hover:border-[#00f59b]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,245,155,0.2)] transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Project Image */}
          <div className="relative w-full h-[180px] xs:h-[210px] rounded-xl overflow-hidden bg-[#070d09] group">
            <img
              src={imgSrc || DEFAULT_PROJECT_PLACEHOLDER}
              alt={projectName}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />

            {/* Category Badge on Top-Left */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#070d09]/90 backdrop-blur-md text-[#00f59b] border border-[#00f59b]/40 shadow-sm">
                {category}
              </span>
            </div>

            {/* Quick action floating badges */}
            <div className="absolute top-3 right-3 flex gap-2">
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#070a08]/90 border border-[#00f59b]/40 hover:border-[#00f59b] hover:shadow-[0_0_12px_rgba(0,245,155,0.6)] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300"
                  title="Live Demo"
                >
                  <span className="text-[#00f59b] text-sm font-bold">↗</span>
                </a>
              )}
              {codeLink && (
                <a
                  href={codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#070a08]/90 border border-white/20 hover:border-[#00f59b] hover:shadow-[0_0_12px_rgba(0,245,155,0.5)] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300"
                  title="Source Code"
                >
                  <img src={github} alt="source code" className="w-4 h-4 object-contain" />
                </a>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-4">
            <h3 className="text-white font-bold text-[20px] tracking-wide group-hover:text-[#00f59b] transition-colors">
              {projectName}
            </h3>
            <p className="mt-2 text-[#94a3b8] text-[13px] leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Tech tags preview */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(tags || []).map((tag, tagIdx) => {
              const tagName = typeof tag === "string" ? tag : tag?.name;
              return (
                <span
                  key={`${projectName}-${tagName || tagIdx}`}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#00f59b]/5 text-[#a7f3d0]/90 border border-[#00f59b]/15"
                >
                  #{tagName}
                </span>
              );
            })}
          </div>
        </div>

        {/* Minimal Actions Bar */}
        <div className="mt-5 pt-3.5 border-t border-[#10b981]/15 flex items-center gap-2.5">
          {demoLink ? (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#00f59b]/10 border border-[#00f59b]/35 hover:border-[#00f59b] hover:bg-[#00f59b]/20 text-[#00f59b] text-[12px] font-semibold transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
              <span>Live Demo</span>
              <span className="text-xs">↗</span>
            </a>
          ) : (
            <div className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-[#09120c]/40 border border-white/5 text-[#64748b] text-[11px]">
              In Staging
            </div>
          )}

          {codeLink ? (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#0b140f] border border-white/10 hover:border-[#00f59b]/50 text-[#cbd5e1] hover:text-white text-[12px] font-medium transition-all duration-200"
            >
              <img src={github} alt="github" className="w-3.5 h-3.5 object-contain opacity-80" />
              <span>GitHub</span>
            </a>
          ) : null}
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState(fallbackData.projects || []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;

    async function loadAllProjects() {
      try {
        const res = await fetch("https://api.shahidur.dev/api/projects");
        if (res.ok) {
          const list = await res.json();
          if (isMounted && Array.isArray(list) && list.length > 0) {
            setProjects(list);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch /api/projects:", err);
      }

      try {
        const resPortfolio = await fetch("https://api.shahidur.dev/api/portfolio");
        if (resPortfolio.ok) {
          const json = await resPortfolio.json();
          if (isMounted && Array.isArray(json?.projects) && json.projects.length > 0) {
            setProjects(json.projects);
            setLoading(false);
            return;
          }
        }
      } catch (err2) {
        console.warn("Portfolio fallback failed:", err2);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAllProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute distinct categories
  const categories = useMemo(() => {
    const catSet = new Set();
    projects.forEach((proj) => {
      catSet.add(getProjectCategory(proj));
    });
    return ["All", ...Array.from(catSet)];
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const cat = getProjectCategory(proj);
      const matchesCategory =
        selectedCategory === "All" || cat.toLowerCase() === selectedCategory.toLowerCase();

      const name = (proj.name || proj.title || "").toLowerCase();
      const desc = (proj.description || "").toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || name.includes(q) || desc.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#070a08] text-white selection:bg-[#00f59b] selection:text-black overflow-x-hidden">
      <CustomCursor />
      <SpaceBackground />

      {/* Minimal Header Nav */}
      <header className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-[#070a08]/80">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#94a3b8] hover:text-[#00f59b] transition-colors"
        >
          <span className="text-[#00f59b] group-hover:-translate-x-1 transition-transform">←</span>
          <span>Portfolio Home</span>
        </Link>

        <span className="text-[11px] font-mono text-[#64748b]">
          shahidur.dev/projects
        </span>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
              <span className="text-xs uppercase tracking-widest text-[#00f59b] font-semibold">
                ✦ Archives
              </span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight">
              All Projects & Creations
            </h1>
          </div>

          {/* Minimal Search Input */}
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full px-4 py-2 pl-9 rounded-xl bg-[#0b140f] border border-white/15 focus:border-[#00f59b] focus:outline-none text-xs text-white placeholder-[#64748b] transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#64748b]">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748b] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#64748b] font-medium mr-1">Category:</span>
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-[#00f59b] text-black font-semibold shadow-[0_0_15px_rgba(0,245,155,0.4)]"
                    : "bg-[#0c1610] text-[#94a3b8] border border-white/10 hover:border-[#00f59b]/40 hover:text-white"
                }`}
              >
                {cat}
                {cat === "All"
                  ? ` (${projects.length})`
                  : ` (${projects.filter((p) => getProjectCategory(p).toLowerCase() === cat.toLowerCase()).length})`}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`proj-card-${project.id || project.slug || index}`}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center py-16 rounded-2xl bg-[#09120c]/40 border border-white/5">
            <span className="text-3xl">🌌</span>
            <h3 className="mt-2 text-base font-semibold text-white">No projects found in this category</h3>
            <p className="mt-1 text-xs text-[#94a3b8]">
              Try selecting another category or resetting the search filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#00f59b]/15 border border-[#00f59b]/35 text-[#00f59b] text-xs font-medium hover:bg-[#00f59b]/25"
            >
              Reset to All
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
