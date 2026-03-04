// Quảng Ninh Monitor variant - Regional news aggregation for Quảng Ninh Province
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

// Re-export base config
export * from './base';

// Quảng Ninh-specific exports
export * from '../quangninh-feeds';
export * from '../feeds';

// Panel configuration for Quảng Ninh regional analysis
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: 'Bản đồ Quảng Ninh', enabled: true, priority: 1 },
  'live-news': { name: 'Tin tức trực tiếp', enabled: true, priority: 1 },
  intel: { name: 'Phân tích thông tin', enabled: true, priority: 1 },
  general: { name: 'Tin tức chung', enabled: true, priority: 1 },
  quangninh: { name: 'Bao Quang Ninh', enabled: true, priority: 1 },
  economics: { name: 'Kinh tế', enabled: true, priority: 1 },
  tourism: { name: 'Du lịch & Văn hóa', enabled: true, priority: 1 },
  infrastructure: { name: 'Cơ sở hạ tầng', enabled: true, priority: 1 },
  environment: { name: 'Môi trường & Biển', enabled: true, priority: 1 },
  'gold-sjc': { name: 'Bieu do gia vang SJC 9999', enabled: true, priority: 1 },
  markets: { name: 'Thị trường', enabled: false, priority: 2 },
  commodities: { name: 'Hàng hóa', enabled: false, priority: 2 },
};

// Map layers for Quảng Ninh regional view (focused on local infrastructure)
export const DEFAULT_MAP_LAYERS: MapLayers = {
  gpsJamming: false,
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: true,
  ais: true, // Port activity
  nuclear: false,
  irradiators: false,
  sanctions: false,
  weather: true,
  economic: true,
  waterways: true,
  outages: false,
  cyberThreats: false,
  datacenters: false,
  protests: false,
  flights: true,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  // Tech layers
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  // Finance layers
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: true,
  gulfInvestments: false,
  // Happy variant layers
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  tradeRoutes: false,
  iranAttacks: false,
  dayNight: false,
};

// Mobile-specific defaults for Quảng Ninh
export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  gpsJamming: false,
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: true,
  ais: true,
  nuclear: false,
  irradiators: false,
  sanctions: false,
  weather: true,
  economic: true,
  waterways: true,
  outages: false,
  cyberThreats: false,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: true,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  // Tech layers
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  // Finance layers
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: false,
  gulfInvestments: false,
  // Happy variant layers
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  tradeRoutes: false,
  iranAttacks: false,
  dayNight: false,
};


