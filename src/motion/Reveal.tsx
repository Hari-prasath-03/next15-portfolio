"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}
const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content" }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(targetRef, { once: true, margin: "-60px" });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  const mainVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  const slideVariants = {
    hidden: { left: 0 },
    visible: { left: "100%" },
  };

  return (
    <div
      ref={targetRef}
      style={{ position: "relative", width, overflow: "hidden" }}
    >
      <motion.div
        variants={mainVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute top-1 bottom-1 left-0 right-0 bg-primary z-20"
      />
    </div>
  );
};

export default Reveal;
