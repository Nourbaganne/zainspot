export interface PaginatedResource<T> {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  counts?: {
    zainspotter: number;
    admin: number;
    owner: number;
  };
  percentageChange?: {
    zainspotter: number;
    admin: number;
    owner: number;
  };
}