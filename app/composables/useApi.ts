import type { Response } from "~/types";

export const useApi = () => {
  const token = useCookie("token");
  const config = useRuntimeConfig();

  const request = async <T>(url: string, options: any = {}): Promise<Response<T>> => {
    try {
      return await $fetch<Response<T>>(`${config.public.apiBase}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          ...(token.value && { Authorization: `Bearer ${token.value}` })
        }
      });
    }
    catch (err: any) {
      if (err?.status === 401) {
        navigateTo("/login");
      }

      if (err?.status === 422) {
        err.data.message = "Dữ liệu không hợp lệ!";
      }

      if (err?.status === 500) {
        err.data.message = "Lỗi máy chủ, vui lòng thử lại!";
      }

      console.error("API Error:", err);
      throw err;
    }
  };

  return { request };
};
