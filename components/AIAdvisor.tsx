import React from 'react';
import { SensorData, WeatherForecast, PlantConfig, ThemeConfig } from '../types';
import { Sparkles } from 'lucide-react';

interface AIAdvisorProps {
  sensors: SensorData;
  weather: WeatherForecast;
  plant: PlantConfig;
  theme: ThemeConfig;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ theme }) => {
  return (
    <div className={`rounded-3xl p-1 bg-gradient-to-br ${theme.bgGradient} shadow-lg text-white`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-[20px] p-6 h-full flex flex-col justify-center items-center text-center">
         <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 animate-pulse">
            <Sparkles size={24} className="text-white" />
         </div>
         <h3 className="font-bold text-lg mb-1">Gemini AI Engine</h3>
         <p className="text-sm text-white/80">
            Analyzing soil moisture, temperature, and local weather forecasts to optimize water usage.
         </p>
      </div>
    </div>
  );
};

export default AIAdvisor;