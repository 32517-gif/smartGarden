import React from 'react';
import { ThemeConfig } from '../types';

interface ProjectInfoProps {
  theme: ThemeConfig;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ theme }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-slate-600 space-y-4">
      <h2 className={`text-xl font-bold text-${theme.primary}-700`}>About Smart Garden AI</h2>
      <p className="leading-relaxed">
        This project utilizes the power of <strong>Google Gemini AI</strong> to make intelligent irrigation decisions. 
        By combining real-time sensor data from the field (Soil Moisture, Temperature) with precise local weather forecasts from Open-Meteo, 
        the system ensures your plants receive the exact amount of water they need—saving resources and maximizing growth.
      </p>
      <div className="flex gap-4 pt-4">
         <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">ESP32</div>
            <div className="text-xs uppercase text-slate-400 font-bold">Hardware</div>
         </div>
         <div className="w-px bg-slate-200"></div>
         <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">Gemini</div>
            <div className="text-xs uppercase text-slate-400 font-bold">Brain</div>
         </div>
         <div className="w-px bg-slate-200"></div>
         <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">React</div>
            <div className="text-xs uppercase text-slate-400 font-bold">Frontend</div>
         </div>
      </div>
    </div>
  );
};

export default ProjectInfo;