import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  title, value, unit, icon: Icon, color, bgColor, borderColor, description 
}) => {
  return (
    <div className={`rounded-2xl p-5 border ${borderColor} ${bgColor} shadow-sm transition-all hover:shadow-md hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">{value.toFixed(1)}</span>
        <span className="text-sm font-medium text-slate-500">{unit}</span>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-200/50">
        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SensorCard;