export interface Vehicle {
    _id: string
    year: number
    make: string
    model: string
    version: string
    battery: number
    WLTP: number
    realWorldRange: number
    chargingAC?: {
      method: string,
      powerRating: number
    }
    chargingDC?: {
      method: string,
      powerRating: number
    }
    pricing?: {
      OTR: number
    }
    images: Array<string>
}
