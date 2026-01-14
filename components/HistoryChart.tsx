import React from 'react';
import { HistoryPoint } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface HistoryChartProps {
  data: HistoryPoint[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[350px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-700 font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Environment Trends (24h)
        </h3>
        <div className="flex gap-4 text-xs font-medium">
           <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Soil
           </div>
           <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span> Temp
           </div>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} minTickGap={30} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
            />
            <Area type="monotone" dataKey="soil" name="Soil Moisture (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSoil)" />
            <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#fb923c" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;