import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const TechTemplate: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, education, experience, projects, skills } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-slate-900 min-h-full text-slate-100 font-mono">
      {/* Terminal Header */}
      <header className="bg-slate-800 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-slate-500">~/portfolio</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-green-400">
              <span className="text-slate-500">$ </span>whoami
            </p>
            <h1 className="text-4xl font-bold text-cyan-400">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl text-slate-400">
              <span className="text-pink-400">const</span> role = 
              <span className="text-amber-300"> "{personalInfo.title || 'Professional Title'}"</span>;
            </p>
          </div>

          <div className="mt-8 space-y-1 text-sm">
            {personalInfo.email && (
              <p>
                <span className="text-slate-500">email:</span>{' '}
                <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline">
                  {personalInfo.email}
                </a>
              </p>
            )}
            {personalInfo.phone && (
              <p><span className="text-slate-500">phone:</span> {personalInfo.phone}</p>
            )}
            {personalInfo.location && (
              <p><span className="text-slate-500">location:</span> {personalInfo.location}</p>
            )}
          </div>

          <div className="flex gap-4 mt-6 text-sm">
            {personalInfo.socials.github && (
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" 
                 className="text-slate-400 hover:text-cyan-400 transition-colors">
                [GitHub]
              </a>
            )}
            {personalInfo.socials.linkedin && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer"
                 className="text-slate-400 hover:text-cyan-400 transition-colors">
                [LinkedIn]
              </a>
            )}
            {personalInfo.socials.website && (
              <a href={personalInfo.socials.website} target="_blank" rel="noreferrer"
                 className="text-slate-400 hover:text-cyan-400 transition-colors">
                [Website]
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About */}
      {personalInfo.summary && (
        <section className="py-12 px-8 border-b border-slate-700">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 mb-2">
              <span className="text-slate-500">$ </span>cat about.md
            </p>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-slate-700">
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-12 px-8 border-b border-slate-700">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 mb-6">
              <span className="text-slate-500">$ </span>git log --experience
            </p>
            <div className="space-y-8">
              {experience.map(exp => (
                <div key={exp.id} className="pl-4 border-l-2 border-cyan-600">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400">{exp.role}</h3>
                      <p className="text-pink-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 shrink-0">
                      {exp.startDate} → {exp.current ? 'HEAD' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-sm text-slate-500 mt-1">📍 {exp.location}</p>}
                  <p className="mt-3 text-slate-400 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-12 px-8 border-b border-slate-700">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 mb-6">
              <span className="text-slate-500">$ </span>ls -la ./projects
            </p>
            <div className="grid gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="bg-slate-800 p-6 rounded border border-slate-700 hover:border-cyan-600 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-amber-300">{proj.title}</h3>
                    <div className="flex gap-3 text-sm">
                      {proj.repoLink && (
                        <a href={proj.repoLink} target="_blank" rel="noreferrer" 
                           className="text-slate-400 hover:text-cyan-400">
                          &lt;/&gt;
                        </a>
                      )}
                      {proj.demoLink && (
                        <a href={proj.demoLink} target="_blank" rel="noreferrer"
                           className="text-green-400 hover:text-green-300">
                          ▶ demo
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-slate-400">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-slate-700 text-cyan-300 rounded">
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
        <section className="py-12 px-8 border-b border-slate-700">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 mb-6">
              <span className="text-slate-500">$ </span>npm list --skills
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-pink-400 font-bold mb-3">├── {category}</h3>
                  <div className="pl-4 space-y-1">
                    {categorySkills.map((skill, idx) => (
                      <p key={skill.id} className="text-slate-400">
                        {idx === categorySkills.length - 1 ? '└──' : '├──'} {skill.name}
                        {skill.proficiency === 'Advanced' && (
                          <span className="text-amber-400 ml-2">★</span>
                        )}
                      </p>
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
        <section className="py-12 px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 mb-6">
              <span className="text-slate-500">$ </span>cat education.json
            </p>
            <div className="bg-slate-800 p-6 rounded border border-slate-700">
              <p className="text-slate-500">{'{'}</p>
              {education.map((edu, index) => (
                <div key={edu.id} className="pl-4 my-2">
                  <p className="text-cyan-400">"{edu.institution}"</p>
                  <p className="text-slate-400 pl-4">
                    <span className="text-pink-400">"degree"</span>: "{edu.degree}",
                  </p>
                  <p className="text-slate-400 pl-4">
                    <span className="text-pink-400">"period"</span>: "{edu.startDate} - {edu.endDate}"
                    {edu.grade && (
                      <>, <span className="text-pink-400">"grade"</span>: "{edu.grade}"</>
                    )}
                  </p>
                  {index < education.length - 1 && <p className="text-slate-500">,</p>}
                </div>
              ))}
              <p className="text-slate-500">{'}'}</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-6 px-8 bg-slate-800 text-center text-sm text-slate-500">
        <p>&gt; Built with &lt;code/&gt; by {personalInfo.fullName || 'Developer'} | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};
