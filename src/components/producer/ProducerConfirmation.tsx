import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Copy, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProducerConfirmationProps {
  transactionHash: string;
  onReset: () => void;
}

export const ProducerConfirmation: React.FC<ProducerConfirmationProps> = ({ 
  transactionHash, 
  onReset 
}) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    toast({
      title: "Copied!",
      description: "Transaction hash copied to clipboard",
    });
  };

  const getExplorerUrl = () => {
    // Mock URL - replace with actual blockchain explorer
    return `https://polygonscan.com/tx/${transactionHash}`;
  };

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-success/10 rounded-full">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl text-success">Production Recorded Successfully!</CardTitle>
          <CardDescription className="text-base mt-2">
            Your hydrogen production has been recorded on the blockchain and carbon credits have been generated.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Transaction Hash</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 w-8 p-0"
              >
                <a href={getExplorerUrl()} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="bg-background rounded-md p-3">
            <p className="text-sm font-mono text-foreground break-all">
              {transactionHash}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">+100</p>
            <p className="text-sm text-muted-foreground">Credits Generated</p>
          </div>
          <div className="bg-success/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">Verified</p>
            <p className="text-sm text-muted-foreground">Blockchain Status</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">Active</p>
            <p className="text-sm text-muted-foreground">Credit Status</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Record Another Production
          </Button>
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-primary to-primary/90"
          >
            <a href={getExplorerUrl()} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};