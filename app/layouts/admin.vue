<template>
  <div>
    <AppHeader />

    <main>
        <div class="px-6 max-w-7xl mx-auto mt-4">
            <AdminBreadcrumb />
        </div>
        <slot />
    </main>

    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>
