"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createTournament } from '@/contracts/tournament';
import { retrievePublicKey, checkConnection } from '../../contracts/connectWallet';
import toast from 'react-hot-toast';

// Import your UI components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

const tournamentSchema = z.object({
  name: z.string().nonempty("Tournament name is required"),
  description: z.string(),
  location: z.string(),
  tournamentType: z.enum([
    "Single Elimination",
    "Double Elimination",
    "Round Robin",
  ]),
  is_individual: z.boolean(),
  needsArbiter: z.boolean(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  rules: z.string(),
});

type TournamentFormValues = z.infer<typeof tournamentSchema>;

const TournamentForm: React.FC = () => {
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [publicKey, setPublicKey] = useState("Wallet not Connected...");
  const [modalMsg, setModalMsg] = useState('');

  useEffect(() => {
    if (publicKey !== "Wallet not Connected...") {
      setConnectStatus('Connected!');
    }
  }, [publicKey]);

  const connectWallet = async () => {
    setModalMsg('Connecting...');
    if (await checkConnection()) {
      let pk = await retrievePublicKey();
      setPublicKey(pk);
    } else {
      setModalMsg('Failed to connect wallet.');
    }
  };

  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      tournamentType: "Single Elimination",
      is_individual: true,
      needsArbiter: true,
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      rules: "",
    },
  });

  const { handleSubmit, control, formState } = form;

  const onSubmit = async (data: TournamentFormValues) => {
    try {
      const tournamentDetails = {
        description: data.description,
        end_date: data.dateRange.to, // Unix timestamp
        is_individual: data.is_individual,
        location: data.location,
        name: data.name,
        needs_arbriter: data.needsArbiter,
        rules: data.rules,
        start_date: data.dateRange.from, // Unix timestamp
        tournament_type: data.tournamentType
      };
      console.log("Creating tournament with details:", tournamentDetails);
      const res = await createTournament(tournamentDetails);
      toast.success("Successfully created tournament");
      console.log("Tournament created:", res);
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  return (
    <div>
      <div
        className="w-48 mx-auto flex items-center justify-center mb-2 mt-4 cursor-pointer"
        onClick={connectWallet}
        style={{ backgroundColor: '#634CC9', boxShadow: '0px 1px 5px #000' }}
      >
        <h6 className="my-1 mx-2 text-white">{connectStatus}</h6>
        <img src="freighter.svg" alt="Freighter Wallet" width={30} />
      </div>

      {/* Tournament Form */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto space-y-6 p-6 rounded shadow-lg"
        >
          {/* Tournament Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter tournament name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your tournament's public name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tournament description"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormDescription>Provide a brief overview of your tournament.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter location"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Specify the venue or platform.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tournament Type */}
          <FormField
            control={control}
            name="tournamentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full p-2 border rounded mt-2 bg-black"
                  >
                    <option value="Single Elimination">Single Elimination</option>
                    <option value="Double Elimination">Double Elimination</option>
                    <option value="Round Robin">Round Robin</option>
                  </select>
                </FormControl>
                <FormDescription>Select the tournament format.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Needs Arbiter */}
          <FormField
            control={control}
            name="needsArbiter"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-3">Needs Arbiter</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Range */}
          <FormField
            control={control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start and End Date</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    selected={{
                      from: field.value?.from,
                      to: field.value?.to,
                    }}
                    onChange={(range) => field.onChange(range)}
                  />
                </FormControl>
                <FormDescription>
                  Select the date range for the tournament.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rules */}
          <FormField
            control={control}
            name="rules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tournament rules"
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormDescription>Specify any rules or guidelines.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded mt-4"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Creating..." : "Create Tournament"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TournamentForm;