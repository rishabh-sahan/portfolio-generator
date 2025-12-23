import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const ModernTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-white min-h-full text-gray-800 font-sans">
      {/* Hero */}
      <header className="bg-gray-900 text-white py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-2xl text-gray-300 mb-8 font-light">{personalInfo.title || 'Professional Title'}</p>
          
          <div className="flex justify-center space-x-6 text-sm flex-wrap gap-y-2">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-blue-400 transition-colors">
                <span className="mr-2">📧</span> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center text-gray-400">
                <span className="mr-2">📱</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center text-gray-400">
                <span className="mr-2">📍</span> {personalInfo.location}
              </span>
            )}
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            {personalInfo.socials.linkedin && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            )}
            {personalInfo.socials.github && (
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            )}
            {personalInfo.socials.twitter && (
              <a href={personalInfo.socials.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            )}
            {personalInfo.socials.website && (
              <a href={personalInfo.socials.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">Website</a>
            )}
          </div>
        </div>
      </header>

      {/* About */}
      {personalInfo.summary && (
        <section className="py-12 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 inline-block pb-1">About Me</h2>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-12 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 inline-block pb-1">Experience</h2>
            <div className="space-y-10 border-l-2 border-gray-200 ml-3 pl-8 relative">
              {experience.map(exp => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-blue-500"></span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-lg text-blue-600 font-medium mb-1">{exp.company}</div>
                  {exp.location && <div className="text-sm text-gray-500 mb-3">{exp.location}</div>}
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-12 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 inline-block pb-1">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  {proj.imageUrl && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{proj.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">{tech}</span>
                      ))}
                    </div>
                    <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-100">
                      {proj.repoLink && (
                        <a href={proj.repoLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center">GitHub</a>
                      )}
                      {proj.demoLink && (
                        <a href={proj.demoLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">Live Demo &rarr;</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="py-12 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 inline-block pb-1">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <div key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center space-x-2">
                        <span>{skill.name}</span>
                        {skill.proficiency === 'Advanced' && <span className="text-yellow-500 text-xs">★</span>}
                      </div>
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
        <section className="py-12 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 inline-block pb-1">Education</h2>
            <div className="space-y-8">
              {education.map(edu => (
                <div key={edu.id} className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                    <p className="text-lg text-gray-600">{edu.degree}</p>
                    {edu.grade && <p className="text-sm text-gray-500 mt-1">Grade: {edu.grade}</p>}
                  </div>
                  <div className="mt-2 md:mt-0 text-gray-500 font-medium">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};
