import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address } from '../types';
import { initialProfile, initialAddresses } from '../data/initialData';

interface AuthContextType {
  user: UserProfile | null;
  addresses: Address[];
  isAuthenticated: boolean;
  login: (phone: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateLoyaltyPoints: (delta: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nfb_user');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('nfb_addresses');
    return saved ? JSON.parse(saved) : initialAddresses;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('nfb_auth');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('nfb_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nfb_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('nfb_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (phone: string) => {
    setIsAuthenticated(true);
    setUser((prev) => {
      if (prev) return { ...prev, phone };
      return {
        ...initialProfile,
        phone
      };
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const formatted: Address = {
      ...newAddr,
      id,
      isDefault: addresses.length === 0 ? true : !!newAddr.isDefault
    };

    setAddresses((prev) => {
      let next = [...prev];
      if (formatted.isDefault) {
        next = next.map((a) => ({ ...a, isDefault: false }));
      }
      return [...next, formatted];
    });
  };

  const updateAddress = (id: string, updated: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const updateLoyaltyPoints = (delta: number) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        loyaltyPoints: Math.max(0, prev.loyaltyPoints + delta)
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        updateLoyaltyPoints
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
