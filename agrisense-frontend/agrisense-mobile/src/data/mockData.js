// src/data/mockData.js
export const INITIAL_SENSORS = [
  { id: 't1', label: "Temperature", value: "29", unit: "°C", status: "Normal", icon: "🌡️", power: true },
  { id: 'h1', label: "Humidity", value: "62", unit: "%", status: "Normal", icon: "💧", power: true },
  { id: 's1', label: "Soil Moisture", value: "15", unit: "%", status: "Critical", icon: "🌱", power: false },
];

export const INITIAL_NOTIFICATIONS = [
  { id: '1', time: '10:30 AM', message: 'Critical: Soil moisture below 20%' },
  { id: '2', time: '11:16 AM', message: 'Warning: High temperature in Sector B' }
];