export const getArbitersByTournament = async (tournamentId: string): Promise<any[]> => {
    if (!tournamentId) {
      throw new Error('Tournament ID is required');
    }
  
    const response = await fetch(`/api/tournament/arbiter/get?tournamentId=${encodeURIComponent(tournamentId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching arbiters: ${response.statusText}`);
    }
  
    const arbiters = await response.json();
    return arbiters;
  };
  
  export const getArbitersTournament = async (email: string): Promise<any[]> => {
    if (!email) {
      throw new Error('Email ID is required');
    }
  
    const response = await fetch(`/api/arbiter/get?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching arbiters: ${response.statusText}`);
    }
  
    const arbiters = await response.json();
    return arbiters;
  };

export const saveArbiter = async (arbiterData: {
    name: string;
    email: string;
    questions: string;
    walletAddress: string;
    paymentDetails: string;
    phoneNumber: string;
    tournamentId: string;
  }): Promise<Response> => {
    const response = await fetch('/api/tournament/arbiter/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arbiterData),
    });
    return response;
  };

  export const updateArbiter = async (
    arbriterId: string,
    updatedData: Partial<{
      name: string;
      email: string;
      questions?: string;
      walletAddress?: string;
      paymentDetails?: string;
      phoneNumber?: string;
      tournamentId: string;
    }>
  ): Promise<Response> => {
    const response = await fetch('/api/tournament/arbiter/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ arbriterId, updatedData }),
    });
    return response;
  };

  export const deleteArbiter = async (arbriterId: string): Promise<Response> => {
    const response = await fetch('/api/tournament/arbiter/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ arbriterId }),
    });
    return response;
  };
  
  
  