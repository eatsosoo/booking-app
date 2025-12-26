<script setup lang="ts">
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MenuIcon,
  MonitorCloud,
  FolderKanban,
  ChartNoAxesCombinedIcon,
  LandmarkIcon,
  VideoIcon,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";

// Menu items.
const items = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Bảng điều khiển",
    url: "/admin",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    title: "Đặt phòng của khách hàng",
    url: "/admin/quan-ly-dat-phong",
    icon: LandmarkIcon,
  },
  {
    title: "Cẩm nang",
    url: "/admin/quan-ly-bai-viet",
    icon: Inbox,
  },
  {
    title: "Phòng",
    url: "/admin/quan-ly-phong",
    icon: Calendar,
  },
  {
    title: "FAQs",
    url: "/admin/quan-ly-faq",
    icon: Search,
  },
  {
    title: "Dịch vụ",
    url: "/admin/quan-ly-dich-vu",
    icon: MonitorCloud,
  },
  // {
  //   title: "Videos",
  //   url: "/admin/videos",
  //   icon: VideoIcon,
  // },
  {
    title: "Các lựa chọn của Menu",
    url: "/admin/quan-ly-tinh-thanh",
    icon: MenuIcon,
  },
  {
    title: "Cấu hình hệ thống",
    url: "/admin/cau-hinh-he-thong",
    icon: Settings,
  },
];

const router = useRouter();
const currentRoute = router.currentRoute;
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem class="flex items-center justify-center space-x-2">
          <NuxtImg src="/logo.png" alt="Logo" width="120" height="40" />
          <span class="px-2 text-primary font-bold">ADMIN</span>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in items"
              :key="item.title"
              class="py-1"
            >
              <SidebarMenuButton
                as-child
                class="hover:bg-gray-200"
                :class="{
                  'bg-primary text-white': currentRoute.path === item.url,
                }"
              >
                <NuxtLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
