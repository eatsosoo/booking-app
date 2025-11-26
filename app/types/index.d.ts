export interface Faq {
    id: number
    question: string
    answer: string
}

export interface Response<T> {
    statusCode: number
    message: string
    data: {
      items: T,
      agination? :Pagination
    }
}

export interface Pagination {
    total: number;
    page: number;
    perPage: number;
}