import { Text } from ".."
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export default function Footer({ ...props }: Props) {
  return (
    <footer {...props} className={`${props.className} w-[100%] md:w-full`}>
      <div className="flex w-full items-center justify-between gap-5 md:flex-col">
        <Text as="p" className="self-end tracking-[-0.28px] !text-indigo-200">
          <span className="text-indigo-200">© 2024 TournamentHub. All Rights Reserved. Made by&nbsp;</span>
          <span className="font-bold text-indigo-200">Nishan</span>
        </Text>
        <div className="flex w-[24%] flex-wrap justify-between gap-5 md:w-full">
          <Link href="Marketplace" target="_blank" rel="noreferrer" className="self-end">
            <Text as="p" className="tracking-[-0.28px] !text-indigo-200">
              Home
            </Text>
          </Link>
          <Link href="License" target="_blank" rel="noreferrer" className="self-start">
            <Text as="p" className="tracking-[-0.28px] !text-indigo-200">
              License
            </Text>
          </Link>
          <Link href="#" className="self-start">
            <Text as="p" className="tracking-[-0.28px] !text-indigo-200">
              Terms of Use
            </Text>
          </Link>
          <Link href="Blog" target="_blank" rel="noreferrer" className="self-end">
            <Text as="p" className="tracking-[-0.28px] !text-indigo-200">
              Blog
            </Text>
          </Link>
        </div>
      </div>
    </footer>
  );
}
