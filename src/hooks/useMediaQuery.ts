import { useEffect, useState } from "react";

type Breakpoint = string;

function useMediaQuery(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(breakpoint).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(breakpoint);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [breakpoint]);

  return matches;
}

export default useMediaQuery;
