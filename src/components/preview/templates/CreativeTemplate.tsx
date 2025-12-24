import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const CreativeTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-full text-white font-sans">
      {/* Hero with gradient overlay */}
      <header className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              👋 Welcome to my portfolio
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            {personalInfo.title || 'Professional Title'}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} 
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                ✉️ {personalInfo.email}
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                📍 {personalInfo.location}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {personalInfo.socials.linkedin && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" 
                 className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors hover:scale-110 transform">
                in
              </a>
            )}
            {personalInfo.socials.github && (
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors hover:scale-110 transform">
                ⌨
              </a>
            )}
            {personalInfo.socials.website && (
              <a href={personalInfo.socials.website} target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors hover:scale-110 transform">
                🌐
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About */}
      {personalInfo.summary && (
        <section className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-sm">
                  ✨
                </span>
                About Me
              </h2>
              <p className="text-purple-100 leading-relaxed whitespace-pre-line">
                {personalInfo.summary}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} 
                     className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                     style={{ transform: `translateX(${index % 2 === 0 ? '0' : '20px'})` }}>
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300">{exp.role}</h3>
                      <p className="text-pink-300">{exp.company}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-white/10">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-sm text-purple-300 mt-2">{exp.location}</p>}
                  <p className="mt-4 text-purple-100 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-pink-400/50 transition-all">
                  {proj.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">{proj.title}</h3>
                    <p className="text-purple-200 text-sm mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {proj.repoLink && (
                        <a href={proj.repoLink} target="_blank" rel="noreferrer" 
                           className="text-sm text-purple-300 hover:text-white transition-colors">
                          View Code →
                        </a>
                      )}
                      {proj.demoLink && (
                        <a href={proj.demoLink} target="_blank" rel="noreferrer"
                           className="text-sm text-pink-300 hover:text-white transition-colors">
                          Live Demo →
                        </a>
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
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-pink-300 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span key={skill.id} 
                            className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-white border border-white/10">
                        {skill.name}
                        {skill.proficiency === 'Advanced' && ' ⭐'}
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
        <section className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300">{edu.institution}</h3>
                    <p className="text-purple-200">{edu.degree}</p>
                    {edu.grade && <p className="text-sm text-pink-300 mt-1">Grade: {edu.grade}</p>}
                  </div>
                  <span className="text-sm text-purple-300">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/10">
        <p className="text-purple-300 text-sm">
          Made with 💜 by {personalInfo.fullName || 'Creative Developer'} | {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
