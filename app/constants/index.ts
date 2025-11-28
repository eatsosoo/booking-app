export const PUBLISHED_STATUSES = {
    '0': 'Không hiển thị',
    '1': 'Hiển thị'
} as const

export const TYPE_ROOM = {
    villa: 'Villa',
    homestay: 'Homestay',
    hotel: 'Khách sạn',
    apartment: 'Chung cư mini'
} as const

export const SERVICE_TYPES = {
    'standard': 'Tiêu chuẩn',
    'basic': 'Cơ bản',
    'premium': 'Cao cấp'
} as const

export const PROPERTY_TYPES = [
    {
        label: 'Villa',
        value: 0,
    },
    {
        label: 'Homestay',
        value: 1,
    },
    {
        label: 'Khách sạn',
        value: 2,
    },
    {
        label: 'Chung cư mini',
        value: 3,
    },
]