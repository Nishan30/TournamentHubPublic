"use client"

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Trophy } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useTournament } from '@/context/tournamentContext';
import { ITournament } from "@/types/tournament";
import { fetchTournamentData, UpdateTournamentData } from '@/services/tournament/tournament';
import { SidebarLayoutOrganizer } from '@/components/common/sidebarOrganizer';
import { updateTournamentById } from '@/services/tournament/tournament';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Tournament name is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  playerCount: z.string().min(1, 'Number of players is required'),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  needsForm: z.boolean().default(true),
  isPublic: z.boolean().default(true),
  isIndividual: z.boolean().default(true),
  tournamentType: z.string(),
  needsArbiter: z.boolean().default(false),
  paymentEnabled: z.boolean().default(false),
  rules: z.string().min(1, 'Rules are required'),
});

export default function TournamentSettings() {
  const user = useUser();;

  const router = useRouter();
  const { activeTournament } = useTournament();
  const [tournamentData, setTournamentData] = useState<ITournament | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      playerCount: "",
      dateRange: { from: new Date(), to: new Date() },
      needsForm: true,
      isPublic: true,
      isIndividual: true,
      tournamentType: "single-elimination",
      needsArbiter: false,
      paymentEnabled: false,
      rules: "",
    },
  });
  useEffect(() => {
    if (!user.user || !activeTournament?.id) {
      const currentPath = window.location.pathname;
      router.push(`/signin?accountType=Organizer`);
      return;
    }

    const fetchData = async () => {
      if (activeTournament?.id) {
        const data = await fetchTournamentData(activeTournament.id);
        setTournamentData(data);

        // Update form values with fetched data
        form.reset({
          name: data.name || "",
          description: data.description || "",
          location: data.location || "",
          playerCount: data.playerCount ? data.playerCount.toString() : "",
          dateRange: {
            from: new Date(data.startDate),
            to: new Date(data.endDate),
          },
          needsForm: data.hasPlayerList || true,
          isPublic: data.publicTournament || true,
          isIndividual: data.isIndividual || true,
          tournamentType: data.tournamentType || "single-elimination",
          needsArbiter: data.needsArbriter || false,
          paymentEnabled: data.paymentSystem || false,
          rules: data.rules || "",
        });
      }
    };

    fetchData();
  }, [user.user, router, activeTournament?.id]);
        
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting form data:", data);
  
      // Prepare the updated data for the API call
      const updatedData: UpdateTournamentData = {
        name: data.name,
        description: data.description,
        rules: data.rules,
        location: data.location,
        playerCount: data.playerCount,
        tournamentType: data.tournamentType,
        hasPlayerList: data.needsForm,
        needsArbriter: data.needsArbiter,
        isIndividual : data.isIndividual,
        paymentSystem: data.paymentEnabled,
        startDate: data.dateRange.from,
        endDate: data.dateRange.to,
      };
  
      // Call the update function with tournament ID and updated data
      const isUpdated = await updateTournamentById(
        activeTournament?.id as string,
        updatedData
      );
  
      if (isUpdated) {
        toast.success("Tournament updated successfully!");
      } else {
        throw new Error("Tournament update failed.");
      }
    } catch (error) {
      console.error("Error saving tournament:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex">
    {/* Sidebar */}
    <aside className="w-1/7 bg-gray-100">
      <SidebarLayoutOrganizer activeItem="Overview" />
    </aside>

    {/* Main Content */}
    <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl mt-2 font-bold tracking-tight">Tournament Settings</h1>
        <p className="text-sm text-gray-600">Update your tournament settings here.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tournament Name" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief description of the tournament"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write a short description of your tournament.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Tournament location" {...field} />
                </FormControl>
                <FormDescription>Enter the location where the tournament will be held.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of players</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Total number of players" {...field} />
                </FormControl>
                <FormDescription>Enter the estimated number of participants.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tournament Dates</FormLabel>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>Select the start and end dates for your tournament.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="needsForm"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you need a form for participants?</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                        className="form-radio"
                        id="form-yes"
                      />
                      <label htmlFor="form-yes" className="text-sm">Yes, I need a form for participants.</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                        className="form-radio"
                        id="form-no"
                      />
                      <label htmlFor="form-no" className="text-sm">No, I don't need a form for participants.</label>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Choose whether you want a form link for participants to enter the tournament.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Is it a public tournament or a private tournament?</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                        className="form-radio"
                        id="public-yes"
                      />
                      <label htmlFor="public-yes" className="text-sm">Public Tournament</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                        className="form-radio"
                        id="public-no"
                      />
                      <label htmlFor="public-no" className="text-sm">Private Tournament</label>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Choose the visibility of your tournament.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tournamentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type of tournament?</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {[
                      { value: 'league-based', label: 'League-based' },
                      { value: 'single-elimination', label: 'Single-elimination' },
                      { value: 'double-elimination', label: 'Double-elimination' },
                      { value: 'swiss', label: 'Swiss' },
                      { value: 'combination', label: 'League and Single-elimination' },
                      { value: 'custom-scoring', label: 'Custom-scoring' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="form-radio"
                          id={option.value}
                        />
                        <label htmlFor={option.value} className="text-sm">{option.label}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>Choose the type of tournament you want to organize.</FormDescription>
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
                    placeholder="Rules of the tournament"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write the rules of the tournament for the participants.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  );
}