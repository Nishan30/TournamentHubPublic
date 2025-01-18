"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LocationSelector from "@/components/ui/location-input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"; 
import { saveTournament } from "@/services/mongoDB/mongodb";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation"
import { useTournament } from "@/context/tournamentContext";
import { fetchTournamentData } from "@/services/tournament/tournament";

const formSchema = z.object({
  name_6565800108: z.string(),
  name_5136238509: z.string(),
  name_4225322125: z.string(),
  name_0501457654: z.string(),
  name_1531985445: z.boolean().default(true),
  name_1431985445: z.boolean().default(true),
  name_7854421769: z.boolean().default(true),
  name_1207027423: z.boolean().default(true),
  name_2413236254: z.boolean(),
  name_8168779027: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  name_5517878459: z.string(),
  name_1973568768: z.string(),
  name_8021700254: z.boolean().default(true),
  name_3347789763: z.boolean().default(true),
});

export default function MyForm() {
  const [countryName, setCountryName] = useState<string>("")
  const [stateName, setStateName] = useState<string>("")
  const user = useUser();
  const tournament = useTournament();

  const router = useRouter();
  useEffect(() => {
      if (!user.user) {
        const currentPath = window.location.pathname;
        router.push(`/signin?redirect=${encodeURIComponent(currentPath)}?accountType=Organizer`);
        return undefined;
      }});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_8168779027: { from: new Date(), to: new Date() },
    },
  })

  const SaveData = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send form data to the backend or perform actions like saving to the database
      const tournamentId = await saveTournament(
        values.name_6565800108,
        user.user?.displayName as string,
        user.user?.email as string,
        values.name_5136238509,
        values.name_1973568768,
        values.name_4225322125,
        values.name_0501457654,
        values.name_5517878459,
        values.name_1531985445,
        values.name_1431985445,
        values.name_1207027423,
        values.name_7854421769,
        values.name_2413236254,
        values.name_8168779027.from,
        values.name_8168779027.to as Date,
      );

      if (tournamentId) {
        // Redirect after saving (use query params if needed)
        const queryParams = new URLSearchParams({
          id: tournamentId.toString(),
        }).toString();
        router.push(`dashboard/organizer/dashboard/overview?${queryParams}`);
      }
    } catch (error) {
      console.error("Error saving tournament:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Call SaveData to handle form submission
      await SaveData(values);

      // Optionally, show a success toast
      toast.success("Tournament saved successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-10">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Tournament Hub: Tournament Setup</h2>
        <p className= "text-sm text-gray-600">
            For more detailed info on how tournaments work in TournamentHUB, 
          <a href="/docs" className="text-blue-600 underline mx-1" target="_blank" rel="noopener noreferrer">read our docs</a>, or 
          <a href="/tutorial" className="text-blue-600 underline mx-1" target="_blank" rel="noopener noreferrer">watch the tutorial video</a> 
          attached. You can also get in touch with us if you need more details at 
          <a href="mailto:help@tournamenthub.com" className="text-blue-600 underline mx-1">help@tournamenthub.com</a>.
        </p>

      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        {/* Tournament Name */}
        <FormField
          control={form.control}
          name="name_6565800108"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tournament Name"
                  type="text"
                  {...field}
                  className="border-gray-300 focus:ring-2 focus:ring-primary-500"
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Description */}
        <FormField
          control={form.control}
          name="name_5136238509"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief description of the tournament"
                  className="resize-none border-gray-300 focus:ring-2 focus:ring-primary-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>Write a short description of your tournament.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Selector */}
        <FormField
          control={form.control}
          name="name_4225322125"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "")
                    form.setValue(field.name, (country?.name || "") + " " + stateName) 
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "")
                    form.setValue(field.name, countryName + " " + (state?.name || "")) 
                  }}
                />
              </FormControl>
              <FormDescription>If your country has states, they will appear after selecting a country.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of players */}
        <FormField
          control={form.control}
          name="name_0501457654"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of players</FormLabel>
              <FormControl>
                <Input
                  placeholder="Total number of players"
                  type="number"
                  {...field}
                  className="border-gray-300 focus:ring-2 focus:ring-primary-500"
                />
              </FormControl>
              <FormDescription>Enter the estimated number of participants.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start and End Date */}
        <FormField
          control={form.control}
          name="name_8168779027"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start and End Date</FormLabel>
              <FormControl>
                <DatePickerWithRange
                  selected={{ from: field.value?.from, to: field.value?.to }}
                  onChange={(range) => field.onChange(range)}
                />
              </FormControl>
              <FormDescription>Select the date range for the tournament.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/*RadioField: Form for participants */}
        <FormField
        control={form.control}
        name="name_1531985445"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you need a form for participants?</FormLabel>
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
                    Yes, I need a form for participants.
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
                    No, I don’t need a form for participants.
                  </label>
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Choose whether you want a form link for participants to enter the tournament.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/*RadioField: Public or private tournaments */}
      <FormField
        control={form.control}
        name="name_1431985445"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is it a public tournament or a private tournament?</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="form-radio"
                    id="public-yes"
                  />
                  <label htmlFor="public-yes" className="text-sm">
                    Public Tournament
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="form-radio"
                    id="public-no"
                  />
                  <label htmlFor="public-no" className="text-sm">
                    Private Tournament
                  </label>
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Choose whether you want a form link for participants to enter the tournament.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/*RadioField: TournamentType */}
      <FormField
        control={form.control}
        name="name_7854421769"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is it an individual tournament or a team tournament?</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="form-radio"
                    id="type-yes"
                  />
                  <label htmlFor="type-yes" className="text-sm">
                    Individual Tournament
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="form-radio"
                    id="type-no"
                  />
                  <label htmlFor="type-no" className="text-sm">
                    Team Tournament
                  </label>
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Choose the type of tournament that you want to organize.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

            {/*RadioField: Need arbiter */}
            <FormField
  control={form.control}
  name="name_5517878459"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Type of tournament?</FormLabel>
      <FormControl>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="league-based"
              checked={field.value === "league-based"}
              onChange={() => field.onChange("league-based")}
              className="form-radio"
              id="league-based"
            />
            <label htmlFor="league-based" className="text-sm">
              League-based
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="single-elimination"
              checked={field.value === "single-elimination"}
              onChange={() => field.onChange("single-elimination")}
              className="form-radio"
              id="single-elimination"
            />
            <label htmlFor="single-elimination" className="text-sm">
              Single-elimination
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="double-elimination"
              checked={field.value === "double-elimination"}
              onChange={() => field.onChange("double-elimination")}
              className="form-radio"
              id="double-elimination"
            />
            <label htmlFor="double-elimination" className="text-sm">
              Double-elimination
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="swiss"
              checked={field.value === "swiss"}
              onChange={() => field.onChange("swiss")}
              className="form-radio"
              id="swiss"
            />
            <label htmlFor="swiss" className="text-sm">
              Swiss
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="combination"
              checked={field.value === "combination"}
              onChange={() => field.onChange("combination")}
              className="form-radio"
              id="combination"
            />
            <label htmlFor="combination" className="text-sm">
              League and Single-elimination
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              value="custom-scoring"
              checked={field.value === "custom-scoring"}
              onChange={() => field.onChange("custom-scoring")}
              className="form-radio"
              id="custom-scoring"
            />
            <label htmlFor="custom-scoring" className="text-sm">
              Custom-scoring
            </label>
          </div>
        </div>
      </FormControl>
      <FormDescription>
        Choose the type of tournament you want to organize.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


      {/*RadioField: Need arbiter */}
      <FormField
        control={form.control}
        name="name_1207027423"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you need an arbiter to settle matches?</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="form-radio"
                    id="arbiter-yes"
                  />
                  <label htmlFor="arbiter-yes" className="text-sm">
                    Yes, I need an arbiter.
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="form-radio"
                    id="arbiter-no"
                  />
                  <label htmlFor="arbiter-no" className="text-sm">
                    No, I don’t need an arbiter.
                  </label>
                </div>
              </div>
            </FormControl>
            <FormDescription>
              Choose whether you want an arbiter who would assign the scores for matches.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

        {/* Switch: Payment Feature */}
        <FormField
          control={form.control}
          name="name_2413236254"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Payment Features</FormLabel>
                <FormDescription>Enable payment feature for receiving entry fees.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Rules */}
        <FormField
          control={form.control}
          name="name_1973568768"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Rules of the tournament"
                  className="resize-none border-gray-300 focus:ring-2 focus:ring-primary-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>Write the rules of the tournament for the participants.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="name_8021700254"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree with the terms and conditions of tournament hub for tournament organization.</FormLabel>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_3347789763"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree that all the information I have provided are accurate and can provide proof if requested.</FormLabel>
                
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button variant="green" type="submit" className="w-full mt-4">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
