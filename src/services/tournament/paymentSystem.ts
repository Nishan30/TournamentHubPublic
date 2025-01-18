import { IPayment } from "@/models/paymentSettingModel";

export async function savePaymentSettings(data: any) {
    const response = await fetch('/api/tournament/paymentSystem/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save payment settings');
    }
  
    return response.json();
  }
  
  export async function getPaymentSettings(tournamentId: string): Promise<IPayment | null> {
    const response = await fetch(`/api/tournament/paymentSystem/get?tournamentId=${tournamentId}`);
    console.log(response);
  
    if (!response.ok) {
      throw new Error('Failed to fetch payment settings');
    }
  
    return response.json();
  }