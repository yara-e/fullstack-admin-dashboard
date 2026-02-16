export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsMeta {
  nextCursor?: string | null;
  prevCursor?: string | null;
  hasMore: boolean;
}

export interface ProductsResponse {
  data: Product[];
  meta: ProductsMeta;
}

export interface ProductsQueryParams {
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  after?: string;
  before?: string;
}
