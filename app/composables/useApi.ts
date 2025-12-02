// composables/useApi.ts
export const useApi = () => {
  const token = useCookie("token");
  const config = useRuntimeConfig();

  const request = async (url: string, options: any = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
    };

    try {
      return await $fetch(`${config.public.apiBase}${url}`, {
        ...options,
        headers
      });
    } catch (err: any) {
      console.error("API Error:", err);
      throw err;
    }
  };

  return { request };
};
