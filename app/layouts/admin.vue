<template>
  <div>
    <AppHeader>
      <AdminMenu />
    </AppHeader>

    <main class="min-h-[calc(100vh-414px)]">
      <div class="px-6 max-w-7xl mx-auto mt-4">
        <AdminBreadcrumb />
      </div>
      <div class="w-full px-6 pt-6 pb-10 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
</script>
