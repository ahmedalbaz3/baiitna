// src/types/service.types.ts

/* ---------- Category ---------- */
export interface ServiceCategory {
  id: string; // GraphQL IDs are typically strings, though they can be numbers
  nameEn: string;
  nameAr: string;
}

/* ---------- Service Item ---------- */
export interface Service {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
  slug: string;
  category: ServiceCategory;
  numberOfCompanies: number;
}

/* ---------- Inner Data (Items array) ---------- */
export interface ServicesData {
  items: Service[];
  pageInfo: {
    totalCount: number;
  };
}

/* ---------- API Response Wrapper ---------- */
export interface ServicesResponse {
  code: number;
  success: boolean;
  message: string;
  data: ServicesData;
}

/* ---------- Query Root Object ---------- */
// This matches the structure returned by useQuery() or fetch()
export interface GetAllServicesData {
  services: ServicesResponse;
}

/* ---------- Variables ---------- */
// Typing for the variables you pass into the query
export interface GetAllServicesVariables {
  limit: number;
}
