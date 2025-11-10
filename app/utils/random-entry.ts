// It will be available as randomEntry() (camelCase of file name without extension)
export default function (arr: Array<string | number>) {
  return arr[Math.floor(Math.random() * arr.length)]
}
