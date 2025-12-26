import type { PortfolioData } from '../types';

// Remove trailing slash if present
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

console.log('API URL:', API_URL); // Debug log - remove later

export const portfolioApi = {
  // Fetch portfolio data for a user
  async getPortfolio(userId: string): Promise<PortfolioData> {
    try {
      const response = await fetch(`${API_URL}/portfolio/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }
      return response.json();
    } catch (error) {
      console.error('getPortfolio error:', error);
      throw error;
    }
  },

  // Save entire portfolio
  async savePortfolio(userId: string, data: PortfolioData): Promise<PortfolioData> {
    try {
      const response = await fetch(`${API_URL}/portfolio/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to save portfolio');
      }
      return response.json();
    } catch (error) {
      console.error('savePortfolio error:', error);
      throw error;
    }
  },

  // Update a specific section of the portfolio
  async updateSection<T>(
    userId: string, 
    section: 'personalInfo' | 'education' | 'experience' | 'projects' | 'skills' | 'theme',
    data: T
  ): Promise<PortfolioData> {
    const response = await fetch(`${API_URL}/portfolio/${userId}/${section}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update ${section}`);
    }
    return response.json();
  },

  // Delete portfolio
  async deletePortfolio(userId: string): Promise<void> {
    const response = await fetch(`${API_URL}/portfolio/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete portfolio');
    }
  },

  // Check if API is available
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};
