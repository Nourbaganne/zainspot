export class PaginatedResource<T> {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
  totalPages: number; // Add totalPages to the DTO
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}