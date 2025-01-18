"use client";

import React, { useState } from "react";
import styles from "@/styles/Home/Home.module.css";
import { FaDownload } from "react-icons/fa";
import { Box, Grid, Typography, Button } from "@mui/material";
import Container from "../common/Container";
import { useTheme } from "../common/theme-provider";
import { useSectionInView } from "@/lib/hooksHome";

function SDKDownloads() {
  const { ref } = useSectionInView("SDKs");
  const theme = useTheme();
  const [pendingUnity, setPendingUnity] = useState(false);
  const [pendingUnreal, setPendingUnreal] = useState(false);

  const handleDownloadUnitySDK = async () => {
    setPendingUnity(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPendingUnity(false);
    window.location.href = "/downloads/unity-sdk.zip"; // Adjust the download path as needed
  };

  const handleDownloadUnrealSDK = async () => {
    setPendingUnreal(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPendingUnreal(false);
    window.location.href = "/downloads/unreal-sdk.zip"; // Adjust the download path as needed
  };

  return (
    <section id="sdks" ref={ref}>
    <Container>
      <Box>
        <Grid container spacing={4}>
          {/* Unity SDK Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Enhance Your Game Development with Our Unity SDK.
            </Typography>
            <Typography variant="body1" className={styles.descriptionParagraph}>
              Our Unity SDK is a powerful tool designed to integrate seamlessly with
              the Tournament Hub platform. Whether you're building a simple game or
              a complex multiplayer experience, our SDK provides the tools you need
              to manage tournaments, players, and match data directly within Unity.
              With features like real-time match updates, player statistics tracking,
              and easy-to-use APIs, our SDK simplifies game development and enhances
              the player experience.
            </Typography>
            <img src='/unity.png' alt="Unity Logo" style={{ width: '250px', height: 'auto' }} className="mt-4"/>
            <Button
              onClick={handleDownloadUnitySDK}
              className="group flex items-center justify-center gap-2 h-[3rem] w-[14rem] mt-6 bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
              disabled={pendingUnity}
            >
              {pendingUnity ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <>
                  <FaDownload className="mr-2" />
                  Download Unity SDK
                </>
              )}
            </Button>
          </Grid>

          {/* Unreal Engine SDK Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Power Your Games with Our Unreal Engine SDK.
            </Typography>
            <Typography variant="body1" className={styles.descriptionParagraph}>
              Our Unreal Engine SDK provides robust integration with the Tournament Hub
              platform. It enables you to manage tournament data, players, and match statistics
              directly within Unreal Engine, offering real-time updates and easy-to-use APIs.
              Whether your game is small or large-scale, our SDK is built to enhance the
              development process and elevate the player experience.
            </Typography>
            
            <img src='/unreal.png' alt="Unreal Engine Logo" style={{ width: '250px', height: 'auto' }} className="mt-8" />
            <Button
              onClick={handleDownloadUnrealSDK}
              className="group flex items-center justify-center gap-2 h-[3rem] w-[20rem] mt-6 bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
              disabled={pendingUnreal}
            >
              {pendingUnreal ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <>
                  <FaDownload className="mr-2" />
                  Download Unreal Engine SDK
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </section>
  );
}

export default SDKDownloads;
