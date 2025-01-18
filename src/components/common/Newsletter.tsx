"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState(""); // State to capture email input

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name: "Users" }), // Pass the user's email
      });

      if (response.ok) {
        toast.success("You've successfully joined the waitlist!");
        setEmail(""); // Clear the input field after success
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "There was an issue. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Waitlist
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Get daily updates and news from Tournament Hub.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="leomirandadev@gmail.com"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            value={email} // Bind the input value to the state
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <Button variant="green" type="submit">Subscribe</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
