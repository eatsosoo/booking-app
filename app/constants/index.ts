export const PUBLISHED_STATUSES = {
  0: "Không hiển thị",
  1: "Hiển thị",
} as const;

export const TYPE_ROOM = {
  villa: "Villa",
  homestay: "Homestay",
  hotel: "Khách sạn",
  apartment: "Chung cư mini",
} as const;

export const SERVICE_TYPES = {
  standard: "Tiêu chuẩn",
  basic: "Cơ bản",
  premium: "Cao cấp",
} as const;

export const PROPERTY_TYPES = [
  {
    label: "Villa",
    value: 1,
  },
  {
    label: "Homestay",
    value: 2,
  },
  {
    label: "Chung cư mini",
    value: 3,
  },
  {
    label: "Khách sạn",
    value: 4,
  },
];

export const PLACE_GROUPS = [
  {
    label: "Khu vực Miền Bắc",
    value: [
      "Hà Nội",
      "Hoà Bình",
      "Ba Vì",
      "Sóc Sơn",
      "Tam Đảo",
      "Đại Lải",
      "Hạ Long",
      "Tuần Châu",
      "Ninh Bình",
      "Mộc Châu",
      "Sa Pa",
    ],
  },
  {
    label: "Khu vực Miền Trung",
    value: [
      "FLC Sầm Sơn",
      "Hải Tiến",
      "Huế",
      "Đà Nẵng",
      "Hội An",
      "Quy Nhơn",
      "Nha Trang",
      "Mũi Né",
      "Phú Yên",
      "Đà Lạt",
    ],
  },
  {
    label: "Khu vực Miền Nam",
    value: ["Vũng Tàu", "Hồ Tràm", "Sài Gòn", "Phú Quốc"],
  },
] as const;

export const MORNING_TIMES = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
] as const;

export const AFTERNOON_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
] as const;

export const BEDROOM_OPTIONS = [
  {
    value: "1,3",
    label: "Từ 1 đến 3 phòng ngủ",
  },
  {
    value: "3,5",
    label: "Từ 3 đến 5 phòng ngủ",
  },
  {
    value: "5,7",
    label: "Từ 5 đến 7 phòng ngủ",
  },
  {
    value: "7,9",
    label: "Từ 7 đến 9 phòng ngủ",
  },
  {
    value: "10",
    label: "Từ 10 phòng ngủ",
  },
] as const;

export const BATHROOM_OPTIONS = [
  {
    value: "1",
    label: "1 phòng tắm",
  },
  {
    value: "2",
    label: "2 phòng tắm",
  },
  {
    value: "3",
    label: "3 phòng tắm",
  },
  {
    value: "4",
    label: "4 phòng tắm",
  },
  {
    value: "5",
    label: "Từ 5 phòng tắm",
  },
] as const;

