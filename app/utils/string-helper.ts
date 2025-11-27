export function formatCurrency(value: number | string): string {
  if (value === null || value === undefined || value === "") return "0 ₫";

  // Ép kiểu về số
  const number = Number(value);
  if (isNaN(number)) return String(value);

  // Định dạng số có dấu chấm ngăn cách hàng nghìn
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
