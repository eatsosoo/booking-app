import type { Response, SettingItem } from "~/types";

type RegionCardType = {
  key: number;
  title: string;
  regions: {
    key: string;
    title: string;
    images: any;
  }[];
};

export const useSystemSetting = () => {
  const config = useRuntimeConfig();
  const properties = [
    { id: 1, code: "VILLA", title: "Villa" },
    { id: 2, code: "HOMESTAY", title: "Homestay" },
    { id: 3, code: "CCMN", title: "Chung cư mini" },
    { id: 4, code: "HOTEL", title: "Khách sạn" },
  ];
  const regions = [
    { code: "NORTH", title: "Miền Bắc" },
    { code: "CENTRAL", title: "Miền Trung" },
    { code: "SOUTH", title: "Miền Nam" },
  ];

  const {
    data: settings,
    pending,
    refresh,
    error,
  } = useFetch<Response<SettingItem[]>>(
    `${config.public.apiBase}/home/settings?per_page=1000`,
    {
      server: true,
      lazy: true,
    }
  );

  const homePageSetting = computed(() => {
    const res = settings.value?.data.items || [];
    return (
      res.find((item) => item.setting_key === "HOME_PAGE") || {
        id: 0,
        setting_key: "",
        setting_value: "",
      }
    );
  });

  const aboutPageSetting = computed(() => {
    const res = settings.value?.data.items || [];
    return (
      res.find((item) => item.setting_key === "ABOUT_PAGE") || {
        id: 0,
        setting_key: "",
        setting_value: "",
      }
    );
  });

  const videos = computed(() => {
    const res = settings.value?.data.items || [];
    return res.filter((item) => item.setting_key === "video_tiktok");
  });

  const baseInfo = computed(() => {
    const baseKeys = [
      "ZALO",
      "FACEBOOK",
      "TIKTOK",
      "TWITTER",
      "PHONE",
      "EMAIL",
      "ADDRESS",
      "YOUTUBE",
      "INSTAGRAM",
    ];
    const res = settings.value?.data.items || [];
    const filtered = res.filter((item) => baseKeys.includes(item.setting_key));
    return Object.fromEntries(
      filtered.map((item) => [item.setting_key, item.setting_value])
    );
  });

  const regionImages = computed(() => {
    const res = settings.value?.data.items || [];
    const arr: RegionCardType[] = [];
    properties.forEach((el) => {
      arr.push({
        key: el.id,
        title: el.title,
        regions: regions.map((region) => ({
          key: region.code,
          title: region.title,
          images:
            res
              .find(
                (item) => item.setting_key === `IMAGE_${el.code}_${region.code}`
              )
              ?.setting_value.split(",") || [],
        })),
      });
    });
    return arr;
  });

  return {
    settings,
    pending,
    error,
    refresh,
    homePageSetting,
    aboutPageSetting,
    videos,
    baseInfo,
    regionImages,
  };
};
