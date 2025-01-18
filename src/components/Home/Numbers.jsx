"use client";

import React from "react";
import { Card, Grid, Typography, Box } from "@mui/material";
import { useTheme } from "../common/theme-provider";
import style from "@/styles/Home/Home.module.css";
import { useSectionInView } from "@/lib/hooksHome";
import { Container } from "../common";

function NumbersSection() {
    const { ref } = useSectionInView("Testimonials");
  const { theme } = useTheme();

  const cardStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    dark: {
      backgroundColor: "#1d1d1d",
      color: "#ffffff",
    },
  };

  const textColorStyles = {
    light: "#000000",
    dark: "#ffffff",
  };

  return (
    <section id="numbers" ref={ref}>
            <Container>
    <Box className={style.sectionContainer}>
      <Typography variant="h5" color={textColorStyles[theme]}>
        <span>Tournament HUB </span>
        by Numbers
      </Typography>
      <Grid container spacing={2} paddingTop={1.5}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              paddingX: 3,
              paddingY: 2,
              borderRadius: 5,
              ...cardStyles[theme],
            }}
          >
            <Typography
              variant="body2"
              color="text.green"
              fontWeight={500}
            >
              Tournaments Hosted
            </Typography>
            <Typography variant="h5" color={textColorStyles[theme]}>
              50
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              paddingX: 3,
              paddingY: 2,
              borderRadius: 5,
              ...cardStyles[theme],
            }}
          >
            <Typography
              variant="body2"
              color="text.green"
              fontWeight={500}
            >
              Participants in the Tournament
            </Typography>
            <Typography variant="h5" color={textColorStyles[theme]}>
              10,000
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </section>
  );
}

export default NumbersSection;
