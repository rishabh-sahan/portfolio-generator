import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';

type Tab = 'personal' | 'education' | 'experience' | 'projects' | 'skills';

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
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        loadData(json);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b p-4 flex justify-between items-center shadow-sm z-10">
        <div className="flex space-x-2 overflow-x-auto">
          {(['personal', 'education', 'experience', 'projects', 'skills'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'personal' && <PersonalInfoForm />}
        {activeTab === 'education' && <EducationForm />}
        {activeTab === 'experience' && <ExperienceForm />}
        {activeTab === 'projects' && <ProjectsForm />}
        {activeTab === 'skills' && <SkillsForm />}
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t p-4 flex flex-col space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => window.print()} 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors font-medium"
          >
            Download PDF / Print
          </button>
          <button onClick={resetData} className="text-red-500 hover:underline">
            Reset All Data
          </button>
        </div>
        <div className="flex space-x-4 pt-2 border-t">
          <label className="cursor-pointer text-blue-600 hover:underline">
            Import JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleExport} className="text-blue-600 hover:underline">
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
};
