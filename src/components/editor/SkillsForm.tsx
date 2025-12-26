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

  const inputClass = "p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const selectClass = "p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">⚡</span> Skills
        </h2>
        <button
          onClick={addSkill}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/25 font-medium"
        >
          + Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {skills.map(skill => (
          <div key={skill.id} className="flex items-center gap-3 border border-slate-700 p-3 rounded-xl bg-slate-900/50 hover:border-slate-600 transition-colors group">
            <input
              className={`flex-1 ${inputClass}`}
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
            />
            <select
              className={selectClass}
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
              className={selectClass}
              value={skill.proficiency}
              onChange={(e) => updateSkill(skill.id, 'proficiency', e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500">No skills added yet.</p>
          <p className="text-slate-600 text-sm mt-1">Click "+ Add Skill" to get started</p>
        </div>
      )}
    </div>
  );
};
