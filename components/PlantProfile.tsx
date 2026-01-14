import React from 'react';
import { PlantConfig } from '../types';
import { Leaf, Calendar, Clock } from 'lucide-react';

interface PlantProfileProps {
  plant: PlantConfig;
  onEdit: () => void;
}

export const PlantProfile: React.FC<PlantProfileProps> = ({ plant, onEdit }) => {
  const daysPassed = Math.floor((new Date().getTime() - new Date(plant.startDate).getTime()) / (1000 * 3600 * 24));
  const progress = Math.min(100, (daysPassed / plant.harvestDays) * 100);
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
         <button onClick={onEdit} className="text-xs text-emerald-600 hover:underline">Edit</button>
       </div>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <Leaf size={32} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-800">{plant.name}</h2>
          <div className="flex gap-4 mt-2 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>เริ่มปลูก: {new Date(plant.startDate).toLocaleDateString('th-TH')}</span>
            </div>
            <div className="flex items-center gap-1">
               <Clock size={14} />
               <span>เก็บเกี่ยว: {plant.harvestDays} วัน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-slate-600">ระยะการเจริญเติบโต</span>
            <span className="text-emerald-600">{daysPassed} / {plant.harvestDays} วัน</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>ต้นกล้า</span>
            <span>กำลังโต</span>
            <span>พร้อมเก็บเกี่ยว</span>
        </div>
      </div>
    </div>
  );
};