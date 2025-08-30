import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProducerForm } from '@/components/producer/ProducerForm';
import { ProducerConfirmation } from '@/components/producer/ProducerConfirmation';

export const ProducerDashboard: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const handleFormSuccess = (txHash: string) => {
    setTransactionHash(txHash);
    setShowConfirmation(true);
  };

  const handleReset = () => {
    setShowConfirmation(false);
    setTransactionHash('');
  };

  return (
    <DashboardLayout title="Producer Dashboard">
      <div className="max-w-4xl mx-auto">
        {showConfirmation ? (
          <ProducerConfirmation 
            transactionHash={transactionHash}
            onReset={handleReset}
          />
        ) : (
          <ProducerForm onSuccess={handleFormSuccess} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;