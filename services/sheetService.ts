import { SensorData, HistoryPoint, WaterLog } from '../types';

// =========================================================================================
// 🟢 ส่วนตั้งค่า: นำลิงก์ Web App URL จาก Google Apps Script มาวางในเครื่องหมายคำพูดด้านล่าง
// =========================================================================================
// ตัวอย่าง: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzaHg8monLwrArbRpYyr-2DZIA9ND7WkrRtMEoR2s4Ih_kNz8PiXhiyFGSSfAsqm6CY_w/exec"; 
// =========================================================================================

export const fetchLatestSensorData = async (): Promise<SensorData> => {
  if (!GOOGLE_SCRIPT_URL) return getMockSensorData();

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getLatest`);
    const data = await response.json();
    
    // Check if empty object returned
    if (!data.timestamp) return getMockSensorData();

    return {
      temperature: Number(data.temperature),
      humidity: Number(data.humidity),
      soilMoisture: Number(data.soilMoisture),
      timestamp: data.timestamp
    };
  } catch (error) {
    console.warn("API Fetch Error (Latest):", error);
    return getMockSensorData();
  }
};

export const fetchHistoryData = async (): Promise<HistoryPoint[]> => {
  if (!GOOGLE_SCRIPT_URL) return getMockHistoryData();

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getHistory`);
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        time: item.time,
        soil: Number(item.soil),
        temp: Number(item.temp),
        humidity: Number(item.humidity)
      }));
    }
    return getMockHistoryData();
  } catch (error) {
    console.warn("API Fetch Error (History):", error);
    return getMockHistoryData();
  }
};

export const fetchWaterLogs = async (): Promise<WaterLog[]> => {
  if (!GOOGLE_SCRIPT_URL) return getMockWaterLogs();

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getWaterLogs`);
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        date: item.date,
        amount: Number(item.amount),
        method: item.method
      }));
    }
    return getMockWaterLogs();
  } catch (error) {
    console.warn("API Fetch Error (WaterLogs):", error);
    return getMockWaterLogs();
  }
};

export const logWatering = async (amount: number, method: 'AI' | 'MANUAL') => {
  console.log(`[SHEETS] Logging water usage: ${amount}ml via ${method}`);
  
  if (GOOGLE_SCRIPT_URL) {
      const url = new URL(GOOGLE_SCRIPT_URL);
      url.searchParams.append('action', 'logWater');
      url.searchParams.append('amount', amount.toString());
      url.searchParams.append('method', method);
      
      try {
        // use no-cors to fire and forget (Apps Script POST/GET limit workaround)
        await fetch(url.toString(), { mode: 'no-cors' });
      } catch (e) {
        console.warn("Failed to log to sheet", e);
      }
  }
  return true;
};

// ==========================================
// MOCK DATA FALLBACKS (ทำงานเมื่อยังไม่ใส่ URL)
// ==========================================
const getMockSensorData = (): SensorData => ({
  temperature: 31.5,
  humidity: 65,
  soilMoisture: 45,
  timestamp: new Date().toLocaleTimeString('th-TH')
});

const getMockHistoryData = (): HistoryPoint[] => {
  const mock: HistoryPoint[] = [];
  const now = new Date();
  for (let i = 12; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    mock.push({
      time: t.getHours() + ":00",
      soil: 40 + Math.random() * 10,
      temp: 30 + Math.random() * 3,
      humidity: 60 + Math.random() * 5
    });
  }
  return mock;
};

const getMockWaterLogs = (): WaterLog[] => [
  { date: 'Mon', amount: 500, method: 'AI' },
  { date: 'Tue', amount: 0, method: 'AI' },
  { date: 'Wed', amount: 600, method: 'MANUAL' },
  { date: 'Thu', amount: 500, method: 'AI' },
];
