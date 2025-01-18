"use client";

import { useRouter } from 'next/navigation';
import React from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Img } from "@/components";

interface Props {
  className?: string;
  tournamentId: string;  // Add tournamentId prop
}

export default function Sidebar1({ tournamentId, ...props }: Props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();

  // Use this function to collapse/expand the sidebar
  function collapseSidebar() {
    setCollapsed(!collapsed);
  }

  return (
    <Sidebar
      width="292px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      className={`${props.className} flex flex-col h-screen pt-5 top-0 md:pt-5 md:p-5 rounded-br-[20px] bg-gray-300 !sticky overflow-auto md:hidden`}
    >
      <div className="flex flex-col items-center gap-[12px] self-stretch">
        <Img
          src="img_sidebar_logo.png"
          width={183}
          height={28}
          alt="sidebarlogo"
          className="h-[52px] w-[183px] object-contain"
        />
        <Img src="img_separator.svg" width={290} height={1} alt="separator" className="h-px w-full" />
      </div>
      <Menu
        menuItemStyles={{
          button: {
            padding: "16px 16px 16px 32px",
            gap: "12px",
            alignSelf: "start",
            color: "#31363B",
            fontWeight: 500,
            fontSize: "16px",
          },
        }}
        rootStyles={{ [`.${sidebarClasses.container}`]: { gap: "0.35px" } }}
        className="mt-[39px] flex w-full flex-col self-stretch"
      >
        <MenuItem 
          icon={<Img src="img_icon.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}
          onClick={() => router.push(`/tournament/${tournamentId}`)}
        >
          Overview
        </MenuItem>
        <MenuItem 
          icon={<Img src="icons8-players-64.png" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}
          onClick={() => router.push(`/players/${tournamentId}`)}  // Use tournamentId here
        >
          Players
        </MenuItem>
        <MenuItem 
          icon={<Img src="icons8-battle-50.png" width={28} height={28} alt="icon" className="h-[28px] w-[28px]" />}
          onClick={() => router.push(`/Matches/${tournamentId}`)}  // Use tournamentId here
        >
          Matches
        </MenuItem>
        <MenuItem 
          icon={<Img src="icons8-economy-50.png" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}
          onClick={() => router.push(`/Economy/${tournamentId}`)}  // Use tournamentId here
        >
          Economy
        </MenuItem>
        <MenuItem 
          icon={<Img src="icons8-leaderboard-24.png" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}
          onClick={() => router.push(`/Leaderboard/${tournamentId}`)}  // Use tournamentId here
        >
          Leaderboard
        </MenuItem>
        <MenuItem 
          icon={<Img src="icons8-settings-50.png" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}
          onClick={() => router.push(`/settings/${tournamentId}`)}  // Use tournamentId here
        >
          Settings
        </MenuItem>
      </Menu>
      {collapsed ? (
        <Img
          src="img_logo_1.png"
          width={85}
          height={84}
          alt="logoone"
          className="mt-[382px] h-[84px] w-[85px] object-cover"
        />
      ) : null}
    </Sidebar>
  );
}
