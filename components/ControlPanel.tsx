import React, { useState } from 'react';
import { SystemMode, PumpStatus, PlantConfig, AIActivityLog, ThemeConfig } from '../types';
import { Power, Settings, RefreshCw, Droplet, BrainCircuit, Activity, Save, X } from 'lucide-react';

interface ControlPanelProps {
  mode: SystemMode;
  pumpStatus: PumpStatus;
  waterVolume: number;
  plantConfig: PlantConfig;
  aiLog: AIActivityLog | null;
  theme: ThemeConfig;
  onToggleMode: () => void;
  onTogglePump: () => void;
  onVolumeChange: (vol: number) => void;
  onUpdatePlant: (config: PlantConfig) => void;
  onRefresh: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode, pumpStatus, waterVolume, aiLog, theme, plantConfig,
  onToggleMode, onTogglePump, onVolumeChange, onUpdatePlant
}) => {
  
  const isAuto = mode === SystemMode.AUTO;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Local state for editing form
  const [editConfig, setEditConfig] = useState<PlantConfig>(plantConfig);

  const handleSaveSettings = () => {
    onUpdatePlant(editConfig);
    setIsSettingsOpen(false);
  };

  // Calculate pump duration for display
  const flowRateMlPerSec = (plantConfig.pumpFlowRate * 1000) / 60;
  const estimatedDurationSec = waterVolume / flowRateMlPerSec;

  if (isSettingsOpen) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Settings className="w-5 h-5" /> ตั้งค่าระบบ
          </h3>
          <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-red-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4 overflow-y-auto pr-1 no-scrollbar">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">ชนิดพืช</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-sm"
              value={editConfig.name}
              onChange={(e) => setEditConfig({...editConfig, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase">ขนาดแปลง (ตร.ม.)</label>
                <input 
                  type="number" 
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-sm"
                  value={editConfig.plotSize}
                  onChange={(e) => setEditConfig({...editConfig, plotSize: Number(e.target.value)})}
                />
             </div>
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase">จำนวนต้น</label>
                <input 
                  type="number" 
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-sm"
                  value={editConfig.quantity}
                  onChange={(e) => setEditConfig({...editConfig, quantity: Number(e.target.value)})}
                />
             </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
             <label className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1">
               <Droplet size={12} /> ตั้งค่าปั๊มน้ำ
             </label>
             <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <label className="text-xs text-slate-600 block mb-1">อัตราการไหล (Liters/Minute)</label>
                <div className="flex items-center gap-2">
                   <input 
                    type="number" 
                    className="flex-1 p-2 border border-blue-200 rounded-lg text-sm"
                    placeholder="Ex. 5"
                    value={editConfig.pumpFlowRate}
                    onChange={(e) => setEditConfig({...editConfig, pumpFlowRate: Number(e.target.value)})}
                  />
                  <span className="text-xs font-bold text-slate-500">L/min</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  *ดูที่ฉลากปั๊ม (เช่น 300L/H = 5L/min) ระบบจะคำนวณเวลาเปิดปิดจากค่านี้
                </p>
             </div>
          </div>
        </div>

        <button 
          onClick={handleSaveSettings}
          className={`mt-4 w-full py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${theme.bgGradient} flex items-center justify-center gap-2`}
        >
          <Save size={18} /> บันทึกการตั้งค่า
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col relative">
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 mb-6">
        <div className={`p-2 rounded-lg bg-${theme.primary}-100 text-${theme.primary}-600`}>
           <Power className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-700">Control System</h3>
      </div>

      {/* Mode Switcher */}
      <div className="bg-slate-100 p-1.5 rounded-xl flex mb-6 relative">
        <button
          onClick={() => !isAuto && onToggleMode()}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 flex items-center justify-center gap-2 ${
            isAuto ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <BrainCircuit size={16} className={isAuto ? `text-${theme.primary}-500` : ''} />
          Auto AI
        </button>
        <button
          onClick={() => isAuto && onToggleMode()}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 flex items-center justify-center gap-2 ${
            !isAuto ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Power size={16} className={!isAuto ? 'text-indigo-500' : ''} />
          Manual
        </button>
      </div>

      <div className="flex-1 space-y-6">
        {isAuto ? (
          // AUTO MODE UI
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className={`p-5 rounded-2xl bg-${theme.primary}-50 border border-${theme.primary}-100`}>
              <div className="flex items-start gap-4">
                 <div className={`p-3 rounded-full bg-white text-${theme.primary}-500 shadow-sm`}>
                    <Activity size={24} />
                 </div>
                 <div>
                    <h4 className={`font-bold text-${theme.primary}-900`}>AI Monitoring Active</h4>
                    <p className={`text-sm text-${theme.primary}-700 mt-1 leading-relaxed`}>
                      {aiLog ? `"${aiLog.reason}"` : "ระบบกำลังวิเคราะห์ข้อมูลสภาพแวดล้อม..."}
                    </p>
                    {aiLog && (
                       <div className="mt-3 text-xs opacity-70 flex gap-3">
                          <span>Last check: {aiLog.timestamp}</span>
                          {aiLog.action === 'WATER' && <span className="font-bold">Watered {aiLog.amount}ml</span>}
                       </div>
                    )}
                 </div>
              </div>
            </div>
            
            {pumpStatus.isOn && (
              <div className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 animate-pulse">
                <Droplet className="w-5 h-5 mr-2" />
                <span className="font-semibold">กำลังรดน้ำอัตโนมัติ...</span>
              </div>
            )}
            
            <div className="text-xs text-center text-slate-400 mt-4">
               แปลง: {plantConfig.plotSize} ตร.ม. | ปั๊ม: {plantConfig.pumpFlowRate} L/min
            </div>
          </div>
        ) : (
          // MANUAL MODE UI
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div>
               <div className="flex justify-between text-sm mb-2 font-medium">
                 <span className="text-slate-500">Water Volume</span>
                 <span className="text-indigo-600 font-bold">{waterVolume} ml</span>
               </div>
               <input 
                  type="range" min="100" max="2000" step="100"
                  value={waterVolume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
               />
               <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>100ml</span>
                  <span className="font-semibold text-indigo-400">
                    ≈ {estimatedDurationSec.toFixed(1)} วินาที
                  </span>
                  <span>2000ml</span>
               </div>
            </div>

            <button
               onClick={onTogglePump}
               disabled={pumpStatus.isOn}
               className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3 ${
                 pumpStatus.isOn 
                 ? 'bg-slate-400 cursor-not-allowed' 
                 : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
               }`}
            >
               {pumpStatus.isOn ? (
                 <>
                   <RefreshCw className="animate-spin" />
                   Processing...
                 </>
               ) : (
                 <>
                   <Droplet className="fill-current" />
                   Water Now
                 </>
               )}
            </button>
            
            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 text-center">
              คำนวณจากปั๊มขนาด <strong>{plantConfig.pumpFlowRate} L/min</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;