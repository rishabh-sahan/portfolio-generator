import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const BoldTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-black min-h-full text-white font-sans">
      {/* Hero Section */}
      <header className="py-24 px-8 border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl font-black uppercase tracking-tight leading-none mb-4">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-3xl font-light text-yellow-400 uppercase tracking-widest">
            {personalInfo.title || 'Professional Title'}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-mono">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-yellow-400 transition-colors">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && <span className="text-gray-400">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="text-gray-400">{personalInfo.location}</span>}
          </div>

          <div className="mt-6 flex gap-4">
            {personalInfo.socials.linkedin && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" 
                 className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-all font-bold text-sm uppercase">
                LinkedIn
              </a>
            )}
            {personalInfo.socials.github && (
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer"
                 className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-all font-bold text-sm uppercase">
                GitHub
              </a>
            )}
            {personalInfo.socials.website && (
              <a href={personalInfo.socials.website} target="_blank" rel="noreferrer"
                 className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all font-bold text-sm uppercase">
                Website
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About */}
      {personalInfo.summary && (
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-yellow-400 pl-6">
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center">
              <span className="w-12 h-1 bg-yellow-400 mr-4"></span>
              Experience
            </h2>
            <div className="space-y-12">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-2 border-gray-700 pl-8 hover:border-yellow-400 transition-colors">
                  <div className="text-sm font-mono text-gray-500 mb-2">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                  <div className="text-lg text-yellow-400 font-medium">{exp.company}</div>
                  {exp.location && <div className="text-sm text-gray-500">{exp.location}</div>}
                  <p className="mt-4 text-gray-400 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center">
              <span className="w-12 h-1 bg-yellow-400 mr-4"></span>
              Projects
            </h2>
            <div className="space-y-8">
              {projects.map(proj => (
                <div key={proj.id} className="border border-gray-700 p-6 hover:border-yellow-400 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <div className="flex gap-3">
                      {proj.repoLink && (
                        <a href={proj.repoLink} target="_blank" rel="noreferrer" 
                           className="text-sm font-mono text-gray-400 hover:text-yellow-400">
                          [CODE]
                        </a>
                      )}
                      {proj.demoLink && (
                        <a href={proj.demoLink} target="_blank" rel="noreferrer"
                           className="text-sm font-mono text-yellow-400 hover:text-white">
                          [LIVE]
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-1 bg-gray-800 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center">
              <span className="w-12 h-1 bg-yellow-400 mr-4"></span>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-wider mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span key={skill.id} className="text-sm px-3 py-1 border border-gray-700 text-gray-300">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center">
              <span className="w-12 h-1 bg-yellow-400 mr-4"></span>
              Education
            </h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start border-b border-gray-800 pb-6">
                  <div>
                    <h3 className="text-xl font-bold">{edu.institution}</h3>
                    <p className="text-gray-400">{edu.degree}</p>
                    {edu.grade && <p className="text-sm text-yellow-400 mt-1">Grade: {edu.grade}</p>}
                  </div>
                  <div className="text-right text-sm font-mono text-gray-500">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
