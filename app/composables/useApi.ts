export const useApi = () => {
  const token = useCookie("token")

  const request = async (url: string, options: any = {}) => {
    const config = useRuntimeConfig()

    const headers = {
      ...(options.headers || {}),
      Authorization: token.value ? `Bearer ${token.value}` : ""
    }

    return await $fetch(`${config.public.apiBase}${url}`, {
      ...options,
      headers
    })
  }

  return { request }
}
