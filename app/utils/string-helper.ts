import { PROPERTY_TYPES } from "~/constants";

export function formatCurrency(value: number | string): string {
  if (value === null || value === undefined || value === "") return "0 ₫";

  const number = Number(value);
  if (isNaN(number)) return String(value);

  return number.toLocaleString("vi-VN") + " ₫";
}

export function genSlug(value: string): string {
  return (
    value
      .toLowerCase()
      // Xử lý dấu tiếng Việt
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Xóa các ký tự đặc biệt
      .replace(/[^\w\s-]/g, "")
      // Thay thế khoảng trắng và dấu gạch dưới bằng dấu gạch ngang
      .replace(/[\s_]+/g, "-")
      // Loại bỏ các dấu gạch ngang liên tiếp
      .replace(/--+/g, "-")
      // Loại bỏ dấu gạch ngang ở đầu và cuối
      .replace(/^-+|-+$/g, "")
  );
}

export function convertUTC(utcString: string): string {
  const date = new Date(utcString);
  // Format thành chuỗi theo giờ Việt Nam
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function nowDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatTelNumber(tel: string): string {
  // Xóa tất cả ký tự không phải số
  const cleaned = ("" + tel).replace(/\D/g, "");
  // Kiểm tra nếu số điện thoại có đúng 10 chữ số
  if (cleaned.length === 10) {
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 6);
    const part3 = cleaned.slice(6);
    return `(${part1}) ${part2}-${part3}`;
  }
  // Trả về chuỗi gốc nếu không đúng định dạng
  return tel;
}

export function calculateRoomPrice({
  start_date,
  end_date,
  base_hours,
  extra_hour,
  per_day,
  per_night,
  per_month,
  guest,
  actual_guest,
}: {
  start_date: string;
  end_date: string;
  base_hours: number;
  extra_hour: number;
  per_day: number;
  per_night: number;
  per_month: number;
  guest: number;
  actual_guest: number;
}) {
  if (typeof base_hours === "string") base_hours = Number(base_hours);
  if (typeof extra_hour === "string") extra_hour = Number(extra_hour);
  if (typeof per_day === "string") per_day = Number(per_day);
  if (typeof per_night === "string") per_night = Number(per_night);
  if (typeof per_month === "string") per_month = Number(per_month);

  const start = new Date(start_date);
  const end = new Date(end_date);

  // Tổng số giờ & ngày
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let price = 0;

  // 1) Thuê theo tháng (>= 28 ngày)
  if (diffDays >= 28) {
    price = per_month;
  }
  // 2) Thuê theo đêm
  else if (start.getHours() >= 18 || start.getHours() < 6) {
    price = per_night;
  }
  // 3) Thuê theo ngày
  else if (start.getHours() >= 8 && start.getHours() <= 17) {
    price = per_day;
  }
  // 4) Thuê theo giờ
  else {
    if (diffHours <= 2) {
      price = base_hours;
    } else {
      const extra = diffHours - 2;
      price = base_hours + extra * extra_hour;
    }
  }

  // --- Phụ thu khách ---
  const extraGuest = Math.max(0, actual_guest - guest);
  const surcharge = extraGuest * 200000;

  return {
    diffHours,
    diffDays,
    basePrice: price,
    surcharge,
    total: price + surcharge,
  };
}


export function createBreadcrumbFromUrl(rawUrl: string) {
  // bóc tách path + query params
  const [path, queryString] = rawUrl.split("?");
  const params = new URLSearchParams(queryString);

  const priorityKeys = ["property_types", "region", "province", "district"];

  const breadcrumb: any[] = [];

  priorityKeys.forEach((key) => {
    if (params.has(key)) {
      let label = params.get(key) as string;

      // xử lý riêng property_types vì là số
      if (key === "property_types") {
        const found = PROPERTY_TYPES.find((x) => x.value === Number(label));
        label = found ? found.label : label;
      }

      // tạo url khi click breadcrumb (giữ nguyên các params phía trước)
      const newParams = new URLSearchParams(params.toString());

      // chỉ giữ lại các param từ đầu đến vị trí hiện tại
      priorityKeys.forEach((removeKey) => {
        if (priorityKeys.indexOf(removeKey) > priorityKeys.indexOf(key)) {
          newParams.delete(removeKey);
        }
      });

      breadcrumb.push({
        key,
        label,
        url: `${path}?${newParams.toString()}`,
      });
    }
  });

  return breadcrumb;
}

