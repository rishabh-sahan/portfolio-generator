import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Experience } from '../../types';

export const ExperienceForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const { experience } = data;

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateSection('experience', [...experience, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updatedExp = experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateSection('experience', updatedExp);
  };

  const removeExperience = (id: string) => {
    updateSection('experience', experience.filter(exp => exp.id !== id));
  };

  const inputClass = "w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">💼</span> Experience
        </h2>
        <button
          onClick={addExperience}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/25 font-medium"
        >
          + Add Experience
        </button>
      </div>

      {experience.map(exp => (
        <div key={exp.id} className="border border-slate-700 p-5 rounded-xl bg-slate-900/50 space-y-4 relative group hover:border-slate-600 transition-colors">
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded"
          >
            Remove
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Role / Job Title"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Location"
              value={exp.location || ''}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
            />
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 border border-slate-600 rounded-lg">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="w-4 h-4 bg-slate-900 border-slate-600 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="text-sm text-slate-400">I currently work here</span>
            </div>
            <div className="flex space-x-2">
              <input
                className={inputClass}
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
              <input
                className={`${inputClass} ${exp.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="End Date"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
          <textarea
            className={`${inputClass} resize-none`}
            placeholder="Description (Responsibilities, Achievements)"
            rows={4}
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
          />
        </div>
      ))}

      {experience.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500">No experience added yet.</p>
          <p className="text-slate-600 text-sm mt-1">Click "+ Add Experience" to get started</p>
        </div>
      )}
    </div>
  );
};
