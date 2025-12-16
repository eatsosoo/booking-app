import type { PaginationType } from "~/types";

export const PUBLISHED_STATUSES = {
  0: "Không hiển thị",
  1: "Hiển thị",
} as const;

export const ROOM_STATUSES = {
  0: "Hết phòng",
  1: "Còn phòng",
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
] as const;

export const REGIONS = ["Miền Bắc", "Miền Trung", "Miền Nam"] as const;

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
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
] as const;

export const AFTERNOON_TIMES = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
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

export const PAGINATION: PaginationType = {
  current_page: 1,
  last_page: 1,
  per_page: 1,
  total: 0,
  has_more_pages: false,
} as const;

export const CONTENT_STYLE = `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; 
      font-size: 14px; 
      line-height: 1.6;
    }
    h1, h2, h3, h4, h5, h6 { 
      font-weight: 600; 
      margin-top: 1em; 
      margin-bottom: 0.5em;
    }
    blockquote { 
      border-left: 4px solid #ccc; 
      margin: 1em 0; 
      padding-left: 1em; 
      color: #666; 
      font-style: italic;
    }
    pre {
      background: #f4f4f4;
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    /* Horizontal Line styles */
    hr {
      height: 2px;
      border: none;
      background-color: #e0e0e0;
      margin: 2em 0;
    }
    hr.hr-bold {
      height: 4px;
      background-color: #333;
    }
    hr.hr-dotted {
      height: 2px;
      background: repeating-linear-gradient(to right, #e0e0e0, #e0e0e0 4px, transparent 4px, transparent 8px);
    }
    hr.hr-dashed {
      height: 2px;
      background: repeating-linear-gradient(to right, #e0e0e0, #e0e0e0 8px, transparent 8px, transparent 16px);
    }
    hr.hr-double {
      height: 6px;
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
      background: transparent;
    }
    hr.hr-shadow {
      height: 1px;
      border: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      background: transparent;
    }
    /* Page Break indicator trong editor */
    .mce-pagebreak {
      border: 1px dashed #ccc;
      background: #f9f9f9;
      display: block;
      width: 100%;
      height: 12px;
      margin: 2em 0;
      cursor: default;
    }
    .mce-pagebreak:after {
      content: "--- TRANG MỚI ---";
      display: block;
      text-align: center;
      font-size: 11px;
      color: #999;
      padding: 2px;
    }
  `;
