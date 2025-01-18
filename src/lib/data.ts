import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "../../public/tournamentHub.png"
import rmtdevImg from "../../public/sewa.png";
import wordanalyticsImg from "../../public/crypto.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const homeLink = [
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "SDKs",
    hash: "#sdks",
  },
  {
    name: "Testimonials",
    hash: "#testimonials",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Backend Developer, Cosmic Forces",
    location: "Remote",
    description:
      "Designed and implemented the game mechanics of a racing game using Unity and C#. Built scalable APIs and backend enable seamless blockchain interactions.",
    icon: React.createElement(CgWorkAlt),
    date: "03/2022 - Present",
  },
  {
    title: "Blockchain Developer, Shibaverse",
    location: "Remote",
    description:
      "Developed smart contracts for Shibaverse token and land NFTs, driving a $50M market cap and significant NFT sales revenue. Integrated NFTs into the Unity game, reducing prototype completion time by 20%.",
    icon: React.createElement(CgWorkAlt),
    date: "09/2021 - 05/2022",
  },
  {
    title: "Course Designer, Educative.io",
    location: "Remote",
    description:
    "Developed and launched a comprehensive OpenCV python and C++ course on Educative.io in collaboration with the proofreaders and managers, resulting in an interactive and engaging learning experience",
    icon: React.createElement(FaReact),
    date: "09/2021 - 05/2022",
  }, 
] as const;

export const projectsData = [
  {
    title: "TournamentHub",
    description:
      "I’ve been working on Tournament Hub for 8 months, a platform for organizing tournaments. It features Unity and Unreal SDK integrations, with a $10k grant from Stellar to integrate smart contracts for secure transactions.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Unity", "C#", "Unreal Engine"],
    imageUrl: corpcommentImg,
    link:"https://www.tournamenthub.xyz/",
  },
  {
    title: "Sewa",
    description:
      "I built Sewa, a blockchain-based donation platform on Ethereum, enabling users to hold and donate cryptocurrency securely and transparently through smart contracts.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Solidity"],
    imageUrl: rmtdevImg,
    link:"https://sewafunds.com/",
  },
  {
    title: "Crypto Clash",
    description:
      "Blockchain game based on Clash on Clans with additional defense and battle strategies.",
    tags: ["Unity", "C#", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
    link:"https://nishangames2030.wixsite.com/cryptoclash",
  },
] as const;

export const skillsData = [
  "Unity",
  "Unreal Engine",
  "C#",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "HTML",
  "GraphQL",
  "Express",
  "Python",
  "Django",
] as const;
