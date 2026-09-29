"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { education as fallbackEducation } from "../data";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { resolveImageUrl } from "../utils/imageUrl";

const InstitutionBadge = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = resolveImageUrl(item.image);

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={item.institution || "Institution Logo"}
        className="w-10 h-10 object-contain rounded-lg p-1 bg-white/5 border border-white/10"
        onError={() => setImgError(true)}
      />
    );
  }

  return <span>{item.icon || "🎓"}</span>;
};

const Education = () => {
  const { education: apiEducation } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const rawData = (apiEducation && apiEducation.length > 0 ? apiEducation : fallbackEducation)
    .filter((item) => item.showOnHomepage !== false);

  const educationData = rawData.map((item) => {
    if (item.expectedGraduationYear) {
      let status = item.result || "3rd Year";
      if (currentYear === item.expectedGraduationYear) {
        status = "4th Year";
      } else if (currentYear > item.expectedGraduationYear) {
        status = "Graduated";
      }
      return {
        ...item,
        result: `Status: ${status}`,
      };
    }
    return item;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!educationData.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % educationData.length);
    }, 3000); // Cycles every 3 seconds
    return () => clearInterval(interval);
  }, [educationData.length]);

  return (
    <>
      <motion.div variants={textVariant()} className="text-right">
        <p className={`${styles.sectionSubText}`}>
          My Academic Path
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Education Journey<span className="text-[#00f59b]">.</span>
        </h2>
      </motion.div>

      <div className="mt-20 w-full flex justify-center items-center h-[550px] relative">
        {/* Parabolic background path indication (right side) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] h-full flex items-center justify-end pointer-events-none opacity-20">
          <div className="w-[1px] h-[80%] border-r-2 border-dashed border-[#00f59b] rounded-[100%] mr-8" style={{ borderRadius: '0 100% 100% 0' }} />
        </div>

        {educationData.map((item, index) => {
          // Calculate logical position in the endless loop
          const pos = (index - activeIndex + 3) % 3;
          // Map to distance: 0 is center, 1 is bottom, -1 is top
          const distance = pos === 0 ? 0 : pos === 1 ? 1 : -1;
          
          // Parabolic curve math
          const yOffset = distance * 160; 
          const xOffset = Math.abs(distance) * 50; // Pushes inactive cards to the RIGHT, forming a parabola bulged right
          const scale = distance === 0 ? 1 : 0.85;
          const opacity = distance === 0 ? 1 : 0.2;
          const zIndex = distance === 0 ? 30 : 10;
          
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                y: yOffset,
                x: xOffset,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
              }}
              transition={{ 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1] // Premium spring-like ease
              }}
              className="absolute w-[95%] sm:w-[85%] max-w-[700px] p-6 sm:p-8 rounded-[24px] 
                         bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-150
                         border border-white/[0.08]
                         shadow-[0_16px_40px_rgba(0,0,0,0.5)]
                         flex flex-col gap-2 cursor-pointer text-right"
              onClick={() => setActiveIndex(index)}
            >
               {/* Active card elegant glow (right side) */}
               <motion.div 
                 animate={{ opacity: distance === 0 ? 1 : 0 }}
                 className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-l from-[#00f59b]/40 via-transparent to-transparent opacity-40 pointer-events-none" 
               />
               
               <div className="flex flex-col sm:flex-row-reverse justify-between items-start gap-4">
                 <div className="flex flex-row-reverse items-center gap-4">
                   {/* Icon container */}
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-700 shrink-0
                                   ${distance === 0 
                                     ? "bg-[#050907] border border-[#00f59b]/40 shadow-[0_0_20px_rgba(0,245,155,0.25)]" 
                                     : "bg-black/50 border border-white/10 grayscale"}`}>
                      <InstitutionBadge item={item} />
                   </div>
                   
                   <div>
                     <h3 className="text-white text-lg sm:text-xl font-bold tracking-wide leading-tight">{item.title}</h3>
                     <p className="text-[#00f59b] font-medium text-xs sm:text-sm mt-1">{item.institution}</p>
                   </div>
                 </div>
                 
                 <div className="flex flex-col items-end sm:items-start w-full sm:w-auto pr-18 sm:pr-0">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors duration-700
                                    ${distance === 0 
                                      ? "bg-[#10b981]/15 text-[#00f59b] border-[#10b981]/30" 
                                      : "bg-white/5 text-white/50 border-white/10"}`}>
                     {item.result}
                   </span>
                   <span className="text-[#5a6b7f] text-[11px] mt-2 font-mono tracking-widest uppercase">{item.date}</span>
                 </div>
               </div>
               
               <p className="text-[#8b9bb4] text-sm leading-relaxed mt-4 sm:pr-[72px]">
                 {item.description}
               </p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
