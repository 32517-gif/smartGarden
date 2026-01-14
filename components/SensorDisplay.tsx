import React from 'react';
import { SensorData, WeatherForecast } from '../types';
import { Droplets, Thermometer, CloudRain, Wind } from 'lucide-react';

interface SensorDisplayProps {
  sensors: SensorData;
  weather: WeatherForecast;
}

const StatCard: React.FC<{ 
  title: string; 
  value: string | number; 
  unit: string; 
  icon: React.ElementType;
  color: string;
  subValue?: string;
}> = ({ title, value, unit, icon: Icon, color, subValue }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start mb-2">
      <span className="text-slate-400 text-sm font-medium uppercase tracking-wide">{title}</span>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-sm text-slate-500 font-medium">{unit}</span>
      </div>
      {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
    </div>
  </div>
);

export const SensorDisplay: React.FC<SensorDisplayProps> = ({ sensors, weather }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="ความชื้นดิน" 
        value={sensors.soilMoisture.toFixed(1)} 
        unit="%" 
        icon={Droplets} 
        color="bg-blue-500 text-blue-500" 
        subValue={sensors.soilMoisture < 40 ? "ต่ำกว่าเกณฑ์" : "ปกติ"}
      />
      <StatCard 
        title="อุณหภูมิ" 
        value={sensors.temperature.toFixed(1)} 
        unit="°C" 
        icon={Thermometer} 
        color="bg-orange-500 text-orange-500"
        subValue={`นอกบ้าน ${weather.temperature}°C`}
      />
      <StatCard 
        title="ความชื้นอากาศ" 
        value={sensors.humidity.toFixed(1)} 
        unit="%" 
        icon={Wind} 
        color="bg-teal-500 text-teal-500"
      />
       <StatCard 
        title="โอกาสฝนตก" 
        value={weather.rainChance} 
        unit="%" 
        icon={CloudRain} 
        color="bg-indigo-500 text-indigo-500"
        subValue={weather.condition}
      />
    </div>
  );
};