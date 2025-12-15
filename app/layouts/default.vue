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

    <!-- Tooltip/Phone Number -->
    <Phone :phone="'0123456789'" />
    <Zalo :phone="'0123456789'" />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import Phone from "~/components/common/contact/Phone.vue";
import Zalo from "~/components/common/contact/Zalo.vue";
</script>
