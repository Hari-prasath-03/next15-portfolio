"use client";

import { PropsWithChildren, useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const HorizontalScroll: React.FC<PropsWithChildren> = ({ children }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-30 flex h-[75vh] items-center overflow-hidden">
        <motion.div className="flex gap-6" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
