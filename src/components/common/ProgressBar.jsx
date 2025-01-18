"use client"

import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/system";

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
  },
}));

export default ProgressBar;
