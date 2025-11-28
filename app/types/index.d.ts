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

export interface Properties {
  id: number
  name: string
  description: string
  address: string
  type: string
  area: number
  guest: number
  bedrooms: number
  bathrooms: number
  bed: number
  base_hours: number
  extra_hour: number
  per_day: number
  per_night: number
  content: string
  thumbnail: string
  gallery: string[]
  services: { id: number, title: string }[]
  property_types: { id: number, name: string }[] 
}

export interface Service {
  id: number,
  title: string,
  slug: string,
  image: string,
  images: string[],
  description: string,
  menu: string,
  price: string,
  is_published: number
  created_at: string,
  updated_at: string
}

export interface Option {
  label: string;
  value: string | number;
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
    },
    result?: {
      pagination: Pagination
    }
}

