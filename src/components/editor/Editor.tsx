import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';

type Tab = 'personal' | 'education' | 'experience' | 'projects' | 'skills';

const tabIcons: Record<Tab, string> = {
  personal: '👤',
  education: '🎓',
  experience: '💼',
  projects: '🚀',
  skills: '⚡',
};

export const Editor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const { data, loadData, resetData } = usePortfolio();

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        loadData(json);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    // Add a small delay to ensure the page is ready for print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Toolbar */}
      <div className="bg-slate-900 border-b border-slate-700 p-3 flex justify-between items-center z-10">
        <div className="flex space-x-1 overflow-x-auto">
          {(['personal', 'education', 'experience', 'projects', 'skills'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{tabIcons[tab]}</span>
              <span className="hidden sm:inline">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-800">
        <div className="max-w-2xl mx-auto">
          {activeTab === 'personal' && <PersonalInfoForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'projects' && <ProjectsForm />}
          {activeTab === 'skills' && <SkillsForm />}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-900 border-t border-slate-700 p-4 flex flex-col space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <button 
            onClick={handlePrint} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg shadow-green-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF / Print
          </button>
          <button 
            onClick={resetData} 
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors"
          >
            Reset All Data
          </button>
        </div>
        <p className="text-xs text-slate-500">
          💡 Tip: In the print dialog, select "Save as PDF" as the destination to download a PDF file.
        </p>
        <div className="flex space-x-4 pt-2 border-t border-slate-700">
          <label className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleExport} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
};
