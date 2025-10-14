"use client";

import { motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

const MotionImageBase = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => <Image ref={ref} {...props} alt={props.alt ?? ""} />
);

MotionImageBase.displayName = "MotionImage";

const MotionImage = motion(MotionImageBase);

export default MotionImage;
