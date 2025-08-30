import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await login(username, password);
      toast({
        title: "Login Successful",
        description: `Welcome back to Green Ledger!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Green Ledger account</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username (producer, buyer, or regulator)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggle}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};