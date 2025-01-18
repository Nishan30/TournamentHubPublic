import { Trophy, Key, Bot } from "lucide-react";
import { FeatureCard } from "../feature-card";
import { useTournament } from "@/context/tournamentContext";

export function FeaturesGrid() {
  const { activeTournament } = useTournament();
  const features = [
    {
      title: "Get your API keys",
      description:
        "Get the API keys to integrate your tournament into your project.",
      icon: Key,
      url: "/dashboard/organizer/dashboard/apikeys", // Add the route here
    },
    {
      title: "Manage Participants",
      description:
        "Integrate AI-powered features to enhance tournament management.",
      icon: Bot,
      url: "/dashboard/organizer/participantsTeams/participantManagement", // Add the route here
    },
    {
      title: "Manage Arbiters",
      description:
        "Integrate AI-powered features to enhance tournament management.",
      icon: Bot,
      url: "/dashboard/organizer/arbiters/manageArbiters",
    },
    {
      title: "Manage Matches",
      description:
        "Integrate AI-powered features to enhance tournament management.",
      icon: Bot,
      url: "/dashboard/organizer/matchManagement/matchSchedule", 
    },
    {
      title: "Create new tournaments",
      description:
        "Create new tournaments based on your needs and requirements in minutes.",
      icon: Trophy,
      url: "/chooseTournament", 
    },
    {
      title: "AI Bot Integration",
      description:
        "Integrate AI-powered features to enhance tournament management.",
      icon: Bot,
      url: "/ai-bot-integration", // Add the route here
    },
  ];

  const reorderedFeatures =
  activeTournament === null
    ? [
        features.find((feature) => feature.title === "Create new tournaments")!,
        ...features.filter((feature) => feature.title !== "Create new tournaments"),
      ]
    : features;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reorderedFeatures.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          url={feature.url} // Pass the route as a prop
        />
      ))}
    </div>
  );
}
