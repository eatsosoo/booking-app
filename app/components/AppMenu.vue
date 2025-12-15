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

const { menuTree } = useProvinces();
</script>

<template>
  <Menubar class="border-none shadow-none space-x-1">
    <MenubarMenu>
      <MenubarTrigger>
        <NuxtLink to="/">Trang chủ</NuxtLink>
      </MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu v-for="level1 in menuTree" :key="level1.value">
      <MenubarTrigger>
        {{ level1.label }}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarSub
          v-for="level2 in level1.regions"
          :key="`${level1.label}-${level2.region}`"
        >
          <MenubarSubTrigger v-if="level2.provinces.length > 0">
            {{ level2.region }}</MenubarSubTrigger
          >
          <MenubarSubContent>
            <MenubarSub
              v-for="level3 in level2.provinces"
              :key="`${level1.label}-${level2.region}-${level3.province}`"
            >
              <MenubarSubTrigger v-if="level3.districts.length > 0">{{
                level3.province
              }}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  v-for="level4 in level3.districts"
                  :key="`${level1.label}-${level2.region}-${level3.province}-${level4}`"
                  as-child
                >
                  <NuxtLink
                    :to="{
                      path: '/tim-kiem',
                      query: {
                        page: 1,
                        per_page: 12,
                        property_types: level1.value,
                        region: level2.region,
                        province: level3.province,
                        district: level4,
                      },
                    }"
                  >
                    {{ level4 }}
                  </NuxtLink>
                </MenubarItem>
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
