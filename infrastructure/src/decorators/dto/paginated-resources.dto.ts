export class PaginatedResource<T> {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
  totalPages: number; 
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  counts:{
    zainspotter: number;
    admin: number;
    manager: number;
  }
}