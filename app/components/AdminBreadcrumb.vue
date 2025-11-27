<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="(item, index) in breadcrumbs" :key="index">
        <template v-if="index < breadcrumbs.length - 1">
          <BreadcrumbLink :href="item.to">{{ item.label }}</BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>

        <template v-else>
          <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
