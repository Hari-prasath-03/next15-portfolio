"use client";

import { useEffect, useState } from "react";

function useMediaQuery(breakpoint: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQueryList = window.matchMedia(breakpoint);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [breakpoint]);

  return matches;
}

export default useMediaQuery;
