import { PortfolioProvider } from './context/PortfolioContext';
import { Editor } from './components/editor/Editor';
import { Preview } from './components/preview/Preview';
import './App.css';

function App() {
  return (
    <PortfolioProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col bg-white">
          <div className="bg-white p-4 border-b shadow-sm z-20">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="bg-blue-600 text-white p-1 rounded mr-2 text-sm">PG</span>
              Portfolio Generator
            </h1>
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
