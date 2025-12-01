export const useAuth = () => {
  const token = useCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  })

  const login = async (email: string, password: string) => {
    const config = useRuntimeConfig()

    const { data, error } = await useFetch(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      body: { email, password },
    })

    if (error.value) throw error.value

    token.value = data.value?.token
    return data.value
  }

  const logout = () => {
    token.value = null
  }

  return { login, logout, token }
}
