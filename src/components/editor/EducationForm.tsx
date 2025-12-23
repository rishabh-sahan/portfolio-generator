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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Add Education
        </button>
      </div>

      {education.map(edu => (
        <div key={edu.id} className="border p-4 rounded bg-white shadow-sm space-y-3 relative group">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Institution / University"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Degree / Major"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            />
            <div className="flex space-x-2">
              <input
                className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              />
              <input
                className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Grade / GPA (Optional)"
              value={edu.grade || ''}
              onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
            />
          </div>
        </div>
      ))}
      
      {education.length === 0 && (
        <p className="text-gray-500 text-center py-4">No education added yet.</p>
      )}
    </div>
  );
};
