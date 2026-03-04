export interface QuangNinhCurrentWeather {
  timeIso: string;
  temperatureC: number;
  feelsLikeC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirectionDeg: number;
  precipitationMm: number;
  weatherCode: number;
  isDay: boolean;
}

// Ha Long / Quang Ninh center point
const QUANGNINH_LAT = 20.95;
const QUANGNINH_LON = 107.08;

const OPEN_METEO_URL =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${QUANGNINH_LAT}` +
  `&longitude=${QUANGNINH_LON}` +
  '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code,is_day' +
  '&timezone=Asia%2FHo_Chi_Minh';

interface OpenMeteoCurrentPayload {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    precipitation?: number;
    weather_code?: number;
    is_day?: number;
  };
}

export async function fetchQuangNinhCurrentWeather(): Promise<QuangNinhCurrentWeather> {
  const response = await fetch(OPEN_METEO_URL);
  if (!response.ok) {
    throw new Error(`Weather HTTP ${response.status}`);
  }

  const payload = await response.json() as OpenMeteoCurrentPayload;
  const current = payload.current;
  if (!current) {
    throw new Error('Weather payload missing current block');
  }

  return {
    timeIso: current.time ?? new Date().toISOString(),
    temperatureC: Number(current.temperature_2m ?? 0),
    feelsLikeC: Number(current.apparent_temperature ?? 0),
    humidityPercent: Number(current.relative_humidity_2m ?? 0),
    windSpeedKmh: Number(current.wind_speed_10m ?? 0),
    windDirectionDeg: Number(current.wind_direction_10m ?? 0),
    precipitationMm: Number(current.precipitation ?? 0),
    weatherCode: Number(current.weather_code ?? -1),
    isDay: Number(current.is_day ?? 1) === 1,
  };
}

export function describeWeatherCode(code: number): string {
  if (code === 0) return 'Trời quang';
  if (code === 1) return 'Ít mây';
  if (code === 2) return 'Mây rải rác';
  if (code === 3) return 'Nhiều mây';
  if (code === 45 || code === 48) return 'Sương mù';
  if (code >= 51 && code <= 57) return 'Mưa phùn';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'Mưa';
  if (code >= 71 && code <= 77) return 'Tuyết';
  if (code >= 95) return 'Dông';
  return 'Không xác định';
}
