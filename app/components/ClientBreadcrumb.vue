<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";

const route = useRoute();
const breadcrumb = computed(() =>
  createBreadcrumbFromUrl(route.fullPath.replace("/", ""))
);
</script>

<template>
  <nav class="flex items-center gap-2 text-sm">
    <NuxtLink
      v-for="(item, index) in breadcrumb"
      :key="item.key"
      :to="item.url"
      class="hover:underline text-white font-semibold text-lg flex items-center"
    >
      {{ item.label }}
        <ChevronRight v-if="index < breadcrumb.length - 1" :size="20"  />
    </NuxtLink>
  </nav>
</template>
