<template>
  <div>
    <AppHeader>
      <AppMenu />
    </AppHeader>

    <main>
      <slot />
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
