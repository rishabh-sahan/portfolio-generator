import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from '../../context/PortfolioContext';
import { Editor } from '../editor/Editor';
import { Preview } from '../preview/Preview';
import { useAuth } from '../../context/AuthContext';

function SaveStatus() {
  const { isSaving, isLoading, lastSaved, saveError } = usePortfolio();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-slate-400">
        <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs">Loading...</span>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-slate-400">
        <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs">Saving...</span>
      </div>
    );
  }

  if (saveError) {
    return (
      <div className="flex items-center space-x-2 text-yellow-400">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-xs">{saveError}</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center space-x-2 text-green-400">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-xs">Saved to cloud</span>
      </div>
    );
  }

  return null;
}

function BuilderContent() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Left Side: Editor */}
      <div className="w-1/2 border-r border-slate-700 flex flex-col bg-slate-800">
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-700 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white flex items-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition-opacity"
                title="Back to Home"
              >
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-1.5 rounded-lg mr-2 text-sm font-bold">PG</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Portfolio Generator
                </span>
              </Link>
            </h1>
            {user && (
              <div className="flex items-center space-x-3">
                <SaveStatus />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-400 hidden sm:block max-w-[150px] truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">Build your professional portfolio in minutes</p>
        </div>
        <Editor />
      </div>

      {/* Right Side: Preview */}
      <div id="preview-panel" className="w-1/2 bg-slate-900 p-6 overflow-y-auto flex justify-center print:w-full print:p-0 print:block">
        <div className="w-full max-w-[1000px] transform scale-[0.75] origin-top print:scale-100 print:max-w-none print:transform-none">
          <Preview />
        </div>
      </div>
    </div>
  );
}

export function PortfolioBuilder() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PortfolioProvider>
      <BuilderContent />
    </PortfolioProvider>
  );
}
