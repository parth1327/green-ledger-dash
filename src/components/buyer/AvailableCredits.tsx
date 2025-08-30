import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Leaf, Factory } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Credit {
  id: string;
  units: number;
  producer: string;
  pricePerUnit: number;
  productionDate: string;
  batchId: string;
  status: 'available' | 'pending';
}

interface AvailableCreditsProps {
  onPurchase?: (creditId: string) => void;
}

export const AvailableCredits: React.FC<AvailableCreditsProps> = ({ onPurchase }) => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to fetch available credits
    const fetchCredits = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCredits: Credit[] = [
        {
          id: 'CC-2024-001',
          units: 250,
          producer: 'GreenTech Hydrogen Ltd.',
          pricePerUnit: 15.50,
          productionDate: '2024-01-15',
          batchId: 'H2-2024-001',
          status: 'available'
        },
        {
          id: 'CC-2024-002',
          units: 180,
          producer: 'EcoHydro Solutions',
          pricePerUnit: 14.25,
          productionDate: '2024-01-20',
          batchId: 'H2-2024-005',
          status: 'available'
        },
        {
          id: 'CC-2024-003',
          units: 420,
          producer: 'Renewable Energy Corp',
          pricePerUnit: 16.75,
          productionDate: '2024-01-18',
          batchId: 'H2-2024-008',
          status: 'available'
        },
        {
          id: 'CC-2024-004',
          units: 95,
          producer: 'Clean Power Systems',
          pricePerUnit: 13.90,
          productionDate: '2024-01-22',
          batchId: 'H2-2024-012',
          status: 'available'
        }
      ];
      
      setCredits(mockCredits);
      setLoading(false);
    };

    fetchCredits();
  }, []);

  const handleBuy = async (credit: Credit) => {
    setPurchasingId(credit.id);
    
    try {
      // Mock API call to /buy endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update credit status to pending
      setCredits(prev => prev.map(c => 
        c.id === credit.id ? { ...c, status: 'pending' } : c
      ));
      
      toast({
        title: "Purchase Successful!",
        description: `Successfully purchased ${credit.units} carbon credits from ${credit.producer}`,
      });
      
      onPurchase?.(credit.id);
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to purchase credits. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPurchasingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span>Available Carbon Credits</span>
          </CardTitle>
          <CardDescription>Browse and purchase carbon credits from verified producers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading available credits...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span>Available Carbon Credits</span>
        </CardTitle>
        <CardDescription>Browse and purchase carbon credits from verified producers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Credit ID</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Price/Unit</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Production Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credits.map((credit) => (
                <TableRow key={credit.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      <span>{credit.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{credit.producer}</p>
                      <p className="text-sm text-muted-foreground">Batch: {credit.batchId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{credit.units.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">kg CO₂</span>
                  </TableCell>
                  <TableCell>{formatCurrency(credit.pricePerUnit)}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(credit.units * credit.pricePerUnit)}
                  </TableCell>
                  <TableCell>{formatDate(credit.productionDate)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={credit.status === 'available' ? 'default' : 'secondary'}
                      className={credit.status === 'available' ? 'bg-success text-success-foreground' : ''}
                    >
                      {credit.status === 'available' ? 'Available' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleBuy(credit)}
                      disabled={credit.status === 'pending' || purchasingId === credit.id}
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      {purchasingId === credit.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Buying...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {credits.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Credits Available</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check back later for new carbon credits from producers.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};