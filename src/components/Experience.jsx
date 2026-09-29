"use client";

import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { experiences as fallbackExperiences } from "../data";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { resolveImageUrl } from "../utils/imageUrl";

const ExperienceIcon = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = resolveImageUrl(item.image);

  if (imageUrl && !imgError) {
    return (
      <img 
        src={imageUrl} 
        alt={item.companyName} 
        className="w-7 h-7 object-contain rounded-full" 
        onError={() => setImgError(true)}
      />
    );
  }

  return <span>{item.icon || "💼"}</span>;
};

const ExperienceCard = ({ experience }) => {
  const item = {
    ...experience,
    companyName: experience.companyName || experience.company_name,
  };

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(16px)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
        borderRadius: "24px",
        padding: "2.5rem",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.05)" }}
      date={
        <span className="text-[#8b9bb4] font-mono tracking-widest text-[11px] sm:text-xs lg:text-sm px-3 sm:px-5 py-1 sm:py-2 bg-[#050907]/80 rounded-full border border-[#00f59b]/20 inline-block my-1 sm:my-0 sm:mx-4 shadow-[0_0_10px_rgba(0,245,155,0.1)]">
          {item.date}
        </span>
      }
      iconStyle={{
        background: item.iconBg || "#050907",
        border: "2px solid rgba(0, 245, 155, 0.6)",
        boxShadow: "0 0 20px rgba(0, 245, 155, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px"
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full text-xl sm:text-2xl">
          <ExperienceIcon item={item} />
        </div>
      }
    >
      <div className="relative z-10 group">
        <h3 className="text-white text-lg sm:text-[24px] font-bold tracking-wide leading-snug">{item.title}</h3>
        <p
          className="text-[#00f59b] text-sm sm:text-[16px] font-semibold mt-0.5 sm:mt-1"
          style={{ margin: 0 }}
        >
          {item.companyName}
        </p>

        <ul className="mt-4 sm:mt-6 list-none space-y-3 sm:space-y-4">
          {item.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-[#8b9bb4] text-[13px] sm:text-[14px] lg:text-[15px] tracking-wide leading-relaxed flex items-start"
            >
              <span className="text-[#00f59b] mr-3 sm:mr-4 mt-0.5 sm:mt-1 font-bold shrink-0">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { experiences: apiExperiences } = usePortfolioData();
  const experienceList = (apiExperiences && apiExperiences.length > 0 ? apiExperiences : fallbackExperiences)
    .filter((exp) => exp.showOnHomepage !== false);

  return (
    <>
      <motion.div variants={textVariant()} className="text-left lg:-ml-4">
        <p className={`${styles.sectionSubText}`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Work Experience<span className="text-[#00f59b]">.</span>
        </h2>
      </motion.div>

      <div className="mt-12 sm:mt-20 flex flex-col relative z-10 w-full lg:w-[85%] lg:-ml-8">
        <VerticalTimeline layout="1-column-left" lineColor="rgba(0, 245, 155, 0.3)">
          {experienceList.map((experience, index) => (
            <ExperienceCard
              key={`experience-${experience.id || index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
