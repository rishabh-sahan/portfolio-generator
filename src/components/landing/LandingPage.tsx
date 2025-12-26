import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Template preview images (using placeholder representations)
const templatePreviews = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Colorful, engaging design with blue accents',
    gradient: 'from-blue-600 to-blue-400',
    bgColor: 'bg-blue-50',
    accentColor: 'text-blue-600',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, professional resume-style layout',
    gradient: 'from-gray-600 to-gray-400',
    bgColor: 'bg-white',
    accentColor: 'text-gray-800',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High contrast black/yellow with strong typography',
    gradient: 'from-yellow-500 to-amber-400',
    bgColor: 'bg-gray-900',
    accentColor: 'text-yellow-400',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated stone colors, centered serif design',
    gradient: 'from-stone-600 to-stone-400',
    bgColor: 'bg-stone-100',
    accentColor: 'text-stone-700',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Terminal/code style with syntax highlighting',
    gradient: 'from-cyan-500 to-green-400',
    bgColor: 'bg-slate-900',
    accentColor: 'text-cyan-400',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Gradient purple/pink with glassmorphism effects',
    gradient: 'from-purple-600 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-900 to-pink-900',
    accentColor: 'text-purple-300',
  },
];

export function LandingPage() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowProfileMenu(false);
  };

  const scrollToTemplates = () => {
    setShowTemplates(true);
    setTimeout(() => {
      document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg mr-2 text-sm font-bold">
                PG
              </span>
              <span className="text-xl font-bold text-white">
                Portfolio Generator
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-slate-300 hidden sm:block">
                      {user.email?.split('@')[0] || 'User'}
                    </span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-700">
                        <p className="text-sm font-medium text-white truncate">{user.email}</p>
                        <p className="text-xs text-slate-400">Logged in</p>
                      </div>
                      <Link
                        to="/builder"
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Go to Builder
                        </span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/25"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Create Your Professional
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Portfolio in Minutes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Build stunning portfolios with our easy-to-use generator. No coding
            required. Choose from beautiful templates and showcase your work to
            the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={user ? "/builder" : "/login"}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105"
            >
              {user ? "Go to Builder" : "Get Started Free"}
            </Link>
            <button 
              onClick={scrollToTemplates}
              className="px-8 py-4 text-lg font-semibold text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white rounded-xl transition-all duration-200"
            >
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {" "}Stand Out
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Beautiful Templates
              </h3>
              <p className="text-slate-400">
                Choose from 6 professionally designed templates. Modern,
                Minimal, Bold, Elegant, Tech, and Creative styles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Live Preview
              </h3>
              <p className="text-slate-400">
                See your changes in real-time. Edit on the left, preview on the
                right. What you see is what you get.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Export & Print
              </h3>
              <p className="text-slate-400">
                Export your portfolio as PDF or print directly from your
                browser. Perfect for job applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      {showTemplates && (
        <section id="templates-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}Perfect Template
              </span>
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Each template is professionally designed to showcase your skills and experience. 
              Sign up to start customizing any template.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatePreviews.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  {/* Template Preview Card */}
                  <div className={`h-48 ${template.bgColor} relative overflow-hidden`}>
                    {/* Mock template content */}
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${template.gradient}`}></div>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${template.gradient} opacity-70`}></div>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${template.gradient} opacity-40`}></div>
                      </div>
                      <div className={`text-lg font-bold ${template.accentColor} mb-1`}>John Doe</div>
                      <div className={`text-xs ${template.accentColor} opacity-70 mb-3`}>Full Stack Developer</div>
                      <div className="flex-1 space-y-2">
                        <div className={`h-2 w-3/4 rounded bg-gradient-to-r ${template.gradient} opacity-30`}></div>
                        <div className={`h-2 w-1/2 rounded bg-gradient-to-r ${template.gradient} opacity-20`}></div>
                        <div className={`h-2 w-2/3 rounded bg-gradient-to-r ${template.gradient} opacity-25`}></div>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <Link
                        to="/login"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-lg shadow-lg"
                      >
                        Use This Template
                      </Link>
                    </div>
                  </div>
                  {/* Template info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{template.name}</h3>
                    <p className="text-sm text-slate-400">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                Get Started with Any Template
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of professionals who have created their portfolios
              with us. It's free and takes just minutes.
            </p>
            <Link
              to="/login"
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="bg-blue-600 text-white p-1 rounded mr-2 text-xs font-bold">
              PG
            </span>
            <span className="text-lg font-semibold text-white">
              Portfolio Generator
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Portfolio Generator. Build your
            professional portfolio in minutes.
          </p>
        </div>
      </footer>
    </div>
  );
}
