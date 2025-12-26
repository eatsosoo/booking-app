<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="text-lg"
      >
        <template v-if="index < breadcrumbs.length - 1">
          <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          <!-- <BreadcrumbLink :href="item.to">{{ item.label }}</BreadcrumbLink> -->
          <BreadcrumbSeparator />
        </template>

        <template v-else>
          <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
