import { Trophy, Key, Bot } from "lucide-react";
import { FeatureCard } from "../feature-card";

export function FeaturesGrid() {
  const features = [
    {
      title: "Explore Tournaments",
      description:
        "Explore new tournaments and join the tournament.",
      icon: Key,
      url: "/dashboard/participant/tournaments/exploreTournament", // Add the route here
    },
    {
      title: "Create your own tournaments",
      description:
        "Create new tournaments based on your needs and requirements in minutes.",
      icon: Trophy,
      url: "/chooseTournament", 
    },
    {
      title: "Explore Joined Tournaments",
      description:
        "Integrate AI-powered features to enhance tournament management.",
      icon: Bot,
      url: "/dashboard/participant/tournaments/joinedTournament", // Add the route here
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
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
