<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PROPERTY_TYPES } from "~/constants";

const { getProvinces, getDistricts } = useProvinces();
</script>

<template>
  <Menubar class="border-none shadow-none space-x-1">
    <MenubarMenu>
      <MenubarTrigger>
        <NuxtLink to="/">Trang chủ</NuxtLink>
      </MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu v-for="property in PROPERTY_TYPES" :key="property.value">
      <MenubarTrigger>
        {{ property.label }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarSub
          v-for="region in ['Miền Bắc', 'Miền Trung', 'Miền Nam']"
          :key="region"
        >
          <MenubarSubTrigger
            v-if="getProvinces(property.value, region).length > 0"
            >{{ region }}</MenubarSubTrigger
          >
          <MenubarSubContent>
            <MenubarSub
              v-for="province in getProvinces(property.value, region)"
              :key="province.id"
            >
              <MenubarSubTrigger>{{ province.name }}</MenubarSubTrigger>
              <MenubarSubContent
                v-for="district in getDistricts(
                  property.value,
                  region,
                  province.name
                )"
                :key="district.district"
              >
                <MenubarItem
                  @click="
                    navigateTo(
                      `/tim-kiem?page=1&per_page=12&property_types=${property.value}&region=${region}&province=${province.name}&district=${district.district}`
                    )
                  "
                  >{{ district.district }}</MenubarItem
                >
              </MenubarSubContent>
            </MenubarSub>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>
        <NuxtLink to="/dich-vu">Dịch vụ</NuxtLink>
      </MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>
        <NuxtLink to="/cam-nang">Cẩm nang du lịch</NuxtLink>
      </MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>Giới thiệu</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <NuxtLink to="/gioi-thieu/ve-chung-toi">Về chúng tôi</NuxtLink>
        </MenubarItem>
        <MenubarItem>
          <NuxtLink to="/gioi-thieu/tu-van-ho-tro">Tư vấn hỗ trợ</NuxtLink>
        </MenubarItem>
        <MenubarItem>
          <NuxtLink to="/gioi-thieu/cau-hoi-thuong-gap"
            >Câu hỏi thường gặp</NuxtLink
          >
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
