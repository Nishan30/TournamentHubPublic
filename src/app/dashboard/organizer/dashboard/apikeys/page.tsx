'use client';

import React, { useState } from "react";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { ApiKeyCard } from "@/components/api-keys/apikeycard";
import { useTournament } from "@/context/tournamentContext";
import toast from "react-hot-toast";

function generateRandomKey(length:any) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ApiKeysPage() {
  const { activeTournament } = useTournament();
  const [clientSecret, setClientSecret] = useState(generateRandomKey(16));

  const handleResetSecret = () => {
    // In a real application, this would make an API call to generate a new secret
    const newSecret = generateRandomKey(16);
    setClientSecret(newSecret);
    toast.success("Client Secret has been reset");
  };

  if (!activeTournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Layout */}
      <aside className="w-1/7 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutOrganizer activeItem="API Keys" />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight pl-10 pr-10 mt-10">API Keys</h1>
        <div className="max-w-4xl mx-auto space-y-8 p-8">
          <div className="space-y-6">
            {/* API Key Card */}
            <ApiKeyCard
              title="Tournament Id"
              description="Use this ID to authenticate API requests for your tournament."
              value={activeTournament.id}
            />

            {/* Client Secret Card */}
            <ApiKeyCard
              title="Client Secret"
              description="Use this secret key for secure server-side API requests. Never share or expose this key."
              value={clientSecret}
              onReset={handleResetSecret}
              showResetButton
            />
          </div>
          <div className="shadow"></div>
        </div>
      </main>
    </div>
  );
}

export default ApiKeysPage;