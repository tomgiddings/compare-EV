import { ConditionalKeys } from 'type-fest';

interface ChargingMethod {
  method: string
  powerRating: number
};

interface Pricing {
  OTR: number
}

export interface Vehicle {
  _id: string
  year: number
  make: string
  model: string
  version: string
  battery: number
  WLTP: number
  realWorldRange: number
  chargingAC?: ChargingMethod
  chargingDC?: ChargingMethod
  pricing?: Pricing
  images: Array<string>
}

export interface Specification {
  key: keyof Vehicle
  subKey?: VehicleSubKey
  displayName: string
  displayType: 'number' | 'string'
  prefix?: string
  suffix?: string
  tooltip?: string
}

export type VehicleSubKey = ConditionalKeys<keyof Vehicle, string>;
