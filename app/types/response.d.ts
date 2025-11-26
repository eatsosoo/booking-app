export type ItemType<T> = T | T[] | string;

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: {
    items: ItemType<T>;
    pagination?: Pagination;
  };
}


export interface Pagination {
    total: number;
    page: number;
    perPage: number;
}