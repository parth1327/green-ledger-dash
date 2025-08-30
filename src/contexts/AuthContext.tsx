import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'producer' | 'buyer' | 'regulator';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    // Auto-detect role based on username
    let role: UserRole;
    const lowerUsername = username.toLowerCase();
    
    if (lowerUsername === 'producer' || lowerUsername.includes('producer')) {
      role = 'producer';
    } else if (lowerUsername === 'buyer' || lowerUsername.includes('buyer')) {
      role = 'buyer';
    } else if (lowerUsername === 'regulator' || lowerUsername.includes('regulator')) {
      role = 'regulator';
    } else {
      // Default fallback or throw error
      setIsLoading(false);
      throw new Error('Invalid username. Use "producer", "buyer", or "regulator"');
    }
    
    // Mock login - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: `${username}@greenledger.com`,
      role,
      name: username
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    
    // Mock registration - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};