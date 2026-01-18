/* ---------- Media (Logo/Cover) ---------- */
export interface ProviderMedia {
  file: string;
}

/* ---------- Provider Item ---------- */
export interface Provider {
  id: string;
  slug: string;
  businessNameEn: string;
  businessNameAr: string;
  aboutEn: string | null;
  aboutAr: string | null;
  sloganEn: string | null;
  sloganAr: string | null;
  phones: string[];
  businessPhone: string | null;
  whatsapp: string | null;
  businessEmail: string | null;
  jobTitle: string | null;
  code: string;
  logo: ProviderMedia | null;
  cover: ProviderMedia | null;
}

/* ---------- API Response Structure ---------- */
export interface ProvidersData {
  items: Provider[];
}

export interface ProvidersResponse {
  code: number;
  success: boolean;
  message: string;
  data: ProvidersData;
}

/* ---------- Query Root & Variables ---------- */
export interface AllProvidersData {
  allProviders: ProvidersResponse;
}

export interface AllProvidersVariables {
  serviceId?: string | null;
  limit: number;
}
