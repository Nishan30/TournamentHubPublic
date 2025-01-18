"use client";
import React from "react";

const sizes = {
  "3xl": "text-xl font-bold",
  "2xl": "text-lg font-bold",
  "5xl": "text-[34px] font-bold md:text-[32px] sm:text-3xl",
  xl: "text-base font-bold",
  "4xl": "text-2xl font-bold md:text-[22px]",
  "6xl": "text-4xl font-bold md:text-[34px] sm:text-[32px]",
  s: "text-[11px] font-bold",
  md: "text-xs font-bold",
  xs: "text-[8px] font-bold",
  lg: "text-sm font-bold",
};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "lg",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component className={`text-blue_gray-900 font-dmsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
