import React from 'react';
import { PlantConfig, ThemeConfig } from '../types';
import { Sprout, Calendar, Clock, Leaf } from 'lucide-react';

interface PlantStatusProps {
  plant: PlantConfig;
  theme: ThemeConfig;
}

const PlantStatus: React.FC<PlantStatusProps> = ({ plant, theme }) => {
  const daysPassed = Math.floor((new Date().getTime() - new Date(plant.startDate).getTime()) / (1000 * 3600 * 24));
  const progress = Math.min(100, Math.max(0, (daysPassed / plant.harvestDays) * 100));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden h-full">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${theme.primary}-50 rounded-bl-[100px] -mr-4 -mt-4 opacity-50`}></div>
      
      <div className="flex flex-col sm:flex-row gap-6 relative z-10">
        {/* Icon Box */}
        <div className={`w-20 h-20 rounded-2xl bg-${theme.primary}-100 flex items-center justify-center text-${theme.primary}-600 shadow-inner shrink-0`}>
          <Leaf size={40} />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{plant.name}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                   <Calendar size={14} className="text-slate-400" />
                   <span>Start: {new Date(plant.startDate).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                   <Clock size={14} className="text-slate-400" />
                   <span>Target: {plant.harvestDays} Days</span>
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className={`block text-3xl font-bold text-${theme.primary}-600`}>{daysPassed}</span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Days Old</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2 font-medium">
               <span className="text-slate-600 flex items-center gap-2">
                 <Sprout size={16} className={`text-${theme.primary}-500`} />
                 Growth Progress
               </span>
               <span className={`text-${theme.primary}-600`}>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 p-1 overflow-hidden shadow-inner">
               <div 
                 className={`h-full rounded-full bg-gradient-to-r ${theme.bgGradient} transition-all duration-1000 ease-out relative`}
                 style={{ width: `${progress}%` }}
               >
                 <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/30 animate-pulse"></div>
               </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
               <span>Seeding</span>
               <span>Vegetative</span>
               <span>Harvest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantStatus;