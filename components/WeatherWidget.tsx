import React from 'react';
import { WeatherForecast, ThemeConfig } from '../types';
import { Cloud, CloudRain, Sun, MapPin, Umbrella, Zap } from 'lucide-react';
import { THAI_PROVINCES } from '../services/weatherService';

interface WeatherWidgetProps {
  weather: WeatherForecast;
  theme: ThemeConfig;
  onLocationChange: (lat: number, lng: number, name: string) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, theme, onLocationChange }) => {
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const province = THAI_PROVINCES.find(p => p.name === selectedName);
    if (province) {
      onLocationChange(province.lat, province.lng, province.name);
    }
  };

  const getLightLevel = (radiation: number) => {
    if (radiation > 800) return { label: 'Extremely Strong', color: 'text-red-400' };
    if (radiation > 500) return { label: 'Strong', color: 'text-orange-400' };
    if (radiation > 200) return { label: 'Moderate', color: 'text-yellow-400' };
    return { label: 'Weak/Night', color: 'text-blue-300' };
  };

  const lightStatus = getLightLevel(weather.solarRadiation);

  return (
    <div className="bg-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-start relative z-10">
         <div>
            <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium mb-1">
               <MapPin size={14} />
               <select 
                 className="bg-transparent outline-none cursor-pointer hover:text-white max-w-[140px] truncate"
                 value={weather.location}
                 onChange={handleProvinceChange}
               >
                 {THAI_PROVINCES.map((province) => (
                   <option key={province.name} value={province.name} className="text-slate-800">
                     {province.name}
                   </option>
                 ))}
               </select>
            </div>
            <h3 className="text-2xl font-bold">{weather.condition}</h3>
         </div>
         <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            {weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('drizzle') || weather.condition.toLowerCase().includes('thunderstorm') ? (
              <CloudRain size={32} className="text-blue-300" />
            ) : weather.condition.toLowerCase().includes('cloud') || weather.condition.toLowerCase().includes('foggy') ? (
              <Cloud size={32} className="text-slate-300" />
            ) : (
              <Sun size={32} className="text-yellow-300" />
            )}
         </div>
      </div>

      <div className="mt-6 relative z-10">
         <div className="flex items-center justify-between">
            <span className="text-5xl font-bold tracking-tighter">{weather.temperature.toFixed(0)}°</span>
            <div className="text-right">
               <div className={`flex items-center justify-end gap-1 text-xs font-bold uppercase ${lightStatus.color}`}>
                  <Zap size={12} fill="currentColor" />
                  {lightStatus.label}
               </div>
               <div className="text-sm font-medium text-slate-300">
                  {weather.solarRadiation.toFixed(0)} W/m²
               </div>
            </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-blue-200">
               <Umbrella size={16} />
               <span>Rain {weather.rainChance}%</span>
            </div>
            <div className="text-xs text-slate-400">
               Light affects evaporation
            </div>
         </div>
      </div>
    </div>
  );
};

export default WeatherWidget;