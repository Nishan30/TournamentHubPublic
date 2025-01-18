"use client";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  arbriterDeadline: z.date(),
  arbriterInfo: z.object({
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    walletAddress: z.boolean().optional(),
    paymentDetails: z.boolean().optional(),
  }),
  questions: z.string(),
  rules: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface ArbiterFormSectionProps {
  form: UseFormReturn<FormSchema>;
}

export function ArbiterFormSection({ form }: ArbiterFormSectionProps) {
  return (
    <div className="space-y-6 pt-6 border-t">
      <div>
        <h2 className="text-2xl font-bold">Arbiter Form Settings</h2>
        <p className="text-muted-foreground">Configure the form for tournament arbiters</p>
      </div>

      <FormField
        control={form.control}
        name="arbriterDeadline"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Arbiter Form Deadline</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Set the deadline for arbiter form submissions</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel>Required Arbiter Information</FormLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries({
            name: "Name",
            email: "Email",
            phoneNumber: "Phone Number",
            walletAddress: "Wallet Address",
            paymentDetails: "Payment Details",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`arbriterInfo.${key}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{label}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      <FormField
        control={form.control}
        name="questions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arbiter Questions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter questions for arbiters..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}