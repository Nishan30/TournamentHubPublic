"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getParticipantTournament } from "@/services/tournament/participant";
import { getArbitersTournament } from "@/services/tournament/arbiter";
import { getTournamentsByEmail } from "@/services/tournament/tournament";
import { fetchTournamentData } from "@/services/tournament/tournament";
import { IParticipantData } from "@/models/participantDataModel";
import { IArbriterData } from "@/models/arbriterDataModel";

interface ITournament {
  _id: string;
  name: string;
  email: string;
}

interface TournamentsContextProps {
  tournaments: ITournament[] | null;
  isLoading: boolean;
  error: string | null;
  fetchTournaments: (email: string, role: string) => Promise<void>;
}

const TournamentsContext = createContext<TournamentsContextProps | undefined>(undefined);

export const TournamentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournaments, setTournaments] = useState<ITournament[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTournaments = async (email: string, role: string) => {
    if (!email || tournaments) return; // Skip fetch if already loaded or no email
    console.log("Fetching tournaments for:", email);
    console.log("Fetching tournaments for:", role);


    setIsLoading(true);
    setError(null);

    try {
      let data: ITournament[] = [];

      // Fetch tournaments based on the role
      if (role === 'organizer') {
        data = await getTournamentsByEmail(email);
      } else if (role === 'participant') {
        let participantData: IParticipantData[] = await getParticipantTournament(email);
        data = await Promise.all(participantData.map((participant) => fetchTournamentData(participant.tournamentId)));
        console.log("Participant Data:", participantData);
      } else if (role === 'arbiter') {
        let arbiterData: IArbriterData[] = await getArbitersTournament(email);
        data = await Promise.all(arbiterData.map((arbiter) => fetchTournamentData(arbiter.tournamentId)));
      }

      setTournaments(data);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      setError("Failed to load tournaments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TournamentsContext.Provider value={{ tournaments, isLoading, error, fetchTournaments }}>
      {children}
    </TournamentsContext.Provider>
  );
};

export const useTournaments = () => {
  const context = useContext(TournamentsContext);
  if (!context) {
    throw new Error("useTournaments must be used within a TournamentsProvider");
  }
  return context;
};
