'use client';

import React, { useState, useEffect,Suspense } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArbriterTable } from "@/components/arbiterTable/arbiterTableMain";
import { ArbiterFormSection } from "@/components/FormAcceptance/ArbiterFormSection";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";
import { useTournament } from "@/context/tournamentContext";
import { saveArbriter, saveArbriterData, deleteArbiter,deleteArbriterData, updateArbriterData } from "@/services/mongoDB/mongodb";
import { UrlCard } from "@/components/UrlCard/urlCard";
import { useRouter } from "next/navigation"
import { ArbiterForm, ArbiterFormValues } from "@/components/arbiterForm/arbiterForm";
import toast from "react-hot-toast";

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

interface ITournament {
  _id: string;
  name: string;
  email: string;
  hasPlayerList: boolean;
  isIndividual: boolean;
  startDate?: string;
  arbriter?: Arbriter[];
}

interface Arbriter {
  id: string;
  name: string;
  email: string
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  phoneNumber:string;
  tournamentId:string
}

export default function ArbiterManagementPage() {
  const [arbriters, setArbriters] = useState<Arbriter[]>([]);
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
  const [formInitialValues, setFormInitialValues] = useState<Partial<ArbiterFormValues>>({
    name: "",
    email: "",
    walletAddress: "",
    paymentDetails: "",
    phoneNumber: "",
    questions: "",
  });

  useEffect(() => {
    async function fetchArbriters(tournamentId: string) {
      if (!tournamentId) return;

      try {
        setIsLoading(true);
        console.log(tournamentId);
        const response = await fetch(`/api/tournament/arbiter/get?tournamentId=${tournamentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch arbiters");
        }
        const data = await response.json();
        const formattedData: Arbriter[] = data.map((arbiter: any) => ({
          id: arbiter._id || "",
          name: arbiter.name,
          email: arbiter.email,
          questions: arbiter.questions,
          walletAddress: arbiter.walletAddress,
          paymentDetails: arbiter.paymentDetails,
          phoneNumber: arbiter.phoneNumber,
          tournamentId: arbiter.tournamentId,
        }));
        console.log("arbriters" + formattedData);
        setArbriters(formattedData);
      } catch (err) {
        console.error("Error fetching arbiters:", err);
        setError("Failed to load arbiters. Please try again later.");
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
        console.log("Tournament" + data.arbriter);
        setTournament(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching tournament details. Please try again later.");
      }finally {
        setIsLoading(false);
      }
    }

    if (activeTournament) {
      fetchTournament();
      fetchArbriters(activeTournament.id);
    }
  }, [activeTournament]);

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        arbriterDeadline: new Date(),
        arbriterInfo: {
          name: false,
          email: false,
          phoneNumber: false,
          walletAddress: false,
          paymentDetails: false,
        },
        questions: "",
        rules: "",
      },
    });

  const handleAddArbriter = async (values: ArbiterFormValues) => {
    if (!activeTournament?.id) return;
    let tournamentId = activeTournament.id;
  
    try {
      const newArbriter = { ...values, tournamentId };
  
      setShowAddForm(false);
  
      if (formMode === "add") {
        await saveArbriterData(newArbriter); // Ensure this function is implemented
        toast.success("Arbiter added successfully!");
        setArbriters([
          ...arbriters,
          { id: Date.now().toString(), ...newArbriter },
        ]);
      } else if (formMode === "edit" && editId) {
        await updateArbriterData(editId, newArbriter); // Ensure this function is implemented
  
        setArbriters((prevArbiters) =>
          prevArbiters.map((arbriter) =>
            arbriter.id === editId ? { id: editId, ...newArbriter } : arbriter
          )
        );
  
        toast.success("Arbiters updated successfully!");
      }
    } catch (error) {
      console.error("Error adding or updating arbiter:", error);
      toast.error("Failed to add or update arbiter. Please try again.");
    }
    setFormInitialValues({
      name: "",
      email: "",
      walletAddress: "",
      paymentDetails: "",
      phoneNumber: "",
      questions: "",
    }); 
  };
  

  const [tournament, setTournament] = useState<ITournament | null>(null);

  async function handleFormSubmit(values: FormSchema) {
    if (!tournamentId) return;

    const newArbiter = {
      name: values.arbriterInfo.name || false,
      email: values.arbriterInfo.email|| false,
      questions: values.questions,
      rules: values.rules,
      walletAddress: values.arbriterInfo.walletAddress|| false,
      paymentDetails: values.arbriterInfo.paymentDetails|| false,
      phoneNumber: values.arbriterInfo.phoneNumber|| false,
      formDeadline: values.arbriterDeadline,
    };

    try {
      await saveArbriter(newArbiter, tournamentId);
      toast.success("Arbiter form submitted successfully!");
      setView("management"); // Return to management view after saving
    } catch (error) {
      console.error("Failed to save arbiter:", error);
      toast.error("Failed to save arbiter. Please try again.");
    }
  }

  const handleEditArbiters = (arbriter: Arbriter) => {
    console.log("Editing arbiters:", arbriter);
    setShowAddForm(true)
    setFormMode("edit"); // Indicate edit mode
    setEditId(arbriter.id);
    setFormInitialValues({
      name: arbriter.name,
      email: arbriter.email,
      walletAddress: arbriter.walletAddress,
      paymentDetails: arbriter.paymentDetails,
      phoneNumber: arbriter.phoneNumber,
      questions: arbriter.questions,
    });
  };

  const handleRemoveArbriter = (arbritersId: string) => {
    console.log("Removing arbiter with ID:", arbritersId);
  
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this arbiter?"
    );
  
    if (confirmRemoval) {
      try {
        deleteArbriterData(arbritersId);
        setArbriters((prevArbriters) =>
          prevArbriters.filter((arbriters) => arbriters.id !== arbritersId)
        );
        toast.success("Arbiter removed successfully!");
      } catch (error) {
        console.error("Error removing arbriter:", error);
        toast.error("Failed to remove arbriter. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex">
      <Suspense fallback={<div>Loading...</div>}>    
  {/* Sidebar */}
  <aside className="w-1/6 bg-neutral-900 border-r border-neutral-800">
    <SidebarLayoutOrganizer activeItem="Arbriter Management" />
  </aside>

  {/* Main Content */}
  <main className="w-5/6 p-8">
    {isLoading ? (
      <p>Loading arbriters...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <>
        {view === "management" ? (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Arbiter Management</h1>
            <p className="text-muted-foreground mb-4">
              Manage tournament arbiters.
            </p>
            {tournament?.arbriter != null ? (
              <UrlCard
                title="Arbiter Form URL"
                description="Share this URL with arbiters to allow them to register for the tournament."
                url={`${window.location.origin}/arbiter/${tournament._id}`}
              />
            ) : (
              <Button variant="green" onClick={() => setView("formSetup")}>Setup Arbiter Form</Button>
            )}
          </div>

          {showAddForm && (
            <div className="mb-8 border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Add New Arbiter</h2>
              <ArbiterForm
                onSubmit={(values) => handleAddArbriter(values)}
                onCancel={() => {setShowAddForm(false);  setFormInitialValues({
                  name: "",
                  email: "",
                  walletAddress: "",
                  paymentDetails: "",
                  phoneNumber: "",
                  questions: "",
                }); }} 
                defaultValues={formInitialValues}
              />
            </div>
          )}

          <ArbriterTable
            data={arbriters}
            onAddArbiter={() => setShowAddForm(true)}
            onEdit={handleEditArbiters}
            onRemove={handleRemoveArbriter}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            {tournament ? `Arbiter Form for ${tournament.name}` : "Participant Form"}
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              <ArbiterFormSection
                form={form}
              />
              <div className="flex justify-between">
                <Button variant="green" type="button" onClick={() => setView("management")}>
                  Back to Management
                </Button>
                <Button variant="green" type="submit">Save Arbiter Settings</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      </>
    )}
  </main></Suspense>
</div>
  );
}

