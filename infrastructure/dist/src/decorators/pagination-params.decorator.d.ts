export interface Pagination {
    page: number;
    limit: number;
    size: number;
    offset: number;
}
export declare const PaginationParams: (...dataOrPipes: unknown[]) => ParameterDecorator;
