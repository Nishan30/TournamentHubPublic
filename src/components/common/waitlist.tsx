"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "../PortfolioComponent/section-heading";
import SubmitBtn from "../PortfolioComponent/submit-btn";
import { useSectionInView } from "@/lib/hooksHome";

export default function Waitlist() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        toast.success("You've successfully joined the waitlist!");
        setEmail("");
        setName("");
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
    <motion.section
      id="waitlist"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Join the Waitlist</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Enter your email and name to join the waitlist for early access.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("email", email);
          formData.append("name", name);
          handleSubmit(formData);
        }}
        className="mt-10 flex flex-col dark:text-black"
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <input
          className="h-14 px-4 mt-3 mb-3 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <SubmitBtn onSubmit={handleSubmit} />
      </form>
    </motion.section>
  );
}
