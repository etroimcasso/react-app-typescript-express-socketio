const _kilometerMilesConstant = 0.62137
const _meterMilesConstant = 0.006213711 //0.0006213712

export const kilometersToMiles = (km: number): number => km * _kilometerMilesConstant
export const milesToKilometers = (miles: number): number => miles / _kilometerMilesConstant
export const metersToMiles = (meters: number): number => meters * _meterMilesConstant
export const milesToMeters = (miles: number): number => miles / _meterMilesConstant
