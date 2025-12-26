import React, { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { type PortfolioData, initialPortfolioData } from '../types';
import { useAuth } from './AuthContext';
import { portfolioApi } from '../lib/api';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => void;
  loadData: (data: PortfolioData) => void;
  resetData: () => void;
  isSaving: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
  saveError: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_generator_data';
const DEBOUNCE_MS = 1500; // Auto-save after 1.5 seconds of inactivity

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialPortfolioData;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadDone = useRef(false);

  // Load data from MongoDB when user logs in
  useEffect(() => {
    const loadFromDatabase = async () => {
      if (user?.id && !initialLoadDone.current) {
        setIsLoading(true);
        try {
          const portfolioData = await portfolioApi.getPortfolio(user.id);
          if (portfolioData) {
            setData(portfolioData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
          }
          initialLoadDone.current = true;
        } catch (error) {
          console.error('Failed to load portfolio from database:', error);
          // Fall back to localStorage data
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadFromDatabase();
  }, [user?.id]);

  // Reset initialLoadDone when user logs out
  useEffect(() => {
    if (!user) {
      initialLoadDone.current = false;
    }
  }, [user]);

  // Save to localStorage immediately
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Debounced save to MongoDB
  const saveToDatabase = useCallback(async (portfolioData: PortfolioData) => {
    if (!user?.id) return;

    setIsSaving(true);
    setSaveError(null);
    
    try {
      await portfolioApi.savePortfolio(user.id, {
        ...portfolioData,
        userEmail: user.email
      } as PortfolioData & { userEmail?: string });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save portfolio:', error);
      setSaveError('Failed to save to cloud. Changes saved locally.');
    } finally {
      setIsSaving(false);
    }
  }, [user?.id, user?.email]);

  // Trigger debounced save when data changes
  useEffect(() => {
    if (!user?.id || !initialLoadDone.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToDatabase(data);
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, user?.id, saveToDatabase]);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
  };

  const updateSection = <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  const loadData = (newData: PortfolioData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(initialPortfolioData);
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, 
      updateData, 
      updateSection, 
      loadData, 
      resetData,
      isSaving,
      isLoading,
      lastSaved,
      saveError
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
