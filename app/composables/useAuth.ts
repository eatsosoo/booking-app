import type { Auth, Response } from "~/types";

export const useAuth = () => {
  const token = useCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  const login = async (email: string, password: string) => {
    const config = useRuntimeConfig();

    const { data, error } = await useFetch<Response<Auth>>(`${config.public.apiBase}/login`, {
      method: "POST",
      body: { username: email, password },
    });

    if (error.value) {      
      return error.value?.data;
    }

    token.value = data.value?.data.items.token;
    return data.value;
  };

  const logout = () => {
    token.value = null;
  };

  return { login, logout, token };
};
