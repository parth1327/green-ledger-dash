import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Leaf, Zap, Shield, Globe } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative min-h-screen flex">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex flex-col justify-center px-12 py-16">
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary-foreground/20 rounded-xl">
                  <Leaf className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Green Ledger</h1>
                  <p className="text-primary-foreground/80">Carbon Credit Platform</p>
                </div>
              </div>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Transparent, blockchain-powered carbon credit trading for a sustainable future
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-foreground/20 rounded-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Producer Portal</h3>
                  <p className="text-primary-foreground/80">
                    Record hydrogen production and generate verified carbon credits instantly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-foreground/20 rounded-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Buyer Marketplace</h3>
                  <p className="text-primary-foreground/80">
                    Browse and purchase carbon credits from verified producers
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-foreground/20 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Regulatory Oversight</h3>
                  <p className="text-primary-foreground/80">
                    Complete transparency with real-time transaction monitoring
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-primary-foreground/10 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-primary-foreground/80">Credits Traded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-primary-foreground/80">Producers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-primary-foreground/80">Buyers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Green Ledger</h1>
              <p className="text-muted-foreground">Carbon Credit Platform</p>
            </div>

            {isLogin ? (
              <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggle={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;