import { ITournament } from "@/types/tournament";

export async function getTournamentsByEmail(email: string) {
  try {
    const response = await fetch(`/api/tournament/get?email=${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tournament details.");
    }
    const data: ITournament[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tournaments by email:', error);
    throw new Error('Failed to fetch tournaments');
  }
}


export async function fetchTournamentData(id:string) {
    try {
      const response = await fetch(`/api/tournament/get?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tournament details.");
      }
      const data: ITournament = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch tournaments');
    }
  }

  export async function deleteTournamentById(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/tournament/delete?id=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete tournament:', errorData.error);
        throw new Error(errorData.error || 'Failed to delete tournament');
      }
  
      console.log('Tournament deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error in deleteTournamentById helper:', error.message);
      return false;
    }
  }

  export async function getPublicTournaments(): Promise<ITournament[]> {
    try {
      const response = await fetch('/api/tournament/getPublic'); // Replace with your API route
      if (!response.ok) {
        throw new Error(`Error fetching public tournaments: ${response.statusText}`);
      }
      const publicTournaments: ITournament[] = await response.json();
      return publicTournaments;
    } catch (error) {
      console.error('Error in getPublicTournaments:', error);
      throw new Error('Failed to fetch public tournaments from the API');
    }
  }

  export async function createTournament(tournamentData: ITournament): Promise<string | null> {
    try {
      const response = await fetch('/api/tournament/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to create tournament:', errorData.error);
        throw new Error(errorData.error || 'Failed to create tournament');
      }
  
      const data = await response.json();
      console.log('Tournament created successfully:', data);
      return data.tournamentId;
    } catch (error: any) {
      console.error('Error in createTournament helper:', error.message);
      return null;
    }
  }

  export interface UpdateTournamentData {
    name?: string;
    organizerName?: string;
    email?: string;
    description?: string;
    rules?: string;
    location?: string;
    playerCount?: string;
    tournamentType?: string;
    hasPlayerList?: boolean;
    needsArbriter?: boolean;
    isIndividual?: boolean;
    paymentSystem?: boolean;
    startDate?: Date;
    endDate?: Date;
  }
  
  export async function updateTournamentById(id: string, updatedData: UpdateTournamentData): Promise<boolean> {
    try {
      const response = await fetch('/api/tournament/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedData }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update tournament:', errorData.error);
        throw new Error(errorData.error || 'Failed to update tournament');
      }
  
      console.log('Tournament updated successfully');
      return true;
    } catch (error: any) {
      console.error('Error in updateTournamentById helper:', error.message);
      return false;
    }
  }
  