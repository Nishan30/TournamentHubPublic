import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] top-[-20px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-lg">Cosmic Forces</CardTitle>
            <CardDescription>@cosmic_forces</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Saved 10+ hours of management time for organizing tournament!</CardContent>
      </Card>

      {/* Team */}
{/* Team & Player Management */}
<Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="participant.png"
            alt="Team Management"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 object-cover"
          />
          <CardTitle className="text-center">Team & Player Management</CardTitle>
          <CardDescription>Effortlessly manage participants.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          "Easily organize teams and individual players with powerful tools."
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Start managing your tournaments for free.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button variant = "green" className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["100 participants", "Testnet integration"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[1px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Customizable Brackets
          </CardTitle>
          <CardDescription>
            Design your tournament, your way.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Create Your Bracket</Button>
        </CardContent>
        <CardFooter>
          <div className="space-y-4">
            {["Flexible layouts", "Dynamic updates", "Multiple formats"].map(
              (feature) => (
                <span
                  key={feature}
                  className="flex items-center"
                >
                  <Check className="text-green-500" />
                  <h3 className="ml-2">{feature}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
