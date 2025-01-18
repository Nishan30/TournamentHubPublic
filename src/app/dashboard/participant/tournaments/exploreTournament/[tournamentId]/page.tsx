"use client";

import { useState, useEffect,use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

import { saveParticipantData } from "@/services/mongoDB/mongodb";
import * as z from "zod";
import { useUser } from "@/context/UserContext";
import { SidebarLayoutParticipant } from "@/components/common/sidebarParticipant";
import { getPaymentSettings } from "@/services/tournament/paymentSystem";
import { IPayment } from "@/models/paymentSettingModel";
import { SendPayment } from "@/components/send-payment";


export default function ParticipantPage({ params }: { params: Promise<{ tournamentId: string }> }) {
  const user = useUser();
  const [tournamentId, setTournamentId] = useState<string>("");
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showPaymentSystem, setShowPaymentSystem] = useState(false);
  const [paymentSetting, setPaymentSetting] = useState<IPayment | null>(null);

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
  
  type ParticipantFormValues = z.infer<typeof participantFormSchema>;

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setTournamentId(resolvedParams.tournamentId);
      if (!user.user) {
        router.push(`/signin?accountType=Participant&id=${tournamentId}`);
      }
    };
    resolveParams();

  }, [user, router]);

  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantFormSchema),
    defaultValues: {
      name: "",
      email: user.user?.email,
      teamName: "",
      walletAddress: "",
      paymentDetails: "",
      entryFeeDetails: "",
      phoneNumber: "",
      questions: "",
    },
  });

  const saveData = async () => {
    try {
      await saveParticipantData({
        ...form.getValues(),
        tournamentId: tournamentId,
      });

      toast.success("Registration successful!");
      router.push(`/thankYou`);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async (values: ParticipantFormValues) => {
    setSaving(true);
    const isPaymentSetup = await getPaymentSettings(tournamentId);
    if (!isPaymentSetup) {
      saveData();
    } else {
      setPaymentSetting(isPaymentSetup);
      setShowPaymentSystem(true);
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-10">
      <aside className="w-1/6 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutParticipant activeItem="Explore Tournaments" />
      </aside>
      {!showPaymentSystem ? (
        <>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Tournament Registration</h2>
            <p className="text-sm text-gray-600">
              Please fill out the registration form below to participate in the tournament.
              For any questions, contact us at{" "}
              <a href="mailto:support@tournament.com" className="text-blue-600 underline">
                support@tournament.com
              </a>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your full name as it will appear in the tournament.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team name (if applicable)" {...field} />
                    </FormControl>
                    <FormDescription>Required only for team tournaments.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your wallet address" {...field} />
                    </FormControl>
                    <FormDescription>Required for prize distribution.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide any additional information requested by the tournament organizer"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <SendPayment
          paymentDestination={paymentSetting?.walletAddress}
          tokenAddress={paymentSetting?.stellarTokenAddress}
          amount={paymentSetting?.entryFee}
          onSuccess={saveData}
        />
      )}
    </div>
  );
}
