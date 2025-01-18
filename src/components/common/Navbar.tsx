"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon, TrophyIcon } from "./Icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Web3Button = dynamic(() => import("@/components/common/Web3Button"), {
  ssr: false,
});



interface RouteProps {
  href: string;
  label: string;
}
const routeList = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#sdks", label: "SDKs" },
  { href: "#projects", label: "Public Tournaments" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#newsletter", label: "Contact" },
];

export default function HeaderH() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-background dark:border-b-slate-700">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          {/* Logo and Desktop Navigation */}
          <NavigationMenuItem className="flex items-center font-bold">
            <Link href="/" className="flex items-center text-xl font-bold">
              <TrophyIcon />
              Tournament Hub
            </Link>
          </NavigationMenuItem>

          {/* Mobile Menu */}
          <span className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">MyApp</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-center gap-2 mt-4">
                  {routeList.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className={clsx(
                      "w-[110px] border",
                      buttonVariants({ variant: "secondary" })
                    )}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    GitHub
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>
          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>
          {/*<Web3Button title="Connect Wallet" />*/}
          <div className="hidden md:flex gap-2">
          <Button 
            onClick={handleSignIn}
            className={`border ${buttonVariants({ variant: "secondary" })}`}>
            Sign In
          </Button>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
