import { Trophy, Key, Bot, FileText, MessagesSquare, Blocks } from "lucide-react";
import { FeatureCard } from "../feature-card";

export function SupportGrid() {
  const features = [
    {
      title: "Documentation",
      description:
        "Access comprehensive guides and documentation for all features.",
      icon: FileText,
      url: "/documentation", 
    },
    {
      title: "Discord Community",
      description:
        "Join our Discord community for support and tournament discussions.",
      icon: MessagesSquare,
      url: "/createtournament", 
    },
    {
      title: "Tournament Templates",
      description:
        "Choose from pre-built tournament templates to get started quickly.",
      icon: Blocks,
      url: "/createtournament", 
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
          url={feature.url} 
        />
      ))}
    </div>
  );
}