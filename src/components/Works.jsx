"use client";

import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects as fallbackProjects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { resolveImageUrl, DEFAULT_PROJECT_PLACEHOLDER } from "../utils/imageUrl";

const ProjectCard = ({
  index,
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
}) => {
  const projectName = name || title || "Project";
  const codeLink = sourceCodeLink || source_code_link || githubRepo || github_link || githubProp || repoLink;
  const demoLink = liveDemoLink || live_demo_link || liveURL || liveUrl || live_url || demoUrl || demo_url || demoLinkProp;

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
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="w-full sm:w-[360px] flex">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#0b140f]/90 backdrop-blur-xl p-4 xs:p-5 rounded-2xl w-full border border-[#10b981]/25 hover:border-[#00f59b]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,245,155,0.25)] transition-all duration-300 flex flex-col justify-between'
      >
        <div>
          <div className='relative w-full h-[190px] xs:h-[210px] sm:h-[230px] rounded-2xl overflow-hidden bg-[#070d09] group'>
            <img
              src={imgSrc || DEFAULT_PROJECT_PLACEHOLDER}
              alt={projectName}
              className='w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105'
              onError={handleImageError}
            />

            <div className='absolute inset-0 flex justify-end m-3 gap-2 card-img_hover'>
              {demoLink && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(demoLink, "_blank", "noopener,noreferrer");
                  }}
                  className='bg-gradient-to-r from-[#070a08] to-[#0e1912] border border-[#00f59b]/40 hover:border-[#00f59b] hover:shadow-[0_0_15px_rgba(0,245,155,0.7)] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300'
                  title="Live Demo"
                >
                  <span className="text-[#00f59b] text-base font-bold leading-none">↗</span>
                </div>
              )}
              {codeLink && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(codeLink, "_blank", "noopener,noreferrer");
                  }}
                  className='bg-gradient-to-r from-[#070a08] to-[#0e1912] border border-[#00f59b]/40 hover:border-[#00f59b] hover:shadow-[0_0_15px_rgba(0,245,155,0.7)] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300'
                  title="GitHub Repository"
                >
                  <img
                    src={github}
                    alt='source code'
                    className='w-5 h-5 shrink-0 object-contain'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='mt-4 sm:mt-5'>
            <h3 className='text-white font-bold text-lg sm:text-[24px] tracking-wide'>{projectName}</h3>
            <p className='mt-1.5 sm:mt-2 text-[#94a3b8] text-[13px] sm:text-[14px] leading-relaxed'>{description}</p>
          </div>

          <div className='mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2'>
            {(tags || []).map((tag, tagIdx) => {
              const tagName = typeof tag === "string" ? tag : tag?.name;
              const tagColor = typeof tag === "string" ? "text-[#a7f3d0]" : tag?.color || "text-[#a7f3d0]";
              return (
                <p
                  key={`${projectName}-${tagName || tagIdx}`}
                  className={`text-[12px] sm:text-[13px] font-medium ${tagColor}`}
                >
                  #{tagName}
                </p>
              );
            })}
          </div>
        </div>

        {/* Action Links Bar: Live Demo & GitHub Repo */}
        <div className='mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#10b981]/15 flex items-center gap-2 sm:gap-3'>
          {demoLink ? (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className='flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-[#00f59b]/15 to-[#10b981]/10 border border-[#00f59b]/40 hover:border-[#00f59b] hover:bg-[#00f59b]/25 hover:shadow-[0_0_20px_rgba(0,245,155,0.35)] text-[#00f59b] text-[12px] sm:text-[13px] font-semibold transition-all duration-300 group/btn whitespace-nowrap min-h-[40px]'
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f59b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f59b]"></span>
              </span>
              <span>Live Demo</span>
              <span className="text-xs transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
            </a>
          ) : (
            <div className='flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#09120c]/60 border border-white/5 text-[#64748b] text-[11px] sm:text-[12px] font-medium min-h-[40px]'>
              <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]/50"></span>
              <span>In Staging</span>
            </div>
          )}

          {codeLink ? (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className='flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#0b140f] border border-white/10 hover:border-[#00f59b]/50 hover:bg-[#102017] hover:text-white text-[#cbd5e1] text-[12px] sm:text-[13px] font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] min-h-[40px]'
            >
              <img src={github} alt="github" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain opacity-80" />
              <span>GitHub</span>
            </a>
          ) : null}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { projects: apiProjects } = usePortfolioData();
  const projectList = (apiProjects && apiProjects.length > 0 ? apiProjects : fallbackProjects)
    .filter((project) => project.showOnHomepage !== false && project.show_on_homepage !== false);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-[#94a3b8] text-sm sm:text-[17px] max-w-3xl leading-relaxed sm:leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world production applications. Each project is highlighted with
          direct links to code repositories and live deployments, reflecting my
          ability to solve complex engineering challenges with modern technologies.
        </motion.p>
      </div>

      <div className='mt-10 sm:mt-20 flex flex-wrap gap-5 sm:gap-7 justify-center sm:justify-start'>
        {projectList.map((project, index) => (
          <ProjectCard
            key={`project-${project.id || project.slug || index}`}
            index={index}
            {...project}
          />
        ))}
      </div>

      {/* Minimal Supernatural Button */}
      <div className='mt-10 sm:mt-14 w-full flex justify-center'>
        <a
          href="/projects"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("portfolio_scroll_pos", window.scrollY.toString());
              sessionStorage.setItem("portfolio_intro_seen", "true");
            }
          }}
          className='group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#070f0a]/90 hover:bg-[#0c1a11] border border-[#10b981]/35 hover:border-[#00f59b] text-xs sm:text-[13px] text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,245,155,0.12)] hover:shadow-[0_0_30px_rgba(0,245,155,0.3)] min-h-[44px]'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping' />

          <span className='font-semibold text-white group-hover:text-[#00f59b] transition-colors'>
            View All Projects
          </span>
          <span className='text-[#00f59b] text-sm group-hover:translate-x-1 transition-transform duration-200'>
            →
          </span>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
