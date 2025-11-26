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
  created_at: string
}

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
  has_more_pages: boolean
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
    },
    result?: {
      pagination: Pagination
    }
}

