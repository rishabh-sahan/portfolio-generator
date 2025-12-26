import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const PersonalInfoForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const { personalInfo } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSection('personalInfo', { ...personalInfo, [name]: value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSection('personalInfo', {
      ...personalInfo,
      socials: { ...personalInfo.socials, [name]: value }
    });
  };

  const inputClass = "w-full p-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">👤</span> Personal Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className={inputClass}
          name="fullName"
          placeholder="Full Name"
          value={personalInfo.fullName}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="title"
          placeholder="Professional Title (e.g. Full Stack Developer)"
          value={personalInfo.title}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="phone"
          placeholder="Phone (Optional)"
          value={personalInfo.phone || ''}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="location"
          placeholder="Location (e.g. New York, USA)"
          value={personalInfo.location || ''}
          onChange={handleChange}
        />
      </div>

      <textarea
        className={`${inputClass} resize-none`}
        name="summary"
        placeholder="Professional Summary"
        rows={4}
        value={personalInfo.summary}
        onChange={handleChange}
      />

      <h3 className="text-lg font-semibold text-slate-300 mt-6 flex items-center gap-2">
        <span>🔗</span> Social Links
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className={inputClass}
          name="linkedin"
          placeholder="LinkedIn URL"
          value={personalInfo.socials.linkedin || ''}
          onChange={handleSocialChange}
        />
        <input
          className={inputClass}
          name="github"
          placeholder="GitHub URL"
          value={personalInfo.socials.github || ''}
          onChange={handleSocialChange}
        />
        <input
          className={inputClass}
          name="twitter"
          placeholder="Twitter URL"
          value={personalInfo.socials.twitter || ''}
          onChange={handleSocialChange}
        />
        <input
          className={inputClass}
          name="website"
          placeholder="Personal Website URL"
          value={personalInfo.socials.website || ''}
          onChange={handleSocialChange}
        />
      </div>
    </div>
  );
};
