export interface Faq {
    id: number
    question: string
    answer: string
}

export interface Post {
  id: number
  title: string
  slug: string
  image: string
  keywords: string
  description: string
  content: string
  createdAt: string
}

export interface Response<T> {
  statusCode: number
  message: string
  data: ItemsWrapper<T>,
  result: ResultWrapper<Pagination>|null
}

interface Pagination {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  hasMorePages: boolean
}

interface ResultWrapper<T> {
  result: T
}
interface ItemsWrapper<T> {
  items: T[]
}