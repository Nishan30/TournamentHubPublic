import { Img, Text } from ".."
import React from "react";

interface Props {
  className?: string;
  checkboximage?: string;
  pagetitle?: string;
}

export default function ProjectDashboard({
  checkboximage = "img_check_box_outline_blank.svg",
  pagetitle = "Landing Page Design",
  ...props
}: Props) {
  return (
    <div {...props} className={`${props.className} flex justify-between items-center gap-5 flex-1`}>
      <div className="flex items-center gap-4">
        <Img src={checkboximage} width={24} height={24} alt="landingpagedesi" className="h-[24px] w-[24px]" />
        <Text size="md" as="p" className="self-end tracking-[-0.32px]">
          {pagetitle}
        </Text>
      </div>
      <Img src="img_drag_indicator.svg" width={24} height={24} alt="landingpagedesi" className="h-[24px] w-[24px]" />
    </div>
  );
}
