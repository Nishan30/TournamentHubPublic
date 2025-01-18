"use client";

import { SendPayment } from "@/components/send-payment";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
const MyTournaments = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutOrganizer activeItem="Arbiter Management" />
      </aside>

      {/* Centered SendPayment Component */}
      <div className="flex-grow flex justify-center items-center px-8">
        <SendPayment />
      </div>
    </div>
  );
};

export default MyTournaments;
