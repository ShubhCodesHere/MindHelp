import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<void>;
  register: (name: string, email: string, password: string, role: User['role']) => Promise<void>;
  guestLogin: (name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('mindhelp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string, role: User['role']) => {
    setLoading(true);
    try {
      // Mock authentication - replace with real auth
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role,
        tokens: role === 'helper' ? 50 : 25,
        rating: role === 'helper' ? 4.5 : undefined,
        isOnline: true,
        helpCount: role === 'helper' ? 15 : undefined,
        specialization: role === 'psychiatrist' ? 'Clinical Psychology' : undefined,
      };
      
      setUser(mockUser);
      localStorage.setItem('mindhelp_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, _password: string, role: User['role']) => {
    setLoading(true);
    try {
      // Mock registration - replace with real auth
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        tokens: 25,
        isOnline: true,
      };
      
      setUser(mockUser);
      localStorage.setItem('mindhelp_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async (name: string) => {
    setLoading(true);
    try {
      // Create a guest user with a unique identifier
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const guestUser: User = {
        id: guestId,
        email: `${guestId}@guest.mindhelp.com`,
        name: name || 'Guest User',
        role: 'guest',
        tokens: 0, // Guests don't need tokens
        isOnline: true,
        isGuest: true,
      };
      
      setUser(guestUser);
      localStorage.setItem('mindhelp_user', JSON.stringify(guestUser));
    } catch (error) {
      console.error('Guest login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindhelp_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('mindhelp_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    register,
    guestLogin,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
