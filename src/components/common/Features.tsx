import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import image from "../../assets/images/growth.png";
import image3 from "../../assets/images/reflecting.png";
import image4 from "../../assets/images/looking-ahead.png";
import Image, { StaticImageData } from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const coreFeatures: FeatureProps[] = [
  {
    title: "Automated Scheduling",
    description: "Streamline tournament scheduling with intelligent automation, saving time and reducing manual errors.",
    image: image4,
  },
  {
    title: "Smart Contract Governance",
    description: "Ensure transparency and fairness with blockchain-powered smart contracts managing tournament rules and rewards.",
    image: image3,
  },
  {
    title: "Tokenized Rewards System",
    description: "Reward participants with tokens for achievements, fostering engagement and long-term participation.",
    image: image,
  },
];

const featureList: string[] = [
  "Real-Time Updates",
  "Advanced Analytics Dashboard",
  "Customizable Tournament Formats",
  "Cross-Platform Accessibility",
  "Sponsor & Partner Integration",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      {/* Core Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreFeatures.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
            <CardFooter>
              <Image
                src={image}
                alt={`Image for feature: ${title}`}
                width={300}
                height={200}
                className="w-full h-auto object-cover mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Additional Features Section */}
      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
};
