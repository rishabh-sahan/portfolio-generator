import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types';

export const ProjectsForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const { projects } = data;

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      repoLink: '',
      demoLink: '',
      imageUrl: ''
    };
    updateSection('projects', [...projects, newProj]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updatedProjs = projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    updateSection('projects', updatedProjs);
  };

  const removeProject = (id: string) => {
    updateSection('projects', projects.filter(p => p.id !== id));
  };

  const inputClass = "w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🚀</span> Projects
        </h2>
        <button
          onClick={addProject}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/25 font-medium"
        >
          + Add Project
        </button>
      </div>

      {projects.map(proj => (
        <div key={proj.id} className="border border-slate-700 p-5 rounded-xl bg-slate-900/50 space-y-4 relative group hover:border-slate-600 transition-colors">
          <button
            onClick={() => removeProject(proj.id)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded"
          >
            Remove
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Technologies (comma separated)"
              value={proj.technologies.join(', ')}
              onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
            />
            <input
              className={inputClass}
              placeholder="Repository Link (GitHub)"
              value={proj.repoLink || ''}
              onChange={(e) => updateProject(proj.id, 'repoLink', e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Live Demo Link"
              value={proj.demoLink || ''}
              onChange={(e) => updateProject(proj.id, 'demoLink', e.target.value)}
            />
            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Image URL (Optional)"
              value={proj.imageUrl || ''}
              onChange={(e) => updateProject(proj.id, 'imageUrl', e.target.value)}
            />
          </div>
          <textarea
            className={`${inputClass} resize-none`}
            placeholder="Project Description"
            rows={3}
            value={proj.description}
            onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
          />
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-500">No projects added yet.</p>
          <p className="text-slate-600 text-sm mt-1">Click "+ Add Project" to get started</p>
        </div>
      )}
    </div>
  );
};
