import { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Editor } from './components/editor/Editor';
import { Preview } from './components/preview/Preview';
import { LandingPage } from './components/landing/LandingPage';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <PortfolioProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col bg-white">
          <div className="bg-white p-4 border-b shadow-sm z-20">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <button
                  onClick={handleBackToHome}
                  className="flex items-center hover:opacity-80 transition-opacity"
                  title="Back to Home"
                >
                  <span className="bg-blue-600 text-white p-1 rounded mr-2 text-sm">PG</span>
                  Portfolio Generator
                </button>
              </h1>
            </div>
            <p className="text-xs text-gray-500 mt-1">Build your professional portfolio in minutes</p>
          </div>
          <Editor />
        </div>

        {/* Right Side: Preview */}
        <div className="w-1/2 bg-gray-200 p-8 overflow-y-auto flex justify-center">
          <div className="w-full max-w-[1000px] transform scale-[0.85] origin-top">
            <Preview />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}

export default App;
