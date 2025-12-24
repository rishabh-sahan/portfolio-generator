import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { BoldTemplate } from './templates/BoldTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

export const Preview: React.FC = () => {
  const { data, updateSection } = usePortfolio();

  const renderTemplate = () => {
    switch (data.theme) {
      case 'modern':
        return <ModernTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'bold':
        return <BoldTemplate />;
      case 'elegant':
        return <ElegantTemplate />;
      case 'tech':
        return <TechTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Template Switcher */}
      <div className="bg-gray-800 text-white p-2 flex justify-center items-center flex-wrap gap-2 text-sm">
        <span className="text-gray-400">Template:</span>
        <button 
          onClick={() => updateSection('theme', 'modern')}
          className={`px-3 py-1 rounded ${data.theme === 'modern' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Modern
        </button>
        <button 
          onClick={() => updateSection('theme', 'minimal')}
          className={`px-3 py-1 rounded ${data.theme === 'minimal' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Minimal
        </button>
        <button 
          onClick={() => updateSection('theme', 'bold')}
          className={`px-3 py-1 rounded ${data.theme === 'bold' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Bold
        </button>
        <button 
          onClick={() => updateSection('theme', 'elegant')}
          className={`px-3 py-1 rounded ${data.theme === 'elegant' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Elegant
        </button>
        <button 
          onClick={() => updateSection('theme', 'tech')}
          className={`px-3 py-1 rounded ${data.theme === 'tech' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Tech
        </button>
        <button 
          onClick={() => updateSection('theme', 'creative')}
          className={`px-3 py-1 rounded ${data.theme === 'creative' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          Creative
        </button>
      </div>

      {/* Preview Area */}
      <div id="preview-root" className="bg-white min-h-full shadow-2xl mx-auto w-full max-w-[1000px]">
        {renderTemplate()}
      </div>
    </div>
  );
};
