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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="fullName"
          placeholder="Full Name"
          value={personalInfo.fullName}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="title"
          placeholder="Professional Title (e.g. Full Stack Developer)"
          value={personalInfo.title}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="phone"
          placeholder="Phone (Optional)"
          value={personalInfo.phone || ''}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="location"
          placeholder="Location (e.g. New York, USA)"
          value={personalInfo.location || ''}
          onChange={handleChange}
        />
      </div>

      <textarea
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        name="summary"
        placeholder="Professional Summary"
        rows={4}
        value={personalInfo.summary}
        onChange={handleChange}
      />

      <h3 className="text-lg font-semibold text-gray-700 mt-4">Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={personalInfo.socials.linkedin || ''}
          onChange={handleSocialChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="github"
          placeholder="GitHub URL"
          value={personalInfo.socials.github || ''}
          onChange={handleSocialChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="twitter"
          placeholder="Twitter URL"
          value={personalInfo.socials.twitter || ''}
          onChange={handleSocialChange}
        />
        <input
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          name="website"
          placeholder="Personal Website URL"
          value={personalInfo.socials.website || ''}
          onChange={handleSocialChange}
        />
      </div>
    </div>
  );
};
