import React from 'react';
import { HistoryPoint, WaterLog } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface AnalyticsProps {
  history: HistoryPoint[];
  waterLogs: WaterLog[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ history, waterLogs }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Sensor Trends Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
          แนวโน้มสภาพแวดล้อม (24 ชม.)
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} minTickGap={30} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="soil" name="ความชื้นดิน (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSoil)" />
              <Area type="monotone" dataKey="temp" name="อุณหภูมิ (°C)" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Usage Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          ปริมาณน้ำที่ใช้ (7 วันล่าสุด)
        </h3>
        <div className="h-[250px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={waterLogs}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                   cursor={{fill: '#f1f5f9'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" name="ปริมาณน้ำ (ml)" radius={[6, 6, 0, 0]}>
                  {waterLogs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.method === 'AI' ? '#10b981' : '#6366f1'} />
                  ))}
                </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div> AI Control
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Manual
          </div>
        </div>
      </div>
    </div>
  );
};