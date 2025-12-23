import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

export const Preview: React.FC = () => {
  const { data, updateSection } = usePortfolio();

  return (
    <div className="flex flex-col h-full">
      {/* Template Switcher */}
      <div className="bg-gray-800 text-white p-2 flex justify-center space-x-4 text-sm">
        <span className="text-gray-400 self-center">Select Template:</span>
        <button 
          onClick={() => updateSection('theme', 'light')}
          className={`px-3 py-1 rounded ${data.theme === 'light' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Modern
        </button>
        <button 
          onClick={() => updateSection('theme', 'minimal')}
          className={`px-3 py-1 rounded ${data.theme === 'minimal' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Minimal (Resume)
        </button>
      </div>

      {/* Preview Area */}
      <div id="preview-root" className="bg-white min-h-full shadow-2xl mx-auto w-full max-w-[1000px]">
        {data.theme === 'light' ? <ModernTemplate /> : <MinimalTemplate />}
      </div>
    </div>
  );
};
