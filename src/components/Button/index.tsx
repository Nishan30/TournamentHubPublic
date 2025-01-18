"use client";
import React from "react";

const shapes = {
  square: "rounded-[0px]",
  circle: "rounded-[50%]",
  round: "rounded-[10px]",
} as const;

const variants = {
  fill: {
    gray_300: "bg-gray-300 text-black-900",
    gray_100: "bg-gray-100",
    red_50: "bg-red-50",
    deep_orange_A200: "bg-deep_orange-A200  text-white-A700",
    deep_purple_A400: "bg-deep_purple-A400 text-white-A700",
    gray_50: "bg-gray-50 text-orange-A200",
  },
  gradient: {
    blue_A200_light_blue_A400: "bg-gradient",
    white_A700_77_white_A700_00: "bg-gradient1",
  },
  outline: {
    indigo_A100_deep_purple_A400_01: "border-deep_purple-A200 border-solid bg-gradient2",
  },
} as const;

const sizes = {
  sm: "h-[37px] px-[13px] text-sm",
  "3xl": "h-[48px] px-2.5",
  xl: "h-[43px] px-[9px]",
  "4xl": "h-[50px] px-[35px] text-sm",
  "5xl": "h-[54px] px-[35px] text-sm",
  "7xl": "h-[60px] px-[21px]",
  "2xl": "h-[46px] px-[35px] text-sm",
  "6xl": "h-[56px] px-[11px]",
  xs: "h-[34px] px-[9px]",
  md: "h-[37px] px-1.5",
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "onClick"
> &
  Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "md",
  color = "gray_50",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${variant && variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export {Button};
