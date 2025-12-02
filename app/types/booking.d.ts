export type PropertiesForm = {
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
  services: number[]
  property_types: number[]
  category_id: number
  slug: string
}

export type PostForm = {
  title: string
  slug: string
  image: string
  description: string
  keywords: string
  content: string
}

export type ServiceForm = {
  title: string
  slug: string
  image: string
  description: string
  menu: string
  price: number
  is_published: number
  images: string[]
}

export type CategoryForm = {
  name: string
  image: string
  description: string
}

export type SelectOption = {
  id: number
  name: string
}