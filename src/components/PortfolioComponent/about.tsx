"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
  I am currently pursuing a bachelor's degree in{" "}
  <span className="font-medium">Computer Science and Mathematics</span>. Driven
  by my passion for programming and problem-solving, I took courses and watched
  numerous YouTube tutorials to learn{" "}
  <span className="font-medium">backend web development and game development</span>.
  <span className="italic">What I love most about programming</span> is the
  thrill of solving complex problems and the satisfaction of finding elegant
  solutions. My core stack includes{" "}
  <span className="font-medium">
    React, Next.js, Unity, C#, and MongoDB
  </span>. I am also proficient in TypeScript and Prisma, and I am always eager
  to learn new technologies. I am currently looking for a{" "}
  <span className="font-medium">part-time position</span> as a software
  developer or game developer.
</p>

<p>
  <span className="italic">When I’m not coding</span>, I enjoy playing soccer,
  watching movies, and immersing myself in video games on PlayStation. I’m
  passionate about <span className="font-medium">learning new skills</span> and
  am currently working on <span className="font-medium">Neural Networks and Machine Learning</span>.
</p>

    </motion.section>
  );
}
