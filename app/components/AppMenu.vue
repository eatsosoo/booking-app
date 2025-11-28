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
import { PLACE_GROUPS, PROPERTY_TYPES } from "~/constants";
</script>

<template>
  <NavigationMenu :viewport="false">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/">Trang chủ</a>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem v-for="property in PROPERTY_TYPES" :key="property.value">
        <NavigationMenuTrigger>{{ property.label }}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="grid grid-cols-3 gap-2 w-lg">
            <ul
              v-for="(group, index) in PLACE_GROUPS"
              :key="index"
              class="grid w-[200px] gap-1"
            >
              <p>{{ group.label }}</p>
              <li v-for="(item, idx) in group.value" :key="idx">
                <NavigationMenuLink as-child>
                  <a
                    :href="`/dia-diem?page=1&per_page=12&place=${item}&property_types=${property.value}`"
                    class="hover:underline hover:text-primary hover:bg-white"
                    >{{ item }}</a
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
