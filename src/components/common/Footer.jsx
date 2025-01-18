import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Footer.module.css";
import { Divider, Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { LinkList } from ".";

function Footer() {
  const theme = useTheme();
  const usefulLinks = [
    { link: "https://example.com/page1", name: "Home" },
    { link: "https://example.com/page2", name: "About" },
    { link: "https://example.com/page3", name: "Start a Project" },
    { link: "https://example.com/page4", name: "Docs" },
  ];
  const community = [
    { link: "https://example.com/page1", name: "Twitter" },
    { link: "https://example.com/page2", name: "Discord" },
    { link: "https://example.com/page3", name: "Medium" },
  ];
  const terms = [
    { link: "https://example.com/page1", name: "Privacy Policy" },
    { link: "https://example.com/page2", name: "Terms of Use" },
    { link: "https://example.com/page3", name: "Cookie Policy" },
  ];
  return (
    <Box marginTop={theme.spacing(5)} marginBottom={theme.spacing(3)}>
      <Divider sx={{ borderColor: theme.palette.primary.main }} />
      <footer className={styles.footer}>
        <Link className={styles.logo} href="/">
          <Image src="/logo.svg" alt="Logo" width={250} height={80} />
        </Link>
        <LinkList title={"Useful Links"} links={usefulLinks} marginLeft={8} />
        <LinkList title={"Community"} links={community} marginLeft={8} />
        <LinkList title={"Terms"} links={terms} marginLeft={8} />
      </footer>
    </Box>
  );
}

export default Footer;
