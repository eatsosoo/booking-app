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

export function formatTelNumber(tel: string): string {
  // Xóa tất cả ký tự không phải số
  const cleaned = ('' + tel).replace(/\D/g, '');
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
