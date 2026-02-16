export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface UsersMeta {
  nextCursor?: string | null;
  prevCursor?: string | null;
  hasMore: boolean;
}

export interface UsersResponse {
  data: User[];
  meta: UsersMeta;
}

export interface UsersQueryParams {
  limit?: number;
  search?: string;
  role?: string;
  after?: string;
  before?: string;
}
