"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

const BASE_URL = process.env.BASE_PATH || "/images/";

type ImgProps = Omit<ImageProps, 'src'> & {
  className?: string;
  src?: string;
  alt?: string;
  isStatic?: boolean;
};

const Img: React.FC<ImgProps> = ({
  className,
  src = "img_logo_1_525x529.png",
  alt = "testImg",
  isStatic = false,
  width = 525,
  height = 529,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      className={className}
      src={isStatic ? imgSrc : `${BASE_URL}${imgSrc}`}
      alt={alt}
      width={width}
      height={height}
      {...restProps}
      onError={() => setImgSrc("img_logo_1_525x529.png")}
    />
  );
};

export { Img };
