import type { Province, Response } from "~/types";

export const useProvinces = () => {
  const config = useRuntimeConfig();
  const {
    data: provinces,
    pending,
    refresh,
    error,
  } = useFetch<Response<Province[]>>(
    `${config.public.apiBase}/home/provinces?per_page=100`,
    {
      server: true,
      lazy: true,
    }
  );

  // Memoized computed properties for performance
  const northernProvinces = computed(
    () =>
      provinces.value?.data.items.filter(
        (p) =>
          p.region.includes("Bắc") ||
          ["Miền Bắc", "Bắc", "Bắc Bộ"].includes(p.region)
      ) || []
  );

  const centralProvinces = computed(
    () =>
      provinces.value?.data.items.filter(
        (p) =>
          p.region.includes("Trung") ||
          ["Miền Trung", "Trung", "Trung Bộ"].includes(p.region)
      ) || []
  );

  const southernProvinces = computed(
    () =>
      provinces.value?.data.items.filter(
        (p) =>
          p.region.includes("Nam") ||
          ["Miền Nam", "Nam", "Nam Bộ"].includes(p.region)
      ) || []
  );

  // Get province by slug
  const getProvinceBySlug = (slug: string) => {
    return provinces.value?.data.items.find((p) => p.slug === slug);
  };

  // Get province by name
  const getProvinceByName = (name: string) => {
    return provinces.value?.data.items.find((p) => p.name === name);
  };

  // Get province by property id and region
  const getProvinces = (
    propertyId: number,
    region: string
  ) => {
    if (!provinces.value) return []
    return provinces.value?.data.items.filter(
      (p) =>
        p.property_types.map((item) => item.id).includes(propertyId) &&
        p.region === region
    );
  };

  const getDistricts = (
    propertyId: number,
    region: string,
    name: string
  ) => {
    if (!provinces.value) return []
    return provinces.value?.data.items.filter(
      (p) =>
        p.property_types.map((item) => item.id).includes(propertyId) &&
        p.region === region && p.name === name
    );
  };

  return {
    provinces,
    northernProvinces,
    centralProvinces,
    southernProvinces,
    pending,
    error,
    refresh,
    getProvinceBySlug,
    getProvinceByName,
    getProvinces,
    getDistricts
  };
};
