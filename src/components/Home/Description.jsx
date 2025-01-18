"use client";

import React, { useState } from "react";
import styles from "@/styles/Home/Home.module.css";
import { FaPaperPlane } from "react-icons/fa";
import { Box, Grid, Typography, Button } from "@mui/material";
import Container from "../common/Container";
import { useTheme } from "../common/theme-provider";
import { useSectionInView } from "@/lib/hooksHome";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function Description() {
  const { ref } = useSectionInView("About", 0.5);
  const theme = useTheme();
  const [pending, setPending] = useState(false);

  const handleStartTournament = async () => {
    setPending(true);
    // Your start tournament logic here
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    setPending(false);
  };

  return (
    <section id="about" ref={ref}>
      <Container>
        <Box>
          <Grid
            alignItems={"center"}
            ref={ref}
            container
            spacing={2}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} md={7} order={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
              
              <Link href="/" className="flex items-center mb-4 mt-10">
                <Image
                  src="/tournamentHublogo.png"
                  alt="Logo"
                  width={300}
                  height={300}
                />
              </Link>

              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                The Ultimate Tournament Hosting Solution.
              </Typography>
              <Typography
                variant="body1"
                className={styles.descriptionParagraph}
              >
                Tournament Hub is a dynamic platform designed for organizing and
                managing tournaments with ease. Whether you're hosting a local
                competition or an international event, Tournament Hub provides
                comprehensive tools to create brackets, manage participants,
                schedule matches, and display real-time results. Built with modern
                web technologies, including Next.js, AI, and MongoDB, it ensures a
                seamless experience for organizers and participants alike. With
                features like team management, automated match generation, and
                integration with popular game platforms, Tournament Hub is your
                go-to solution for professional and amateur tournaments.
              </Typography>
              <button
                type="button"
                onClick={handleStartTournament}
                className="group flex items-center justify-center gap-2 h-[3rem] w-[14rem] mt-6 bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
                disabled={pending}
              >
                {pending ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  <>
                    Start a Tournament{" "}
                  </>
                )}
              </button>
            </Grid>
            <Grid item xs={6} md={3} order={{ xs: 0, sm: 0, md: 1, lg: 1 }}>
              <script
                src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
                async
              ></script>
              <lottie-player
                src="https://lottie.host/01ff2562-3f0f-40a6-8077-fe849a6f9014/wuSsaOySwz.json"
                background="transparent"
                speed="1"
                loop={true}
                autoplay
              ></lottie-player>
              <lottie-player
                src="https://lottie.host/7e8ba074-33ba-4531-b202-660fe41d3f57/UJliDvSwFI.json"
                background="transparent"
                speed="1"
                loop={true}
                autoplay
              ></lottie-player>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

export default Description;
