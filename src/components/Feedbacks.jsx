"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials as fallbackTestimonials } from "../constants";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { resolveImageUrl, DEFAULT_AVATAR_PLACEHOLDER } from "../utils/imageUrl";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(image, DEFAULT_AVATAR_PLACEHOLDER)
  );

  useEffect(() => {
    setImgSrc(resolveImageUrl(image, DEFAULT_AVATAR_PLACEHOLDER));
  }, [image]);

  const handleImageError = () => {
    if (imgSrc !== DEFAULT_AVATAR_PLACEHOLDER) {
      setImgSrc(DEFAULT_AVATAR_PLACEHOLDER);
    }
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className='bg-[#0b140f]/90 backdrop-blur-xl p-5 xs:p-7 sm:p-10 rounded-2xl sm:rounded-3xl xs:w-[320px] w-full border border-[#10b981]/25 hover:border-[#00f59b]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,245,155,0.2)] transition-all duration-300'
    >
      <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] to-[#10b981] font-black text-[36px] sm:text-[48px] leading-none'>"</p>

      <div className='mt-1'>
        <p className='text-white tracking-wider text-[14px] sm:text-[17px] leading-relaxed'>{testimonial}</p>

        <div className='mt-5 sm:mt-7 flex justify-between items-center gap-2'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[14px] sm:text-[16px]'>
              <span className='text-[#00f59b] font-bold'>@</span> {name}
            </p>
            <p className='mt-0.5 sm:mt-1 text-[#94a3b8] text-[11px] sm:text-[12px]'>
              {designation} of {company}
            </p>
          </div>

          <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border-2 border-[#00f59b]/50 shadow-[0_0_10px_rgba(0,245,155,0.3)] bg-[#050907] flex items-center justify-center'>
            <img
              src={imgSrc || DEFAULT_AVATAR_PLACEHOLDER}
              alt={`feedback_by-${name}`}
              className='w-full h-full object-cover'
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  const { testimonials: apiTestimonials } = usePortfolioData();
  const testimonialList = (apiTestimonials && apiTestimonials.length > 0 ? apiTestimonials : fallbackTestimonials)
    .filter((t) => t.showOnHomepage !== false);

  if (!testimonialList.length) return null;

  return (
    <div className={`mt-10 sm:mt-12 bg-[#070d0a]/85 backdrop-blur-2xl rounded-[20px] border border-[#10b981]/25 shadow-[0_0_50px_rgba(0,245,155,0.08)]`}>
      <div
        className={`bg-gradient-to-r from-[#0b1711]/90 to-[#0e2118]/90 rounded-2xl ${styles.padding} min-h-[220px] sm:min-h-[300px] border-b border-[#10b981]/20`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-14 sm:-mt-20 pb-10 sm:pb-14 ${styles.paddingX} flex flex-wrap gap-5 sm:gap-7`}>
        {testimonialList.map((testimonial, index) => (
          <FeedbackCard
            key={`testimonial-${testimonial.id || testimonial.name || index}`}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
