<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <main class="w-full">
        <div class="flex space-x-3 items-center p-4">
          <SidebarTrigger /> <div class="h-full border-r border-gray-900"></div><AdminBreadcrumb />
        </div>
        <Separator />
        <div class="mx-6 my-4">
          <slot />
        </div>
      </main>
    </SidebarProvider>

    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "~/components/AppSidebar.vue";
import SidebarProvider from "~/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "~/components/ui/sidebar/SidebarTrigger.vue";
import Separator from "~/components/ui/separator/Separator.vue";
</script>
