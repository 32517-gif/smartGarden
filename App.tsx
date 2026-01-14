import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Thermometer, Sun, CloudRain, Sprout, Palette, LayoutDashboard, RefreshCw, FileText } from 'lucide-react';
import SensorCard from './components/SensorCard';
import ControlPanel from './components/ControlPanel';
import WeatherWidget from './components/WeatherWidget';
import HistoryChart from './components/HistoryChart';
import WaterUsageChart from './components/WaterUsageChart';
import PlantStatus from './components/PlantStatus';
import AIAdvisor from './components/AIAdvisor';
import ProjectInfo from './components/ProjectInfo';
import { SensorData, SystemMode, PumpStatus, WeatherForecast, HistoryPoint, WaterLog, PlantConfig, AIActivityLog, ThemeConfig, ThemeColor } from './types';
import { fetchLatestSensorData, fetchHistoryData, fetchWaterLogs, logWatering } from './services/sheetService';
import { getGardenAdvice } from './services/geminiService';
import { getRealWeather, THAI_PROVINCES } from './services/weatherService';

const APP_CONFIG = {
  appName: "Smart Garden",
  appSuffix: "AI",
  subtitle: "GAS Enabled Smart Irrigation",
  defaultPlant: {
    name: "Green Oak Lettuce",
    harvestDays: 45,
    plotSize: 2.5,
    quantity: 20,
    pumpFlowRate: 5 // Default 5 Liters/Minute (Standard mini pump)
  }
};

const THEMES: Record<ThemeColor, ThemeConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Nature Green',
    primary: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-600',
    buttonClass: 'bg-emerald-500 hover:bg-emerald-600',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200'
  },
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    primary: 'blue',
    bgGradient: 'from-blue-500 to-indigo-600',
    buttonClass: 'bg-blue-500 hover:bg-blue-600',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200'
  },
  orange: {
    id: 'orange',
    name: 'Sunset Orange',
    primary: 'orange',
    bgGradient: 'from-orange-500 to-amber-600',
    buttonClass: 'bg-orange-500 hover:bg-orange-600',
    textClass: 'text-orange-800',
    borderClass: 'border-orange-200'
  },
  violet: {
    id: 'violet',
    name: 'Lavender',
    primary: 'violet',
    bgGradient: 'from-violet-500 to-fuchsia-600',
    buttonClass: 'bg-violet-500 hover:bg-violet-600',
    textClass: 'text-violet-800',
    borderClass: 'border-violet-200'
  }
};

