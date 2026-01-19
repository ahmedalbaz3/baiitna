// src/types/featured-board.types.ts

/* ---------- Shared ---------- */
export interface Image {
  file: string;
}

/* ---------- Categories ---------- */
export interface FeaturedCategory {
  id: number;
  nameEn: string;
  nameAr: string;
  isActive: boolean;
  code: string;
  isFeatured: boolean;
  image: Image;
}

/* ---------- Services ---------- */
export interface FeaturedService {
  id: number;
  nameEn: string;
  nameAr: string;
  code: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: number;
  slug: string;
  image: Image;
}

/* ---------- Data ---------- */
export interface FeaturedBoardData {
  categories: FeaturedCategory[];
  services: FeaturedService[];
}

/* ---------- API Response ---------- */
export interface FeaturedBoardResponse {
  code: number;
  success: boolean;
  message: string;
  data: FeaturedBoardData;
}

/* ---------- Query Root ---------- */
export interface FeaturedBoardQuery {
  featuredBoard: FeaturedBoardResponse;
}
