"use client";

import React from "react";
import {
  Blocks,
  Server,
  ArrowRight,
  Shield,
  Clock,
  Coins,
  Users,
  Database,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

function FeatureItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
}

function TournamentCard({
  title,
  icon: Icon,
  features,
  url,
  gradient,
}: {
  title: string;
  icon: React.ElementType;
  features: string[];
  url: string;
  gradient: string;
}) {
  const router = useRouter();

  return (
    <div
      className={`${gradient} p-1 rounded-xl transition-transform hover:scale-105 cursor-pointer`}
      onClick={() => router.push(url)} // Using `router.push` for navigation
    >
      <div className="bg-black p-6 rounded-lg h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-8 h-8" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-3 flex-grow">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={[Shield, Clock, Coins, Users, Database, Lock][index % 6]}
              text={feature}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center text-blue-600 font-semibold">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Tournament Type</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect tournament platform for your needs. Whether you prefer the security and transparency
            of blockchain or the simplicity of traditional tournaments, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TournamentCard
            title="Blockchain Tournament"
            icon={Blocks}
            gradient="bg-gradient-to-r from-purple-500 to-blue-500"
            features={[
              "Smart contract-based automated prize distribution",
              "Immutable tournament records",
              "Transparent prize pools",
              "Decentralized verification",
              "Enhanced security",
            ]}
            url="/createMatchStellar"
          />

          <TournamentCard
            title="Traditional Tournament"
            icon={Server}
            gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
            features={[
              "Simple setup process",
              "Flexible tournament formats",
              "Real-time updates",
              "Easy participant management",
              "Lower entry barrier",
            ]}
            url="/createtournament"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
