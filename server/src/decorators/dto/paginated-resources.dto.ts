export interface PaginatedResource<T> {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  counts?: Record<string, number>;

  percentageChange?: Record<string, number>;
  totalCities?: number,
  totalCountries?: number,
}