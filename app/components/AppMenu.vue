<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const groups = [
  {
    label: "Khu vực Miền Bắc",
    value: [
      "Hà Nội",
      "Hoà Bình",
      "Ba Vì",
      "Sóc Sơn",
      "Tam Đảo",
      "Đại Lải",
      "Hạ Long",
      "Tuần Châu",
      "Ninh Bình",
      "Mộc Châu",
      "Sa Pa",
    ],
  },
  {
    label: "Khu vực Miền Trung",
    value: [
      "FLC Sầm Sơn",
      "Hải Tiến",
      "Huế",
      "Đà Nẵng",
      "Hội An",
      "Quy Nhơn",
      "Nha Trang",
      "Mũi Né",
      "Phú Yên",
      "Đà Lạt",
    ],
  },
  {
    label: "Khu vực Miền Nam",
    value: ["Vũng Tàu", "Hồ Tràm", "Sài Gòn", "Phú Quốc"],
  },
];
</script>

<template>
  <NavigationMenu :viewport="false">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/">Trang chủ</a>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Khách sạn</NavigationMenuTrigger>
        <NavigationMenuContent>
            <div class="grid grid-cols-3 gap-2 w-lg">
              <ul v-for="(group, index) in groups" :key="index" class="grid w-[200px] gap-1">
                <p>{{ group.label }}</p>
                <li v-for="(item, idx) in group.value" :key="idx">
                  <NavigationMenuLink as-child>
                    <a href="/dia-diem" class="hover:underline hover:text-primary hover:bg-white">{{ item }}</a>
                  </NavigationMenuLink>
                </li>
              </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Villa</NavigationMenuTrigger>
        <NavigationMenuContent>
            <div class="grid grid-cols-3 gap-2 w-lg">
              <ul v-for="(group, index) in groups" :key="index" class="grid w-[200px] gap-1">
                <p>{{ group.label }}</p>
                <li v-for="(item, idx) in group.value" :key="idx">
                  <NavigationMenuLink as-child>
                    <a href="/dia-diem" class="hover:underline hover:text-primary hover:bg-white">{{ item }}</a>
                  </NavigationMenuLink>
                </li>
              </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Chung cư mini</NavigationMenuTrigger>
        <NavigationMenuContent>
            <div class="grid grid-cols-3 gap-2 w-lg">
              <ul v-for="(group, index) in groups" :key="index" class="grid w-[200px] gap-1">
                <p>{{ group.label }}</p>
                <li v-for="(item, idx) in group.value" :key="idx">
                  <NavigationMenuLink as-child>
                    <a href="/dia-diem" class="hover:underline hover:text-primary hover:bg-white">{{ item }}</a>
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
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="/tu-van-ho-tro">Tư vấn hỗ trợ</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
