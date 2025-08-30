import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, ExternalLink, Loader2, ShoppingBag } from 'lucide-react';

interface Purchase {
  id: string;
  creditId: string;
  units: number;
  producer: string;
  totalPaid: number;
  purchaseDate: string;
  transactionHash: string;
  status: 'completed' | 'pending' | 'failed';
}

export const BuyerHistory: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch buyer's purchase history
    const fetchHistory = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPurchases: Purchase[] = [
        {
          id: 'TXN-2024-001',
          creditId: 'CC-2024-001',
          units: 100,
          producer: 'GreenTech Hydrogen Ltd.',
          totalPaid: 1550.00,
          purchaseDate: '2024-01-25T14:30:00Z',
          transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
          status: 'completed'
        },
        {
          id: 'TXN-2024-002',
          creditId: 'CC-2024-003',
          units: 250,
          producer: 'Renewable Energy Corp',
          totalPaid: 4187.50,
          purchaseDate: '2024-01-23T09:15:00Z',
          transactionHash: '0xabcdef1234567890abcdef1234567890abcdef12',
          status: 'completed'
        },
        {
          id: 'TXN-2024-003',
          creditId: 'CC-2024-002',
          units: 75,
          producer: 'EcoHydro Solutions',
          totalPaid: 1068.75,
          purchaseDate: '2024-01-20T16:45:00Z',
          transactionHash: '0x567890abcdef1234567890abcdef1234567890ab',
          status: 'completed'
        },
        {
          id: 'TXN-2024-004',
          creditId: 'CC-2024-005',
          units: 150,
          producer: 'Clean Power Systems',
          totalPaid: 2085.00,
          purchaseDate: '2024-01-28T11:20:00Z',
          transactionHash: '0x90abcdef1234567890abcdef1234567890abcdef',
          status: 'pending'
        }
      ];
      
      setPurchases(mockPurchases);
      setLoading(false);
    };

    fetchHistory();
  }, []);

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getExplorerUrl = (hash: string) => {
    return `https://polygonscan.com/tx/${hash}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const totalSpent = purchases
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPaid, 0);

  const totalCredits = purchases
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.units, 0);

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <span>Purchase History</span>
          </CardTitle>
          <CardDescription>Your carbon credit purchase transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading purchase history...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <span>Purchase History</span>
        </CardTitle>
        <CardDescription>Your carbon credit purchase transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Purchases</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{purchases.length}</p>
          </div>
          <div className="bg-success/5 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Credits Owned</span>
            </div>
            <p className="text-2xl font-bold text-success mt-1">{totalCredits.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">kg CO₂ equivalent</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalSpent)}</p>
          </div>
        </div>

        {/* Purchase History Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Credit ID</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{purchase.creditId}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{purchase.producer}</p>
                      <p className="text-sm text-muted-foreground">ID: {purchase.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{purchase.units.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">kg CO₂</span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(purchase.totalPaid)}
                  </TableCell>
                  <TableCell>{formatDate(purchase.purchaseDate)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(purchase.status)}>
                      {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <a 
                        href={getExplorerUrl(purchase.transactionHash)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="View on blockchain explorer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {purchases.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Purchase History</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Start purchasing carbon credits to see your transaction history.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};