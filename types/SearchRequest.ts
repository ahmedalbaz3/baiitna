/** --- Variables Interface --- **/
export interface SearchVariables {
  searchKey: string;
  limit: number; // Note: Even if the GQL type is Float, TypeScript uses number
  cityId?: number | null;
}

/** --- Data Interfaces --- **/
export interface Logo {
  file: string;
  thumbnail: string;
  type: string;
  size: number;
}

export interface ProviderResult {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  logo: Logo | null; // Handle cases where a provider might not have a logo
}

export interface ServiceResult {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
}

/** --- Full Query Response --- **/
export interface SearchResponse {
  search: {
    code: number;
    success: boolean;
    message: string;
    data: {
      providers: ProviderResult[];
      services: ServiceResult[];
    };
  };
}
