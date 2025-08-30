import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Loader2, Trash2, Archive } from 'lucide-react';

interface RetiredCredit {
  id: string;
  creditId: string;
  originalProducer: string;
  retiredBy: string;
  units: number;
  retirementDate: string;
  retirementReason: string;
  transactionHash: string;
  certificateHash?: string;
}

export const RetiredCredits: React.FC = () => {
  const [retiredCredits, setRetiredCredits] = useState<RetiredCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock API call to fetch retired credits
    const fetchRetiredCredits = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRetiredCredits: RetiredCredit[] = [
        {
          id: 'RET-2024-001',
          creditId: 'CC-2024-002',
          originalProducer: 'EcoHydro Solutions',
          retiredBy: 'Carbon Neutral Corp',
          units: 180,
          retirementDate: '2024-01-22T13:10:00Z',
          retirementReason: 'Voluntary carbon offsetting',
          transactionHash: '0xdef1234567890abcdef1234567890abcdef12345',
          certificateHash: '0x123abc456def789012abc456def789012abc456'
        },
        {
          id: 'RET-2024-002',
          creditId: 'CC-2024-001',
          originalProducer: 'GreenTech Hydrogen Ltd.',
          retiredBy: 'Sustainable Corp Inc.',
          units: 150,
          retirementDate: '2024-01-26T10:30:00Z',
          retirementReason: 'Compliance requirement',
          transactionHash: '0x456def789012abc456def789012abc456def789',
          certificateHash: '0x789def012abc456def012abc456def012abc456'
        },
        {
          id: 'RET-2024-003',
          creditId: 'CC-2024-003',
          originalProducer: 'Renewable Energy Corp',
          retiredBy: 'Green Manufacturing Co.',
          units: 170,
          retirementDate: '2024-01-24T15:45:00Z',
          retirementReason: 'Product carbon neutrality',
          transactionHash: '0x012abc456def789012abc456def789012abc456d',
          certificateHash: '0xabc456def789012abc456def789012abc456def'
        },
        {
          id: 'RET-2024-004',
          creditId: 'CC-2024-005',
          originalProducer: 'Clean Power Systems',
          retiredBy: 'EcoTech Solutions Inc.',
          units: 95,
          retirementDate: '2024-01-29T09:20:00Z',
          retirementReason: 'Annual sustainability goals',
          transactionHash: '0x789012abc456def789012abc456def789012abc4',
          certificateHash: '0xdef789012abc456def789012abc456def789012'
        },
        {
          id: 'RET-2024-005',
          creditId: 'CC-2024-007',
          originalProducer: 'Hydrogen Innovations Ltd.',
          retiredBy: 'Climate Action Corp',
          units: 300,
          retirementDate: '2024-01-27T14:15:00Z',
          retirementReason: 'Supply chain decarbonization',
          transactionHash: '0x345def789012abc456def789012abc456def7890',
          certificateHash: '0x567890abc123def456abc123def456abc123def'
        }
      ];
      
      setRetiredCredits(mockRetiredCredits);
      setLoading(false);
    };

    fetchRetiredCredits();
  }, []);

  const filteredCredits = retiredCredits.filter(credit => {
    const searchLower = searchTerm.toLowerCase();
    return searchTerm === '' || 
      credit.creditId.toLowerCase().includes(searchLower) ||
      credit.originalProducer.toLowerCase().includes(searchLower) ||
      credit.retiredBy.toLowerCase().includes(searchLower) ||
      credit.retirementReason.toLowerCase().includes(searchLower) ||
      credit.transactionHash.toLowerCase().includes(searchLower);
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

  const getExplorerUrl = (hash: string) => {
    return `https://polygonscan.com/tx/${hash}`;
  };

  const getCertificateUrl = (hash: string) => {
    return `https://ipfs.io/ipfs/${hash}`;
  };

  const totalRetiredCredits = retiredCredits.reduce((sum, credit) => sum + credit.units, 0);
  const uniqueRetirers = new Set(retiredCredits.map(credit => credit.retiredBy)).size;
  const totalRetirements = retiredCredits.length;

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Archive className="h-5 w-5 text-primary" />
            <span>Retired Credits</span>
          </CardTitle>
          <CardDescription>Track carbon credits that have been permanently retired</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading retired credits...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Archive className="h-5 w-5 text-primary" />
          <span>Retired Credits</span>
        </CardTitle>
        <CardDescription>Track carbon credits that have been permanently retired</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-muted-foreground">Total Retired</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-1">{totalRetiredCredits.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">kg CO₂ permanently retired</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <span className="text-sm font-medium text-muted-foreground">Retirement Events</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalRetirements}</p>
            <p className="text-xs text-muted-foreground">Total retirement transactions</p>
          </div>
          <div className="bg-success/5 rounded-lg p-4">
            <span className="text-sm font-medium text-muted-foreground">Active Retirers</span>
            <p className="text-2xl font-bold text-success mt-1">{uniqueRetirers}</p>
            <p className="text-xs text-muted-foreground">Organizations retiring credits</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by credit ID, producer, retirer, or transaction hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Retired Credits Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Credit ID</TableHead>
                <TableHead>Original Producer</TableHead>
                <TableHead>Retired By</TableHead>
                <TableHead>Units Retired</TableHead>
                <TableHead>Retirement Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Documents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCredits.map((credit) => (
                <TableRow key={credit.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Archive className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{credit.creditId}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{credit.originalProducer}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{credit.retiredBy}</p>
                      <p className="text-sm text-muted-foreground">ID: {credit.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-purple-600">{credit.units.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs">
                        RETIRED
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">kg CO₂</p>
                  </TableCell>
                  <TableCell>{formatDate(credit.retirementDate)}</TableCell>
                  <TableCell>
                    <span className="text-sm">{credit.retirementReason}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 w-8 p-0"
                        title="View transaction on blockchain"
                      >
                        <a 
                          href={getExplorerUrl(credit.transactionHash)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      {credit.certificateHash && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                          title="View retirement certificate"
                        >
                          <a 
                            href={getCertificateUrl(credit.certificateHash)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Archive className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredCredits.length === 0 && !loading && (
          <div className="text-center py-12">
            <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Retired Credits Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : 'No carbon credits have been retired yet.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};