import React, { useState } from 'react';
import { AIAdvice, SystemMode } from '../types';
import { Sparkles, Power, Droplet } from 'lucide-react';

interface SmartControlProps {
  mode: SystemMode;
  setMode: (mode: SystemMode) => void;
  isPumpOn: boolean;
  onManualWater: (amount: number) => void;
  latestAdvice: AIAdvice | null;
  isProcessing: boolean;
}

export const SmartControl: React.FC<SmartControlProps> = ({ 
  mode, 
  setMode, 
  isPumpOn, 
  onManualWater, 
  latestAdvice,
  isProcessing 
}) => {
  const [manualAmount, setManualAmount] = useState(500);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold">Smart Controller</h2>
          </div>
          <div className="flex bg-slate-700/50 p-1 rounded-lg">
             <button 
                onClick={() => setMode(SystemMode.AUTO)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${mode === SystemMode.AUTO ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
             >
               AI Auto
             </button>
             <button 
                onClick={() => setMode(SystemMode.MANUAL)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${mode === SystemMode.MANUAL ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
             >
               Manual
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Status Section */}
          <div className={`p-4 rounded-xl border border-white/10 ${mode === SystemMode.AUTO ? 'bg-white/5' : 'bg-transparent opacity-50'}`}>
             <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3">AI Recommendation</h3>
             
             {isProcessing ? (
               <div className="flex items-center gap-3 animate-pulse">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/20"></div>
                 <div className="space-y-2">
                   <div className="h-2 w-24 bg-emerald-500/20 rounded"></div>
                   <div className="h-2 w-32 bg-slate-500/20 rounded"></div>
                 </div>
               </div>
             ) : latestAdvice ? (
               <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      latestAdvice.action === 'WATER' ? 'bg-emerald-500 text-white' : 
                      latestAdvice.action === 'WAIT' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
                    }`}>
                      {latestAdvice.action}
                    </span>
                    {latestAdvice.recommendedAmount > 0 && <span className="text-sm font-medium text-emerald-300">{latestAdvice.recommendedAmount} ml</span>}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    "{latestAdvice.reason}"
                  </p>
               </div>
             ) : (
                <p className="text-sm text-slate-500">Waiting for sensor data...</p>
             )}
          </div>

          {/* Manual / Action Section */}
          <div className="flex flex-col justify-between">
            {mode === SystemMode.MANUAL ? (
              <>
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">ปริมาณน้ำ</span>
                      <span className="font-bold text-emerald-400">{manualAmount} ml</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="2000" 
                      step="100"
                      value={manualAmount}
                      onChange={(e) => setManualAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                 </div>
                 <button
                    onClick={() => onManualWater(manualAmount)}
                    disabled={isPumpOn}
                    className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                      isPumpOn 
                      ? 'bg-blue-600 animate-pulse cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95'
                    }`}
                 >
                    {isPumpOn ? (
                      <>
                        <Droplet className="animate-bounce" size={18} />
                        กำลังรดน้ำ...
                      </>
                    ) : (
                      <>
                        <Power size={18} />
                        รดน้ำทันที
                      </>
                    )}
                 </button>
              </>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-2">
                  <div className={`w-3 h-3 rounded-full mb-2 ${isPumpOn ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500/30'}`}></div>
                  <span className="text-sm text-slate-400">ระบบอัตโนมัติทำงานอยู่</span>
                  {isPumpOn && <span className="text-emerald-400 text-xs mt-1">กำลังรดน้ำ...</span>}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};