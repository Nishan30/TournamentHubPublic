"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const participantFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  teamName: z.string(),
  walletAddress: z.string(),
  paymentDetails: z.string(),
  entryFeeDetails: z.string(),
  phoneNumber: z.string(),
  questions: z.string(),
});

export type ParticipantFormValues = z.infer<typeof participantFormSchema>;

interface ParticipantFormProps {
  onSubmit: (values: ParticipantFormValues) => void; // Submit handler callback
  onCancel?: () => void; // Cancel handler callback
  defaultValues?: Partial<ParticipantFormValues>; // Optional default values for pre-filled form
  isSubmitting?: boolean; // Loading state
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  isSubmitting = false,
}) => {
  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantFormSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      teamName: "",
      walletAddress: "",
      paymentDetails: "",
      entryFeeDetails: "",
      phoneNumber: "",
      questions: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Wallet Address */}
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your wallet address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Details */}
        <FormField
          control={form.control}
          name="paymentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter payment details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Entry Fee Details */}
        <FormField
          control={form.control}
          name="entryFeeDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Fee Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter entry fee details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Questions */}
        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide additional information"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="green" type="submit" className="flex" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
