import type { Response, SettingItem } from "~/types"

export const useSystemSetting = () => {
  const config = useRuntimeConfig();
  const { data: settings, pending, refresh, error } = useFetch<Response<SettingItem[]>>(`${config.public.apiBase}/home/settings?per_page=1000`, {
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

  const baseInfo = computed(() => {
    const baseKeys = ['ZALO', 'FACEBOOK', 'TIKTOK', 'TWITTER', 'PHONE', 'EMAIL', 'ADDRESS'];
    const res = settings.value?.data.items || [];
    const filtered = res.filter((item) => baseKeys.includes(item.setting_key))
    return Object.fromEntries(
      filtered.map(item => [item.setting_key, item.setting_value])
    )
  })

  return {
    settings,
    pending,
    error,
    refresh,
    homePageSetting,
    videos,
    baseInfo
  }
}