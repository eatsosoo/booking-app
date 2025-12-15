import { PROPERTY_TYPES, REGIONS } from "~/constants";
import type { Province, Response } from "~/types";

type TreeProvinceType = {
  label: string;
  value: string;
  regions: RegionType[];
};

type RegionType = {
  region: string;
  provinces: string[];
};

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
  const getProvinces = (propertyId: number, region: string) => {
    if (!provinces.value) return [];
    const records = provinces.value?.data.items;
    const res = [...records]
      .filter(
        (p) =>
          p.property_types.map((item) => item.id).includes(propertyId) &&
          p.region === region
      )
      .map((el) => el.name);
    return [...new Set(res)];
  };

  const getProvinceAndDistrict = (propertyId: number, region: string) => {
    if (!provinces.value) return {};

    const records = provinces.value.data.items;

    const filtered = records.filter(
      (p) =>
        p.property_types.some((item) => item.id === propertyId) &&
        p.region === region
    );

    const group: Record<string, string[]> = {};

    filtered.forEach((el) => {
      if (!group[el.name]) {
        group[el.name] = [el.district];
      } else {
        group[el.name]?.push(el.district);
      }
    });

    return group;
  };

  const getDistricts = (
    propertyId: number,
    region: string,
    province: string
  ) => {
    if (!provinces.value) return [];
    const records = provinces.value?.data.items;
    const filtered = [...records]
      .filter(
        (p) =>
          p.property_types.map((item) => item.id).includes(propertyId) &&
          p.region === region &&
          p.name === province
      )
      .map((el) => el.district);
    return filtered;
  };

  const treeProvinces = computed(() => {
    return PROPERTY_TYPES.map((property) => ({
      ...property,
      regions: REGIONS.map((region) => {
        const provinces = getProvinces(property.value, region);
        return {
          region,
          provinces,
        };
      }),
    }));
  });

  const menuTree = computed(() => {
    return PROPERTY_TYPES.map((property) => ({
      ...property,
      regions: REGIONS.map((region) => {
        const provinces = getProvinces(property.value, region);
        return {
          region,
          provinces: provinces.map((province) => ({
            province,
            districts: getDistricts(property.value, region, province),
          })),
        };
      }),
    }));
  });

  return {
    provinces,
    northernProvinces,
    centralProvinces,
    southernProvinces,
    treeProvinces,
    menuTree,

    pending,
    error,
    refresh,

    getProvinceBySlug,
    getProvinceByName,
    getProvinces,
    getDistricts,
    getProvinceAndDistrict,
  };
};
