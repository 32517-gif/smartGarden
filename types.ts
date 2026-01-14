export enum SystemMode {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL'
}

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  timestamp: string;
}

export interface WeatherForecast {
  temperature: number;
  condition: string;
  rainChance: number;
  location: string;
  solarRadiation: number; // Watts per square meter (W/m²)
}

export interface PlantConfig {
  name: string;
  startDate: string; // ISO Date string
  harvestDays: number;
  plotSize: number; // sq meters
  quantity: number;
  pumpFlowRate: number; // Liters per minute (L/min)
}

export interface AIAdvice {
  action: 'WATER' | 'WAIT' | 'SKIP';
  recommendedAmount: number; // in ml
  reason: string;
}

export interface AIActivityLog {
  timestamp: string;
  action: string;
  amount: number;
  reason: string;
}

export interface HistoryPoint {
  time: string;
  soil: number;
  temp: number;
  humidity: number;
}

export interface WaterLog {
  date: string;
  amount: number; // ml
  method: 'AI' | 'MANUAL';
}

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  bgGradient: string;
  buttonClass: string;
  textClass: string;
  borderClass: string;
}

export type ThemeColor = 'emerald' | 'blue' | 'orange' | 'violet';

export interface PumpStatus {
  isOn: boolean;
  lastActive: string | null;
  currentVolumeTriggered: number;
}