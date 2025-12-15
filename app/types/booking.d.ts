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
  per_month: number
  content: string
  thumbnail: string
  gallery: string[]
  services: number[]
  property_types: number[]
  slug: string
  region: string
  province: string
  district: string
}

export type PostForm = {
  title: string
  slug: string
  image: string
  description: string
  keywords: string
  content: string
  property_types: number[]
  region: string
  province: string
  district: string
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

export type ProvinceForm = {
  name: string
  slug: string
  region: string
  property_types: string[];
  district: string
}

export type SelectOption = {
  id: number
  name: string
}

export type SettingForm = {
  setting_key: string
  setting_value: string
}