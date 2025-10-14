import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const STAGGER = 0.09;
const DURATION = 0.15;

export const animatePageIn = () => {
  const stripes = document.querySelectorAll(".page-transition-stripe");

  if (!stripes) return;

  const tl = gsap.timeline();
  tl.set(stripes, { yPercent: 0 }).to(stripes, {
    yPercent: 100,
    stagger: STAGGER,
    duration: DURATION,
  });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const stripes = document.querySelectorAll(".page-transition-stripe");

  if (!stripes) return;

  const tl = gsap.timeline();
  tl.set(stripes, { yPercent: -100 }).to(stripes, {
    yPercent: 0,
    stagger: STAGGER,
    duration: DURATION,
    onComplete: () => router.push(href),
  });
};
