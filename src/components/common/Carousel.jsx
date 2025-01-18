"use client"

import { Circle } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";

function Carousel({ items, ...otherProps }) {
  const [curActive, setCurActive] = useState(0);
  const theme = useTheme();
  return (
    <Box {...otherProps}>
      {items.map((item, idx) => {
        return curActive === idx && <div key={idx}>{item}</div>;
      })}
      <Box display={"flex"} paddingY={1} justifyContent={"center"}>
        {items.map((_, idx) => {
          return (
            <Circle
              key={idx}
              sx={{
                fontSize: 10,
                paddingX: 0.25,
              }}
              onClick={() => {
                setCurActive(idx);
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Carousel;
