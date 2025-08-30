import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AvailableCredits } from '@/components/buyer/AvailableCredits';
import { BuyerHistory } from '@/components/buyer/BuyerHistory';

export const BuyerDashboard: React.FC = () => {
  const handlePurchase = (creditId: string) => {
    // Handle successful purchase - could trigger a refresh or update state
    console.log('Credit purchased:', creditId);
  };

  return (
    <DashboardLayout title="Buyer Dashboard">
      <div className="space-y-8">
        <AvailableCredits onPurchase={handlePurchase} />
        <BuyerHistory />
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;