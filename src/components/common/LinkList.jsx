import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Footer.module.css";

function LinkList({ title, links, ...otherProps }) {
  const theme = useTheme();
  return (
    <Box {...otherProps}>
      <Typography variant="h6" color={"primary"} marginTop={3}>
        {title}
      </Typography>
      {links.map((link, idx) => {
        return (
          <Link className={styles.link} href={link.link} key={idx}>
            <Typography variant="h6" color={"textPrimary"} lineHeight={1.3}>
              {link.name}
            </Typography>
          </Link>
        );
      })}
    </Box>
  );
}

export default LinkList;
