import type { Response, SystemSetting } from "~/types"

export const useSystemSetting = () => {
  const config = useRuntimeConfig();
  const { data: settings, pending, refresh, error } = useFetch<Response<SystemSetting[]>>(`${config.public.apiBase}/home/settings`, {
    server: true,
    lazy: true,
  })

  return {
    settings,
    pending,
    error,
    refresh,
  }
}