import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionsTable } from '@/components/regulator/TransactionsTable';
import { RetiredCredits } from '@/components/regulator/RetiredCredits';

export const RegulatorDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Regulator Dashboard">
      <div className="space-y-8">
        <TransactionsTable />
        <RetiredCredits />
      </div>
    </DashboardLayout>
  );
};

export default RegulatorDashboard;