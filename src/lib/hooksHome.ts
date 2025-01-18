import { useActiveSectionContext } from "@/context/active-section-context-home";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionNameHome } from "./types";

export function useSectionInView(sectionName: SectionNameHome, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
