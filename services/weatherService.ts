import { WeatherForecast } from '../types';

export const THAI_PROVINCES = [
  { name: "Amnat Charoen", lat: 15.8657, lng: 104.6258 },
  { name: "Ang Thong", lat: 14.5896, lng: 100.4551 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Bueng Kan", lat: 18.3605, lng: 103.6464 },
  { name: "Buriram", lat: 14.9930, lng: 103.1029 },
  { name: "Chachoengsao", lat: 13.6904, lng: 101.0780 },
  { name: "Chai Nat", lat: 15.1852, lng: 100.1250 },
  { name: "Chaiyaphum", lat: 15.8105, lng: 102.0289 },
  { name: "Chanthaburi", lat: 12.6114, lng: 102.1039 },
  { name: "Chiang Mai", lat: 18.7061, lng: 98.9817 },
  { name: "Chiang Rai", lat: 19.9105, lng: 99.8406 },
  { name: "Chon Buri", lat: 13.3611, lng: 100.9847 },
  { name: "Chumphon", lat: 10.4930, lng: 99.1800 },
  { name: "Kalasin", lat: 16.4342, lng: 103.5093 },
  { name: "Kamphaeng Phet", lat: 16.4828, lng: 99.5227 },
  { name: "Kanchanaburi", lat: 14.0228, lng: 99.5328 },
  { name: "Khon Kaen", lat: 16.4322, lng: 102.8236 },
  { name: "Krabi", lat: 8.0855, lng: 98.9063 },
  { name: "Lampang", lat: 18.2858, lng: 99.4928 },
  { name: "Lamphun", lat: 18.5748, lng: 99.0087 },
  { name: "Loei", lat: 17.4860, lng: 101.7223 },
  { name: "Lopburi", lat: 14.7995, lng: 100.6534 },
  { name: "Mae Hong Son", lat: 19.3020, lng: 97.9654 },
  { name: "Maha Sarakham", lat: 16.1857, lng: 103.3006 },
  { name: "Mukdahan", lat: 16.5453, lng: 104.7235 },
  { name: "Nakhon Nayok", lat: 14.2069, lng: 101.2131 },
  { name: "Nakhon Pathom", lat: 13.8196, lng: 100.0443 },
  { name: "Nakhon Phanom", lat: 17.3949, lng: 104.7909 },
  { name: "Nakhon Ratchasima", lat: 14.9799, lng: 102.0978 },
  { name: "Nakhon Sawan", lat: 15.6987, lng: 100.1197 },
  { name: "Nakhon Si Thammarat", lat: 8.4325, lng: 99.9631 },
  { name: "Nan", lat: 18.7756, lng: 100.7730 },
  { name: "Narathiwat", lat: 6.4255, lng: 101.8253 },
  { name: "Nong Bua Lam Phu", lat: 17.2029, lng: 102.4418 },
  { name: "Nong Khai", lat: 17.8785, lng: 102.7413 },
  { name: "Nonthaburi", lat: 13.8621, lng: 100.5140 },
  { name: "Pathum Thani", lat: 14.0208, lng: 100.5250 },
  { name: "Pattani", lat: 6.8696, lng: 101.2501 },
  { name: "Phang Nga", lat: 8.4501, lng: 98.5255 },
  { name: "Phatthalung", lat: 7.6167, lng: 100.0740 },
  { name: "Phayao", lat: 19.1643, lng: 99.9017 },
  { name: "Phetchabun", lat: 16.4190, lng: 101.1567 },
  { name: "Phetchaburi", lat: 13.1107, lng: 99.9395 },
  { name: "Phichit", lat: 16.4427, lng: 100.3493 },
  { name: "Phitsanulok", lat: 16.8233, lng: 100.2657 },
  { name: "Phra Nakhon Si Ayutthaya", lat: 14.3517, lng: 100.5780 },
  { name: "Phrae", lat: 18.1446, lng: 100.1403 },
  { name: "Phuket", lat: 7.8804, lng: 98.3923 },
  { name: "Prachin Buri", lat: 14.0519, lng: 101.3725 },
  { name: "Prachuap Khiri Khan", lat: 11.8000, lng: 99.7955 },
  { name: "Ranong", lat: 9.9658, lng: 98.6348 },
  { name: "Ratchaburi", lat: 13.5283, lng: 99.8135 },
  { name: "Rayong", lat: 12.6814, lng: 101.2816 },
  { name: "Roi Et", lat: 16.0538, lng: 103.6520 },
  { name: "Sa Kaeo", lat: 13.8055, lng: 102.0722 },
  { name: "Sakon Nakhon", lat: 17.1664, lng: 104.1486 },
  { name: "Samut Prakan", lat: 13.5991, lng: 100.5967 },
  { name: "Samut Sakhon", lat: 13.5475, lng: 100.2736 },
  { name: "Samut Songkhram", lat: 13.4098, lng: 100.0023 },
  { name: "Saraburi", lat: 14.5289, lng: 100.9101 },
  { name: "Satun", lat: 6.6238, lng: 100.0674 },
  { name: "Sing Buri", lat: 14.8899, lng: 100.4014 },
  { name: "Sisaket", lat: 15.1186, lng: 104.3220 },
  { name: "Songkhla", lat: 7.1756, lng: 100.6143 },
  { name: "Sukhothai", lat: 17.0075, lng: 99.8230 },
  { name: "Suphan Buri", lat: 14.4745, lng: 100.1177 },
  { name: "Surat Thani", lat: 9.1342, lng: 99.3334 },
  { name: "Surin", lat: 14.8818, lng: 103.4936 },
  { name: "Tak", lat: 16.8837, lng: 99.1180 },
  { name: "Trang", lat: 7.5645, lng: 99.6239 },
  { name: "Trat", lat: 12.2428, lng: 102.5175 },
  { name: "Ubon Ratchathani", lat: 15.2448, lng: 104.8473 },
  { name: "Udon Thani", lat: 17.4138, lng: 102.7872 },
  { name: "Uthai Thani", lat: 15.3835, lng: 100.0246 },
  { name: "Uttaradit", lat: 17.6201, lng: 100.0993 },
  { name: "Yala", lat: 6.5411, lng: 101.2804 },
  { name: "Yasothon", lat: 15.7924, lng: 104.1453 }
];

// Interpretation of WMO Weather interpretation codes (WW)
function getWeatherCondition(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rainy';
  if (code >= 80 && code <= 82) return 'Heavy Rain';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

export const getRealWeather = async (lat: number, lng: number): Promise<WeatherForecast | null> => {
  try {
    // Adding shortwave_radiation to current data
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,shortwave_radiation&daily=precipitation_probability_max&timezone=Asia%2FBangkok`
    );

    if (!response.ok) throw new Error('Weather API Error');

    const data = await response.json();
    
    const current = data.current;
    const daily = data.daily;

    return {
      temperature: current.temperature_2m,
      condition: getWeatherCondition(current.weather_code),
      rainChance: daily.precipitation_probability_max?.[0] || 0,
      location: "Bangkok",
      solarRadiation: current.shortwave_radiation || 0
    };
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return {
      temperature: 33,
      condition: 'Sunny (Offline)',
      rainChance: 10,
      location: 'Offline Mode',
      solarRadiation: 400
    };
  }
};