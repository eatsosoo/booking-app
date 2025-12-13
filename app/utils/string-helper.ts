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

export function nowDateTime(): string {
  const now = new Date();
  // Lấy thời gian UTC và cộng thêm 7 giờ (7 * 60 * 60 * 1000 mili giây)
  // Chúng ta cộng 7 giờ vào UTC và xử lý để nó không vượt quá 24 giờ
  const utcDate = new Date(now.getTime() + (7 * 60 * 60 * 1000));

  const year = utcDate.getUTCFullYear();
  const month = ('0' + (utcDate.getUTCMonth() + 1)).slice(-2); // Tháng 0-11
  const day = ('0' + utcDate.getUTCDate()).slice(-2);
  const hours = ('0' + utcDate.getUTCHours()).slice(-2);
  const minutes = ('0' + utcDate.getUTCMinutes()).slice(-2);
  const seconds = ('0' + utcDate.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

type RoomPriceType = {
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  rent_type: 'base_hours' | 'per_day' | 'per_night' | 'per_month',
  price: {
    base_hours: number
    extra_hour: number
    per_day: number
    per_night: number
    per_month: number
  }
}

// Hàm tạo đối tượng Date từ date và time
export const createDateTime = (dateStr: string, timeStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

export function calculateRoomPriceV2(params: RoomPriceType) {
  const {
    start_date,
    start_time,
    end_date,
    end_time,
    rent_type, // 'base_hours', 'per_day', 'per_night', 'per_month'
    price // { base_hours, extra_hour, per_day, per_night, per_month }
  } = params;

  const startDateTime = createDateTime(start_date, start_time);
  const endDateTime = createDateTime(end_date, end_time);

  // Đảm bảo thời gian kết thúc sau thời gian bắt đầu
  if (endDateTime <= startDateTime) {
    throw new Error('Thời gian kết thúc phải sau thời gian bắt đầu');
  }

  // Tính tổng số giờ thuê
  const totalMilliseconds = endDateTime - startDateTime;
  const totalHours = totalMilliseconds / (1000 * 60 * 60);
  const totalDays = totalHours / 24;
  const totalMonths = totalDays / 30; // Xấp xỉ

  // Hàm tính số ngày thuê (trọn vẹn)
  const getFullDays = () => {
    // Chuyển về 00:00:00 để tính số ngày
    const startDate = new Date(startDateTime);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(endDateTime);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Hàm kiểm tra có phải ban đêm không (18h - 6h)
  const isNightTime = (dateTime) => {
    const hours = dateTime.getHours();
    return hours >= 18 || hours < 6;
  };

  // Hàm tính số giờ qua đêm
  const calculateNightHours = () => {
    let nightHours = 0;
    let current = new Date(startDateTime);

    while (current < endDateTime) {
      // Thêm 1 giờ
      const nextHour = new Date(current.getTime() + 60 * 60 * 1000);

      // Kiểm tra nếu khoảng thời gian này thuộc ban đêm
      if (isNightTime(current) || isNightTime(nextHour)) {
        const segmentStart = current;
        const segmentEnd = nextHour > endDateTime ? endDateTime : nextHour;

        // Tính số giờ trong đoạn này
        const segmentHours = (segmentEnd - segmentStart) / (1000 * 60 * 60);
        nightHours += segmentHours;
      }

      current = nextHour;
    }

    return nightHours;
  };

  switch (rent_type) {
    case 'base_hours': {
      // Thuê theo giờ: có base_hours giờ đầu, sau đó tính theo extra_hour
      const baseHours = 2; // Mặc định 2 giờ đầu
      const basePrice = price.base_hours || 0;
      const extraHourPrice = price.extra_hour || 0;

      if (totalHours <= baseHours) {
        return basePrice;
      } else {
        const extraHours = Math.ceil(totalHours - baseHours);
        return basePrice + (extraHours * extraHourPrice);
      }
    }

    case 'per_day': {
      // Thuê theo ngày
      const fullDays = getFullDays();
      const dayPrice = price.per_day || 0;

      // Nếu có lẻ giờ, tính thêm 1 ngày
      const hasExtraHours = totalHours % 24 > 0;
      const totalDaysToPay = hasExtraHours ? fullDays + 1 : fullDays;

      return totalDaysToPay * dayPrice;
    }

    case 'per_night': {
      // Thuê qua đêm (18h - 6h)
      const nightPrice = price.per_night || 0;
      const nightHours = calculateNightHours();

      // Tính số đêm (mỗi đêm từ 18h hôm trước đến 6h hôm sau = 12h)
      const totalNights = Math.ceil(nightHours / 12);

      // Nếu có giờ ban ngày, tính thêm theo giá giờ thông thường
      let dayTimeCost = 0;
      const dayHours = totalHours - nightHours;

      if (dayHours > 0) {
        // Giả sử có giá giờ ban ngày
        const dayHourPrice = price.day_hour_price || (nightPrice / 12) * 1.5;
        dayTimeCost = Math.ceil(dayHours) * dayHourPrice;
      }

      return (totalNights * nightPrice) + dayTimeCost;
    }

    case 'per_month': {
      // Thuê theo tháng
      const monthPrice = price.per_month || 0;

      // Tính số tháng trọn vẹn
      const fullMonths = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;

      let totalCost = fullMonths * monthPrice;

      // Tính thêm ngày lẻ nếu có
      if (remainingDays > 0) {
        // Giá theo ngày = giá tháng / 30
        const dayPriceFromMonth = monthPrice / 30;
        totalCost += Math.ceil(remainingDays) * dayPriceFromMonth;
      }

      return totalCost;
    }

    default:
      throw new Error('Loại hình thuê không hợp lệ');
  }
}

export const buildUrl = (query: Record<string, any>) =>
  `/tim-kiem?${new URLSearchParams(query).toString()}`

