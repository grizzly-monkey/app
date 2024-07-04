export interface Location {
  address: string;
  lat: number;
  long: number;
}

export interface Reservoir {
  reservoirId: string;
  name: string;
  reservoirCapacity: number;
  nutrientWaterReservoirCapacity: number;
  phReservoirCapacity: number;
  stockNutrientSolutionCapacity: number;
}

export interface DilutionRatio {
  numerator: number;
  denominator: number;
}

export interface Nutrient {
  type: string;
  dilutionRatio: DilutionRatio;
}

export interface Device {
  deviceId: string;
  name: string;
  description: string;
  status: string;
  lastPingPacketReceived: string;
  state: string;
}

export interface Farm {
  farmId: string;
  id: string;
  organisationId: string;
  name: string;
  area: number;
  cultivableArea: number;
  location: {
    address: string;
    lat: number;
    long: number;
  };
  polyhouses: Polyhouse[];
  reservoirs: Reservoir[];
  nutrient: {
    type: string;
    dilutionRatio: {
      denominator: number;
      numerator: number;
    };
  };
  device: Device | null;
  state: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
}

export interface GrowingArea {
  wateringType: string;
  wateringSchedule: string;
  area: number;
  rowCount: number;
  plantCountPerRow: number;
  plantSpacing: number;
  rowSpacing: number;
}

export interface Zone {
  name: string;
  zoneId: string;
  systemType: string;
  area: number;
  growingArea: GrowingArea;
}

export interface Nursery {
  nurseryId: string;
  name: string;
  type: string;
  wateringType: string;
  wateringSchedule: string;
  germinationType: string;
  area: number;
  seedCount: number;
  germinationArea: number;
}

export interface Polyhouse {
  name: string;
  polyhouseId: string;
  structureExpectedLife: number;
  plasticExpectedLife: number;
  zones: Zone[];
  nurseries: Nursery[];
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
}
