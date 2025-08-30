import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Factory, Loader2, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProducerFormProps {
  onSuccess: (transactionHash: string) => void;
}

export const ProducerForm: React.FC<ProducerFormProps> = ({ onSuccess }) => {
  const [batchId, setBatchId] = useState('');
  const [units, setUnits] = useState('');
  const [productionDate, setProductionDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!batchId || !units || !productionDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call to /produce endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      toast({
        title: "Production Recorded",
        description: `Successfully recorded ${units} units of hydrogen production`,
      });
      
      // Reset form
      setBatchId('');
      setUnits('');
      setProductionDate(undefined);
      
      onSuccess(mockTxHash);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to record production. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Factory className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Record Hydrogen Production</CardTitle>
            <CardDescription>Submit your hydrogen production data to generate carbon credits</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batchId" className="text-sm font-medium">
              Hydrogen Batch ID *
            </Label>
            <Input
              id="batchId"
              type="text"
              placeholder="e.g., H2-2024-001"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="units" className="text-sm font-medium">
              Units Produced (kg) *
            </Label>
            <div className="relative">
              <Input
                id="units"
                type="number"
                placeholder="Enter production quantity"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="h-11 pl-10"
                min="0"
                step="0.01"
                required
              />
              <Zap className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Production Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11",
                    !productionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {productionDate ? format(productionDate, "PPP") : "Select production date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={productionDate}
                  onSelect={setProductionDate}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Recording Production...
              </>
            ) : (
              <>
                <Factory className="h-4 w-4 mr-2" />
                Submit Production
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};