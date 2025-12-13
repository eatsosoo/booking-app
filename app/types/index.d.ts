export interface Faq {
  id: number
  question: string
  answer: string
}

export interface SettingItem {
  id: number
  setting_key: string
  setting_value: string
}

export interface Booking {
  id: number
  name: string
  phone: string
  email: string
  booking_info: any
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
  region: string
  property_types: { id: number, name: string }[]
  cateogrory_id: number
}

export interface Properties {
  id: number
  category_id: number
  name: string
  description: string
  address: string
  region: string
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
  services: { id: number, title: string }[]
  property_types: { id: number, name: string }[]
  province: string
  district: string
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

export interface Category {
  id: number
  name: string
  image: string
  description: string
  created_at: string
  updated_at: string
}

export interface Region {
  id: number
  name: string
  slug: string
  region: string
}

export interface Province {
  id: number;
  name: string;
  slug: string;
  region: string;
  property_types: { id: number, name: string }[];
  district: string;
}

export interface SystemSetting {
  home_page: string,
  phone_number: string,
  facebook_url: string,
  tiktok_url: string,
  zalo_url: string,
  email: string
  posts?: any
}

export interface Video {
  id: number
  name: string
  url: string
}

export interface Option {
  label: string;
  value: string | number;
}

export interface Option2 {
  label: string;
  value: string;
}

export interface Option3 {
  label: string;
  value: number;
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

export interface Auth {
  user_id: number
  token_type: string
  token: string
  expired_time: string
}

