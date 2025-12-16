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
    <Phone :phone="baseInfo.PHONE" />
    <Zalo :phone="baseInfo.ZALO" />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import Phone from "~/components/common/contact/Phone.vue";
import Zalo from "~/components/common/contact/Zalo.vue";

const { baseInfo } = useSystemSetting();
</script>
