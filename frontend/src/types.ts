// frontend/src/types.ts

export interface TelemetryData {
  aircraftId: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  heading: number;
}