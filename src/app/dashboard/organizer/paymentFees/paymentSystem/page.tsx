'use client';

import { useEffect, useState } from 'react';
import { PaymentSystem } from '@/components/payment/PaymentSystem';
import { savePaymentSettings,getPaymentSettings } from '@/services/tournament/paymentSystem';
import type { PaymentDetails } from '@/components/payment/types';
import { SidebarLayoutOrganizer } from '@/components/common/sidebarOrganizer';
import { useTournament } from '@/context/tournamentContext';
import toast from 'react-hot-toast';

const MyTournaments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<PaymentDetails | null>(null);
  const { activeTournament } = useTournament();

  useEffect(() => {
    async function loadPaymentSettings() {
      if (!activeTournament) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPaymentSettings(activeTournament.id);
        setInitialData(data as PaymentDetails);
      } catch (error) {
        console.error('Failed to load payment settings:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPaymentSettings();
  }, [activeTournament?.id]);

  const handleSubmit = async (data: PaymentDetails) => {
    if (!activeTournament) {
      alert('Tournament ID is required');
      return;
    }
    let tournamentId = activeTournament.id;

    try {
      await savePaymentSettings({
        ...data,tournamentId
      });
      toast.success('Payment settings saved successfully');
    } catch (error) {
      console.error('Failed to save payment settings:', error);
      toast.error('Failed to save payment settings');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/7 bg-neutral-900 border-r border-neutral-800">
        <SidebarLayoutOrganizer activeItem="Payment System" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl mt-2 mb-6 font-bold tracking-tight">Tournament Payment Setup</h1>
        <PaymentSystem 
          initialData={initialData} 
          onSubmit={handleSubmit} 
        />
      </main>
    </div>
  );
};

export default MyTournaments;
