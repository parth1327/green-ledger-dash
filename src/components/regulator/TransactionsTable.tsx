import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, Loader2, FileSearch, ArrowUpDown } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'production' | 'purchase' | 'retirement';
  producer: string;
  buyer?: string;
  creditId: string;
  units: number;
  timestamp: string;
  transactionHash: string;
  status: 'completed' | 'pending' | 'failed';
  value?: number;
}

export const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Mock API call to fetch all transactions
    const fetchTransactions = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockTransactions: Transaction[] = [
        {
          id: 'REG-2024-001',
          type: 'production',
          producer: 'GreenTech Hydrogen Ltd.',
          creditId: 'CC-2024-001',
          units: 250,
          timestamp: '2024-01-25T14:30:00Z',
          transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
          status: 'completed'
        },
        {
          id: 'REG-2024-002',
          type: 'purchase',
          producer: 'GreenTech Hydrogen Ltd.',
          buyer: 'EcoTech Solutions Inc.',
          creditId: 'CC-2024-001',
          units: 100,
          timestamp: '2024-01-25T16:45:00Z',
          transactionHash: '0xabcdef1234567890abcdef1234567890abcdef12',
          status: 'completed',
          value: 1550.00
        },
        {
          id: 'REG-2024-003',
          type: 'production',
          producer: 'Renewable Energy Corp',
          creditId: 'CC-2024-003',
          units: 420,
          timestamp: '2024-01-23T09:15:00Z',
          transactionHash: '0x567890abcdef1234567890abcdef1234567890ab',
          status: 'completed'
        },
        {
          id: 'REG-2024-004',
          type: 'purchase',
          producer: 'Renewable Energy Corp',
          buyer: 'Green Manufacturing Co.',
          creditId: 'CC-2024-003',
          units: 250,
          timestamp: '2024-01-24T11:20:00Z',
          transactionHash: '0x90abcdef1234567890abcdef1234567890abcdef',
          status: 'completed',
          value: 4187.50
        },
        {
          id: 'REG-2024-005',
          type: 'retirement',
          producer: 'EcoHydro Solutions',
          buyer: 'Carbon Neutral Corp',
          creditId: 'CC-2024-002',
          units: 180,
          timestamp: '2024-01-22T13:10:00Z',
          transactionHash: '0xdef1234567890abcdef1234567890abcdef12345',
          status: 'completed'
        },
        {
          id: 'REG-2024-006',
          type: 'production',
          producer: 'Clean Power Systems',
          creditId: 'CC-2024-004',
          units: 95,
          timestamp: '2024-01-28T10:30:00Z',
          transactionHash: '0x234567890abcdef1234567890abcdef1234567890',
          status: 'pending'
        }
      ];
      
      setTransactions(mockTransactions);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    .filter(tx => {
      const matchesSearch = searchTerm === '' || 
        tx.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.buyer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.creditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || tx.type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  const getExplorerUrl = (hash: string) => {
    return `https://polygonscan.com/tx/${hash}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-primary text-primary-foreground';
      case 'purchase':
        return 'bg-blue-500 text-white';
      case 'retirement':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
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

  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(tx => tx.status === 'completed').length;
  const totalVolume = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.units, 0);

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSearch className="h-5 w-5 text-primary" />
            <span>All Transactions</span>
          </CardTitle>
          <CardDescription>Monitor all carbon credit transactions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading transaction data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileSearch className="h-5 w-5 text-primary" />
          <span>All Transactions</span>
        </CardTitle>
        <CardDescription>Monitor all carbon credit transactions on the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <span className="text-sm font-medium text-muted-foreground">Total Transactions</span>
            <p className="text-2xl font-bold text-primary mt-1">{totalTransactions}</p>
            <p className="text-xs text-muted-foreground">{completedTransactions} completed</p>
          </div>
          <div className="bg-success/5 rounded-lg p-4">
            <span className="text-sm font-medium text-muted-foreground">Total Volume</span>
            <p className="text-2xl font-bold text-success mt-1">{totalVolume.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">kg CO₂ equivalent</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <span className="text-sm font-medium text-muted-foreground">Success Rate</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {totalTransactions > 0 ? Math.round((completedTransactions / totalTransactions) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by producer, buyer, credit ID, or transaction hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="w-full sm:w-auto"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>

        {/* Transactions Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Type</TableHead>
                <TableHead>Producer</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Credit ID</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/20">
                  <TableCell>
                    <Badge className={getTypeColor(transaction.type)}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.producer}</TableCell>
                  <TableCell>
                    {transaction.buyer ? (
                      <span className="font-medium">{transaction.buyer}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{transaction.creditId}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{transaction.units.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">kg</span>
                  </TableCell>
                  <TableCell>
                    {transaction.value ? (
                      <span className="font-semibold">{formatCurrency(transaction.value)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
                        href={getExplorerUrl(transaction.transactionHash)} 
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
        
        {filteredTransactions.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Transactions Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'No transactions have been recorded yet.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};