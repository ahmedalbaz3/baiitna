// The individual Service item
export interface ServiceItem {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
  isFeatured: boolean;
  isActive: boolean;
  numberOfCompanies: number;
  categoryId: number;
  clicks: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  getClickCount: number;
}

// The Paginated Data structure
export interface ServicePaginationData {
  items: ServiceItem[];
}

// The Full GraphQL Response
export interface SuggestItemsResponse {
  services: {
    code: number;
    success: boolean;
    message: string;
    data: ServicePaginationData;
  };
}
