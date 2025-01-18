'use client';

import { Text, Button, Heading, Img } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";

const MyTournaments = () => {
  return (
    <SidebarLayoutOrganizer activeItem="Manage Arbiters">
    </SidebarLayoutOrganizer>
  );
};

export default MyTournaments;
