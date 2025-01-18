"use client";

import { Box } from "@mui/system";
import React, { useRef, useCallback } from "react";
import { ProjectBox } from "@/components/common";

const projectsData = [
  {
    title: "Chess Tournament",
    subtitle: "Chess.com",
    description: "3-minute chess tournament. No entry fee. Open tournament.",
    progress: 60,
    totalParticipants: 30,
    maxParticipants: 1000,
    type: "Online Chess Tournament",
    verified: true,
    image: "/chess.jpg",
  },
  {
    title: "Code Hackathon",
    subtitle: "Dev.io",
    description: "24-hour coding marathon with exciting prizes.",
    progress: 75,
    totalParticipants: 150,
    maxParticipants: 200,
    type: "Hackathon",
    verified: false,
    image: "/badminton.jpg",
  },
  {
    title: "Photography Contest",
    subtitle: "SnapShots",
    description: "Showcase your photography skills and win rewards.",
    progress: 40,
    totalParticipants: 400,
    maxParticipants: 1000,
    type: "Photography",
    verified: true,
    image: "/fifa.jpg",
  },
  {
    title: "Photography Contest",
    subtitle: "SnapShots",
    description: "Showcase your photography skills and win rewards.",
    progress: 40,
    totalParticipants: 400,
    maxParticipants: 1000,
    type: "Photography",
    verified: true,
    image: "/fifa.jpg",
  },
  // Add more project data as needed
];

function Projects() {
  const scrollContainerRef = useRef(null);

  const onDragStart = useCallback((e) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;

    const onMouseMove = (eMove) => {
      const x = eMove.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // Scroll-fastness
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <section id="projects" className="container mx-auto py-12 sm:py-16 px-4">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Public{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Tournaments
          </span>
        </h2>
      </div>

      <Box
        ref={scrollContainerRef}
        onMouseDown={onDragStart}
        className="flex overflow-x-auto gap-4"
        sx={{
          scrollbarWidth: "none", // For Firefox (hide scrollbar)
          "&::-webkit-scrollbar": {
            display: "none", // For WebKit browsers (hide scrollbar)
          },
          "& > *": {
            flex: "0 0 auto", // Prevent flex items from shrinking
          },
        }}
      >
        {projectsData.map((project, index) => (
          <ProjectBox
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            progress={project.progress}
            totalParticipants={project.totalParticipants}
            maxParticipants={project.maxParticipants}
            type={project.type}
            verified={project.verified}
            image={project.image}
          />
        ))}
      </Box>
    </section>
  );
}

export default Projects;
