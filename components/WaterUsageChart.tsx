import React from 'react';
import { WaterLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Droplet } from 'lucide-react';

interface WaterUsageChartProps {
  data: WaterLog[];
}

const WaterUsageChart: React.FC<WaterUsageChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[350px] flex flex-col">
       <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-700 font-bold flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-500" />
          Water Usage (7 Days)
        </h3>
      </div>

      <div className="flex-1 w-full min-h-0">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
              <Tooltip 
                 cursor={{fill: '#f8fafc'}}
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" name="Volume (ml)" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.method === 'AI' ? '#10b981' : '#6366f1'} />
                ))}
              </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500 border-t border-slate-50 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> AI Automated
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> Manual
          </div>
        </div>
    </div>
  );
};

export default WaterUsageChart;