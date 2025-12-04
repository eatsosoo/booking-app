<script setup lang="ts">
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
</script>

<template>
  <Menubar class="border-none shadow-none space-x-4">
    <MenubarMenu>
      <MenubarTrigger>
        <NuxtLink to="/admin">Dashboard</NuxtLink>
      </MenubarTrigger>
      <MenubarTrigger>
        <NuxtLink to="/admin/quan-ly-bai-viet">Bài viết</NuxtLink>
      </MenubarTrigger>
      <MenubarTrigger>
        <NuxtLink to="/admin/quan-ly-phong">Phòng</NuxtLink>
      </MenubarTrigger>
      <MenubarTrigger>
        <NuxtLink to="/admin/quan-ly-faq">FAQs</NuxtLink>
      </MenubarTrigger>
      <MenubarTrigger>
        <NuxtLink to="/admin/quan-ly-dich-vu">Dịch vụ</NuxtLink>
      </MenubarTrigger>
      <MenubarTrigger>
        <NuxtLink to="/admin/quan-ly-danh-muc">Dự án</NuxtLink>
      </MenubarTrigger>
    </MenubarMenu>
  </Menubar>
</template>
