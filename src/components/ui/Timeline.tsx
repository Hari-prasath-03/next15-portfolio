"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, type Variants } from "motion/react";

interface TimelineItemProps {
  details: { title: string; organizing: string; type?: string };
  date: string;
  children: React.ReactNode;
  isLeft?: boolean;
  delay?: number;
}

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  details: { title, organizing, type },
  date,
  children,
  isLeft = false,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const dotVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "50%",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay + 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      x: isLeft ? -50 : 50,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay + 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full mb-10 last:mb-0"
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        className={`
          relative z-10 w-full max-w-md bg-gradient-to-br from-bg-sec to-bg/80 rounded-xl shadow-lg
          shadow-gray-900/20 pt-10 sm:pt-6 p-6 border border-neutral-700 backdrop-blur-sm
          ${isLeft ? "ml-auto sm:mr-8" : "mr-auto sm:ml-8"}
        `}
      >
        {/* Date Badge */}
        <div className={`mb-3 ${isLeft ? "text-right" : "text-left"}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/35 rounded-full">
            {date}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col mb-2 gap-0.5">
          <h3
            className={`text-xl font-bold ${
              isLeft ? "text-right" : "text-left"
            }`}
          >
            {title}
          </h3>
          <span
            className={`text-sm text-gray-500 dark:text-gray-400 mb-1 ${
              isLeft ? "text-right" : "text-left"
            }`}
          >
            {organizing} {type && `· ${type}`}
          </span>
        </div>

        {/* Content */}
        <div
          className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
            isLeft ? "text-right" : "text-left"
          }`}
        >
          {children}
        </div>
      </motion.div>

      {/* Connecting Line */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={controls}
        className={`
          absolute top-6 h-0.5 bg-primary
          ${isLeft ? "right-8" : "left-8"}
        `}
      />

      {/* Timeline Dot */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate={controls}
        className="absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="w-4 h-4 bg-bg-sec border-4 border-primary/60 rounded-full shadow-lg">
          <div className="w-full h-full bg-primary rounded-full animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/90 to-primary/30 transform -translate-x-1/2" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export { Timeline, TimelineItem };
