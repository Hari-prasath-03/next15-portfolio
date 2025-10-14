"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/utils/animation";

export default function Template({ children }: { children: React.ReactNode }) {
  const NO_OF_STRIPES = 8;

  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      {Array.from({ length: NO_OF_STRIPES }).map((_, i) => (
        <div
          key={i}
          className="page-transition-stripe min-h-screen bg-primary z-[999] fixed top-0"
          style={{
            width: `${100 / NO_OF_STRIPES}%`,
            left: `${(100 / NO_OF_STRIPES) * i}%`,
          }}
        />
      ))}
      {children}
    </div>
  );
}
