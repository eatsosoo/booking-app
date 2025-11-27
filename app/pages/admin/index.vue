<template>
  <section class="px-6 py-10 max-w-7xl mx-auto mt-4 min-h-[calc(100vh-415px)]">
    <h1 class="uppercase text-3xl font-semibold mb-8">Quản trị</h1>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(block, index) in blocks"
        :key="index"
        class="p-4 rounded-md border border-gray-300 w-full text-center hover:bg-primary hover:text-white transition-transform duration-300 hover:scale-105 shadow-sm"
      >
        <NuxtLink :to="block.url">{{ block.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const blocks = [
  {
    label: "Quản lý bài viết",
    url: "/admin/quan-ly-bai-viet",
  },
  {
    label: "Quản lý điểm đến",
    url: "/admin/quan-ly-phong",
  },
  {
    label: "Quản lý FAQs",
    url: "/admin/quan-ly-faq",
  },
  {
    label: "Quản lý dịch vụ",
    url: "/admin/quan-ly-dich-vu",
  },
];
</script>
