import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Education } from '../../types';

export const EducationForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const { education } = data;

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      grade: ''
    };
    updateSection('education', [...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updatedEdu = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateSection('education', updatedEdu);
  };

  const removeEducation = (id: string) => {
    updateSection('education', education.filter(edu => edu.id !== id));
  };

  const inputClass = "w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎓</span> Education
        </h2>
        <button
          onClick={addEducation}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/25 font-medium"
        >
          + Add Education
        </button>
      </div>

      {education.map(edu => (
        <div key={edu.id} className="border border-slate-700 p-5 rounded-xl bg-slate-900/50 space-y-4 relative group hover:border-slate-600 transition-colors">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded"
          >
            Remove
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Institution / University"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Degree / Major"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            />
            <div className="flex space-x-2">
              <input
                className={inputClass}
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
            <input
              className={inputClass}
              placeholder="Grade / GPA (Optional)"
              value={edu.grade || ''}
              onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
            />
          </div>
        </div>
      ))}
      
      {education.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500">No education added yet.</p>
          <p className="text-slate-600 text-sm mt-1">Click "+ Add Education" to get started</p>
        </div>
      )}
    </div>
  );
};
