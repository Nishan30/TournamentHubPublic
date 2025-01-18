import React from "react";
import { Container as MuiContainer, useTheme, Box } from "@mui/material";

function Container({
  paddingUp = false,
  paddingDown = false,
  paddingLeft = true,
  paddingRight = true,
  sx,
  ...otherProps
}) {
  const theme = useTheme();

  const calculatePadding = () => {
    let paddingConfig = {
      paddingTop: paddingUp ? theme.spacing(1) : 0,
      paddingBottom: paddingDown ? theme.spacing(1) : 0,
    };

    const responsivePadding = {
      [theme.breakpoints.up("xs")]: {
        paddingLeft: paddingLeft ? theme.spacing(3) : 0,
        paddingRight: paddingRight ? theme.spacing(3) : 0,
      },
      [theme.breakpoints.up("sm")]: {
        paddingLeft: paddingLeft ? theme.spacing(5) : 0,
        paddingRight: paddingRight ? theme.spacing(5) : 0,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: paddingLeft ? theme.spacing(7) : 0,
        paddingRight: paddingRight ? theme.spacing(7) : 0,
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: paddingLeft ? theme.spacing(10) : 0,
        paddingRight: paddingRight ? theme.spacing(10) : 0,
      },
      [theme.breakpoints.up("xl")]: {
        paddingLeft: paddingLeft ? theme.spacing(15) : 0,
        paddingRight: paddingRight ? theme.spacing(15) : 0,
      },
    };

    return { ...paddingConfig, ...responsivePadding, ...sx };
  };

  const defaultSx = calculatePadding();

  return (
    <Box sx={defaultSx} paddingY={theme.spacing(10)} {...otherProps}>
      {otherProps.children}
    </Box>
  );
}

export default Container;
