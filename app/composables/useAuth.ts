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

    return data.value;
  };

  return { login, token };
};
