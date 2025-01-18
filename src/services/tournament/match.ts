interface UpdateMatchData {
    matchId: string;
    updateData: Record<string, any>; // Replace `any` with specific keys if you know the update structure
  }
  
  interface UpdateMatchResponse {
    success: boolean;
    updatedMatch: {
      _id: string;
      [key: string]: any; // Replace `any` with the specific structure of your match model
    };
  }

  export interface ParticipantData {
    _id: string
    name: string;
    email: string;
    teamName:string;
  }
  export interface ArbiterData {
    _id: string
    name: string;
    email: string;
    teamName:string;
  }

  interface IScore {
    participantId: string; 
    score: number; 
  }

  interface Match {
    _id: string;
    participants: ParticipantData[];
    arbiter: ArbiterData;
    teamName: string[];
    round: number;
    matchDate: Date;
    tournamentId: string;
    type:string;
    status:string;
    scores: IScore[]; 
    arbiterComment: string;
  }
  
  
  /**
   * Updates a match with the given match ID and update data.
   * 
   * @param {UpdateMatchData} data - Object containing match ID and update data.
   * @returns {Promise<UpdateMatchResponse>} - The updated match data.
   * @throws {Error} - Throws an error if the API request fails.
   */
  export const updateMatch = async (data: { matchId: string; updateData: Record<string, any> }) => {
    try {
      const response = await fetch('/api/tournament/match/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data));
  
      if (!response.ok) {
        // Attempt to read the response as JSON, fallback to text if JSON parsing fails
        const errorData = await response.clone().json().catch(() => response.text());
        throw new Error(
          typeof errorData === 'string'
            ? errorData
            : errorData.error || 'An error occurred while updating the match'
        );
      }
  
      // Parse and return the JSON response
      return await response.json();
    } catch (error: any) {
      console.error('Error updating match:', error.message || error);
      throw error; // Propagate the error to the caller
    }
  };

  export const fetchMatchesByTournamentId = async (
    tournamentId: string
  ): Promise<Match[]> => {
    if (!tournamentId) {
      throw new Error("Tournament ID is required");
    }
  
    try {
      const response = await fetch(`/api/tournament/match/get?tournamentId=${tournamentId}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        const errorData = await response.clone().json().catch(() => response.text());
        throw new Error(
          typeof errorData === "string"
            ? errorData
            : errorData.error || "An error occurred while fetching matches"
        );
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching matches by tournamentId:", error.message || error);
      throw error;
    }
  };

  export const fetchMatchById = async (matchId: string): Promise<Match | null> => {
    if (!matchId) {
      throw new Error("Match ID is required");
    }
  
    try {
      const response = await fetch(`/api/tournament/match/get?matchId=${matchId}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        const errorData = await response.clone().json().catch(() => response.text());
        throw new Error(
          typeof errorData === "string"
            ? errorData
            : errorData.error || "An error occurred while fetching the match"
        );
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching match by matchId:", error.message || error);
      throw error;
    }
  };
  
  
  
  
  