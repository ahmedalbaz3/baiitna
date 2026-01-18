// src/types/city.types.ts

export interface City {
  id: number;
  name: string;
  nameAr: string;
  countryId: number;
}

export interface CitiesResponseData {
  id: number;
  name: string;
  nameAr: string;
  countryId: number;
}

export interface GetCitiesResponse {
  code: number;
  success: boolean;
  message: string;
  data: City[];
}

export interface GetCitiesQuery {
  getCities: GetCitiesResponse;
}
