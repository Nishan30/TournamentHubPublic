import { Card, Rating, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../common/theme-provider";

function RatingBox({
  name,
  imageLink,
  reviewText,
  reviewScore,
  ...otherProps
}) {
  const { theme } = useTheme(); 

  const backgroundColorStyles = {
    light: "#ffffff", // Background color for light mode
    dark: "#1d1d1d",  // Background color for dark mode
  };

  const textColorStyles = {
    light: "#000000", // Text color for light mode
    dark: "#ffffff",  // Text color for dark mode
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        borderRadius: 5,
        minHeight: 225,
        backgroundColor: backgroundColorStyles[theme], // Set background color based on theme
        color: textColorStyles[theme], // Set text color based on theme
      }}
      {...otherProps}
    >
      <Typography variant="h5">
        {name}
      </Typography>
      <Rating readOnly value={reviewScore} name="readOnly" emptyIcon={false} />
      <Typography variant="body2" textAlign={"center"}>
        {reviewText}
      </Typography>
    </Card>
  );
}

export default RatingBox;
