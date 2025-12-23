import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type PortfolioData, initialPortfolioData } from '../types';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => void;
  loadData: (data: PortfolioData) => void;
  resetData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_generator_data';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialPortfolioData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

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
    <PortfolioContext.Provider value={{ data, updateData, updateSection, loadData, resetData }}>
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
