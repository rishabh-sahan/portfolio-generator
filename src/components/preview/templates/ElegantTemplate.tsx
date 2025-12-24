import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const ElegantTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-stone-50 min-h-full text-stone-800 font-serif">
      {/* Header */}
      <header className="py-16 px-8 text-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
          <h1 className="text-5xl font-light tracking-wide mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-stone-500 italic mb-6">
            {personalInfo.title || 'Professional Title'}
          </p>
          
          <div className="flex justify-center flex-wrap gap-6 text-sm text-stone-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-stone-900 transition-colors">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            {personalInfo.socials.linkedin && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" 
                 className="text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-4">
                LinkedIn
              </a>
            )}
            {personalInfo.socials.github && (
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer"
                 className="text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-4">
                GitHub
              </a>
            )}
            {personalInfo.socials.website && (
              <a href={personalInfo.socials.website} target="_blank" rel="noreferrer"
                 className="text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-4">
                Portfolio
              </a>
            )}
          </div>
          <div className="w-24 h-px bg-stone-400 mx-auto mt-8"></div>
        </div>
      </header>

      {/* About */}
      {personalInfo.summary && (
        <section className="py-12 px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-stone-600 italic">
              "{personalInfo.summary}"
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-12 px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-light tracking-widest text-stone-400 uppercase mb-10">
              Experience
            </h2>
            <div className="space-y-10">
              {experience.map(exp => (
                <div key={exp.id} className="text-center border-b border-stone-200 pb-10">
                  <h3 className="text-xl font-medium text-stone-800">{exp.role}</h3>
                  <div className="text-lg text-stone-600 italic mt-1">{exp.company}</div>
                  <div className="text-sm text-stone-400 mt-2">
                    {exp.location && <span>{exp.location} • </span>}
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <p className="mt-4 text-stone-600 leading-relaxed max-w-xl mx-auto whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-12 px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-light tracking-widest text-stone-400 uppercase mb-10">
              Selected Work
            </h2>
            <div className="space-y-10">
              {projects.map(proj => (
                <div key={proj.id} className="text-center border-b border-stone-100 pb-10">
                  <h3 className="text-xl font-medium text-stone-800">{proj.title}</h3>
                  <p className="mt-3 text-stone-600 leading-relaxed max-w-xl mx-auto">{proj.description}</p>
                  <div className="flex justify-center flex-wrap gap-2 mt-4">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs text-stone-400 italic">
                        {tech}{idx < proj.technologies.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {proj.repoLink && (
                      <a href={proj.repoLink} target="_blank" rel="noreferrer" 
                         className="text-sm text-stone-500 hover:text-stone-800 underline underline-offset-4">
                        View Code
                      </a>
                    )}
                    {proj.demoLink && (
                      <a href={proj.demoLink} target="_blank" rel="noreferrer"
                         className="text-sm text-stone-500 hover:text-stone-800 underline underline-offset-4">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills & Education */}
      <section className="py-12 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="text-center">
                <h2 className="text-xl font-light tracking-widest text-stone-400 uppercase mb-8">
                  Expertise
                </h2>
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">{category}</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {categorySkills.map(skill => (
                        <span key={skill.id} className="text-sm text-stone-600">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="text-center">
                <h2 className="text-xl font-light tracking-widest text-stone-400 uppercase mb-8">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-medium text-stone-800">{edu.institution}</h3>
                      <p className="text-stone-600 italic">{edu.degree}</p>
                      <p className="text-sm text-stone-400">{edu.startDate} — {edu.endDate}</p>
                      {edu.grade && <p className="text-sm text-stone-500 mt-1">{edu.grade}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="w-16 h-px bg-stone-300 mx-auto mb-4"></div>
        <p className="text-sm text-stone-400">
          © {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}
        </p>
      </footer>
    </div>
  );
};
