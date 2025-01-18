'use client';
import React, { useEffect } from "react";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { WelcomeHeader } from "@/components/dashboard/organizer/welcome-header";
import { FeaturesGrid } from "@/components/dashboard/organizer/features-grid";
import { SupportGrid } from "@/components/dashboard/organizer/support-section";
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

function App() {
  const router = useRouter();
  const user = useUser();
  useEffect(() => {

      if (!user.user) {
        const currentPath = window.location.pathname;
        router.push(`/signin?redirect=${encodeURIComponent(currentPath)}?accountType=Organizer`);
        return undefined;
      }});
  return (
    <div className="min-h-screen flex">
      <aside className="w-1/7 ">
        <SidebarLayoutOrganizer activeItem="Overview" />
      </aside>
      
      <div className="flex">
      <div className="shadow"></div>
        <main className="container py-8">
          <WelcomeHeader />
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

export default App;
