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
  playerDeadline: z.date(),
  individualForm: z.boolean(),
  playerInfo: z.object({
    name: z.boolean().optional().default(false),
    email: z.boolean().optional().default(false),
    phoneNumber: z.boolean().optional().default(false),
    walletAddress: z.boolean().optional().default(false),
    paymentDetails: z.boolean().optional().default(false),
    entryFeeDetails: z.boolean().optional().default(false),
  }),
  questions: z.string(),
  rules: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface ParticipantFormSectionProps {
  form: UseFormReturn<FormSchema>;
  formSelect: boolean;
  isIndividual: boolean;
}

export function ParticipantFormSection({ form, formSelect, isIndividual }: ParticipantFormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Participant Form Settings</h2>
        <p className="text-muted-foreground">Configure the form for tournament participants</p>
      </div>

      <FormField
        control={form.control}
        name="playerDeadline"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Form Deadline</FormLabel>
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
            <FormDescription>Set the deadline for form submissions</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {!formSelect && !isIndividual && (
        <FormField
          control={form.control}
          name="individualForm"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Form Collection Method</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="form-radio"
                    id="form-yes"
                  />
                  <label htmlFor="form-yes" className="text-sm">
                    Create individual forms for each team member
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="form-radio"
                    id="form-no"
                  />
                  <label htmlFor="form-no" className="text-sm">
                  Create one form for the entire team
                  </label>
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Choose whether you would like to create separate form for each member or create one form for the team.
            </FormDescription>
            <FormMessage />
          </FormItem>
          )}
        />
      )}

      <div className="space-y-4">
        <FormLabel>Required Information</FormLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries({
            name: "Name",
            email: "Email",
            phoneNumber: "Phone Number",
            walletAddress: "Wallet Address",
            paymentDetails: "Payment Details",
            entryFeeDetails: "Entry Fee Details",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`playerInfo.${key}` as any}
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

      {formSelect && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter questions for participants..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tournament rules..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}