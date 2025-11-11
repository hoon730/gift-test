// User 관련 타입
export interface IUser {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gift 관련 타입
export interface IGift {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  purchaseUrl?: string;
  tags: string[];
  category: GiftCategory;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GiftCategory =
  | "bags"
  | "shoes"
  | "accessories"
  | "fashion"
  | "beauty"
  | "tech"
  | "home"
  | "food"
  | "books"
  | "etc";

// Bookmark 관련 타입
export interface IBookmark {
  id: string;
  userId: string;
  giftId: string;
  createdAt: Date;
}

// 검색/필터 관련 타입
export interface ISearchFilters {
  keywords?: string[];
  category?: GiftCategory;
  priceRange?: {
    min?: number;
    max?: number;
  };
  tags?: string[];
}
