/**
 * Centralized data store for AgriSense system concepts.
 * Includes sensor metrics and initial system alerts.
 */
export const initialSensors = [
  { id: 't1', label: "Temperature", value: "29", unit: "°C", status: "Normal", icon: "🌡️", power: true },
  { id: 'h1', label: "Humidity", value: "62", unit: "%", status: "Normal", icon: "💧", power: true },
  { id: 's1', label: "Soil Moisture", value: "15", unit: "%", status: "Critical", icon: "🌱", power: false }
];

export const initialAlerts = [
  { id: 1, message: "Critical: Soil moisture below 20%", time: "10:30 AM" },
  { id: 2, message: "Warning: High temperature in Sector B", time: "11:16 AM" }
];