import { CloseSVG } from "@/assets/images";
import { Img, Heading } from "../../components";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  title: string;
}

export default function Header({ title, ...props }: Props) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <header {...props} className="relative w-full p-5"> 
      <div className="flex items-start justify-between gap-5 w-full md:flex-col">
        <div className="flex flex-col">
          <Heading size="5xl" as="h2" className="tracking-[-0.68px]">
            {title}
          </Heading>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex items-center gap-7 mt-5 mr-3"> 
        <Link href="#">
          <Img
            src="notifications_none.svg"
            width={30}
            height={30}
            alt="notifications"
            className="h-[30px] w-[30px]"
          />
        </Link>
        <Link href="#">
          <Img
            src="moon-solid 1.svg"
            width={30}
            height={30}
            alt="moonsolidone"
            className="h-[24px] w-[24px]"
          />
        </Link>
        <Link href="#">
          <Img
            src="info_outline.svg"
            width={30}
            height={30}
            alt="infooutline"
            className="h-[30px] w-[30px]"
          />
        </Link>
        <Link href="#">
          <Img
            src="player.svg"
            width={41}
            height={41}
            alt="eclipsefive"
            className="h-[45px] w-[45px] object-cover sm:w-full"
          />
        </Link>
      </div>
    </header>
  );
}
