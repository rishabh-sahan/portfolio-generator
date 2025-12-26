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

  const templates = [
    { id: 'modern', name: 'Modern', icon: '🎨' },
    { id: 'minimal', name: 'Minimal', icon: '📄' },
    { id: 'bold', name: 'Bold', icon: '💪' },
    { id: 'elegant', name: 'Elegant', icon: '✨' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'creative', name: 'Creative', icon: '🌈' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Template Switcher */}
      <div className="bg-slate-800 text-white p-3 flex justify-center items-center flex-wrap gap-2 text-sm rounded-t-xl border border-slate-700">
        <span className="text-slate-400 mr-2">Template:</span>
        {templates.map((template) => (
          <button 
            key={template.id}
            onClick={() => updateSection('theme', template.id)}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              data.theme === template.id 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/25' 
                : 'hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <span>{template.icon}</span>
            <span className="hidden md:inline">{template.name}</span>
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div id="preview-root" className="bg-white min-h-full shadow-2xl mx-auto w-full max-w-[1000px] rounded-b-xl overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};
