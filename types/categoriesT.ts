// src/types/category.types.ts

export interface CategoryImage {
  file: string;
}

export interface CompanyService {
  id: string;
  nameEn: string;
  nameAr: string;
  image: CategoryImage;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  image: CategoryImage;
  code: string;
  companyServices: CompanyService[];
}

export interface CategoriesData {
  items: Category[];
}

export interface AllCategoriesResponse {
  code: number;
  success: boolean;
  message: string;
  data: CategoriesData;
}

export interface GetAllCategoriesQuery {
  Allcategories: AllCategoriesResponse;
}
