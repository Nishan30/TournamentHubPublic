"use client";
import { Text, Heading, Img } from "..";
import React from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

interface Props {
  className?: string;
}

export default function Sidebar2({ ...props }: Props) {
  const [collapsed, setCollapsed] = React.useState(false);

  // Use this function to collapse/expand the sidebar
  // function collapseSidebar() {
  //   setCollapsed(!collapsed);
  // }

  return (
    <Sidebar
      width="292px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      className={`${props.className} flex flex-col h-screen pt-[49px] top-0 md:pt-5 md:p-5 bg-white-A700 !sticky overflow-auto md:hidden`}
    >
      <div className="flex flex-col items-center gap-[41px] self-stretch">
        <Img
          src="img_sidebar_logo.png"
          width={183}
          height={28}
          alt="sidebarlogo"
          className="h-[39px] w-[183px] object-contain"
        />
        <Img src="img_separator_gray_50.svg" width={290} height={1} alt="separator" className="h-px w-full" />
      </div>
      <Menu
        menuItemStyles={{
          button: {
            padding: "16px 16px 16px 32px",
            gap: "12px",
            alignSelf: "start",
            color: "#3a3a3e",
            fontWeight: 500,
            fontSize: "16px",
            "&.ps-active": { color: "#b263f4", fontWeight: 700 }
          },
        }}
        rootStyles={{ [`.${sidebarClasses.container}`]: { gap: "0.35px" } }}
        className="mt-[39px] flex w-full flex-col self-stretch"
      >
        <MenuItem icon={<Img src="img_icon_deep_purple_a400.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}>
          Dashboard
        </MenuItem>
        <MenuItem icon={<Img src="img_icon_indigo_200.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}>
          NFT Marketplace
        </MenuItem>
        <MenuItem icon={<Img src="img_icon_indigo_200_28x28.svg" width={28} height={28} alt="icon" className="h-[28px] w-[28px]" />}>
          Tables
        </MenuItem>
        <MenuItem icon={<Img src="img_icon_indigo_200_24x24.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}>
          Kanban
        </MenuItem>
        <MenuItem icon={<Img src="img_icon_2.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}>
          Profile
        </MenuItem>
        <MenuItem icon={<Img src="img_icon_3.svg" width={24} height={24} alt="icon" className="h-[24px] w-[24px]" />}>
          Sign In
        </MenuItem>
      </Menu>
      {collapsed ? (
        <div className="mt-[41px] flex w-[79%] flex-col items-center">
          <div className="relative w-[41%] rounded-[47px] border-[5px] border-solid border-white-A700 bg-gradient2 pb-5 pl-[21px] pr-[22px] pt-[21px] shadow-sm md:w-full sm:px-5 sm:pt-5">
            <Img
              src="img_settings_white_a700.svg"
              width={41}
              height={41}
              alt="settings"
              className="h-[41px] w-[41px] rounded-[50%]"
            />
          </div>
          <div className="relative mt-[-46px] self-stretch rounded-[24px] bg-gradient2 pb-[41px] pt-[76px] md:py-5">
            <div className="flex flex-col items-center gap-[3px]">
              <Heading size="xl" as="h6" className="tracking-[-0.32px] !text-white-A700">
                Upgrade to PRO
              </Heading>
              <Text as="p" className="w-full text-center leading-6 tracking-[-0.28px] !text-indigo-50">
                To get access to all features! Connect with Venus World!{` `}
              </Text>
            </div>
          </div>
        </div>
      ) : null}
    </Sidebar>
  );
}
