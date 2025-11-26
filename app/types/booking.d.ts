export interface Room {
  id: number
  name: string
  price: number
  thumbnail: string
  description?: string
}

export type BookingStatus = 'pending' | 'success' | 'cancelled'
