import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import image3 from "../../assets/images/unity.png";
import image4 from "../../assets/images/unreal.png";
import image5 from "../../assets/images/react-native-1.svg";
import Image, { StaticImageData } from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
  downloadLink: string; // Added field for download link
}

const features: FeatureProps[] = [
  {
    title: "Unity SDK",
    description:
      "Our Unity SDK integrates smoothly with the Tournament Hub platform, offering tools to manage tournaments, players, and match data. It includes real-time match updates, player stats tracking, and easy APIs to simplify game development and improve player experience..",
    image: image3,
    downloadLink: "/path/to/responsive-design-sdk.zip",
  },
  {
    title: "Unreal Engine SDK",
    description:
      "Our Unreal Engine SDK integrates seamlessly with the Tournament Hub platform, allowing you to manage tournament data, players, and match stats within Unreal Engine. It offers real-time updates and easy APIs to streamline development and enhance the player experience.",
    image: image4,
    downloadLink: "/path/to/ui-sdk.zip",
  },
  {
    title: "React Native SDK",
    description:
      "Our React Native SDK enables seamless integration with the Tournament Hub platform, allowing you to manage tournament data, players, and match stats directly within your mobile app. With real-time updates and simple APIs, it streamlines development and enhances the player experience across iOS and Android devices.",
    image: image5,
    downloadLink: "/path/to/ui-sdk.zip",
  },
];

export const SDKFeatures = () => {
  return (
    <section id="sdks" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Available{" "}
        </span>
        SDKs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image, downloadLink }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt={`Image for feature: ${title}`}
                width={200} 
                height={100} 
                className="w-full h-auto object-cover mx-auto"
              />
              {/* <div className="mt-3">
                <Button asChild>
                  <a href={downloadLink} download className="w-full">
                    Download SDK
                  </a>
                </Button>
              </div> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
