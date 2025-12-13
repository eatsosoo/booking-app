import type { Response, SettingItem } from "~/types"

export const useSystemSetting = () => {
  const config = useRuntimeConfig();
  const { data: settings, pending, refresh, error } = useFetch<Response<SettingItem[]>>(`${config.public.apiBase}/home/settings`, {
    server: true,
    lazy: true,
  })

  const homePageSetting = computed(() => {
    const res = settings.value?.data.items || [];
    return res.find((item) => item.setting_key === 'HOME_PAGE') || { id: 0, setting_key: "", setting_value: ""}
  })

  const videos = computed(() => {
    const res = settings.value?.data.items || [];
    return res.filter((item) => item.setting_key === 'video_tiktok')
  })

  return {
    settings,
    pending,
    error,
    refresh,
    homePageSetting,
    videos
  }
}