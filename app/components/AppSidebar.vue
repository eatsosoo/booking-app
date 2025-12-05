<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings, MenuIcon, MonitorCloud, FolderKanban } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
  },
  {
    title: 'Bài viết',
    url: '/admin/quan-ly-bai-viet',
    icon: Inbox,
  },
  {
    title: 'Phòng',
    url: '/admin/quan-ly-phong',
    icon: Calendar,
  },
  {
    title: 'FAQs',
    url: '/admin/quan-ly-faq',
    icon: Search,
  },
  {
    title: 'Dịch vụ',
    url: '/admin/quan-ly-dich-vu',
    icon: MonitorCloud,
  },
  {
    title: 'Dự án',
    url: '/admin/quan-ly-danh-muc',
    icon: FolderKanban,
  },
  {
    title: 'Các lựa chọn của Menu',
    url: '/admin/quan-ly-tinh-thanh',
    icon: MenuIcon,
  },
  {
    title: 'Cấu hình hệ thống',
    url: '/admin/cau-hinh-he-thong',
    icon: Settings,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
