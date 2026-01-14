import React from 'react';
import { Sprout, Menu } from 'lucide-react';

export const NavHeader: React.FC = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
              <Sprout size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Smart Garden <span className="text-emerald-500">AI</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium -mt-1">Powered by Gemini</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};