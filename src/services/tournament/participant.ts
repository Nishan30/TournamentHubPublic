const BASE_URL = '/api/tournament/participant'; 


/**
 * Fetch participants by tournament ID.
 * @param tournamentId The ID of the tournament.
 * @returns A list of participants.
 */
export const fetchParticipants = async (tournamentId: string): Promise<any[]> => {
    try {
      const response = await fetch(`${BASE_URL}/get?tournamentId=${encodeURIComponent(tournamentId)}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch participants');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  };
  export const getParticipantTournament = async (email: string): Promise<any[]> => {
    try {
      const response = await fetch(`/api/participant/get?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch participants');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  };


/**
 * Save a new participant.
 * @param participantData The participant data to save.
 * @returns The response from the API.
 */
export const saveParticipant = async (participantData: {
  name: string;
  email: string;
  teamName?: string;
  questions?: string;
  walletAddress?: string;
  paymentDetails?: string;
  entryFeeDetails?: string;
  phoneNumber?: string;
  tournamentId: string;
}): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(participantData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save participant');
    }

    return response.json();
  } catch (error) {
    console.error('Error saving participant:', error);
    throw error;
  }
};

/**
 * Update an existing participant.
 * @param participantId The ID of the participant to update.
 * @param updatedData The updated participant data.
 * @returns The response from the API.
 */
export const updateParticipant = async (
  participantId: string,
  updatedData: Partial<{
    name: string;
    email: string;
    teamName?: string;
    questions?: string;
    walletAddress?: string;
    paymentDetails?: string;
    entryFeeDetails?: string;
    phoneNumber?: string;
    tournamentId: string;
  }>
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId, ...updatedData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update participant');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating participant:', error);
    throw error;
  }
};

/**
 * Delete a participant.
 * @param participantId The ID of the participant to delete.
 * @returns The response from the API.
 */
export const deleteParticipant = async (participantId: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete participant');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting participant:', error);
    throw error;
  }
};
