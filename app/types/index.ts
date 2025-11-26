export interface Faq {
    id: number
    question: string
    answer: string
}

export interface Response<T> {
    statusCode: number
    message: string
    data: ItemsWrapper<T>
}

export interface ItemsWrapper<T> {
  items: T[]
}