'use client';
import React from "react";
import { SidebarLayoutParticipant } from "@/components/common/sidebarParticipant";
import { ParticipantWelcomeHeader } from "@/components/dashboard/participant/welcome-header";
import { FeaturesGrid } from "@/components/dashboard/participant/features-grid";
import { SupportGrid } from "@/components/dashboard/participant/support-section";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

function ParticipantOverview() {
  const router = useRouter();
  const user = useUser();
  if (!user.user) {
    router.push(`/signin?accountType=Participant`);
    return null;
  }
  return (
    <div className="min-h-screen flex">
      <aside className="w-1/7 ">
        <SidebarLayoutParticipant activeItem="Overview" />
      </aside>
      
      <div className="flex">
      <div className="shadow"></div>
        <main className="container py-8">
          <ParticipantWelcomeHeader />
          <div className="mb-8">
            <p className="text-3xl md:text-3xl font-bold inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">Start here</p>
            <FeaturesGrid />
          </div>
          <div className="mb-8">
            <p className="text-3xl md:text-3xl font-bold inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">Support</p>
            <SupportGrid />
          </div>
          <div className="shadow"></div>
        </main>
      </div>
    </div>
  );
}

export default ParticipantOverview;
