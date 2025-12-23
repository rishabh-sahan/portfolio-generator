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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Experience</h2>
        <button
          onClick={addExperience}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Add Experience
        </button>
      </div>

      {experience.map(exp => (
        <div key={exp.id} className="border p-4 rounded bg-white shadow-sm space-y-3 relative group">
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Role / Job Title"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Location"
              value={exp.location || ''}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">I currently work here</span>
            </div>
            <div className="flex space-x-2">
              <input
                className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
              <input
                className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="End Date"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
          <textarea
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Description (Responsibilities, Achievements)"
            rows={4}
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
          />
        </div>
      ))}

      {experience.length === 0 && (
        <p className="text-gray-500 text-center py-4">No experience added yet.</p>
      )}
    </div>
  );
};
