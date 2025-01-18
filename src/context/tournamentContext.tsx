"use client";

import React, { createContext, useContext, useState } from "react";

interface Tournament {
  id:string;
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface TournamentContextValue {
  activeTournament: Tournament | null;
  setActiveTournament: (tournament: Tournament) => void;
}

const TournamentContext = createContext<TournamentContextValue | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);

  return (
    <TournamentContext.Provider value={{ activeTournament, setActiveTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
};
