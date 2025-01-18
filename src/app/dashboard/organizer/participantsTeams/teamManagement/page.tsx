'use client';

import React, { useState, useEffect,Suspense} from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ParticipantsTable } from "@/components/participantTable/participantTableMain";
import { ParticipantFormSection } from "@/components/FormAcceptance/ParticipantFormSection";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { useTournament } from "@/context/tournamentContext";
import { saveParticipant, saveParticipantData, deleteParticipantData,updateParticipantData } from "@/services/mongoDB/mongodb";
import { UrlCard } from "@/components/UrlCard/urlCard";
import { useRouter } from "next/navigation"
import { ParticipantForm, ParticipantFormValues } from "@/components/participantForm/participantForm";
import toast from "react-hot-toast";

const formSchema = z.object({
  playerDeadline: z.date(),
  individualForm: z.boolean(),
  playerInfo: z.object({
    name: z.boolean(),
    email: z.boolean(),
    phoneNumber: z.boolean(),
    walletAddress: z.boolean(),
    paymentDetails: z.boolean(),
    entryFeeDetails: z.boolean(),
  }),
  questions: z.string(),
  rules: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface ITournament {
  _id: string;
  name: string;
  email: string;
  hasPlayerList: boolean;
  isIndividual: boolean;
  startDate?: string;
  participant?: Participant[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  teamName: string;
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  entryFeeDetails: string;
  phoneNumber: string;
  tournamentId: string;
}

export default function ParticipantManagementPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState("management");
  const [showAddForm, setShowAddForm] = useState(false); // Toggle inline form
  const { activeTournament } = useTournament();
  const searchParams = useSearchParams();
  const tournamentId = searchParams?.get("id");
  const router = useRouter();
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState("");
  const [formInitialValues, setFormInitialValues] = useState<Partial<ParticipantFormValues>>({
    name: "",
    email: "",
    teamName: "",
    walletAddress: "",
    paymentDetails: "",
    entryFeeDetails: "",
    phoneNumber: "",
    questions: "",
  });


  // Fetch participants for the active tournament
  useEffect(() => {
    async function fetchParticipants(tournamentId: string) {
      if (!tournamentId) return;

      try {
        setIsLoading(true);
        console.log(tournamentId);
        const response = await fetch(`/api/tournament/participant/get?tournamentId=${tournamentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        const data = await response.json();
        const formattedData: Participant[] = data.map((participant: any) => ({
          id: participant._id || "",
          name: participant.name,
          email: participant.email,
          teamName: participant.teamName,
          questions: participant.questions,
          walletAddress: participant.walletAddress,
          paymentDetails: participant.paymentDetails,
          entryFeeDetails: participant.entryFeeDetails,
          phoneNumber: participant.phoneNumber,
          tournamentId: participant.tournamentId,
        }));
        console.log("participants" + formattedData);
        setParticipants(formattedData);
      } catch (err) {
        console.error("Error fetching participants:", err);
        setError("Failed to load participants. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchTournament() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/tournament/get?id=${activeTournament?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tournament details.");
        }
        const data: ITournament = await response.json();
        console.log("Tournament" + data.participant);
        setTournament(data);
        form.reset({
          individualForm: data.isIndividual,
          playerDeadline: new Date(data.startDate || Date.now()),
        });
      } catch (err) {
        console.error(err);
        setError("Error fetching tournament details. Please try again later.");
      }finally {
        setIsLoading(false);
      }
    }

    if (activeTournament) {
      fetchTournament();
      fetchParticipants(activeTournament.id);
    }
  }, [activeTournament]);

  // Form setup logic
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerDeadline: new Date(),
      individualForm: true,
      playerInfo: {
        name: false,
        email: false,
        phoneNumber: false,
        walletAddress: false,
        paymentDetails: false,
        entryFeeDetails: false,
      },
      questions: "",
      rules: "",
    },
  });

  const handleAddParticipant = async (values: ParticipantFormValues) => {
    if (!activeTournament?.id) return;
    let tournamentId = activeTournament.id;
  
    try {
      const newParticipant = { ...values, tournamentId };
  
      setShowAddForm(false);
  
      if (formMode === "add") {
        // Add participant logic
        await saveParticipantData(newParticipant); // Ensure this function is implemented
        toast.success("Participant added successfully!");
        setParticipants([
          ...participants,
          { id: Date.now().toString(), ...newParticipant },
        ]);
      } else if (formMode === "edit" && editId) {
        // Edit participant logic
        await updateParticipantData(editId, newParticipant); // Ensure this function is implemented
  
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === editId ? { id: editId, ...newParticipant } : participant
          )
        );
  
        toast.success("Participant updated successfully!");
      }
    } catch (error) {
      console.error("Error adding or updating participant:", error);
      toast.error("Failed to add or update participant. Please try again.");
    }
    setFormInitialValues({
      name: "",
      email: "",
      teamName: "",
      walletAddress: "",
      paymentDetails: "",
      entryFeeDetails: "",
      phoneNumber: "",
      questions: "",
    }); 
  };
  

  const [tournament, setTournament] = useState<ITournament | null>(null);

  async function handleFormSubmit(values: FormSchema) {
    if (!tournamentId) return;

    const newParticipant = {
      name: values.playerInfo.name,
      email: values.playerInfo.email,
      questions: values.questions,
      rules: values.rules,
      walletAddress: values.playerInfo.walletAddress,
      paymentDetails: values.playerInfo.paymentDetails,
      entryFeeDetails: values.playerInfo.entryFeeDetails,
      phoneNumber: values.playerInfo.phoneNumber,
      individual: values.individualForm,
      formDeadline: values.playerDeadline,
    };

    try {
      await saveParticipant(newParticipant, tournamentId);
      toast.success("Participant form submitted successfully!");
      setView("management"); // Return to management view after saving
    } catch (error) {
      console.error("Failed to save participant:", error);
      toast.error("Failed to save participant. Please try again.");
    }
  }

  const handleEditParticipant = (participant: Participant) => {
    console.log("Editing participant:", participant);
    setShowAddForm(true)
    setFormMode("edit"); // Indicate edit mode
    setEditId(participant.id);
    setFormInitialValues({
      name: participant.name,
      email: participant.email,
      teamName: participant.teamName,
      walletAddress: participant.walletAddress,
      paymentDetails: participant.paymentDetails,
      entryFeeDetails: participant.entryFeeDetails,
      phoneNumber: participant.phoneNumber,
      questions: participant.questions,
    });
  };

  const handleRemoveParticipant = (participantId: string) => {
    console.log("Removing participant with ID:", participantId);
  
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this participant?"
    );
  
    if (confirmRemoval) {
      try {
        deleteParticipantData(participantId); // Make sure deleteParticipantData is an async function
        setParticipants((prevParticipants) =>
          prevParticipants.filter((participant) => participant.id !== participantId)
        );
        toast.success("Participant removed successfully!");
      } catch (error) {
        console.error("Error removing participant:", error);
        toast.error("Failed to remove participant. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex">
      <Suspense fallback={<div>Loading...</div>}>    
  {/* Sidebar */}
  <aside className="w-1/7 bg-neutral-900 border-r border-neutral-800">
    <SidebarLayoutOrganizer activeItem="Participant Management" />
  </aside>

  {/* Main Content */}
  <main className="w-5/6 p-8">
    {isLoading ? (
      <p>Loading participants...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <>
        {view === "management" ? (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground mb-4">
              Manage tournament teams, and registrations.
            </p>
            {tournament?.participant != null ? (
              <UrlCard
                title="Participant Form URL"
                description="Share this URL with participants to allow them to register for the tournament."
                url={`${window.location.origin}/participants/${tournament._id}`}
              />
            ) : (
              <Button onClick={() => setView("formSetup")}>Setup Participant Form</Button>
            )}
          </div>
          {/* Add Participant Button */}
          <div className="mb-4">
            {!showAddForm && (
              <Button onClick={() => {setFormMode("add");setShowAddForm(true);}}>Add Participant</Button>
            )}
          </div>

          {/* Inline Participant Form */}
          {showAddForm && (
            <div className="mb-8 border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Add New Participant</h2>
              <ParticipantForm
                onSubmit={(values) => handleAddParticipant(values)}
                onCancel={() => {setShowAddForm(false);  setFormInitialValues({
                  name: "",
                  email: "",
                  teamName: "",
                  walletAddress: "",
                  paymentDetails: "",
                  entryFeeDetails: "",
                  phoneNumber: "",
                  questions: "",
                }); }} 
                defaultValues={formInitialValues}
              />
            </div>
          )}

          {/* Participants Table */}
          <ParticipantsTable
            data={participants}
            isIndividual={tournament?.isIndividual || true}
            onAddParticipant={() => setShowAddForm(true)}
            onEdit={handleEditParticipant}
            onRemove={handleRemoveParticipant}
          />
        </div>
      ) : (
        // The existing form setup view
        <div>
          <h1 className="text-2xl font-bold mb-6">
            {tournament ? `Participant Form for ${tournament.name}` : "Participant Form"}
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              <ParticipantFormSection
                form={form}
                formSelect={true}
                isIndividual={tournament?.isIndividual || true}

              />
              <div className="flex justify-between">
                <Button type="button" onClick={() => setView("management")}>
                  Back to Management
                </Button>
                <Button type="submit">Save Participant Settings</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      </>
    )}
  </main>
  </Suspense>
</div>
  );
}

