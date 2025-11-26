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

export interface Response<T> {
    statusCode: number
    message: string
    data: {
      items: T,
      pagination?: Pagination
    }
}

