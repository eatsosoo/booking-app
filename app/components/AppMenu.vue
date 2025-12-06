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

const { northernProvinces, centralProvinces, southernProvinces } =
  useProvinces();
</script>

<template>
  <Menubar class="border-none shadow-none space-x-4">
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
        <MenubarSub>
          <MenubarSubTrigger>Miền Bắc</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              v-for="province in northernProvinces"
              :key="province.id"
            >
              <NuxtLink
                :to="`/dia-diem?page=1&per_page=12&property_types=${property.value}&place=${province.slug}`"
              >
                {{ province.name }}
              </NuxtLink>
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSub>
          <MenubarSubTrigger>Miền Trung</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              v-for="province in centralProvinces"
              :key="province.id"
            >
              <NuxtLink
                :to="`/dia-diem?page=1&per_page=12&property_types=${property.value}&place=${province.slug}`"
              >
                {{ province.name }}
              </NuxtLink>
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSub>
          <MenubarSubTrigger>Miền Nam</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              v-for="province in southernProvinces"
              :key="province.id"
            >
              <NuxtLink
                :to="`/dia-diem?page=1&per_page=12&property_types=${property.value}&place=${province.slug}`"
              >
                {{ province.name }}
              </NuxtLink>
            </MenubarItem>
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
