'use client';
import React from "react";
import { SidebarLayoutArbiter } from "@/components/common/sidebarArbiter";
import { ArbiterWelcomeHeader } from "@/components/dashboard/arbiter/welcome-header";
import { FeaturesGrid } from "@/components/dashboard/arbiter/features-grid";
import { SupportGrid } from "@/components/dashboard/arbiter/support-section";

function App() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-1/7 ">
        <SidebarLayoutArbiter activeItem="Overview" />
      </aside>
      
      <div className="flex">
      <div className="shadow"></div>
        <main className="container py-8">
          <ArbiterWelcomeHeader />
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
