"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "../common/theme-provider";

interface FeatureCardProps {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  url: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
  url,
}: FeatureCardProps) {
  const router = useRouter();
  const { theme } = useTheme();

  const handleCardClick = () => {
    router.push(url);
  };

  const bgColor = theme === "light" ? "bg-white" : "bg-neutral-900/50";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const borderColor = theme === "light" ? "border-black/10" : "border-neutral-700";
  const hoverBgColor = theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900";

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        `group relative rounded-lg ${bgColor} ${textColor} border ${borderColor} p-6 transition-all ${hoverBgColor} cursor-pointer`,
        className
      )}
    >
      <div className={`mb-4 inline-flex rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-neutral-800"} p-3`}>
        <Icon className={`${theme === "light" ? "text-black" : "text-neutral-100"} h-6 w-6`} />
      </div>
      <h3 className={`mb-2 text-lg font-semibold ${textColor}`}>{title}</h3>
      <div className={`${theme === "light" ? "text-gray-600" : "text-neutral-400"}`}>
        {description}
      </div>
    </div>
  );
}