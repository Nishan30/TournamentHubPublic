"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/common/theme-provider";
import About from "@/components/PortfolioComponent/about";
import Contact from "@/components/PortfolioComponent/contact";
import Experience from "@/components/PortfolioComponent/experience";
import Intro from "@/components/PortfolioComponent/intro";
import Projects from "@/components/PortfolioComponent/projects";
import SectionDivider from "@/components/PortfolioComponent/section-divider";
import Skills from "@/components/PortfolioComponent/skills";
import HeaderP from "@/components/PortfolioComponent/header";

export default function Home() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Save the current theme
    const previousTheme = theme;

    // Force the theme to light mode
    if (previousTheme !== "light") {
      setTheme("light");
    }

    // Restore the theme when the component unmounts
    return () => {
      //setTheme(previousTheme);
    };
  }, [theme, setTheme]);

  return (
    <main className="flex flex-col pt-28 sm:pt-36 items-center px-4">
      <HeaderP />
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
