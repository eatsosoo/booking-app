import type { Province, Response } from "~/types"

export const useProvinces = () => {
  const { data: provinces, pending, refresh, error } = useFetch<Response<Province[]>>('/api/provinces', {
    server: true,
    lazy: true,
  })

  // Memoized computed properties for performance
  const northernProvinces = computed(() => 
    provinces.value?.data.items.filter(p => 
      p.region.includes('Bắc') || 
      ['Miền Bắc', 'Bắc', 'Bắc Bộ'].includes(p.region)
    ) || []
  )

  const centralProvinces = computed(() => 
    provinces.value?.data.items.filter(p => 
      p.region.includes('Trung') || 
      ['Miền Trung', 'Trung', 'Trung Bộ'].includes(p.region)
    ) || []
  )

  const southernProvinces = computed(() => 
    provinces.value?.data.items.filter(p => 
      p.region.includes('Nam') || 
      ['Miền Nam', 'Nam', 'Nam Bộ'].includes(p.region)
    ) || []
  )

  // Get province by slug
  const getProvinceBySlug = (slug: string) => {
    return provinces.value?.data.items.find(p => p.slug === slug)
  }

  // Get province by name
  const getProvinceByName = (name: string) => {
    return provinces.value?.data.items.find(p => p.name === name)
  }

  return {
    provinces,
    northernProvinces,
    centralProvinces,
    southernProvinces,
    pending,
    error,
    refresh,
    getProvinceBySlug,
    getProvinceByName
  }
}