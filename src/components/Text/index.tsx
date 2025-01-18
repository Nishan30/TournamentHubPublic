"use client";

import React from "react";

const sizes = {
  xs: "text-xs font-medium",
  lg: "text-lg font-medium",
  s: "text-sm font-medium",
  xl: "text-[40px] font-normal md:text-[38px] sm:text-4xl",
  md: "text-base font-medium",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "s",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component className={`text-deep_orange-A200 font-dmsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
