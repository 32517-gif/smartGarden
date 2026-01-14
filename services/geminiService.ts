import { GoogleGenAI, Type } from "@google/genai";
import { SensorData, WeatherForecast, PlantConfig, AIAdvice } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGardenAdvice = async (
  sensor: SensorData,
  weather: WeatherForecast,
  plant: PlantConfig
): Promise<AIAdvice> => {
  
  const prompt = `
    Context: You are an AI managing a smart irrigation system for a garden in Thailand.
    
    Plant Info:
    - Name: ${plant.name}
    - Age: ${Math.floor((new Date().getTime() - new Date(plant.startDate).getTime()) / (1000 * 3600 * 24))} days
    
    Sensor Data:
    - Soil Moisture: ${sensor.soilMoisture}% (Target: 40-70%)
    - Temp: ${sensor.temperature}°C
    - Humidity: ${sensor.humidity}%
    
    Weather Forecast & Environment:
    - Condition: ${weather.condition}
    - Rain Chance: ${weather.rainChance}%
    - Solar Radiation: ${weather.solarRadiation} W/m² (High radiation > 600 W/m² significantly increases water evaporation)
    
    Rules:
    1. If Soil Moisture < 30%, WATER immediately.
    2. If Soil Moisture > 60%, DO NOT WATER (SKIP).
    3. If Rain Chance > 70% and Soil Moisture > 30%, WAIT (let nature water).
    4. If Solar Radiation is high (> 600 W/m²) and Temp > 32°C, increase watering amount by 20% to compensate for rapid evaporation.
    5. If Temp > 35°C, consider slight watering to cool down if moisture is borderline.

    Task:
    Return a JSON object.
    - action: "WATER", "WAIT", or "SKIP"
    - recommendedAmount: number (ml), 0 if WAIT/SKIP. Typical dose 300-1000ml.
    - reason: A short reason in Thai language that mentions why light/radiation influenced the decision if relevant (max 1 sentence).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, enum: ["WATER", "WAIT", "SKIP"] },
            recommendedAmount: { type: Type.NUMBER },
            reason: { type: Type.STRING },
          },
          required: ["action", "recommendedAmount", "reason"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAdvice;
    }
    throw new Error("Empty response");

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      action: "WAIT",
      recommendedAmount: 0,
      reason: "ไม่สามารถเชื่อมต่อ AI ได้ (Offline Mode)"
    };
  }
};