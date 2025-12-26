<template>
  <div>
    <AppLoading />
    <SidebarProvider>
      <AppSidebar />
      <main class="w-full">
        <div class="flex space-x-3 items-center p-4">
          <SidebarTrigger />
          <div class="h-full border-r border-gray-900"></div>
          <div class="flex justify-between w-full items-center">
            <AdminBreadcrumb />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" @click="logout">
                    <LogOutIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Đăng xuất</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
import AppLoading from "~/components/common/app/AppLoading.vue";
import TooltipProvider from "~/components/ui/tooltip/TooltipProvider.vue";
import Tooltip from "~/components/ui/tooltip/Tooltip.vue";
import TooltipTrigger from "~/components/ui/tooltip/TooltipTrigger.vue";
import Button from "~/components/ui/button/Button.vue";
import { LogOutIcon } from "lucide-vue-next";
import TooltipContent from "~/components/ui/tooltip/TooltipContent.vue";

const token = useCookie("token");
const logout = () => {
  token.value = null;
  navigateTo("/login");
};
</script>
