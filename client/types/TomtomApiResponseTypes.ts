export interface TomtomGeocodeResponse {
  summary: Summary;
  results: Result[];
}

export interface Result {
  type: string;
  id: string;
  score: number;
  address: Address;
  position: Position;
  viewport: Viewport;
  entryPoints: EntryPoint[];
}

export interface Address {
  streetNumber: string;
  streetName: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  postalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  localName: string;
}

export interface EntryPoint {
  type: string;
  position: Position;
}

export interface Position {
  lat: number;
  lon: number;
}

export interface Viewport {
  topLeftPoint: Position;
  btmRightPoint: Position;
}

export interface Summary {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
}
