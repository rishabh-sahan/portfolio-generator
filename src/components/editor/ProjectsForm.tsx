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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={addProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {projects.map(proj => (
        <div key={proj.id} className="border p-4 rounded bg-white shadow-sm space-y-3 relative group">
          <button
            onClick={() => removeProject(proj.id)}
            className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Technologies (comma separated)"
              value={proj.technologies.join(', ')}
              onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Repository Link (GitHub)"
              value={proj.repoLink || ''}
              onChange={(e) => updateProject(proj.id, 'repoLink', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Live Demo Link"
              value={proj.demoLink || ''}
              onChange={(e) => updateProject(proj.id, 'demoLink', e.target.value)}
            />
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
              placeholder="Image URL (Optional)"
              value={proj.imageUrl || ''}
              onChange={(e) => updateProject(proj.id, 'imageUrl', e.target.value)}
            />
          </div>
          <textarea
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Project Description"
            rows={3}
            value={proj.description}
            onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
          />
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-gray-500 text-center py-4">No projects added yet.</p>
      )}
    </div>
  );
};
