import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const MinimalTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white min-h-full text-gray-900 font-serif p-12 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-2 border-black pb-8 mb-12">
        <h1 className="text-6xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-2xl text-gray-600 italic mb-6">{personalInfo.title || 'Professional Title'}</p>
        
        <div className="flex flex-wrap gap-6 text-sm font-sans uppercase tracking-widest">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        
        <div className="flex gap-6 mt-4 text-sm font-sans font-bold">
          {personalInfo.socials.linkedin && <a href={personalInfo.socials.linkedin} className="hover:underline">LinkedIn</a>}
          {personalInfo.socials.github && <a href={personalInfo.socials.github} className="hover:underline">GitHub</a>}
          {personalInfo.socials.website && <a href={personalInfo.socials.website} className="hover:underline">Portfolio</a>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-12">
          <p className="text-xl leading-relaxed text-gray-800">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-gray-300 pb-2">Experience</h2>
          <div className="space-y-10">
            {experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-gray-500 font-sans text-sm">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className="text-lg text-gray-600 mb-2 italic">{exp.company}, {exp.location}</div>
                  <p className="text-gray-800 whitespace-pre-line">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-gray-300 pb-2">Selected Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold">{proj.title}</h3>
                  <div className="space-x-4 text-sm font-sans">
                    {proj.repoLink && <a href={proj.repoLink} className="hover:underline">Code</a>}
                    {proj.demoLink && <a href={proj.demoLink} className="hover:underline">Live</a>}
                  </div>
                </div>
                <p className="text-gray-800 mb-2">{proj.description}</p>
                <div className="text-sm text-gray-500 font-sans">
                  {proj.technologies.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map(skill => (
                <span key={skill.id} className="text-gray-800 border-b border-gray-200 pb-1">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <div className="text-gray-600 italic">{edu.degree}</div>
                  <div className="text-sm text-gray-500 font-sans">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
