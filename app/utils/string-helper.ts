export function formatCurrency(value: number | string): string {
  if (value === null || value === undefined || value === '') return '0 ₫'

  // Ép kiểu về số
  const number = Number(value)
  if (isNaN(number)) return String(value)

  // Định dạng số có dấu chấm ngăn cách hàng nghìn
  return number.toLocaleString('vi-VN') + ' ₫'
}
