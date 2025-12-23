import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Skill } from '../../types';

export const SkillsForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const { skills } = data;

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'Other',
      proficiency: 'Intermediate'
    };
    updateSection('skills', [...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updatedSkills = skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateSection('skills', updatedSkills);
  };

  const removeSkill = (id: string) => {
    updateSection('skills', skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {skills.map(skill => (
          <div key={skill.id} className="flex items-center space-x-2 border p-2 rounded bg-white shadow-sm">
            <input
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
            />
            <select
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={skill.proficiency}
              onChange={(e) => updateSkill(skill.id, 'proficiency', e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:text-red-700 px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-center py-4">No skills added yet.</p>
      )}
    </div>
  );
};