function App() {
  const [mode, setMode] = useState<SystemMode>(SystemMode.AUTO);
  const [pumpStatus, setPumpStatus] = useState<PumpStatus>({ isOn: false, lastActive: null, currentVolumeTriggered: 0 });
  const [waterVolume, setWaterVolume] = useState<number>(500);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  
  const [currentThemeId, setCurrentThemeId] = useState<ThemeColor>('emerald');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const theme = THEMES[currentThemeId];

  const [plantConfig, setPlantConfig] = useState<PlantConfig>({
    name: APP_CONFIG.defaultPlant.name,
    startDate: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString().split('T')[0], 
    harvestDays: APP_CONFIG.defaultPlant.harvestDays,
    plotSize: APP_CONFIG.defaultPlant.plotSize,
    quantity: APP_CONFIG.defaultPlant.quantity,
    pumpFlowRate: APP_CONFIG.defaultPlant.pumpFlowRate
  });

  const [aiLog, setAiLog] = useState<AIActivityLog | null>(null);
  const [sensors, setSensors] = useState<SensorData>({
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    timestamp: "-"
  });

  const [weather, setWeather] = useState<WeatherForecast>({
    temperature: 32,
    condition: 'Clear',
    rainChance: 10,
    location: THAI_PROVINCES[0].name,
    solarRadiation: 0
  });

  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);
  const [waterUsageData, setWaterUsageData] = useState<WaterLog[]>([]);
  const isProcessingAI = useRef(false);

  const updateWeather = async (lat: number, lng: number, locationName: string) => {
    setIsSyncing(true);
    try {
      const data = await getRealWeather(lat, lng);
      if (data) {
        setWeather({
          ...data,
          location: locationName
        });
      }
    } catch (e) {
      console.error("Weather Update Error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    updateWeather(THAI_PROVINCES[0].lat, THAI_PROVINCES[0].lng, THAI_PROVINCES[0].name);
  }, []);

  const refreshData = async () => {
    setIsSyncing(true);
    try {
      const [latest, history, logs] = await Promise.all([
        fetchLatestSensorData(),
        fetchHistoryData(),
        fetchWaterLogs()
      ]);
      setSensors(latest);
      setHistoryData(history);
      setWaterUsageData(logs);
    } catch (err) {
      console.error("Refresh Data Error", err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 15000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const runAICheck = async () => {
      if (mode !== SystemMode.AUTO || pumpStatus.isOn || isProcessingAI.current || sensors.soilMoisture === 0) return;
      
      isProcessingAI.current = true;
      try {
        const advice = await getGardenAdvice(sensors, weather, plantConfig);
        setAiLog({
          timestamp: new Date().toLocaleTimeString('th-TH'),
          action: advice.action,
          amount: advice.recommendedAmount,
          reason: advice.reason
        });

        if (advice.action === 'WATER' && advice.recommendedAmount > 0) {
          triggerPump(advice.recommendedAmount);
        }
      } catch (error) {
        console.error("AI reasoning error", error);
      } finally {
        isProcessingAI.current = false;
      }
    };

    if (mode === SystemMode.AUTO) {
      const timer = setTimeout(runAICheck, 3000); // Initial check delay
      intervalId = setInterval(runAICheck, 60000); 
      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
      };
    }
  }, [mode, sensors, weather, plantConfig, pumpStatus.isOn]);

  const triggerPump = async (targetVolumeMl: number) => {
    setPumpStatus({ 
      isOn: true, 
      lastActive: new Date().toLocaleTimeString(),
      currentVolumeTriggered: targetVolumeMl
    });
    
    // Log to sheet
    await logWatering(targetVolumeMl, mode === SystemMode.AUTO ? 'AI' : 'MANUAL');
    
    // Calculate Duration:
    const flowRateMlPerSec = (plantConfig.pumpFlowRate * 1000) / 60;
    const durationSec = targetVolumeMl / flowRateMlPerSec;
    const durationMs = durationSec * 1000;

    setTimeout(() => {
      setPumpStatus(prev => ({ ...prev, isOn: false, currentVolumeTriggered: 0 }));
      refreshData(); 
    }, durationMs);
  };

  const handleToggleMode = () => {
    setMode(prev => prev === SystemMode.AUTO ? SystemMode.MANUAL : SystemMode.AUTO);
  };

  const handleTogglePump = () => {
    if (mode === SystemMode.AUTO) return;
    if (pumpStatus.isOn) {
      setPumpStatus(prev => ({ ...prev, isOn: false, currentVolumeTriggered: 0 }));
    } else {
      triggerPump(waterVolume);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${theme.bgGradient}`}>
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight text-slate-800 leading-tight">
                  {APP_CONFIG.appName} <span className={`text-${theme.primary}-500`}>{APP_CONFIG.appSuffix}</span>
                </h1>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  {APP_CONFIG.subtitle}
                </p>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <button 
                onClick={refreshData}
                disabled={isSyncing}
                className={`p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-all ${isSyncing ? 'animate-spin text-blue-500' : ''}`}
                title="Sync with Sheets"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 ml-2">
                  <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="text-xs font-semibold text-slate-600">{isSyncing ? 'Syncing...' : 'Connected'}</span>
              </div>
              <div className="relative ml-2">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-all hover:text-slate-800"
                >
                  <Palette className="w-5 h-5" />
                </button>
                {showThemeMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 py-1 animate-in fade-in slide-in-from-top-2">
                    {Object.values(THEMES).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setCurrentThemeId(t.id as ThemeColor); setShowThemeMenu(false); }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${currentThemeId === t.id ? `font-bold text-${t.primary}-600 bg-${t.primary}-50` : 'text-slate-600'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-${t.primary}-500 shadow-sm`}></div>
                        {t.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 min-w-0">
                <PlantStatus plant={plantConfig} theme={theme} />
            </div>
            <div className="lg:col-span-4 min-w-0">
                <WeatherWidget weather={weather} theme={theme} onLocationChange={updateWeather} />
            </div>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-4 px-1">
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Real-time Monitoring</h3>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SensorCard 
              title="ความชื้นดิน" value={sensors.soilMoisture} unit="%" 
              icon={Droplets} color="text-blue-500" 
              bgColor="bg-blue-50"
              borderColor="border-blue-100"
              description="Target: 40-60%"
            />
            <SensorCard 
              title="อุณหภูมิ" value={sensors.temperature} unit="°C" 
              icon={Thermometer} color="text-orange-500" 
              bgColor="bg-orange-50"
              borderColor="border-orange-100"
              description="Max: 35°C"
            />
            <SensorCard 
              title="ความชื้นอากาศ" value={sensors.humidity} unit="%" 
              icon={CloudRain} color="text-cyan-500" 
              bgColor="bg-cyan-50"
              borderColor="border-cyan-100"
              description="Range: 60-80%"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
              <AIAdvisor sensors={sensors} weather={weather} plant={plantConfig} theme={theme} />
              <ControlPanel 
                  mode={mode}
                  pumpStatus={pumpStatus}
                  waterVolume={waterVolume}
                  plantConfig={plantConfig}
                  aiLog={aiLog}
                  theme={theme}
                  onToggleMode={handleToggleMode}
                  onTogglePump={handleTogglePump}
                  onVolumeChange={setWaterVolume}
                  onUpdatePlant={setPlantConfig}
                  onRefresh={refreshData}
              />
           </div>
           <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
              <HistoryChart data={historyData} />
              <WaterUsageChart data={waterUsageData} />
           </div>
        </div>

        <div id="project-info">
           <div className="flex items-center gap-2 mb-4 px-1 mt-12">
              <FileText className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Project Documentation</h3>
           </div>
           <ProjectInfo theme={theme} />
        </div>
      </main>
    </div>
  );
}

export default App;