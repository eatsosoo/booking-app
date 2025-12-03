<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PROPERTY_TYPES } from "~/constants";
import type { Province, Response } from "~/types";

// Fetch provinces from API
const config = useRuntimeConfig();
const {
  data: provinces,
} = await useFetch<Response<Province[]>>(
  `${config.public.apiBase}/home/provinces`,
  {
    lazy: true,
    server: true, // SSR for SEO
  }
);

const northernProvinces = computed(() => {
  return provinces.value?.data.items.filter(p => 
    p.region.includes('Bắc') || 
    ['Miền Bắc', 'Bắc', 'Bắc Bộ'].includes(p.region)
  ) || []
})

const centralProvinces = computed(() => {
  return provinces.value?.data.items.filter(p => 
    p.region.includes('Trung') || 
    ['Miền Trung', 'Trung', 'Trung Bộ'].includes(p.region)
  ) || []
})

const southernProvinces = computed(() => {
  return provinces.value?.data.items.filter(p => 
    p.region.includes('Nam') || 
    ['Miền Nam', 'Nam', 'Nam Bộ'].includes(p.region)
  ) || []
})
</script>

<template>
  <NavigationMenu :viewport="false">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/">Trang chủ</a>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem
        v-for="property in PROPERTY_TYPES"
        :key="property.value"
      >
        <NavigationMenuTrigger>{{ property.label }}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="grid grid-cols-3 gap-2 w-lg">
            <ul
              class="grid w-[200px] gap-1"
            >
              <p>Miền Bắc</p>
              <li v-for="(item, idx) in northernProvinces" :key="idx">
                <NavigationMenuLink as-child>
                  <a
                    :href="`/dia-diem?page=1&per_page=12&place=${item.name}&property_types=${property.value}`"
                    class="hover:underline hover:text-primary hover:bg-white"
                    >{{ item.name }}</a
                  >
                </NavigationMenuLink>
              </li>
            </ul>
            <ul
              class="grid w-[200px] gap-1"
            >
              <p>Miền Bắc</p>
              <li v-for="(item, idx) in centralProvinces" :key="idx">
                <NavigationMenuLink as-child>
                  <a
                    :href="`/dia-diem?page=1&per_page=12&place=${item.name}&property_types=${property.value}`"
                    class="hover:underline hover:text-primary hover:bg-white"
                    >{{ item.name }}</a
                  >
                </NavigationMenuLink>
              </li>
            </ul>
            <ul
              class="grid w-[200px] gap-1"
            >
              <p>Miền Bắc</p>
              <li v-for="(item, idx) in southernProvinces" :key="idx">
                <NavigationMenuLink as-child>
                  <a
                    :href="`/dia-diem?page=1&per_page=12&place=${item.name}&property_types=${property.value}`"
                    class="hover:underline hover:text-primary hover:bg-white"
                    >{{ item.name }}</a
                  >
                </NavigationMenuLink>
              </li>
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/dich-vu">Dịch vụ</a>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/cam-nang">Cẩm nang du lịch</a>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Giới thiệu</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <a href="/gioi-thieu/ve-chung-toi">Về chúng tôi</a>
          </NavigationMenuLink>
          <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <a href="/gioi-thieu/tu-van-ho-tro">Tư vấn hỗ trợ</a>
          </NavigationMenuLink>
          <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <a href="/gioi-thieu/cau-hoi-thuong-gap">Câu hỏi thường gặp</a>
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
